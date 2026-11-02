import { useState } from 'react';
import Tabs from './components/Tabs';
import Calculator from './components/Calculator';
import History from './components/History';
import TaxSettings from './components/TaxSettings';
import { useLocalStorage } from './hooks/useLocalStorage';
import { DEFAULT_RATES } from './constants/rates';
import './App.css';

const TABS = [{ id: 'calc', label: 'Calculadora' }, { id: 'hist', label: 'Historial' }, { id: 'tax', label: 'Impuestos' }];

export default function App() {
  const [tab, setTab] = useState('calc');
  const [rates, setRates] = useLocalStorage('imp_rates', DEFAULT_RATES);
  const [history, setHistory] = useLocalStorage('imp_hist', []);
  const [form, setForm] = useState({ fijo: '', com: '' });

  const save = (d) => setHistory([{ id: crypto.randomUUID(), date: new Date().toISOString(), rates: { ...rates }, ...d }, ...history]);
  const update = (id, d) => setHistory(history.map((h) => (h.id === id ? { ...h, ...d } : h)));
  const remove = (id) => setHistory(history.filter((h) => h.id !== id));

  return (
    <main className="app">
      <header className="app__header">
        <h1 className="app__title">Cálculo de impuestos Factura x comisiones</h1>
        <p className="app__subtitle">Calcula la factura, retenciones, IVA por pagar e ingreso neto.</p>
      </header>
      <Tabs items={TABS} active={tab} onChange={setTab} />
      {tab === 'calc' && <Calculator form={form} setForm={setForm} rates={rates} onSave={(d) => { save(d); setTab('hist'); }} />}
      {tab === 'hist' && <History items={history} onUpdate={update} onDelete={remove} />}
      {tab === 'tax' && <TaxSettings rates={rates} setRates={setRates} />}
    </main>
  );
}
