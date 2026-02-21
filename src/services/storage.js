const STORAGE_KEY = 'vendor_shortlists';
const MAX_SHORTLISTS = 5;

export const saveShortlist = (shortlist) => {
  try {
    const existing = getShortlists();
    
    // Add new shortlist at the beginning
    const updated = [shortlist, ...existing];
    
    // Keep only last 5
    const trimmed = updated.slice(0, MAX_SHORTLISTS);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    return true;
  } catch (error) {
    console.error('Error saving shortlist:', error);
    return false;
  }
};

export const getShortlists = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading shortlists:', error);
    return [];
  }
};

export const deleteShortlist = (id) => {
  try {
    const existing = getShortlists();
    const filtered = existing.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error deleting shortlist:', error);
    return false;
  }
};
