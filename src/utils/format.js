export const formatMoney = (n) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n);

/** Devuelve { empty } | { error } | { value } */
export function parseAmount(raw) {
  const v = String(raw).trim().replace(/[$,\s]/g, '');
  if (v === '') return { empty: true };
  if (!/^\d*\.?\d+$|^\d+\.$/.test(v)) return { error: 'Ingresa solo números (ej. 1500.50).' };
  return { value: parseFloat(v) };
}
