# Geometria (G1-G16) - Teoremi, Definizioni & Test

Applicazione web per la gestione, consultazione ed esercitazione sui teoremi e le definizioni di geometria (Capitoli G1-G16).

## 🚀 Caratteristiche

- **Generazione Codice Univoco**: Ogni teorema e definizione riceve un codice nel formato `[CAPITOLO]-[T/D]-[6 CARATTERI]`, ad esempio `G1-D-1A2B3C`.
- **Inserimento Guidato in 4 Passaggi** (scorciatoia: premi `N` dalla Home):
  1. Scelta tra *Teorema* e *Definizione*.
  2. Selezione del Capitolo (G1..G16) e inserimento del Nome.
  3. Scrittura del testo/enunciato con toolbar simboli matematici e supporto LaTeX.
  4. Dimostrazione (per i teoremi), immagini e note facoltative.
- **Filtri di Consultazione** per tipo e per capitolo.
- **Area Test** con 4 modalità di esercitazione.

---

## ⚠️ IMPORTANTE: Come avviare l'applicazione

> **NON aprire `index.html` con doppio clic!**
> Se lo fai, i dati si salvano solo nella memoria del browser e li perdi se cambi browser o cancelli i dati di navigazione.

### Passaggi corretti:

**1. Apri il Terminale** (Applicazioni → Utility → Terminale)

**2. Vai nella cartella del progetto:**
```bash
cd ~/Desktop/geometria
```

**3. Avvia il server:**
```bash
node server.js
```
Vedrai il messaggio: `🚀 Servizio Geometria attivo su: http://127.0.0.1:3000`

**4. Apri il browser su questo indirizzo:**
```
http://localhost:3000
```

**5. Usa l'app normalmente.** Ogni volta che crei, modifichi o elimini un teorema o una definizione, il file `data.json` nella cartella del progetto viene aggiornato automaticamente.

**6. Quando hai finito**, torna nel Terminale e premi `Ctrl + C` per fermare il server.

---

## 📌 Convenzione Commit Git & GitHub

Quando fai il push su GitHub, **inserisci nel messaggio del commit i codici degli elementi aggiunti, separati da una virgola**.

```bash
git add .
git commit -m "Aggiunti elementi G1-D-1A2B3C, G2-T-9F8E7D"
git push origin main
```

---

## 📁 Struttura dei file

| File | Descrizione |
|------|------------|
| `index.html` | Applicazione web (interfaccia) |
| `server.js` | Server locale per il salvataggio su disco |
| `data.json` | Database dei teoremi e definizioni (viene aggiornato automaticamente) |
| `learning.json` | Dati di apprendimento automatico ML dei test (aggiornato automaticamente) |
| `README.md` | Questo file |

---

## ❓ Domande frequenti

**D: Posso usare qualsiasi browser?**
R: Sì. Finché apri `http://localhost:3000` (con il server attivo), i dati sono gli stessi su qualsiasi browser.

**D: Se spengo il Mac perdo i dati?**
R: No. I dati sono salvati nel file `data.json` sul tuo disco. Quando riavvii, basta rieseguire `node server.js` e riaprire `http://localhost:3000`.

**D: Devo avere Node.js installato?**
R: Sì. Puoi verificare digitando `node -v` nel Terminale. Se non è installato, scaricalo da [nodejs.org](https://nodejs.org).
