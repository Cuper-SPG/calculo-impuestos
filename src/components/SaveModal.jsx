import { useState } from 'react';
import Modal from './Modal';
import MoneyInput from './MoneyInput';
import { parseAmount } from '../utils/format';

/** Guardar (solo nombre) o editar (nombre + montos). */
export default function SaveModal({ title, initial, withAmounts, onAccept, onCancel }) {
  const [name, setName] = useState(initial.name || '');
  const [fijo, setFijo] = useState(initial.fijo ?? '');
  const [com, setCom] = useState(initial.comisiones ?? '');
  const [error, setError] = useState('');

  const accept = () => {
    const n = name.trim();
    if (!n) return setError('Escribe un nombre (máx. 20 caracteres).');
    if (!withAmounts) return onAccept({ name: n });
    const f = parseAmount(fijo), c = parseAmount(com);
    if (f.value === undefined || c.value === undefined) return setError('Ingresa montos numéricos válidos.');
    onAccept({ name: n, fijo: f.value, comisiones: c.value });
  };

  return (
    <Modal title={title} onClose={onCancel}>
      <label className="money-input__label" htmlFor="save-name">Nombre</label>
      <input id="save-name" className="money-input__field" maxLength={20} autoFocus value={name}
        placeholder="Ej. Factura noviembre" onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && accept()} />
      <div className="modal__count">{name.length}/20</div>
      {withAmounts && (
        <div className="modal__grid">
          <MoneyInput id="edit-fijo" label="Ingreso fijo" value={String(fijo)} onChange={setFijo} />
          <MoneyInput id="edit-com" label="Comisiones (IVA incl.)" value={String(com)} onChange={setCom} />
        </div>
      )}
      <div className="modal__error">{error}</div>
      <div className="btn-row btn-row--end">
        <button className="btn" onClick={onCancel}>Cancelar</button>
        <button className="btn btn--primary" onClick={accept}>Aceptar</button>
      </div>
    </Modal>
  );
}
