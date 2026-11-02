import { useState } from 'react';
import SaveModal from './SaveModal';
import ConfirmModal from './ConfirmModal';
import { calculateInvoice } from '../utils/calculations';
import { formatMoney as $ } from '../utils/format';
import './History.css';

export default function History({ items, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  return (
    <section className="card">
      <h2 className="card__title">Historial de cálculos</h2>
      {!items.length && <div className="empty">Aún no hay cálculos guardados.</div>}
      {items.map((it) => {
        const c = calculateInvoice(it.fijo, it.comisiones, it.rates);
        const cells = [['Ingreso fijo', c.fijo], ['Comisiones (IVA incl.)', c.comisiones], ['Base de factura', c.base], ['Total factura', c.total], ['IVA por pagar', c.ivaPorPagar], ['Ingreso NETO', c.neto]];
        return (
          <article className="history__item" key={it.id}>
            <h3 className="history__name">{it.name}</h3>
            <div className="history__meta">{new Date(it.date).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })}</div>
            <div className="history__values">
              {cells.map(([l, v]) => <div className="history__value" key={l}>{l}<b className="history__amount">{$(v)}</b></div>)}
            </div>
            <div className="history__meta">IVA {it.rates.iva}% · Ret. IVA {it.rates.riva}% · Ret. ISR {it.rates.risr}%</div>
            <div className="btn-row">
              <button className="btn" onClick={() => setEditing(it)}>Editar</button>
              <button className="btn btn--danger" onClick={() => setDeleting(it)}>Eliminar</button>
            </div>
          </article>
        );
      })}
      {editing && <SaveModal title="Editar cálculo" withAmounts initial={editing} onCancel={() => setEditing(null)}
        onAccept={(d) => { onUpdate(editing.id, d); setEditing(null); }} />}
      {deleting && <ConfirmModal title="¿Eliminar cálculo?" text={`Se eliminará "${deleting.name}" del historial.`} onCancel={() => setDeleting(null)}
        onAccept={() => { onDelete(deleting.id); setDeleting(null); }} />}
    </section>
  );
}
