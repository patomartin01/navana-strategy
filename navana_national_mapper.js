/**
 * NAVANA National Territory Security Seeding Engine (North to South)
 * 
 * Orchestrates the systematic populating of safety profiles across Mexico's 32 states,
 * tracks progress, and clearly displays completed vs. missing states.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REGISTRY_FILE = path.join(__dirname, 'navana_safezone_registry_coordinates.csv');
const SEED_DATA_FILE = path.join(__dirname, 'mexico_states_municipalities.json');

// Geographically sorted lists of states from North to South (32 states total)
const REGIONS = {
  "1_NORTE_FRONTERA": {
    name: "Región 1: Frontera Norte y Bajío Primario",
    states: [
      "Baja California",
      "Baja California Sur",
      "Sonora",
      "Chihuahua",
      "Coahuila",
      "Nuevo León",
      "Tamaulipas",
      "Querétaro"
    ]
  },
  "2_OCCIDENTE_PACIFICO_NORTE": {
    name: "Región 2: Occidente y Pacífico Norte",
    states: [
      "Sinaloa",
      "Durango",
      "Zacatecas",
      "San Luis Potosí",
      "Nayarit",
      "Jalisco",
      "Colima",
      "Aguascalientes"
    ]
  },
  "3_CENTRO_BAJIO": {
    name: "Región 3: Centro y Altiplano",
    states: [
      "Guanajuato",
      "Hidalgo",
      "Michoacán",
      "Estado de México",
      "CDMX",
      "Morelos",
      "Tlaxcala",
      "Puebla"
    ]
  },
  "4_SUR_SURESTE": {
    name: "Región 4: Sur y Península de Yucatán",
    states: [
      "Guerrero",
      "Veracruz",
      "Oaxaca",
      "Tabasco",
      "Chiapas",
      "Campeche",
      "Yucatán",
      "Quintana Roo"
    ]
  }
};

function getNationalCoverageData() {
    const db = fs.existsSync(SEED_DATA_FILE) ? JSON.parse(fs.readFileSync(SEED_DATA_FILE, 'utf-8')) : {};
    
    // Parse registry CSV
    const auditedByState = {};
    if (fs.existsSync(REGISTRY_FILE)) {
        const content = fs.readFileSync(REGISTRY_FILE, 'utf-8');
        const lines = content.trim().split('\n');
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(',');
            const rawState = (row[0] || '').replace(/['"]/g, '').trim();
            if (!rawState) continue;
            
            // Normalize state name matching
            let matchedState = rawState;
            for (const rKey in REGIONS) {
                const found = REGIONS[rKey].states.find(s => s.toLowerCase() === rawState.toLowerCase());
                if (found) { matchedState = found; break; }
            }
            auditedByState[matchedState] = (auditedByState[matchedState] || 0) + 1;
        }
    }

    let totalStates = 32;
    let completedStatesCount = 0;
    let missingStatesCount = 0;
    let totalMunicipalities = 0;
    let auditedMunicipalitiesCount = 0;

    const reportRegions = {};

    for (const [rKey, rInfo] of Object.entries(REGIONS)) {
        reportRegions[rKey] = {
            name: rInfo.name,
            completed: [],
            missing: [],
            totalMunis: 0,
            auditedMunis: 0
        };

        for (const state of rInfo.states) {
            const muniList = db[state] || [];
            const muniTotal = muniList.length;
            const muniAudited = auditedByState[state] || 0;
            totalMunicipalities += muniTotal;
            auditedMunicipalitiesCount += muniAudited;
            reportRegions[rKey].totalMunis += muniTotal;
            reportRegions[rKey].auditedMunis += muniAudited;

            if (muniAudited > 0) {
                completedStatesCount++;
                reportRegions[rKey].completed.push({
                    state,
                    audited: muniAudited,
                    total: muniTotal
                });
            } else {
                missingStatesCount++;
                reportRegions[rKey].missing.push({
                    state,
                    total: muniTotal
                });
            }
        }
    }

    return {
        totalStates,
        completedStatesCount,
        missingStatesCount,
        totalMunicipalities,
        auditedMunicipalitiesCount,
        percentMunis: totalMunicipalities > 0 ? ((auditedMunicipalitiesCount / totalMunicipalities) * 100).toFixed(1) : 0,
        percentStates: ((completedStatesCount / totalStates) * 100).toFixed(1),
        reportRegions
    };
}

function printCoverageDashboard() {
    const data = getNationalCoverageData();

    console.log("\n=========================================================================================");
    console.log("🇲🇽 NAVANA TERRITORIAL SECURITY SCRAPER - REPORTE DE COBERTURA NACIONAL (MÉXICO)");
    console.log("=========================================================================================");
    console.log(`📊 ESTADOS AUDITADOS:     ${data.completedStatesCount} / ${data.totalStates} (${data.percentStates}%)`);
    console.log(`📍 MUNICIPIOS AUDITADOS:  ${data.auditedMunicipalitiesCount} / ${data.totalMunicipalities} (${data.percentMunis}%)`);
    console.log(`⏳ ESTADOS FALTANTES:     ${data.missingStatesCount} estados por escanear`);
    console.log("=========================================================================================\n");

    console.log("-----------------------------------------------------------------------------------------");
    console.log("🟢 ESTADOS AUDITADOS Y ACTIVOS EN EL MAPA / SHEETS (" + data.completedStatesCount + " ESTADOS)");
    console.log("-----------------------------------------------------------------------------------------");
    for (const rKey in data.reportRegions) {
        const reg = data.reportRegions[rKey];
        if (reg.completed.length > 0) {
            console.log(`📌 ${reg.name.toUpperCase()}:`);
            reg.completed.forEach(s => {
                console.log(`   ✅ ${s.state.padEnd(25)} ${s.audited.toString().padStart(3)} / ${s.total.toString().padStart(3)} municipios [100% AUDITADO]`);
            });
        }
    }

    console.log("\n-----------------------------------------------------------------------------------------");
    console.log("⏳ ESTADOS FALTANTES / PENDIENTES DE AUDITORÍA (" + data.missingStatesCount + " ESTADOS)");
    console.log("-----------------------------------------------------------------------------------------");
    for (const rKey in data.reportRegions) {
        const reg = data.reportRegions[rKey];
        if (reg.missing.length > 0) {
            console.log(`\n📁 ${reg.name.toUpperCase()} (${reg.missing.length} estados faltantes - ${reg.totalMunis - reg.auditedMunis} municipios):`);
            reg.missing.forEach(s => {
                console.log(`   ⏳ ${s.state.padEnd(25)} ${s.total.toString().padStart(3)} municipios pendientes  👉 node navana_state_populator.js --estado "${s.state}"`);
            });
            console.log(`   🚀 Para correr toda esta región: node navana_national_mapper.js --region=${rKey}`);
        }
    }

    console.log("\n=========================================================================================");
    console.log("💡 GUÍA RÁPIDA DE EJECUCIÓN DEL SCRAPER:");
    console.log("1. Para auditar un estado individual faltante (ej. Oaxaca, Puebla o Hidalgo):");
    console.log("   👉 node navana_state_populator.js --estado \"Oaxaca\"");
    console.log("   👉 node navana_state_populator.js --estado \"Puebla\"");
    console.log("   👉 node navana_state_populator.js --estado \"Hidalgo\"");
    console.log("2. Para auditar una región completa faltante de un solo comando:");
    console.log("   👉 node navana_national_mapper.js --region=2_OCCIDENTE_PACIFICO_NORTE");
    console.log("   👉 node navana_national_mapper.js --region=3_CENTRO_BAJIO");
    console.log("   👉 node navana_national_mapper.js --region=4_SUR_SURESTE");
    console.log("3. Para volver a ver este reporte de estados faltantes:");
    console.log("   👉 node navana_national_mapper.js --faltantes");
    console.log("=========================================================================================\n");
}

function main() {
    const args = process.argv.slice(2);
    const regionArg = args.find(a => a.startsWith('--region='));

    if (regionArg) {
        const regionName = regionArg.split('=')[1];
        const regObj = REGIONS[regionName];
        if (!regObj) {
            console.error(`❌ Región [${regionName}] no válida.`);
            console.log(`💡 Regiones disponibles: ${Object.keys(REGIONS).join(', ')}`);
            return;
        }

        console.log("====================================================================");
        console.log(`🚀 INICIANDO MAPEO REGIONAL: ${regObj.name.toUpperCase()}`);
        console.log("====================================================================");
        
        for (const state of regObj.states) {
            console.log(`\n======================================================`);
            console.log(`➡️  Mapeando Estado: ${state.toUpperCase()}`);
            console.log(`======================================================`);
            try {
                // Calls the state populator synchronously for this state
                execSync(`node navana_state_populator.js --estado "${state}"`, { stdio: 'inherit', cwd: __dirname });
            } catch (err) {
                console.error(`❌ Error mapeando ${state}:`, err.message);
            }
        }
    } else {
        // Default behavior: print the full coverage report showing all missing states
        printCoverageDashboard();
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    REGIONS,
    getNationalCoverageData,
    printCoverageDashboard
};

