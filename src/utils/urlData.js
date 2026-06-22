// src/utils/urlData.js
export const encodeData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    // Encode to base64 with unicode support
    return btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
    }));
  } catch (error) {
    console.error("Encoding error:", error);
    return null;
  }
};

export const decodeData = (encodedData) => {
  try {
    // Decode from base64 with unicode support
    const jsonString = decodeURIComponent(atob(encodedData).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Decoding error:", error);
    return null;
  }
};
