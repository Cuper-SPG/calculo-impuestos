import { useMemo, useState } from 'react';
import MoneyInput from './MoneyInput';
import BreakdownTable from './BreakdownTable';
import NetIncome from './NetIncome';
import SaveModal from './SaveModal';
import { calculateInvoice } from '../utils/calculations';
import { parseAmount } from '../utils/format';
import './Calculator.css';

export default function Calculator({ form, setForm, rates, onSave }) {
  const [saving, setSaving] = useState(false);
  const f = parseAmount(form.fijo), c = parseAmount(form.com);
  const result = useMemo(
    () => (f.value !== undefined && c.value !== undefined ? calculateInvoice(f.value, c.value, rates) : null),
    [f.value, c.value, rates]
  );

  return (
    <section className="calculator">
      <div className="card">
        <div className="calculator__inputs">
          <MoneyInput id="fijo" label="Ingreso fijo" hint="Ejemplo: 15000.00 (sin IVA)" value={form.fijo} onChange={(v) => setForm({ ...form, fijo: v })} />
          <MoneyInput id="com" label="Ingreso por comisiones (IVA incluido)" hint="Ejemplo: 11600.00 (ya incluye el IVA)" value={form.com} onChange={(v) => setForm({ ...form, com: v })} />
        </div>
        <div className="btn-row"><button className="btn" onClick={() => setForm({ fijo: '', com: '' })}>Limpiar</button></div>
      </div>

      {!result ? (
        <div className="card"><div className="empty">Ingresa ambos montos para ver el desglose.</div></div>
      ) : (
        <>
          <div className="card"><h2 className="card__title">Desglose de la factura</h2><BreakdownTable result={result} /></div>
          <div className="card"><h2 className="card__title">Ingreso neto</h2><NetIncome result={result} /></div>
          <button className="btn btn--primary" onClick={() => setSaving(true)}>Guardar cálculo</button>
        </>
      )}

      {saving && (
        <SaveModal title="¿Cómo deseas que se guarde?" initial={{}} onCancel={() => setSaving(false)}
          onAccept={({ name }) => { onSave({ name, fijo: result.fijo, comisiones: result.comisiones }); setSaving(false); }} />
      )}
    </section>
  );
}
