const fs = require('fs');

const content = fs.readFileSync('navana_safezone_registry_coordinates.csv', 'utf8');
const lines = content.trim().split('\n');
const data = [];

for (let i = 1; i < lines.length; i++) {
    const l = lines[i];
    let row = [];
    let inQuotes = false;
    let cur = '';
    for (let j = 0; j < l.length; j++) {
        let c = l[j];
        if (c === '"') inQuotes = !inQuotes;
        else if (c === ',' && !inQuotes) { row.push(cur.trim()); cur = ''; }
        else cur += c;
    }
    row.push(cur.trim());
    
    data.push({
        estado: row[0],
        municipio: row[1],
        zona: row[2],
        calle: row[3],
        p1: row[4],
        p2: row[5],
        p3: row[6],
        status: row[7],
        dictamen: row[8],
        lat: parseFloat(row[9]),
        lng: parseFloat(row[10]),
        fuentes: row[11] || ''
    });
}

fs.writeFileSync('navana_seed_data.json', JSON.stringify(data, null, 2));
fs.writeFileSync('navana_seed_data.js', 'window.NAVANA_SEED_DATA = ' + JSON.stringify(data, null, 2) + ';');
console.log('Successfully saved', data.length, 'records to navana_seed_data.json and navana_seed_data.js');
