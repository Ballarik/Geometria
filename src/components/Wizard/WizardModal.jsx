import React, { useState } from 'react';
import { CHAPTERS } from '../../data/chapters';
import { MathRender } from '../MathRender';
import { ArrowLeft, ArrowRight, Check, Image as ImageIcon, Sparkles, BookOpen, ScrollText, AlertCircle, Trash2 } from 'lucide-react';

const SYMBOL_CHIPS = [
  { label: 'α', value: '\\alpha' },
  { label: 'β', value: '\\beta' },
  { label: 'γ', value: '\\gamma' },
  { label: 'π', value: '\\pi' },
  { label: '≅', value: '\\cong' },
  { label: '∥', value: '\\parallel' },
  { label: '⊥', value: '\\perp' },
  { label: '√x', value: '\\sqrt{x}' },
  { label: 'x²', value: 'x^2' },
  { label: 'a/b', value: '\\frac{a}{b}' },
  { label: '△', value: '\\triangle' },
  { label: '∠', value: '\\angle' },
  { label: '180°', value: '180^\\circ' },
  { label: '≠', value: '\\neq' }
];

export const WizardModal = ({ isOpen, onClose, onSave }) => {

  const [step, setStep] = useState(1);
  const [type, setType] = useState('definition'); // 'definition' | 'theorem'
  const [chapter, setChapter] = useState('G1');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [proof, setProof] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const resetForm = () => {
    setStep(1);
    setType('definition');
    setChapter('G1');
    setName('');
    setContent('');
    setProof('');
    setImageUrl('');
    setImages([]);
    setErrorMsg('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const insertSymbol = (symbol, fieldSetter, currentVal) => {
    fieldSetter(currentVal + ' $' + symbol + '$ ');
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;
    setImages([...images, imageUrl.trim()]);
    setImageUrl('');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages([...images, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  // Validation per step
  const canProceedFromStep1 = true; // type chosen by default
  const canProceedFromStep2 = name.trim().length > 0;
  const canProceedFromStep3 = content.trim().length > 0;

  const handleNextStep = () => {
    setErrorMsg('');
    if (step === 2 && !canProceedFromStep2) {
      setErrorMsg(type === 'definition' 
        ? 'Inserisci il nome dell\'oggetto da definire.' 
        : 'Inserisci il nome del teorema.');
      return;
    }
    if (step === 3 && !canProceedFromStep3) {
      setErrorMsg('Inserisci il testo o l\'enunciato.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setErrorMsg('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Check required fields
    if (!name.trim()) {
      setErrorMsg('Il nome è obbligatorio.');
      setStep(2);
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Il testo/enunciato è obbligatorio.');
      setStep(3);
      return;
    }
    if (type === 'theorem' && !proof.trim()) {
      setErrorMsg('La dimostrazione è obbligatoria per i teoremi.');
      return;
    }

    const newItem = {
      type,
      chapter,
      name: name.trim(),
      content: content.trim(),
      proof: type === 'theorem' ? proof.trim() : '',
      images
    };

    onSave(newItem);
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700/60 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              {step}/4
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Nuovo Inserimento <Sparkles className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400">
                {step === 1 && 'Passo 1: Scegli il tipo di contenuto'}
                {step === 2 && 'Passo 2: Capitolo e Titolo'}
                {step === 3 && 'Passo 3: Testo ed Enunciato'}
                {step === 4 && 'Passo 4: Immagini e Dimostrazione'}
              </p>
            </div>
          </div>
          <button 
            onClick={handleClose} 
            className="text-slate-400 hover:text-white text-xl font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-500/15 border border-rose-500/30 rounded-xl text-rose-300 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* STEP 1: Teorema o Definizione */}
          {step === 1 && (
            <div className="space-y-4 py-4">
              <h3 className="text-center text-slate-300 font-medium mb-6">
                Cosa desideri inserire nel database?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setType('definition')}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center space-y-3 transition-all duration-200 ${
                    type === 'definition'
                      ? 'border-indigo-500 bg-indigo-500/10 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]'
                      : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <div className={`p-4 rounded-xl ${type === 'definition' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">Definizione</span>
                  <p className="text-xs text-center text-slate-400">
                    Definisci un concetto geometrico o un oggetto (es. Angolo Adiacente, Triangolo Isoscele).
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setType('theorem')}
                  className={`p-6 rounded-2xl border-2 flex flex-col items-center justify-center space-y-3 transition-all duration-200 ${
                    type === 'theorem'
                      ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg shadow-purple-500/20 scale-[1.02]'
                      : 'border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                  }`}
                >
                  <div className={`p-4 rounded-xl ${type === 'theorem' ? 'bg-purple-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                    <ScrollText className="w-8 h-8" />
                  </div>
                  <span className="font-bold text-lg">Teorema</span>
                  <p className="text-xs text-center text-slate-400">
                    Inserisci una proposizione con enunciato e relativa dimostrazione (es. Teorema di Pitagora).
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Capitolo e Titolo/Nome */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Seleziona il Capitolo (da G1 a G16)
                </label>
                <select
                  value={chapter}
                  onChange={(e) => setChapter(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {CHAPTERS.map(ch => (
                    <option key={ch.id} value={ch.id}>
                      {ch.title} - {ch.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  {type === 'definition' ? 'Nome dell\'oggetto da definire' : 'Nome del teorema'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={type === 'definition' ? 'Es. Parallelogramma, Raggio, Angolo Retto...' : 'Es. Teorema di Pitagora, Teorema di Talete...'}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
              </div>

              <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Suggerimento:</span> Usa nomi chiari e riconoscibili per facilitare la ricerca nei filtri e le sessioni di test.
              </div>
            </div>
          )}

          {/* STEP 3: Testo / Enunciato */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-300">
                  {type === 'definition' ? 'Testo della Definizione' : 'Enunciato del Teorema'}
                </label>
                <span className="text-xs text-slate-400">Puoi usare formula LaTeX tra $...$</span>
              </div>

              {/* Quick Math Symbols */}
              <div className="flex flex-wrap gap-1.5 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                <span className="text-xs text-slate-400 self-center mr-1">Simboli rapidi:</span>
                {SYMBOL_CHIPS.map((sym, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertSymbol(sym.value, setContent, content)}
                    className="px-2 py-1 text-xs bg-slate-700 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg transition-colors font-mono"
                  >
                    {sym.label}
                  </button>
                ))}
              </div>

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder={type === 'definition' 
                  ? 'Inserisci qui la spiegazione dettagliata del concetto...' 
                  : 'Inserisci qui l\'enunciato del teorema (es. In ogni triangolo rettangolo, l\'area del quadrato...)'}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-sans"
              />

              {/* Live Preview */}
              {content.trim() && (
                <div className="bg-slate-800/80 border border-slate-700/80 p-4 rounded-xl">
                  <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider block mb-2">Anteprima Renderizzata:</span>
                  <MathRender content={content} className="text-slate-200 text-sm" />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Immagini e Dimostrazione */}
          {step === 4 && (
            <div className="space-y-5">
              
              {/* If Theorem: Proof input is required */}
              {type === 'theorem' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-purple-300 flex items-center gap-1.5">
                      <ScrollText className="w-4 h-4" /> Dimostrazione del Teorema (Obbligatoria)
                    </label>
                  </div>

                  {/* Symbols helper for proof */}
                  <div className="flex flex-wrap gap-1.5 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-xs text-slate-400 self-center mr-1">Simboli rapidi:</span>
                    {SYMBOL_CHIPS.map((sym, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => insertSymbol(sym.value, setProof, proof)}
                        className="px-2 py-1 text-xs bg-slate-700 hover:bg-purple-600 text-slate-200 hover:text-white rounded-lg transition-colors font-mono"
                      >
                        {sym.label}
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={proof}
                    onChange={(e) => setProof(e.target.value)}
                    rows={4}
                    placeholder="Scrivi i passaggi logici della dimostrazione..."
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
                  />

                  {proof.trim() && (
                    <div className="bg-purple-950/30 border border-purple-800/40 p-4 rounded-xl">
                      <span className="text-xs uppercase font-bold text-purple-400 tracking-wider block mb-1">Anteprima Dimostrazione:</span>
                      <MathRender content={proof} className="text-slate-200 text-sm" />
                    </div>
                  )}
                </div>
              )}

              {/* Optional Images */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <label className="block text-sm font-semibold text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-400" /> Aggiunta Immagini (Facoltativo)
                </label>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Incolla URL immagine (es. https://...)"
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Aggiungi URL
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">oppure carica dal tuo dispositivo:</span>
                  <label className="cursor-pointer text-xs font-semibold px-3 py-1.5 bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600/50 border border-indigo-500/30 rounded-lg transition-colors">
                    Sfoglia File...
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>

                {/* List of uploaded images */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-800 aspect-video">
                        <img src={img} alt={`Immagine ${idx+1}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 bg-rose-600/90 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="bg-slate-800/90 px-6 py-4 border-t border-slate-700/60 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Indietro</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-600/30"
            >
              <span>Avanti</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-600/30"
            >
              <Check className="w-4 h-4" />
              <span>Salva nel Database</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
