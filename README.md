# Geometria (G1-G16) - Teoremi, Definizioni & Test

Applicazione web per la gestione, consultazione ed esercitazione sui teoremi e le definizioni di geometria (Capitoli G1-G16).

## 🚀 Caratteristiche

- **Generazione Codice Univoco**: Ogni teorema e definizione generati ricevono un codice nel formato `[CAPITOLO]-[T/D]-[6 CARATTERI]`, ad esempio `G1-D-1A2B3C` o `G4-T-[#HEX6]`.
- **Inserimento Guidato in 4 Passaggi**:
  1. Scelta tra *Teorema* e *Definizione*.
  2. Selezione del Capitolo (G1..G16) e inserimento del Nome.
  3. Scrittura del testo/enunciato (con supporto LaTeX per formule come $a^2+b^2=c^2$).
  4. Immagini esplicative, Dimostrazione (per i teoremi) e Note facoltative.
- **Filtri di Consultazione**:
  - Filtro per Tipo (*Teoremi* / *Definizioni* / *Tutti*).
  - Filtro per Capitolo (*G1*, *G2*, ..., *G16*).
- **Area Test e Valutazione**:
  - Selezione personalizzata dei capitoli (tutti deselezionati di default).
  - 4 modalità: Abbina l'oggetto alla definizione, Scrivi la definizione, Scrivi un teorema, Dimostra un teorema.

## 🛠️ Come usare l'applicazione

1. Apri il file `index.html` con il tuo browser (doppio clic oppure tramite comando `open index.html`).
2. Non richiede installazioni di pacchetti Node.js o Python.

## 📌 Convenzione Commit Git & GitHub

Quando aggiungi nuovi teoremi o definizioni e fai il commit su Git/GitHub, **inserisci nel messaggio del commit i codici univoci delle cose che hai aggiunto separati da una virgola**.

Esempio di comando commit:
```bash
git add .
git commit -m "Aggiunti elementi G1-D-1A2B3C, G2-T-9F8E7D"
git push origin main
```
