import { useState, useEffect } from 'react';
import MoneyInput from './MoneyInput';
import { DEFAULT_RATES, RATE_LABELS } from '../constants/rates';
import { parseAmount } from '../utils/format';
import './TaxSettings.css';

export default function TaxSettings({ rates, setRates }) {
  const change = (key, raw) => {
    const p = parseAmount(raw);
    if (p.value !== undefined && p.value <= 100) setRates({ ...rates, [key]: p.value });
  };
  return (
    <section className="card tax-settings">
      <div className="tax-settings__grid">
        {Object.keys(RATE_LABELS).map((k) => (
          <RateField key={k} id={`rate-${k}`} label={RATE_LABELS[k]} value={rates[k]} onValid={(v) => change(k, v)} />
        ))}
      </div>
      <div className="btn-row"><button className="btn" onClick={() => setRates({ ...DEFAULT_RATES })}>Restablecer valores iniciales</button></div>
      <p className="note">Los cambios se aplican de inmediato. Rango permitido: 0 a 100 %. Los cálculos guardados conservan los porcentajes con que se hicieron.</p>
    </section>
  );
}

function RateField({ id, label, value, onValid }) {
  const [raw, setRaw] = useState(String(value));
  useEffect(() => { if (parseAmount(raw).value !== value) setRaw(String(value)); }, [value]); // eslint-disable-line
  return <MoneyInput id={id} label={label} suffix="%" max={100} value={raw} onChange={(v) => { setRaw(v); onValid(v); }} />;
}
