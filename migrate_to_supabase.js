// =========================================================================
// SCRIPT DI MIGRAZIONE AUTOMATICA DA data.json A SUPABASE
// Esegui questo script dopo aver creato il progetto Supabase e impostato le chiavi!
// Uso: node migrate_to_supabase.js <SUPABASE_URL> <SUPABASE_ANON_KEY>
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = process.env.VITE_SUPABASE_URL || process.argv[2];
const key = process.env.VITE_SUPABASE_ANON_KEY || process.argv[3];

if (!url || !key) {
  console.error('\n❌ Errore: Inserisci URL e KEY di Supabase!');
  console.log('Esempio di utilizzo:');
  console.log('  node migrate_to_supabase.js https://xyz.supabase.co eyJhbGciOi...\n');
  process.exit(1);
}

const supabase = createClient(url, key);
const dataPath = path.join(__dirname, 'data.json');

async function migrate() {
  console.log('🚀 Avvio migrazione da data.json a Supabase...');
  
  if (!fs.existsSync(dataPath)) {
    console.error('❌ File data.json non trovato!');
    process.exit(1);
  }

  const items = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  console.log(`📦 Trovati ${items.length} elementi in data.json.`);

  let inserted = 0;
  let errors = 0;

  for (const item of items) {
    const { error } = await supabase.from('items').upsert({
      id: item.id,
      code: item.code,
      type: item.type,
      chapter: item.chapter,
      name: item.name,
      content: item.content || '',
      proof: item.proof || '',
      notes: item.notes || '',
      images: item.images || []
    });

    if (error) {
      console.error(`❌ Errore elemento ${item.code}:`, error.message);
      errors++;
    } else {
      inserted++;
    }
  }

  console.log(`\n✅ MIGRAZIONE COMPLETATA!`);
  console.log(`- Elementi caricati con successo: ${inserted}/${items.length}`);
  if (errors > 0) console.log(`- Elementi con errore: ${errors}`);
}

migrate();
