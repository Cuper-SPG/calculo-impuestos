import { useState } from 'react';
import { formatMoney as $ } from '../utils/format';
import './BreakdownTable.css';

const Row = ({ label, value, mod = '', onClick }) => (
  <tr className={`breakdown__row ${mod}`} onClick={onClick}>
    <td className="breakdown__label">{label}</td><td className="breakdown__value">{value}</td>
  </tr>
);

export default function BreakdownTable({ result: c }) {
  const [open, setOpen] = useState(false);
  const r = c.rates;
  return (
    <table className="breakdown">
      <tbody>
        <Row label="Ingreso fijo" value={$(c.fijo)} />
        <Row label={`Comisiones sin IVA (ingreso por comisiones ÷ ${(1 + r.iva / 100).toFixed(2)})`} value={$(c.baseComisiones)} />
        <Row label="BASE de factura" value={$(c.base)} mod="breakdown__row--strong" />
        <Row label={`IVA (${r.iva}%)`} value={$(c.ivaTotal)} />
        <Row label="Suma de retenciones" value={$(-c.retenciones)}
          mod={`breakdown__row--negative breakdown__row--toggle${open ? ' breakdown__row--open' : ''}`} onClick={() => setOpen(!open)} />
        {open && <>
          <Row label={`Retención de IVA (${r.riva}%)`} value={$(-c.retIva)} mod="breakdown__row--negative breakdown__row--child" />
          <Row label={`Retención de ISR (${r.risr}%)`} value={$(-c.retIsr)} mod="breakdown__row--negative breakdown__row--child" />
        </>}
        <Row label="TOTAL FACTURA" value={$(c.total)} mod="breakdown__row--strong" />
      </tbody>
    </table>
  );
}
