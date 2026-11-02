export function calculateInvoice(fijo, comisiones, rates) {
  const iva = rates.iva / 100;
  const baseComisiones = comisiones / (1 + iva);
  const base = fijo + baseComisiones;
  const ivaTotal = base * iva;
  const retIva = (base * rates.riva) / 100;
  const retIsr = (base * rates.risr) / 100;
  const retenciones = retIva + retIsr;
  const total = base + ivaTotal - retenciones;
  const ivaPorPagar = ivaTotal - retIva;
  return { fijo, comisiones, baseComisiones, base, ivaTotal, retIva, retIsr, retenciones, total, ivaPorPagar, neto: total - ivaPorPagar, rates };
}
