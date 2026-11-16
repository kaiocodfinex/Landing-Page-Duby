// Regra comercial do simulador (img03). Rodar: node --test nova/tests/
const test = require('node:test');
const assert = require('node:assert/strict');
const { calcularPreco, formatarBRL } = require('../assets/js/pricing.js');

test('desconto por quantidade no mensal: 299,00 / 568,10 / 807,30 / 1.016,60', () => {
  const esperado = { 1: 29900, 2: 56810, 3: 80730, 4: 101660 };
  for (const [qtd, centavos] of Object.entries(esperado)) {
    const r = calcularPreco({ qtdModulos: Number(qtd), periodo: 'mensal', ia: false });
    assert.equal(r.modulosMensal, centavos, `${qtd} módulo(s)`);
    assert.equal(r.totalPeriodo, centavos);
    assert.equal(r.meses, 1);
  }
});

test('exemplo da img03: 4 módulos + anual = 914,94/mês e cobrança anual de 10.979,28', () => {
  const r = calcularPreco({ qtdModulos: 4, periodo: 'anual', ia: false });
  assert.equal(r.descontoQtdPct, 15);
  assert.equal(r.descontoPeriodoPct, 10);
  assert.equal(r.modulosMensal, 91494);
  assert.equal(r.totalPeriodo, 1097928);
  assert.equal(r.meses, 12);
});

test('3 módulos + semestral arredonda o mensal para o centavo (766,935 → 766,94)', () => {
  const r = calcularPreco({ qtdModulos: 3, periodo: 'semestral', ia: false });
  assert.equal(r.modulosMensal, 76694);
  assert.equal(r.totalPeriodo, 460164);
  assert.equal(r.meses, 6);
});

test('IA soma 399 sem desconto: 2 módulos + IA no mensal = 967,10 (não 997)', () => {
  const r = calcularPreco({ qtdModulos: 2, periodo: 'mensal', ia: true });
  assert.equal(r.iaMensal, 39900);
  assert.equal(r.totalMensal, 96710);
});

test('IA não recebe desconto de período: 4 módulos + anual + IA', () => {
  const r = calcularPreco({ qtdModulos: 4, periodo: 'anual', ia: true });
  assert.equal(r.iaMensal, 39900);
  assert.equal(r.totalMensal, 131394);
  assert.equal(r.totalPeriodo, 1576728);
});

test('economia compara com o preço cheio dos módulos (a IA não entra)', () => {
  const r = calcularPreco({ qtdModulos: 4, periodo: 'anual', ia: true });
  assert.equal(r.cheioMensal, 119600);
  assert.equal(r.economiaMensal, 28106);
  assert.equal(r.economiaPeriodo, 28106 * 12);
});

test('sem módulos é inválido, mesmo com IA', () => {
  assert.equal(calcularPreco({ qtdModulos: 0, periodo: 'mensal', ia: false }).valido, false);
  assert.equal(calcularPreco({ qtdModulos: 0, periodo: 'anual', ia: true }).valido, false);
  assert.equal(calcularPreco({ qtdModulos: 0, periodo: 'anual', ia: true }).totalMensal, 0);
});

test('entradas fora da regra são rejeitadas', () => {
  assert.equal(calcularPreco({ qtdModulos: 5, periodo: 'mensal', ia: false }).valido, false);
  assert.equal(calcularPreco({ qtdModulos: 2, periodo: 'trimestral', ia: false }).valido, false);
});

test('formatarBRL usa o padrão brasileiro', () => {
  assert.equal(formatarBRL(101660), 'R$ 1.016,60');
  assert.equal(formatarBRL(1097928), 'R$ 10.979,28');
  assert.equal(formatarBRL(29900), 'R$ 299,00');
  assert.equal(formatarBRL(0), 'R$ 0,00');
});
