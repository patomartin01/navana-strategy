const fs = require('fs');
const path = require('path');
const axios = require('axios');

const TARGET_FILE = path.join(__dirname, 'mexico_states_municipalities.json');
const URL = 'https://raw.githubusercontent.com/cisnerosnow/json-estados-municipios-mexico/master/estados-municipios.json';

async function download() {
    console.log("📥 Descargando catálogo oficial completo de estados y municipios de México...");
    try {
        const response = await axios.get(URL);
        if (response.data && typeof response.data === 'object') {
            fs.writeFileSync(TARGET_FILE, JSON.stringify(response.data, null, 2), 'utf-8');
            console.log(`✨ ¡Catálogo guardado con éxito en: ${TARGET_FILE}!`);
        }
    } catch (e) {
        console.error("❌ Falló la descarga del catálogo oficial:", e.message);
    }
}

download();
