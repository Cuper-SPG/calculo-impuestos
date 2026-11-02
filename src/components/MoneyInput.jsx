import { useState } from 'react';
import { parseAmount, formatMoney } from '../utils/format';
import './MoneyInput.css';

export default function MoneyInput({ id, label, hint, value, onChange, suffix, max }) {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const parsed = parseAmount(value);
  let error = '';
  if (parsed.error) error = parsed.error;
  else if (parsed.empty && touched) error = 'Campo obligatorio.';
  else if (max != null && parsed.value > max) error = `Debe estar entre 0 y ${max}.`;
  const display = !suffix && !focused && parsed.value !== undefined ? formatMoney(parsed.value) : value;

  return (
    <div className="money-input">
      <label className="money-input__label" htmlFor={id}>{label}</label>
      <div className="money-input__wrap">
        <input id={id} inputMode="decimal" autoComplete="off" placeholder={suffix ? '' : '$0.00'} value={display}
          className={`money-input__field${error ? ' money-input__field--invalid' : ''}${suffix ? ' money-input__field--suffix' : ''}`}
          onChange={(e) => { setTouched(true); onChange(e.target.value); }}
          onFocus={(e) => { setFocused(true); if (!suffix && parsed.value !== undefined) onChange(parsed.value.toFixed(2)); e.target.select(); }}
          onBlur={() => { setFocused(false); setTouched(true); }} />
        {suffix && <span className="money-input__suffix">{suffix}</span>}
      </div>
      {hint && <div className="money-input__hint">{hint}</div>}
      <div className="money-input__error">{error}</div>
    </div>
  );
}
