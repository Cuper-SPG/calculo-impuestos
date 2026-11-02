import { formatMoney as $ } from '../utils/format';
import './NetIncome.css';
export default function NetIncome({ result: c }) {
  return (
    <>
      <table className="breakdown"><tbody>
        <tr className="breakdown__row"><td className="breakdown__label">Total factura</td><td className="breakdown__value">{$(c.total)}</td></tr>
        <tr className="breakdown__row breakdown__row--negative"><td className="breakdown__label">− IVA por pagar (IVA − retención de IVA)</td><td className="breakdown__value">{$(-c.ivaPorPagar)}</td></tr>
      </tbody></table>
      <div className="net-income"><span className="net-income__label">Ingreso NETO</span><strong className="net-income__value">{$(c.neto)}</strong></div>
    </>
  );
}
