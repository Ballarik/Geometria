import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CatalogView } from './components/Catalog/CatalogView';
import { WizardModal } from './components/Wizard/WizardModal';
import { TestCenter } from './components/Test/TestCenter';
import { getItems, addItem, deleteItem } from './services/storage';

export function App() {
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'test' | 'wizard'
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Load items on mount
  useEffect(() => {
    const loaded = getItems();
    setItems(loaded);
  }, []);

  const handleDataChange = (newItems) => {
    setItems(newItems);
  };

  const handleSaveNewItem = (newItem) => {
    const updated = addItem(newItem);
    setItems(updated);
    setActiveTab('catalog');
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questo elemento dal database?')) {
      const updated = deleteItem(id);
      setItems(updated);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white pb-16">
      
      {/* Navigation Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          if (tab === 'wizard') {
            setIsWizardOpen(true);
          } else {
            setActiveTab(tab);
          }
        }} 
        onDataChange={handleDataChange} 
      />

      {/* Main Content View */}
      <main className="max-w-7xl mx-auto">
        {activeTab === 'catalog' && (
          <CatalogView 
            items={items} 
            onDeleteItem={handleDeleteItem} 
            onOpenWizard={() => setIsWizardOpen(true)} 
          />
        )}

        {activeTab === 'test' && (
          <TestCenter items={items} />
        )}
      </main>

      {/* 4-Step Creation Wizard Modal */}
      <WizardModal 
        isOpen={isWizardOpen || activeTab === 'wizard'} 
        onClose={() => {
          setIsWizardOpen(false);
          if (activeTab === 'wizard') setActiveTab('catalog');
        }} 
        onSave={handleSaveNewItem} 
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>Geometria Euclidea & Analitica (Capitoli G1-G16) • Teoremi, Definizioni e Test</p>
      </footer>

    </div>
  );
}

export default App;
