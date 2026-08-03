import React, { useState, useMemo } from 'react';
import { CHAPTERS } from '../../data/chapters';
import { MathRender } from '../MathRender';
import confetti from 'canvas-confetti';
import { GraduationCap, CheckCircle2, RotateCcw, Award, ChevronRight, BookOpen, ScrollText, Shuffle, HelpCircle, AlertCircle, ArrowLeft } from 'lucide-react';

export const TestCenter = ({ items }) => {

  // Chapter selection state (array of chapter IDs e.g. ['G1', 'G2', ...])
  const [selectedChapters, setSelectedChapters] = useState(CHAPTERS.map(ch => ch.id));
  
  // Current active test mode: null | 'matching' | 'write_definition' | 'write_theorem' | 'prove_theorem'
  const [activeTest, setActiveTest] = useState(null);

  // Available items based on selected chapters
  const activeItems = useMemo(() => {
    return items.filter(item => selectedChapters.includes(item.chapter));
  }, [items, selectedChapters]);

  const activeDefinitions = useMemo(() => {
    return activeItems.filter(item => item.type === 'definition');
  }, [activeItems]);

  const activeTheorems = useMemo(() => {
    return activeItems.filter(item => item.type === 'theorem');
  }, [activeItems]);

  const toggleChapter = (chId) => {
    if (selectedChapters.includes(chId)) {
      if (selectedChapters.length === 1) {
        alert('Devi selezionare almeno 1 capitolo per eseguire il test.');
        return;
      }
      setSelectedChapters(selectedChapters.filter(id => id !== chId));
    } else {
      setSelectedChapters([...selectedChapters, chId]);
    }
  };

  const selectAllChapters = () => setSelectedChapters(CHAPTERS.map(ch => ch.id));
  const deselectAllChapters = () => setSelectedChapters(['G1']);

  const startTest = (mode) => {
    if (activeItems.length === 0) {
      alert('Nessun contenuto disponibile nei capitoli selezionati. Aggiungi contenuti o seleziona altri capitoli.');
      return;
    }
    if (mode === 'write_definition' && activeDefinitions.length === 0) {
      alert('Non ci sono definizioni nei capitoli selezionati.');
      return;
    }
    if ((mode === 'write_theorem' || mode === 'prove_theorem') && activeTheorems.length === 0) {
      alert('Non ci sono teoremi nei capitoli selezionati.');
      return;
    }
    setActiveTest(mode);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Test Hub Header */}
      {!activeTest && (
        <>
          <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border border-amber-500/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="flex items-center space-x-3 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-5 h-5" /> Centro Valutazione & Palestra di Geometria
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Esercitazioni e Verifiche Interattive
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Metti alla prova la tua preparazione selezionando uno o più capitoli (G1-G16) e scegli la modalità di test adatta.
            </p>
          </div>

          {/* Chapter Selector Section */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  1. Seleziona i Capitoli per il Test ({selectedChapters.length}/16 selezionati)
                </h3>
                <p className="text-xs text-slate-400">
                  Devi scegliere almeno 1 capitolo fino ad un massimo di 16.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={selectAllChapters}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 border border-indigo-500/30 transition-colors"
                >
                  Seleziona Tutti
                </button>
                <button
                  onClick={deselectAllChapters}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 transition-colors"
                >
                  Solo G1
                </button>
              </div>
            </div>

            {/* Chapters Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
              {CHAPTERS.map(ch => {
                const isSelected = selectedChapters.includes(ch.id);
                const count = items.filter(i => i.chapter === ch.id).length;
                return (
                  <button
                    key={ch.id}
                    onClick={() => toggleChapter(ch.id)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-b from-indigo-600/30 to-indigo-900/40 border-indigo-500 text-white shadow-md shadow-indigo-500/10'
                        : 'bg-slate-800/40 border-slate-700/60 text-slate-500 hover:border-slate-600 hover:text-slate-300'
                    }`}
                  >
                    <span className="font-extrabold text-sm">{ch.id}</span>
                    <span className={`text-[10px] mt-1 px-1.5 rounded-full ${isSelected ? 'bg-indigo-500/30 text-indigo-200' : 'bg-slate-800 text-slate-500'}`}>
                      {count} elementi
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Test Types Selection Grid */}
          <div className="space-y-4">
            <h3 className="font-bold text-white text-lg">
              2. Scegli il Tipo di Test
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Test 1: Matching */}
              <div 
                onClick={() => startTest('matching')}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.01] cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Shuffle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    Abbina l'Oggetto alla Definizione
                  </h4>
                  <p className="text-sm text-slate-400">
                    Collega ogni nome di figura o teorema con il rispettivo testo in un gioco di abbinamento interattivo a coppie.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <span className="text-xs text-indigo-400 font-semibold">Test di Associazione Rapida</span>
                  <ChevronRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Test 2: Write Definition */}
              <div 
                onClick={() => startTest('write_definition')}
                className="bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.01] cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Scrivi la Definizione di un Oggetto
                  </h4>
                  <p className="text-sm text-slate-400">
                    Dato il nome di un oggetto geometrico estratto dai capitoli selezionati, scrivi a memoria la sua definizione esatta.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <span className="text-xs text-blue-400 font-semibold">{activeDefinitions.length} Definizioni disponibili</span>
                  <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Test 3: Write Theorem */}
              <div 
                onClick={() => startTest('write_theorem')}
                className="bg-slate-900 border border-slate-800 hover:border-purple-500/60 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.01] cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <ScrollText className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                    Scrivi un Teorema
                  </h4>
                  <p className="text-sm text-slate-400">
                    Dato il nome di un teorema (es. Teorema di Pitagora), formula e scrivi l'enunciato teorico preciso.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <span className="text-xs text-purple-400 font-semibold">{activeTheorems.length} Teoremi disponibili</span>
                  <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Test 4: Prove Theorem */}
              <div 
                onClick={() => startTest('prove_theorem')}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-6 shadow-xl transition-all hover:scale-[1.01] cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Dimostra un Teorema
                  </h4>
                  <p className="text-sm text-slate-400">
                    Metti alla prova il tuo rigore matematico scrivendo i passaggi della dimostrazione formale di un teorema.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <span className="text-xs text-emerald-400 font-semibold">Test di Dimostrazione Avanzato</span>
                  <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

            </div>
          </div>
        </>
      )}

      {/* Active Test Views */}
      {activeTest && (
        <div>
          <button
            onClick={() => setActiveTest(null)}
            className="flex items-center space-x-2 text-slate-400 hover:text-white text-sm font-medium mb-6 transition-colors bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 w-max"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna al Selezionatore Test</span>
          </button>

          {activeTest === 'matching' && (
            <MatchingTestRunner items={activeItems} onFinish={() => setActiveTest(null)} />
          )}

          {activeTest === 'write_definition' && (
            <TextPromptTestRunner 
              items={activeDefinitions} 
              testType="definition"
              onFinish={() => setActiveTest(null)} 
            />
          )}

          {activeTest === 'write_theorem' && (
            <TextPromptTestRunner 
              items={activeTheorems} 
              testType="theorem"
              onFinish={() => setActiveTest(null)} 
            />
          )}

          {activeTest === 'prove_theorem' && (
            <ProofTestRunner 
              items={activeTheorems} 
              onFinish={() => setActiveTest(null)} 
            />
          )}
        </div>
      )}

    </div>
  );
};


/* =========================================================================
   SUB-COMPONENT 1: MATCHING TEST (Abbina l'oggetto alla definizione)
   ========================================================================= */
const MatchingTestRunner = ({ items, onFinish }) => {
  // Select up to 5 items for matching
  const testPool = useMemo(() => {
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(5, items.length));
  }, [items]);

  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]); // array of matched item ids
  const [errorPair, setErrorPair] = useState(null);
  const [score, setScore] = useState(0);

  // Right column shuffled definitions
  const rightColumn = useMemo(() => {
    return [...testPool].sort(() => 0.5 - Math.random());
  }, [testPool]);

  const handleLeftClick = (item) => {
    if (matchedPairs.includes(item.id)) return;
    setSelectedLeft(item);
    setErrorPair(null);
  };

  const handleRightClick = (item) => {
    if (!selectedLeft || matchedPairs.includes(item.id)) return;

    if (selectedLeft.id === item.id) {
      // Correct match!
      const newMatched = [...matchedPairs, item.id];
      setMatchedPairs(newMatched);
      setSelectedLeft(null);
      setScore(prev => prev + 1);

      if (newMatched.length === testPool.length) {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    } else {
      // Wrong match
      setErrorPair({ left: selectedLeft.id, right: item.id });
      setTimeout(() => setErrorPair(null), 800);
    }
  };

  const isCompleted = matchedPairs.length === testPool.length && testPool.length > 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Shuffle className="w-5 h-5 text-indigo-400" /> Abbina l'Oggetto alla Definizione
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Seleziona un nome a sinistra, poi clicca sul suo testo corrispondente a destra.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-xs font-semibold px-3 py-1.5 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-500/30">
            Abbinati: {matchedPairs.length} / {testPool.length}
          </span>
        </div>
      </div>

      {!isCompleted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Names */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Oggetti & Teoremi</h4>
            {testPool.map(item => {
              const isMatched = matchedPairs.includes(item.id);
              const isSelected = selectedLeft?.id === item.id;
              const isErr = errorPair?.left === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleLeftClick(item)}
                  className={`w-full p-4 rounded-xl border text-left font-bold text-sm transition-all ${
                    isMatched
                      ? 'bg-emerald-950/30 border-emerald-600/40 text-emerald-300 opacity-60 cursor-not-allowed'
                      : isErr
                      ? 'bg-rose-950/40 border-rose-500 text-rose-200 animate-shake'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 scale-[1.01]'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-[10px] font-mono opacity-60 px-1.5 py-0.5 rounded bg-slate-900">
                      {item.chapter}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Definitions */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Testi & Enunciati</h4>
            {rightColumn.map(item => {
              const isMatched = matchedPairs.includes(item.id);
              const isErr = errorPair?.right === item.id;

              return (
                <button
                  key={item.id}
                  disabled={isMatched}
                  onClick={() => handleRightClick(item)}
                  className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${
                    isMatched
                      ? 'bg-emerald-950/30 border-emerald-600/40 text-emerald-300 opacity-60 cursor-not-allowed'
                      : isErr
                      ? 'bg-rose-950/40 border-rose-500 text-rose-200 animate-shake'
                      : selectedLeft
                      ? 'bg-slate-800 border-indigo-500/50 hover:border-indigo-400 text-slate-200'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-300 opacity-80'
                  }`}
                >
                  <MathRender content={item.content} />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-white">Eccellente! Tutti gli abbinamenti sono corretti.</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Hai completato l'esercitazione di abbinamento per i capitoli selezionati.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={onFinish}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-colors"
            >
              Completato
            </button>
          </div>
        </div>
      )}
    </div>
  );
};


/* =========================================================================
   SUB-COMPONENT 2 & 3: TEXT PROMPT TEST (Scrivi Definizione / Scrivi Teorema)
   ========================================================================= */
const TextPromptTestRunner = ({ items, testType, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userText, setUserText] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentItem = items[currentIndex];

  const handleVerify = () => {
    setIsRevealed(true);
  };

  const handleSelfGrade = (passed) => {
    if (passed) setScore(prev => prev + 1);

    if (currentIndex < items.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserText('');
      setIsRevealed(false);
    } else {
      confetti({ particleCount: 80, spread: 60 });
      setIsRevealed(true);
    }
  };

  if (!currentItem) return null;

  const isLast = currentIndex === items.length - 1;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-w-3xl mx-auto">
      
      {/* Test Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            Capitolo {currentItem.chapter} • Domanda {currentIndex + 1} di {items.length}
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {currentItem.name}
          </h3>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
          Punteggio: {score}/{currentIndex}
        </span>
      </div>

      {/* Input area */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-300">
          {testType === 'definition' 
            ? 'Scrivi la definizione dell\'oggetto sopra citato:' 
            : 'Scrivi l\'enunciato del teorema sopra citato:'}
        </label>

        <textarea
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
          rows={5}
          disabled={isRevealed}
          placeholder="Inserisci qui il testo a memoria..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base"
        />
      </div>

      {!isRevealed ? (
        <div className="flex justify-end">
          <button
            onClick={handleVerify}
            disabled={!userText.trim()}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg"
          >
            Verifica Risposta
          </button>
        </div>
      ) : (
        <div className="space-y-6 pt-4 border-t border-slate-800 animate-fade-in">
          
          {/* Reference Solution */}
          <div className="bg-slate-800/80 border border-indigo-500/40 rounded-2xl p-5 space-y-2">
            <h4 className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
              Risposta Ufficiale nel Database:
            </h4>
            <MathRender content={currentItem.content} className="text-slate-200 text-base leading-relaxed" />
          </div>

          {/* User's typed answer preview */}
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              La tua risposta:
            </h4>
            <div className="text-slate-300 text-sm whitespace-pre-wrap">
              {userText || '(Nessuna risposta fornita)'}
            </div>
          </div>

          {/* Self Assessment Prompt */}
          <div className="bg-indigo-950/30 border border-indigo-800/40 p-5 rounded-2xl text-center space-y-4">
            <p className="text-sm font-semibold text-slate-200">
              Confronta la tua risposta con quella ufficiale. Come ti valuti?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleSelfGrade(false)}
                className="px-5 py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold rounded-xl transition-colors text-sm"
              >
                Da Ripassare ❌
              </button>
              <button
                onClick={() => handleSelfGrade(true)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-emerald-600/30"
              >
                Corretta / Ottima ✔
              </button>
            </div>
          </div>

          {isLast && (
            <div className="text-center pt-4">
              <button
                onClick={onFinish}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
              >
                Concludi Esercitazione
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};


/* =========================================================================
   SUB-COMPONENT 4: PROOF TEST RUNNER (Dimostra un Teorema)
   ========================================================================= */
const ProofTestRunner = ({ items, onFinish }) => {
  const [selectedTheoremId, setSelectedTheoremId] = useState(items[0]?.id || null);
  const [userProof, setUserProof] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);

  const currentTheorem = items.find(i => i.id === selectedTheoremId) || items[0];

  const handleVerify = () => {
    setIsRevealed(true);
    confetti({ particleCount: 60, spread: 50 });
  };

  if (!currentTheorem) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl max-w-4xl mx-auto">
      
      {/* Theorem Selector */}
      <div className="space-y-2">
        <label className="block text-xs uppercase font-bold text-slate-400 tracking-wider">
          Seleziona il Teorema da Dimostrare:
        </label>
        <select
          value={selectedTheoremId}
          onChange={(e) => {
            setSelectedTheoremId(e.target.value);
            setUserProof('');
            setIsRevealed(false);
          }}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {items.map(th => (
            <option key={th.id} value={th.id}>
              [{th.chapter}] {th.name}
            </option>
          ))}
        </select>
      </div>

      {/* Theorem Enunciato Card */}
      <div className="bg-gradient-to-r from-purple-950/40 via-slate-800 to-slate-900 border border-purple-800/40 rounded-2xl p-5 space-y-2">
        <span className="text-xs uppercase font-extrabold text-purple-400 tracking-wider block">
          Enunciato del Teorema da Dimostrare:
        </span>
        <h3 className="text-xl font-bold text-white">{currentTheorem.name}</h3>
        <MathRender content={currentTheorem.content} className="text-slate-200 text-sm leading-relaxed" />
      </div>

      {/* Proof Writing Area */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-slate-300">
          Sviluppa i passaggi logici della tua dimostrazione:
        </label>

        <textarea
          value={userProof}
          onChange={(e) => setUserProof(e.target.value)}
          rows={6}
          disabled={isRevealed}
          placeholder="Esempio: Consideriamo la figura... per il teorema X ne consegue che... Q.E.D."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        />
      </div>

      {!isRevealed ? (
        <div className="flex justify-end">
          <button
            onClick={handleVerify}
            disabled={!userProof.trim()}
            className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/30"
          >
            Verifica Dimostrazione
          </button>
        </div>
      ) : (
        <div className="space-y-6 pt-4 border-t border-slate-800 animate-fade-in">
          
          {/* Official Proof */}
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-6 space-y-3">
            <h4 className="text-xs uppercase font-extrabold text-emerald-400 tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Dimostrazione Ufficiale nel Database:
            </h4>
            <MathRender 
              content={currentTheorem.proof || 'Nessuna dimostrazione memorizzata per questo teorema.'} 
              className="text-slate-200 text-base leading-relaxed" 
            />
          </div>

          {/* User's Proof */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-5 space-y-2">
            <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              La tua dimostrazione:
            </h4>
            <div className="text-slate-200 text-sm whitespace-pre-wrap">
              {userProof}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => setIsRevealed(false)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors"
            >
              Riprova
            </button>
            <button
              onClick={onFinish}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-colors shadow-lg"
            >
              Completa Test
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
