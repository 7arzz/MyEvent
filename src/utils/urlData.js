// src/utils/urlData.js
import pako from 'pako';

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
  description: 'ds',
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

const REVERSE_MAP = Object.fromEntries(
  Object.entries(KEY_MAP).map(([k, v]) => [v, k])
);

const transformKeys = (obj, map) => {
  if (Array.isArray(obj)) {
    return obj.map(item => transformKeys(item, map));
  }
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [
        map[k] || k,
        transformKeys(v, map)
      ])
    );
  }
  return obj;
};

export const encodeData = (data) => {
  try {
    // 1. Transform keys to shorter versions
    const shortData = transformKeys(data, KEY_MAP);
    
    // 2. Stringify
    const jsonString = JSON.stringify(shortData);
    
    // 3. Compress using pako
    const compressed = pako.deflate(jsonString);
    
    // 4. Convert Uint8Array to binary string
    let binary = '';
    const len = compressed.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(compressed[i]);
    }
    
    // 5. Encode to base64 and make it URL safe
    return btoa(binary)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
};

export const decodeData = (encodedData) => {
  try {
    // 1. Restore base64 characters and padding
    let base64 = encodedData
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // 2. Decode base64 to binary string
    const binary = atob(base64);
    
    // 3. Convert binary string to Uint8Array
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    
    // 4. Decompress using pako
    const decompressed = pako.inflate(bytes, { to: 'string' });
    
    // 5. Parse JSON
    const shortData = JSON.parse(decompressed);
    
    // 6. Transform keys back to original
    return transformKeys(shortData, REVERSE_MAP);
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};
