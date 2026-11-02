# Cálculo de impuestos Factura x comisiones

Aplicación web en React (Vite) que calcula la base de factura, IVA, retenciones, total de factura, IVA por pagar e ingreso neto a partir de un ingreso fijo y un ingreso por comisiones (IVA incluido). Incluye porcentajes configurables, historial de cálculos (guardar, editar y eliminar) y modo claro/oscuro.

## Cómo ejecutarla

```bash
npm install
npm run dev      # desarrollo
npm run build    # producción (carpeta dist/)
```

## Estructura

```
├── public/                  Archivos estáticos (favicon)
├── index.html               Punto de entrada de Vite
└── src/
    ├── assets/              Imágenes e íconos
    ├── fonts/               Fuentes y @font-face (fonts.css)
    ├── styles/              Variables de color (paleta) y estilos base
    ├── constants/           Porcentajes iniciales y etiquetas
    ├── hooks/               useLocalStorage (persistencia)
    ├── utils/               calculations.js (fórmulas) y format.js (moneda y validación)
    ├── components/          Un componente + su CSS por carpeta lógica:
    │   ├── Tabs             Navegación Calculadora / Historial / Impuestos
    │   ├── Calculator       Formulario y resultados
    │   ├── MoneyInput       Campo de monto con validación y formato en pesos
    │   ├── BreakdownTable   Desglose de la factura (retenciones desplegables)
    │   ├── NetIncome        Sección de ingreso neto
    │   ├── History          Lista de cálculos guardados
    │   ├── TaxSettings      Edición de porcentajes
    │   ├── Modal / SaveModal / ConfirmModal
    ├── App.jsx / App.css    Estado global y composición
    └── main.jsx             Arranque de la aplicación
```

## Fórmulas

- Comisiones sin IVA = comisiones ÷ (1 + IVA)
- Base de factura = ingreso fijo + comisiones sin IVA
- Total factura = base + IVA − (retención de IVA + retención de ISR)
- IVA por pagar = IVA − retención de IVA
- Ingreso neto = total factura − IVA por pagar

## Convención de estilos (BEM)

Los componentes usan `bloque__elemento--modificador`, por ejemplo `tabs__item--active` o `money-input__field--invalid`. Cada componente tiene su propio archivo CSS con el mismo nombre; los estilos compartidos (`card`, `btn`) están en `styles/base.css`.

## Persistencia

Los porcentajes y el historial se guardan en `localStorage` del navegador.
