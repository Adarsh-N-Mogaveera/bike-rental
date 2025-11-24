// lib/utils.js
export const genId = (prefix = '') => {
  const s = Math.random().toString(36).slice(2, 8).toUpperCase();
  return (prefix || '') + s;
};

// compute hours (integer). If you want minutes, adjust accordingly.
export const computeHours = (startIso, endIso) => {
  const start = new Date(startIso);
  const end = new Date(endIso);
  const diffMs = end - start;
  const hours = Math.ceil(diffMs / (1000 * 60 * 60)); // round up to next hour
  return Math.max(1, hours);
};
