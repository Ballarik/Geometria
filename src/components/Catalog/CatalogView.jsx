import React, { useState, useMemo } from 'react';
import { CHAPTERS } from '../../data/chapters';
import { MathRender } from '../MathRender';
import { Search, Filter, BookOpen, ScrollText, Trash2, Eye, ExternalLink, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';

export const CatalogView = ({ items, onDeleteItem, onOpenWizard }) => {

  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'theorem' | 'definition'
  const [chapterFilter, setChapterFilter] = useState('all'); // 'all' | 'G1' | 'G2' ... 'G16'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // Filter logic
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // Filter by type
      if (typeFilter === 'theorem' && item.type !== 'theorem') return false;
      if (typeFilter === 'definition' && item.type !== 'definition') return false;

      // Filter by chapter
      if (chapterFilter !== 'all' && item.chapter !== chapterFilter) return false;

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name?.toLowerCase().includes(query);
        const matchesContent = item.content?.toLowerCase().includes(query);
        const matchesProof = item.proof?.toLowerCase().includes(query);
        if (!matchesName && !matchesContent && !matchesProof) return false;
      }

      return true;
    });
  }, [items, typeFilter, chapterFilter, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" /> Sezione Guardare & Consultazione
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Archivio Teoremi e Definizioni
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Esplora, ricerca e filtra i concetti di geometria euclidea e analitica organizzati nei capitoli da G1 a G16.
            </p>
          </div>
          <button
            onClick={onOpenWizard}
            className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Nuovo Inserimento (4 Passaggi)</span>
          </button>
        </div>
      </div>

      {/* Control Panel: Filters & Search */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca per nome, enunciato o dimostrazione..."
              className="w-full pl-11 pr-4 py-2.5 bg-slate-800 border border-slate-700/80 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Annulla
              </button>
            )}
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tutti ({items.length})
            </button>
            <button
              onClick={() => setTypeFilter('theorem')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'theorem'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ScrollText className="w-3.5 h-3.5" />
              <span>Teoremi ({items.filter(i => i.type === 'theorem').length})</span>
            </button>
            <button
              onClick={() => setTypeFilter('definition')}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                typeFilter === 'definition'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Definizioni ({items.filter(i => i.type === 'definition').length})</span>
            </button>
          </div>

        </div>

        {/* Chapter Filter Chips (G1 to G16) */}
        <div className="pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-2 mb-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Filtra per Capitolo:</span>
          </div>
          
          <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
            <button
              onClick={() => setChapterFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                chapterFilter === 'all'
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 font-bold'
                  : 'bg-slate-800 text-slate-400 border border-slate-700/60 hover:text-slate-200'
              }`}
            >
              Tutti i Capitoli
            </button>

            {CHAPTERS.map(ch => {
              const count = items.filter(i => i.chapter === ch.id).length;
              return (
                <button
                  key={ch.id}
                  onClick={() => setChapterFilter(ch.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                    chapterFilter === ch.id
                      ? 'bg-indigo-500/30 text-indigo-300 border border-indigo-400/60 font-bold shadow-sm'
                      : 'bg-slate-800/80 text-slate-400 border border-slate-700/50 hover:bg-slate-700/80 hover:text-slate-200'
                  }`}
                  title={ch.title}
                >
                  <span>{ch.id}</span>
                  {count > 0 && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-900 text-slate-300">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Grid of Items */}
      {filteredItems.length === 0 ? (
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Nessun elemento trovato</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Prova a modificare i filtri di ricerca o aggiungi un nuovo teorema/definizione dal menù dedicato.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => {
            const isTheorem = item.type === 'theorem';
            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all hover:shadow-indigo-500/5 group"
              >
                <div>
                  {/* Badges & Actions Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 ${
                        isTheorem 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {isTheorem ? <ScrollText className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                        {isTheorem ? 'Teorema' : 'Definizione'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-indigo-300 text-xs font-mono font-bold">
                        {item.chapter}
                      </span>
                    </div>

                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-slate-800"
                      title="Elimina"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors mb-3">
                    {item.name}
                  </h3>

                  {/* Text Content */}
                  <div className="text-slate-300 text-sm line-clamp-4 mb-4">
                    <MathRender content={item.content} />
                  </div>

                  {/* Optional Image Thumbnail indicator */}
                  {item.images && item.images.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-emerald-400 mb-3 bg-emerald-950/30 border border-emerald-800/30 px-2.5 py-1 rounded-lg w-max">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>{item.images.length} Immagine/i allegata/e</span>
                    </div>
                  )}
                </div>

                {/* Footer View Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-mono">
                    {isTheorem && item.proof ? 'Contiene Dimostrazione' : 'Formato Euclideo'}
                  </span>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="flex items-center space-x-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Dettagli</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="bg-slate-800/90 px-6 py-4 border-b border-slate-700/60 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  selectedItem.type === 'theorem' 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}>
                  {selectedItem.type === 'theorem' ? <ScrollText className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                  {selectedItem.type === 'theorem' ? 'Teorema' : 'Definizione'}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-indigo-900/40 text-indigo-300 text-xs font-mono font-bold border border-indigo-700/40">
                  Capitolo {selectedItem.chapter}
                </span>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-white text-xl font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div>
                <h2 className="text-2xl font-extrabold text-white mb-4">
                  {selectedItem.name}
                </h2>
                
                <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-5">
                  <h4 className="text-xs uppercase font-bold text-indigo-400 tracking-wider mb-2">
                    {selectedItem.type === 'theorem' ? 'Enunciato del Teorema' : 'Testo della Definizione'}
                  </h4>
                  <MathRender content={selectedItem.content} className="text-slate-200 text-base leading-relaxed" />
                </div>
              </div>

              {/* Theorem Proof */}
              {selectedItem.type === 'theorem' && selectedItem.proof && (
                <div className="bg-purple-950/20 border border-purple-800/40 rounded-xl p-5 space-y-2">
                  <h4 className="text-xs uppercase font-bold text-purple-400 tracking-wider flex items-center gap-1.5">
                    <ScrollText className="w-4 h-4" /> Dimostrazione
                  </h4>
                  <MathRender content={selectedItem.proof} className="text-slate-200 text-sm leading-relaxed" />
                </div>
              )}

              {/* Images gallery */}
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4" /> Figura / Illustrazione Geometrica
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedItem.images.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800">
                        <img src={img} alt={`Illustrazione ${idx+1}`} className="w-full h-auto object-contain max-h-72" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-800/90 px-6 py-4 border-t border-slate-700/60 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
              >
                Chiudi
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
