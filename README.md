# Geometria (G1-G16) - Teoremi, Definizioni & Test

Applicazione web per la gestione, consultazione ed esercitazione sui teoremi e le definizioni di geometria (Capitoli G1-G16).

## 🚀 Caratteristiche

- **Inserimento Guidato in 4 Passaggi**:
  1. Scelta tra *Teorema* e *Definizione*.
  2. Selezione del Capitolo (G1, G2, ... G16) e inserimento del Nome.
  3. Scrittura del testo/enunciato (con supporto LaTeX per formule come $a^2+b^2=c^2$).
  4. Immagini esplicative e campo per la Dimostrazione (per i teoremi).
- **Filtri di Consultazione**:
  - Filtro per Tipo (*Teoremi* / *Definizioni* / *Tutti*).
  - Filtro per Capitolo (*G1*, *G2*, ..., *G16*).
- **Area Test e Valutazione**:
  - Selezione personalizzata dei capitoli oggetto del test.
  - 4 modalità: Abbina l'oggetto alla definizione, Scrivi la definizione, Scrivi un teorema, Dimostra un teorema.
- **Backup e Salva JSON**: Esporta ed importa i tuoi teoremi in formato JSON.

## 🛠️ Come usare l'applicazione

1. Apri semplicemente il file `index.html` con il tuo browser (doppio clic oppure tramite comando `open index.html`).
2. Non richiede installazioni di pacchetti Node.js o Python.

## 💾 Salvataggio dati e GitHub

I dati inseriti vengono salvati nel browser locale. Se desideri salvare i tuoi teoremi nel repository GitHub per condividerli o conservarli permanentemente:
1. Usa il pulsante **"Esporta JSON"** nell'applicazione per scaricare il file dei tuoi teoremi.
2. Salva o sostituisci il file `data.json` nella cartella del progetto.
3. Esegui il commit e push su GitHub:
   ```bash
   git add .
   git commit -m "Aggiornati teoremi e definizioni"
   git push origin main
   ```
