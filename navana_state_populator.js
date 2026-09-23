/**
 * NAVANA State-by-State Massive Seeder and Auditor
 * 
 * Systematically audits and populates all municipalities of a specified Mexican state
 * into the main territorial security database and syncs them to Google Sheets.
 */

const fs = require('fs');
const path = require('path');
const { auditAndAddLocation, loadRegistryCSV, syncToGoogleSheetsDirect } = require('./navana_scraper_sync');
const { execSync } = require('child_process');

const SEED_DATA_FILE = path.join(__dirname, 'mexico_states_municipalities.json');

// Helper sleep function to prevent rapid IP bans during massive scans
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runStateAudit(stateName) {
    if (!fs.existsSync(SEED_DATA_FILE)) {
        console.error("❌ seed database file not found!");
        return;
    }

    const db = JSON.parse(fs.readFileSync(SEED_DATA_FILE, 'utf-8'));
    const municipalities = db[stateName];

    if (!municipalities) {
        console.error(`❌ Estado [${stateName}] no disponible en la base de datos de semillas.`);
        console.log(`💡 Estados disponibles: ${Object.keys(db).join(', ')}`);
        return;
    }

    console.log(`==========================================================`);
    console.log(`🗺️  INICIANDO POBLACIÓN MASIVA DE ESTADO: ${stateName.toUpperCase()}`);
    console.log(`📊 Total de municipios a auditar: ${municipalities.length}`);
    console.log(`==========================================================`);

    const existingRegistry = loadRegistryCSV();

    for (let i = 0; i < municipalities.length; i++) {
        const muni = municipalities[i];
        
        // Skip if already in registry with non-default coordinates
        const alreadyDone = existingRegistry.some(r => 
            (r["Estado"] || '').toLowerCase() === stateName.toLowerCase() && 
            (r["Municipio"] || '').toLowerCase() === muni.toLowerCase() &&
            r["Latitud"] && r["Latitud"] !== "23.6345"
        );
        if (alreadyDone) {
            console.log(`⏩ [${i + 1}/${municipalities.length}] ${muni} (${stateName}) ya registrado. Omitiendo.`);
            continue;
        }

        console.log(`\n🔄 [${i + 1}/${municipalities.length}] Procesando municipio: ${muni}...`);
        
        try {
            // Audits the whole municipality, geocodes it, and saves locally (skips individual cloud sync)
            await auditAndAddLocation(stateName, muni, "Todo el Municipio", "Accesos Principales", true);
        } catch (e) {
            console.error(`⚠️ Error al procesar ${muni}:`, e.message);
        }

        // Polite delay of 1.2 seconds to protect IP and ensure Nominatim / DDG don't block us
        if (i < municipalities.length - 1) {
            console.log("⏳ Esperando 1.2 segundos para la siguiente consulta...");
            await sleep(1200);
        }
    }

    console.log(`\n☁️ Sincronizando estado completo de ${stateName.toUpperCase()} con Google Sheets en la nube...`);
    try {
        const finalRegistry = loadRegistryCSV();
        if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SPREADSHEET_ID) {
            await syncToGoogleSheetsDirect(finalRegistry);
        }
        execSync('node build_seed_json.js', { stdio: 'inherit', cwd: __dirname });
    } catch (err) {
        console.warn("⚠️ Advertencia en sincronización final:", err.message);
    }

    console.log(`\n==========================================================`);
    console.log(`🎉 ¡PROCESO DE POBLACIÓN COMPLETADO PARA EL ESTADO DE ${stateName.toUpperCase()}!`);
    console.log(`==========================================================`);
}

async function main() {
    const args = process.argv.slice(2);
    const stateIndex = args.indexOf('--estado') !== -1 ? args.indexOf('--estado') : args.indexOf('-e');

    if (stateIndex !== -1 && args[stateIndex + 1]) {
        const targetState = args[stateIndex + 1];
        await runStateAudit(targetState);
    } else {
        console.log("❌ Debes especificar un estado para auditar.");
        console.log("👉 Uso: node navana_state_populator.js --estado \"Querétaro\"");
        console.log("👉 Uso: node navana_state_populator.js --estado \"Colima\"");
    }
}

main();
