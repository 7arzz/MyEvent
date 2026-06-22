import pako from 'pako';
import { DEFAULT_INVITATION_DATA } from '../data';

// Helper to deeply remove properties that match default values
const pruneDefaults = (data, defaults) => {
  const pruned = {};
  for (const key in data) {
    if (Array.isArray(data[key])) {
      // For arrays (like agenda), we still keep them but check content
      // Actually, for simplicity we keep arrays as is if they are different from defaults
      if (JSON.stringify(data[key]) !== JSON.stringify(defaults[key])) {
        pruned[key] = data[key];
      }
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      const subPruned = pruneDefaults(data[key], defaults[key] || {});
      if (Object.keys(subPruned).length > 0) {
        pruned[key] = subPruned;
      }
    } else {
      if (data[key] !== defaults[key]) {
        pruned[key] = data[key];
      }
    }
  }
  return pruned;
};

// Helper to merge pruned data back with defaults
const mergeDefaults = (data, defaults) => {
  const merged = { ...defaults };
  for (const key in data) {
    if (Array.isArray(data[key])) {
      merged[key] = data[key];
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      merged[key] = mergeDefaults(data[key], defaults[key] || {});
    } else {
      merged[key] = data[key];
    }
  }
  return merged;
};

// Agenda as array of arrays: [time, title, desc]
const compactAgenda = (agenda) => agenda.map(item => [item.time, item.title, item.description]);
const expandAgenda = (compact) => compact.map(item => ({ time: item[0], title: item[1], description: item[2] }));

const KEY_MAP = {
  hero: 'h',
  title: 't',
  subtitle: 's',
  imageUrl: 'i',
  event: 'e',
  day: 'd',
  date: 'dt',
  time: 'tm',
  locationName: 'ln',
  targetDate: 'td',
  agenda: 'a',
  location: 'l',
  address: 'ad',
  mapUrl: 'mu',
  embedUrl: 'eu',
  contact: 'c',
  email: 'em',
  phone: 'ph',
  instagram: 'ig',
  facebook: 'fb'
};

const REVERSE_MAP = Object.fromEntries(Object.entries(KEY_MAP).map(([k, v]) => [v, k]));

const transformKeys = (obj, map) => {
  if (Array.isArray(obj)) return obj.map(item => transformKeys(item, map));
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [map[k] || k, transformKeys(v, map)]));
  }
  return obj;
};

export const encodeData = (data) => {
  try {
    // 1. Prune values that are same as defaults
    let processedData = pruneDefaults(data, DEFAULT_INVITATION_DATA);
    
    // 2. Compact agenda if present
    if (processedData.agenda) {
      processedData.agenda = compactAgenda(processedData.agenda);
    }

    // 3. Transform keys
    const shortData = transformKeys(processedData, KEY_MAP);
    
    // 4. Compress
    const jsonString = JSON.stringify(shortData);
    const compressed = pako.deflate(jsonString);
    
    // 5. Binary to string
    let binary = '';
    for (let i = 0; i < compressed.byteLength; i++) binary += String.fromCharCode(compressed[i]);
    
    // 6. Base64
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch (error) {
    return null;
  }
};

export const decodeData = (encodedData) => {
  try {
    let base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    
    const decompressed = pako.inflate(bytes, { to: 'string' });
    const shortData = JSON.parse(decompressed);
    
    // 1. Reverse keys
    let processedData = transformKeys(shortData, REVERSE_MAP);
    
    // 2. Expand agenda
    if (processedData.agenda) {
      processedData.agenda = expandAgenda(processedData.agenda);
    }
    
    // 3. Merge with defaults
    return mergeDefaults(processedData, DEFAULT_INVITATION_DATA);
  } catch (error) {
    return null;
  }
};

