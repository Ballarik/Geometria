# Geometria (G1-G16) - Teoremi, Definizioni & Test

Applicazione web per la gestione, consultazione ed esercitazione sui teoremi e le definizioni di geometria (Capitoli G1-G16).

🌐 **Sito Web Accessibile Online 24/7**: [https://geometria-fa-schifo.vercel.app](https://geometria-fa-schifo.vercel.app)

---

## 🚀 Caratteristiche

- **Accessibilità Cloud Online**: Ospitato su **Vercel** con database permanente **Supabase** per il salvataggio in tempo reale di elementi e progressi ML.
- **Generazione Codice Univoco**: Ogni teorema e definizione riceve un codice nel formato `G[CAPITOLO]-[T/D]-[6 CIFRE ESADECIMALI]`, ad esempio `G6-T-6B2E5B`.
- **Inserimento Guidato in 4 Passaggi** (scorciatoia: premi `N` dalla Home):
  1. Scelta tra *Teorema* e *Definizione*.
  2. Selezione del Capitolo (G1..G16) e inserimento del Nome.
  3. Scrittura del testo/enunciato con toolbar simboli matematici e supporto LaTeX.
  4. Dimostrazione (per i teoremi), immagini e note facoltative.
- **Filtri di Consultazione** per tipo e per capitolo.
- **Palestri dei Test & Apprendimento Spaziato (ML)** con 4 modalità di esercitazione.

---

## 🌐 Accesso Online e Salvataggio Cloud

L'applicazione è distribuita online tramite **Vercel** ed è collegata al database PostgreSQL su **Supabase**.

- **Link Ufficiale**: [https://geometria-fa-schifo.vercel.app](https://geometria-fa-schifo.vercel.app)
- Tutti i nuovi teoremi/definizioni aggiunti dal sito si sincronizzano automaticamente nel database Cloud.
- I progressi dei test e dell'algoritmo di machine learning sono memorizzati in modo permanente.

---

## 💻 Sviluppo e Avvio Locale (Opzionale)

### Passaggi per l'esecuzione locale:

1. **Apri il Terminale** ed entra nella cartella del progetto:
   ```bash
   cd ~/Desktop/Libreria/geometria
   ```

2. **Avvia il server locale:**
   ```bash
   node server.js
   ```
   *Messaggio*: `🚀 Servizio Geometria attivo su: http://127.0.0.1:3000`

3. **Apri il browser su:**
   ```
   http://localhost:3000
   ```

---

## 📌 Convenzione Commit Git & GitHub

Quando fai il push su GitHub, puoi inserire nel messaggio del commit i codici degli elementi aggiunti:

```bash
git add .
git commit -m "Aggiunti elementi G6-T-6B2E5B, G6-T-D5C32C"
git push origin main
```

---

## 📁 Struttura dei File

| File | Descrizione |
|------|------------|
| `index.html` | Applicazione web principale |
| `public/data.json` | Database locale/bundle dei teoremi e definizioni |
| `server.js` | Server locale Node.js |
| `src/lib/supabase.js` | Helper di connessione al database Cloud Supabase |
| `migrate_to_supabase.js` | Script di caricamento dati su Supabase |
| `supabase_schema.sql` | Schema SQL per le tabelle Cloud Supabase |
| `README.md` | Questo file di documentazione |
