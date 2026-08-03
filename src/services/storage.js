import { INITIAL_DATA } from '../data/initialData';

const STORAGE_KEY = 'geometria_db_v1';

export const getItems = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return INITIAL_DATA;
  }
};

export const addItem = (newItem) => {
  const items = getItems();
  const itemToAdd = {
    ...newItem,
    id: newItem.id || `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    createdAt: new Date().toISOString()
  };
  const updated = [itemToAdd, ...items];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const updateItem = (id, updatedFields) => {
  const items = getItems();
  const updated = items.map(item => item.id === id ? { ...item, ...updatedFields } : item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const deleteItem = (id) => {
  const items = getItems();
  const updated = items.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const resetToDefault = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
};

export const exportDataJSON = () => {
  const items = getItems();
  const jsonStr = JSON.stringify(items, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `geometria_db_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importDataJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (Array.isArray(parsed)) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          resolve(parsed);
        } else {
          reject(new Error('Il file JSON non contiene un array valido di teoremi e definizioni.'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Errore nella lettura del file.'));
    reader.readAsText(file);
  });
};
