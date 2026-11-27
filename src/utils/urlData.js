import pako from 'pako';
import { DEFAULT_INVITATION_DATA } from '../data';

// Helper to deeply remove properties that match default values
const pruneDefaults = (data, defaults) => {
  const pruned = {};
  let hasChange = false;
  for (const key in data) {
    if (Array.isArray(data[key])) {
      if (JSON.stringify(data[key]) !== JSON.stringify(defaults[key])) {
        pruned[key] = data[key];
        hasChange = true;
      }
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      const subPruned = pruneDefaults(data[key], defaults[key] || {});
      if (Object.keys(subPruned).length > 0) {
        pruned[key] = subPruned;
        hasChange = true;
      }
    } else {
      if (data[key] !== defaults[key] && data[key] !== "" && data[key] !== null) {
        pruned[key] = data[key];
        hasChange = true;
      }
    }
  }
  return pruned;
};

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

const compactAgenda = (agenda) => agenda.map(item => [item.time, item.title, item.description]);
const expandAgenda = (compact) => compact.map(item => ({ time: item[0], title: item[1], description: item[2] }));

const KEY_MAP = {
  hero: 'h', title: 't', subtitle: 's',
  event: 'e', day: 'd', date: 'dt', time: 'tm', locationName: 'ln',
  targetDate: 'td', agenda: 'a',
  location: 'l', address: 'ad', mapUrl: 'mu', embedUrl: 'eu',
  contact: 'c', email: 'em', phone: 'ph', instagram: 'ig', facebook: 'fb',
  autoUpdateDate: 'aud'
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
    let processedData = pruneDefaults(data, DEFAULT_INVITATION_DATA);
    delete processedData.autoUpdateDate;
    // Always preserve explicit event date & countdown fields so links never drift on future days
    if (data.targetDate) processedData.targetDate = data.targetDate;
    if (data.event?.day || data.event?.date) {
      processedData.event = {
        ...(processedData.event || {}),
        day: data.event.day,
        date: data.event.date,
      };
    }

    if (processedData.agenda) processedData.agenda = compactAgenda(processedData.agenda);
    
    // Date optimization: strip trailing ':00' seconds only (keep HH:mm intact)
    if (processedData.targetDate) {
      processedData.targetDate = processedData.targetDate
        .replace(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):00$/, '$1 $2')
        .replace('T', ' ');
    }

    const shortData = transformKeys(processedData, KEY_MAP);
    const jsonString = JSON.stringify(shortData);
    
    // Choose between compressed and raw (whichever is smaller)
    // For very small strings, headers of deflate actually make it longer
    const compressed = pako.deflate(jsonString, { level: 9 });
    
    let binary = '';
    // Prefix with 'z' if compressed, 'r' if raw
    if (compressed.length < jsonString.length) {
      for (let i = 0; i < compressed.byteLength; i++) binary += String.fromCharCode(compressed[i]);
      return 'z' + btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } else {
      // Use URI-friendly encoding for raw JSON
      return 'r' + btoa(unescape(encodeURIComponent(jsonString))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
  } catch (error) {
    return null;
  }
};

export const decodeData = (encodedData) => {
  try {
    const type = encodedData[0];
    const data = encodedData.substring(1);
    let base64 = data.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    
    let jsonString;
    if (type === 'z') {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      jsonString = pako.inflate(bytes, { to: 'string' });
    } else {
      jsonString = decodeURIComponent(escape(atob(base64)));
    }
    
    const shortData = JSON.parse(jsonString);
    let processedData = transformKeys(shortData, REVERSE_MAP);
    
    if (processedData.agenda) processedData.agenda = expandAgenda(processedData.agenda);
    // Restore ISO datetime format accurately
    if (processedData.targetDate && processedData.targetDate.includes(' ')) {
      processedData.targetDate = processedData.targetDate.replace(' ', 'T');
      if (/^\d{4}-\d{2}-\d{2}T\d{2}$/.test(processedData.targetDate)) {
        processedData.targetDate += ':00';
      }
    }

    return mergeDefaults(processedData, DEFAULT_INVITATION_DATA);
  } catch (error) {
    return null;
  }
};


