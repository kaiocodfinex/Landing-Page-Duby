/*
 * Regra comercial do simulador "Monte sua DUBY" (briefing img03).
 * Tudo em centavos inteiros para não acumular erro de ponto flutuante.
 *
 * 1. Desconto por quantidade de módulos: 1 = 0%, 2 = 5%, 3 = 10%, 4 = 15%.
 * 2. Desconto por período, aplicado sobre o valor já com desconto por quantidade:
 *    mensal 0%, semestral 5% (cobrança de 6 meses), anual 10% (cobrança de 12 meses).
 * 3. Agentes de IA: adicional opcional, sem nenhum desconto (valor provisório).
 * 4. O mensal equivalente dos módulos é arredondado para o centavo (meio para cima);
 *    a cobrança do período é esse mensal × meses.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DubyPricing = api;
})(typeof self !== 'undefined' ? self : this, function () {
  const PRECO_MODULO_CENTAVOS = 29900;
  const PRECO_IA_CENTAVOS = 39900; // provisório (validar com o cliente)
  const DESCONTO_QTD = { 1: 0, 2: 5, 3: 10, 4: 15 };
  const PERIODOS = {
    mensal: { desconto: 0, meses: 1 },
    semestral: { desconto: 5, meses: 6 },
    anual: { desconto: 10, meses: 12 },
  };

  // percentage discount on integer cents, rounding half up to the cent
  const aplicarDesconto = (centavos, pct) => Math.round((centavos * (100 - pct)) / 100);

  function calcularPreco({ qtdModulos, periodo, ia }) {
    const p = PERIODOS[periodo];
    const valido = Number.isInteger(qtdModulos) && qtdModulos in DESCONTO_QTD && Boolean(p);
    if (!valido) {
      return {
        valido: false, cheioMensal: 0, descontoQtdPct: 0, aposQtdMensal: 0, descontoPeriodoPct: 0,
        modulosMensal: 0, iaMensal: 0, totalMensal: 0, totalPeriodo: 0, meses: p ? p.meses : 1,
        economiaMensal: 0, economiaPeriodo: 0,
      };
    }
    const cheioMensal = qtdModulos * PRECO_MODULO_CENTAVOS;
    const descontoQtdPct = DESCONTO_QTD[qtdModulos];
    const aposQtdMensal = aplicarDesconto(cheioMensal, descontoQtdPct);
    const modulosMensal = aplicarDesconto(aposQtdMensal, p.desconto);
    const iaMensal = ia ? PRECO_IA_CENTAVOS : 0;
    const totalMensal = modulosMensal + iaMensal;
    const economiaMensal = cheioMensal - modulosMensal;
    return {
      valido: true,
      cheioMensal,
      descontoQtdPct,
      aposQtdMensal,
      descontoPeriodoPct: p.desconto,
      modulosMensal,
      iaMensal,
      totalMensal,
      totalPeriodo: totalMensal * p.meses,
      meses: p.meses,
      economiaMensal,
      economiaPeriodo: economiaMensal * p.meses,
    };
  }

  function formatarBRL(centavos) {
    const reais = Math.floor(Math.abs(centavos) / 100);
    const cent = String(Math.abs(centavos) % 100).padStart(2, '0');
    const milhar = String(reais).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `${centavos < 0 ? '-' : ''}R$ ${milhar},${cent}`;
  }

  return { PRECO_MODULO_CENTAVOS, PRECO_IA_CENTAVOS, DESCONTO_QTD, PERIODOS, calcularPreco, formatarBRL };
});
