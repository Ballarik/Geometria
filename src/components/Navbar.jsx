import React from 'react';
import { BookOpen, GraduationCap, PlusCircle, RotateCcw, Download, Upload, Compass } from 'lucide-react';
import { exportDataJSON, importDataJSON, resetToDefault } from '../services/storage';

export const Navbar = ({ activeTab, setActiveTab, onDataChange }) => {

  const handleReset = () => {
    if (window.confirm('Sei sicuro di voler ripristinare il database ai teoremi e definizioni predefiniti? Le modifiche personali andranno perse.')) {
      const reset = resetToDefault();
      onDataChange(reset);
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (file) {
      importDataJSON(file)
        .then(newItems => {
          onDataChange(newItems);
          alert('Database importato con successo!');
        })
        .catch(err => {
          alert('Errore nell\'importazione del file: ' + err.message);
        });
    }
  };

  return (
    <header className="app-header shadow-lg border-b border-slate-700/60 sticky top-0 z-40 backdrop-blur-md bg-slate-900/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('catalog')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                Geometria<span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">G1-G16</span>
              </h1>
              <p className="text-xs text-slate-400">Teoremi, Definizioni & Test</p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Consultazione</span>
            </button>

            <button
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'wizard'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Nuovo Inserimento</span>
            </button>

            <button
              onClick={() => setActiveTab('test')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'test'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Area Test</span>
            </button>
          </nav>

          {/* Action buttons (Backup/Reset) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={exportDataJSON}
              title="Esporta Database JSON"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
            <label
              title="Importa Database JSON"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
            <button
              onClick={handleReset}
              title="Ripristina Dati di Default"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
