/* DUBY · Nova LP · interações */
(() => {
    'use strict';

    const $ = (s, el = document) => el.querySelector(s);
    const $$ = (s, el = document) => [...el.querySelectorAll(s)];
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const { calcularPreco, formatarBRL, DESCONTO_QTD } = window.DubyPricing;
    const hasGsap = typeof window.gsap !== 'undefined';
    if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    const icons = () => window.lucide && lucide.createIcons();
    icons();

    /* ─────────────── Menu ─────────────── */
    const nav = $('#nav');
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const toggle = $('.nav-toggle');
    const menu = $('#menuMobile');
    const setMenu = (open) => {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        menu.classList.toggle('is-open', open);
        menu.setAttribute('aria-hidden', String(!open));
        document.body.classList.toggle('is-locked', open);
    };
    toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
    $$('a, button', menu).forEach(el => el.addEventListener('click', () => setMenu(false)));

    // highlight the section being read
    const links = $$('.nav-links a');
    const spy = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            links.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['plataforma', 'modulos', 'agentes', 'como-funciona', 'depoimentos'].forEach(id => {
        const el = document.getElementById(id);
        if (el) spy.observe(el);
    });

    /* ─────────────── Hero: entrada + parallax ─────────────── */
    const hero = $('#hero');
    const frame = $('#mgFrame');
    const blob = $('.hero-blob');

    if (hasGsap && !reduceMotion) {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
            .from('.hero-anim', { y: 28, opacity: 0, duration: 1, stagger: .1, clearProps: 'all' })
            .from('#mgFrame', { y: 40, opacity: 0, scale: .96, duration: 1.3, clearProps: 'opacity,scale' }, .15)
            .from('#mgAgent', { y: 24, opacity: 0, duration: 1, clearProps: 'all' }, .9);
    }

    if (finePointer && !reduceMotion) {
        hero.addEventListener('mousemove', (e) => {
            const r = hero.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5;
            const y = (e.clientY - r.top) / r.height - .5;
            frame.style.setProperty('--ry', `${-6 + x * 8}deg`);
            frame.style.setProperty('--rx', `${4 - y * 6}deg`);
            blob.style.setProperty('--px', `${x * -24}px`);
            blob.style.setProperty('--py', `${y * -18}px`);
        });
        hero.addEventListener('mouseleave', () => {
            frame.style.removeProperty('--ry');
            frame.style.removeProperty('--rx');
            blob.style.removeProperty('--px');
            blob.style.removeProperty('--py');
        });
    }

    /* ─────────────── Motion graphic (dados fictícios) ─────────────── */
    const MONTHS = [
        {
            name: 'Setembro 2026',
            kpis: [139831525, 1141627609, 121568853, 626106242],
            deltas: [-6.5, 12.4, 4.2, -0.2],
            weeks: [[3240, 2100], [3180, 3710], [2560, 3170], [3260, 2350], [1180, 990]],
            alerts: [
                { t: 'A receber vencido: R$ 4,81 mi', d: 'Fora da previsão · 489 títulos em aberto.' },
                { t: 'Contas a pagar vencidas: R$ 3,48 mi', d: 'Fora da previsão · 256 títulos em aberto.' },
                { t: 'Semana 5 fecha positiva', d: 'Saldo líquido projetado de + R$ 190 mil.', ok: true },
            ],
            rows: [['Sem 1 · 01–07/09', 146696701, 282709955, 308907573, true], ['Sem 2 · 08–14/09', 166309650, 261107465, 480104214, false], ['Sem 3 · 15–21/09', 142088310, 219530044, 316944102, true]],
            agent: 'Contas a pagar vencidas somam R$ 3,48 mi. Quer que eu monte um plano de pagamento por prioridade?',
        },
        {
            name: 'Outubro 2026',
            kpis: [152410380, 1238954120, 118230415, 584392810],
            deltas: [9.0, 8.5, -2.7, -6.7],
            weeks: [[3420, 2240], [3050, 2880], [3310, 2690], [2980, 3120], [2240, 1620]],
            alerts: [
                { t: 'Vendas à vista + 8,5% no mês', d: 'Melhor resultado dos últimos 6 meses.', ok: true },
                { t: 'Semana 4 com saída maior que entrada', d: 'Diferença de R$ 140 mil · revisar pagamentos.' },
                { t: 'A receber vencido caiu 18%', d: '401 títulos em aberto · tendência de queda.', ok: true },
            ],
            rows: [['Sem 1 · 01–07/10', 158240977, 301877410, 296450012, true], ['Sem 2 · 08–14/10', 149300218, 287112903, 410238711, true], ['Sem 3 · 15–21/10', 171045602, 275640118, 352118450, true]],
            agent: 'Outubro fechou com caixa 12% mais forte. A semana 4 merece atenção: as saídas superaram as entradas.',
        },
        {
            name: 'Novembro 2026',
            kpis: [131205960, 1096432015, 129874233, 652810447],
            deltas: [-13.9, -11.5, 9.8, 11.7],
            weeks: [[2860, 2410], [3360, 3020], [2740, 3390], [3120, 2280], [1460, 1210]],
            alerts: [
                { t: 'Pagamentos + 9,8% na semana', d: 'Concentração de boletos entre os dias 15 e 21.' },
                { t: 'A receber no mês: R$ 6,53 mi', d: 'Projeção cobre 100% das contas a pagar.', ok: true },
                { t: 'Semana 3 com saldo negativo', d: 'Antecipar recebíveis pode cobrir R$ 650 mil.' },
            ],
            rows: [['Sem 1 · 01–07/11', 139870233, 268450120, 301245980, true], ['Sem 2 · 08–14/11', 162348011, 291003874, 402118760, true], ['Sem 3 · 15–21/11', 128410502, 246210389, 448320155, false]],
            agent: 'A semana 3 tende a fechar negativa. Posso simular a antecipação de recebíveis para cobrir R$ 650 mil?',
        },
    ];
    const KPI_DEF = [
        { label: 'Recebimentos da semana', goodUp: true },
        { label: 'Vendas à vista no mês', goodUp: true },
        { label: 'Pagamentos da semana', goodUp: false },
        { label: 'A receber no mês', goodUp: true },
    ];

    const stage = $('#mgStage');
    const win = $('.mg-window');
    const kpiWrap = $('#mgKpis');
    const svg = $('#mgChart');
    const alertsEl = $('#mgAlerts');
    const rowsEl = $('#mgRows');
    const monthEl = $('#mgMonth');
    const agentText = $('#mgAgentText');

    // fit the 760×520 authored window to the frame width
    const fit = () => win.style.setProperty('--mg-scale', String(stage.clientWidth / 760));
    fit();
    new ResizeObserver(fit).observe(stage);

    // KPI cards
    const kpiEls = KPI_DEF.map(def => {
        const card = document.createElement('div');
        card.className = 'mg-card mg-kpi';
        card.innerHTML = `<small>${def.label}</small><strong>R$ 0,00</strong><em><b></b> vs período anterior</em>`;
        kpiWrap.appendChild(card);
        return { card, value: $('strong', card), delta: $('b', card), current: { v: 0 } };
    });

    // chart skeleton
    const NS = 'http://www.w3.org/2000/svg';
    const ZERO = 108, MAXH = 74, MAXV = 4000, X0 = 52, GROUP = 77, BAR = 30;
    const el = (tag, attrs) => {
        const n = document.createElementNS(NS, tag);
        Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
        return n;
    };
    [['+R$ 4 mi', ZERO - MAXH], ['0', ZERO], ['−R$ 4 mi', ZERO + MAXH]].forEach(([t, y]) => {
        svg.appendChild(el('line', { x1: 44, x2: 436, y1: y, y2: y, stroke: y === ZERO ? 'rgba(255,255,255,.18)' : 'rgba(255,255,255,.06)', 'stroke-dasharray': y === ZERO ? '0' : '3 4' }));
        const lbl = el('text', { x: 38, y: y + 3, 'text-anchor': 'end', 'font-size': 8, fill: '#8D93B3' });
        lbl.textContent = t;
        svg.appendChild(lbl);
    });
    const bars = MONTHS[0].weeks.map((_, i) => {
        const cx = X0 + GROUP * i + GROUP / 2;
        const inBar = el('rect', { x: cx - BAR / 2, y: ZERO, width: BAR, height: 0, rx: 4, fill: 'url(#gIn)' });
        const outBar = el('rect', { x: cx - BAR / 2, y: ZERO, width: BAR, height: 0, rx: 4, fill: 'url(#gOut)' });
        const net = el('text', { x: cx, y: 18, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: '#34D399', opacity: 0 });
        const week = el('text', { x: cx, y: 200, 'text-anchor': 'middle', 'font-size': 8.5, fill: '#8D93B3' });
        week.textContent = `Sem ${i + 1}`;
        svg.append(inBar, outBar, net, week);
        return { inBar, outBar, net };
    });
    const defs = el('defs', {});
    defs.innerHTML = `<linearGradient id="gIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7DD3FC"/><stop offset="1" stop-color="#0EA5E9"/></linearGradient>
        <linearGradient id="gOut" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8B5CF6"/><stop offset="1" stop-color="#C4B5FD"/></linearGradient>`;
    svg.prepend(defs);

    const fmtMil = (k) => {
        const s = k >= 0 ? '+' : '−';
        const a = Math.abs(k);
        return a >= 1000 ? `${s}R$ ${(a / 1000).toFixed(1).replace('.', ',')} mi` : `${s}R$ ${a} mil`;
    };

    const renderList = (m) => {
        alertsEl.innerHTML = m.alerts.map(a => `<li class="${a.ok ? 'ok' : ''}"><strong>${a.t}</strong>${a.d}</li>`).join('');
        rowsEl.innerHTML = m.rows.map(r => `<div class="mg-tr"><span>${r[0]}</span><span>${formatarBRL(r[1])}</span><span>${formatarBRL(r[2])}</span><span>${formatarBRL(r[3])}</span><span class="tag ${r[4] ? '' : 'neg'}">${r[4] ? 'Positiva' : 'Negativa'}</span></div>`).join('');
    };

    let typer = null;
    const typeAgent = (text) => {
        clearInterval(typer);
        if (reduceMotion) { agentText.textContent = text; return; }
        agentText.textContent = '';
        let i = 0;
        typer = setInterval(() => {
            agentText.textContent = text.slice(0, ++i);
            if (i >= text.length) clearInterval(typer);
        }, 26);
    };

    const setKpiText = (k, cents) => { k.value.textContent = formatarBRL(Math.round(cents)); };

    // draws a month; `intro` = first full build-up, otherwise a live update
    const showMonth = (m, intro) => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        monthEl.textContent = m.name;
        kpiEls.forEach((k, i) => {
            const d = m.deltas[i];
            const good = (d >= 0) === KPI_DEF[i].goodUp;
            k.delta.className = good ? 'up' : 'down';
            k.delta.textContent = `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1).replace('.', ',')}%`;
            tl.to(k.current, { v: m.kpis[i], duration: intro ? 1.6 : 1.2, ease: 'power2.out', onUpdate: () => setKpiText(k, k.current.v) }, intro ? .25 + i * .08 : 0);
        });
        m.weeks.forEach(([inV, outV], i) => {
            const hi = (inV / MAXV) * MAXH, ho = (outV / MAXV) * MAXH;
            const b = bars[i];
            const t = intro ? .7 + i * .12 : .05 * i;
            tl.to(b.inBar, { attr: { y: ZERO - hi, height: hi }, duration: 1, ease: 'expo.out' }, t)
                .to(b.outBar, { attr: { height: ho }, duration: 1, ease: 'expo.out' }, t + .06);
            const net = inV - outV;
            tl.to(b.net, { opacity: 0, duration: .2 }, t)
                .call(() => { b.net.textContent = fmtMil(net); b.net.setAttribute('fill', net >= 0 ? '#34D399' : '#F87171'); }, null, t + .2)
                .to(b.net, { opacity: 1, duration: .4 }, t + .25);
        });
        tl.to([alertsEl, rowsEl], { opacity: 0, y: 6, duration: .25 }, 0)
            .call(() => renderList(m), null, intro ? 1.1 : .3)
            .fromTo([alertsEl, rowsEl], { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .6 }, intro ? 1.15 : .35)
            .call(() => typeAgent(m.agent), null, intro ? 1.6 : .4);
        return tl;
    };

    const showStatic = (m) => {
        monthEl.textContent = m.name;
        kpiEls.forEach((k, i) => {
            const d = m.deltas[i];
            k.delta.className = ((d >= 0) === KPI_DEF[i].goodUp) ? 'up' : 'down';
            k.delta.textContent = `${d >= 0 ? '▲' : '▼'} ${Math.abs(d).toFixed(1).replace('.', ',')}%`;
            k.current.v = m.kpis[i];
            setKpiText(k, m.kpis[i]);
        });
        m.weeks.forEach(([inV, outV], i) => {
            const hi = (inV / MAXV) * MAXH, ho = (outV / MAXV) * MAXH, b = bars[i];
            b.inBar.setAttribute('y', ZERO - hi); b.inBar.setAttribute('height', hi); b.outBar.setAttribute('height', ho);
            b.net.textContent = fmtMil(inV - outV); b.net.setAttribute('fill', inV - outV >= 0 ? '#34D399' : '#F87171'); b.net.setAttribute('opacity', 1);
        });
        renderList(m);
        agentText.textContent = m.agent;
    };

    // live loop that only runs while the dashboard is on screen and the tab is visible
    const demo = (() => {
        let idx = 0, timer = null, visible = false, started = false, current = null;
        const LOOP_MS = 7500;
        const schedule = () => {
            clearTimeout(timer);
            if (!visible || document.hidden) return;
            timer = setTimeout(() => {
                idx = (idx + 1) % MONTHS.length;
                current = showMonth(MONTHS[idx], false);
                schedule();
            }, LOOP_MS);
        };
        const start = () => {
            if (started) return;
            started = true;
            current = showMonth(MONTHS[0], true);
            schedule();
        };
        return {
            setVisible(v) {
                visible = v;
                if (v && !started) start();
                else if (v) { current && current.resume(); schedule(); }
                else { clearTimeout(timer); current && current.pause(); }
            },
            replay() {
                clearTimeout(timer);
                current && current.kill();
                idx = 0;
                kpiEls.forEach(k => { k.current.v = 0; setKpiText(k, 0); });
                bars.forEach(b => { b.inBar.setAttribute('y', ZERO); b.inBar.setAttribute('height', 0); b.outBar.setAttribute('height', 0); b.net.setAttribute('opacity', 0); });
                current = showMonth(MONTHS[0], true);
                schedule();
            },
            schedule,
        };
    })();

    if (reduceMotion || !hasGsap) {
        showStatic(MONTHS[0]);
    } else {
        new IntersectionObserver(([e]) => demo.setVisible(e.isIntersecting), { threshold: .2 }).observe(frame);
        document.addEventListener('visibilitychange', () => demo.schedule());
        $$('[data-replay-demo]').forEach(b => b.addEventListener('click', () => setTimeout(() => demo.replay(), 500)));
    }

    /* ─────────────── Parceiros: duplica o grupo para o loop ─────────────── */
    const group = $('.marquee-group');
    if (group) {
        const clone = group.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        $$('img', clone).forEach(img => img.alt = '');
        group.parentElement.appendChild(clone);
    }

    /* ─────────────── Revelação ao rolar ─────────────── */
    if (hasGsap && !reduceMotion) {
        gsap.set('[data-reveal]', { opacity: 0 });
        ScrollTrigger.batch('[data-reveal]', {
            start: 'top 86%',
            once: true,
            onEnter: (els) => gsap.fromTo(els, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .1, ease: 'power3.out', clearProps: 'transform,opacity' }),
        });
        ScrollTrigger.refresh();
    }

    /* ─────────────── Cards de módulo: brilho no mouse ─────────────── */
    $$('.module-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty('--mx', `${e.clientX - r.left}px`);
            card.style.setProperty('--my', `${e.clientY - r.top}px`);
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--mx', '-999px');
            card.style.setProperty('--my', '-999px');
        });
    });

    /* ─────────────── Simulador ─────────────── */
    const NOMES = {
        comercial: 'Inteligência Comercial',
        controladoria: 'Controladoria Inteligente',
        compras: 'Inteligência de Compras',
        logistica: 'Inteligência Logística e Operacional',
    };
    const PERIODO_NOME = { mensal: 'mensal', semestral: 'semestral', anual: 'anual' };
    const sim = $('#monte');
    const checks = $$('input[name="modulo"]', sim);
    const periodBtns = $$('[data-periodo]', sim);
    const iaInput = $('#simIa');
    const S = {
        linhaCheio: $('#simLinhaCheio'), cheio: $('#simCheio'),
        linhaQtd: $('#simLinhaQtd'), qtdPct: $('#simQtdPct'), qtd: $('#simQtd'),
        linhaPeriodo: $('#simLinhaPeriodo'), periodoNome: $('#simPeriodoNome'), periodoPct: $('#simPeriodoPct'), periodo: $('#simPeriodo'),
        linhaIa: $('#simLinhaIa'), total: $('#simTotal'), resumo: $('#simResumo'), cobranca: $('#simCobranca'),
        economia: $('#simEconomia'), dica: $('#simDica'), vazio: $('#simVazio'), cta: $('#simCta'),
    };
    let periodo = 'mensal';
    const totalAnim = { v: 56810 };

    const selecionados = () => checks.filter(c => c.checked).map(c => c.value);
    const plural = (n) => `${n} módulo${n === 1 ? '' : 's'}`;

    const estado = () => {
        const mods = selecionados();
        const r = calcularPreco({ qtdModulos: mods.length, periodo, ia: iaInput.checked });
        return { mods, r, periodo, ia: iaInput.checked };
    };

    const render = () => {
        const { mods, r } = estado();
        const n = mods.length;
        sim.classList.toggle('is-empty', !r.valido);
        S.vazio.hidden = r.valido;
        S.cta.disabled = !r.valido;

        S.linhaCheio.textContent = n ? `${plural(n)} × R$ 299,00` : 'Nenhum módulo';
        S.cheio.textContent = formatarBRL(r.cheioMensal);
        S.linhaQtd.hidden = !r.valido || r.descontoQtdPct === 0;
        S.qtdPct.textContent = `${r.descontoQtdPct}%`;
        S.qtd.textContent = `− ${formatarBRL(r.cheioMensal - r.aposQtdMensal)}`;
        S.linhaPeriodo.hidden = !r.valido || r.descontoPeriodoPct === 0;
        S.periodoNome.textContent = PERIODO_NOME[periodo];
        S.periodoPct.textContent = `${r.descontoPeriodoPct}%`;
        S.periodo.textContent = `− ${formatarBRL(r.aposQtdMensal - r.modulosMensal)}`;
        S.linhaIa.hidden = !(r.valido && iaInput.checked);

        // total rolls to the new value
        const target = r.totalMensal;
        if (hasGsap && !reduceMotion) {
            gsap.to(totalAnim, { v: target, duration: .6, ease: 'power3.out', onUpdate: () => { S.total.textContent = formatarBRL(Math.round(totalAnim.v)); } });
        } else {
            totalAnim.v = target;
            S.total.textContent = formatarBRL(target);
        }

        S.resumo.textContent = r.valido ? `${plural(n)}${iaInput.checked ? ' + Agentes de IA' : ''}` : '—';
        S.cobranca.hidden = !(r.valido && r.meses > 1);
        S.cobranca.textContent = `Cobrança ${PERIODO_NOME[periodo]}: ${formatarBRL(r.totalPeriodo)}`;

        S.economia.hidden = !(r.valido && r.economiaMensal > 0);
        $('span', S.economia).textContent = r.meses > 1
            ? `Você economiza ${formatarBRL(r.economiaMensal)}/mês · ${formatarBRL(r.economiaPeriodo)} no período`
            : `Você economiza ${formatarBRL(r.economiaMensal)}/mês`;

        S.dica.textContent = !r.valido ? '' : n < 4
            ? `Adicione mais 1 módulo e ganhe ${DESCONTO_QTD[n + 1]}% de desconto.`
            : 'Desconto máximo por quantidade aplicado.';

        // keep module cards in sync
        $$('[data-module-card]').forEach(card => {
            const on = mods.includes(card.dataset.moduleCard);
            card.classList.toggle('is-selected', on);
            const action = $('.mp-action', card);
            action.innerHTML = `<i data-lucide="${on ? 'check' : 'plus'}"></i>`;
            const pick = $('[data-pick-module]', card);
            pick.setAttribute('aria-pressed', String(on));
            pick.setAttribute('aria-label', `${on ? 'Remover' : 'Adicionar'} ${NOMES[card.dataset.moduleCard]} na simulação (R$ 299 por mês)`);
        });
        icons();
        updateFloat();
    };

    checks.forEach(c => c.addEventListener('change', render));
    iaInput.addEventListener('change', render);

    const setPeriodo = (p, focus) => {
        periodo = p;
        periodBtns.forEach((b, i) => {
            const on = b.dataset.periodo === p;
            b.setAttribute('aria-checked', String(on));
            b.tabIndex = on ? 0 : -1;
            if (on) { sim.querySelector('.sim-period').style.setProperty('--seg', i); if (focus) b.focus(); }
        });
        render();
    };
    periodBtns.forEach((b, i) => {
        b.addEventListener('click', () => setPeriodo(b.dataset.periodo));
        b.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            e.preventDefault();
            const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + periodBtns.length) % periodBtns.length;
            setPeriodo(periodBtns[next].dataset.periodo, true);
        });
    });

    // module cards add/remove the module in the simulator
    $$('[data-pick-module]').forEach(btn => btn.addEventListener('click', () => {
        const input = checks.find(c => c.value === btn.dataset.pickModule);
        input.checked = !input.checked;
        render();
        floatSeen = true;
        updateFloat();
    }));

    // floating summary while the visitor picks modules above the simulator
    const float = document.createElement('a');
    float.className = 'sim-float';
    float.href = '#monte';
    float.innerHTML = '<span class="sf-count"></span><strong class="sf-total"></strong><span class="sf-go">Ver simulação <i data-lucide="arrow-down"></i></span>';
    document.body.appendChild(float);
    let floatSeen = false, simInView = false;
    function updateFloat() {
        if (!float.isConnected) return;
        const { mods, r } = estado();
        $('.sf-count', float).textContent = r.valido ? plural(mods.length) : 'Nenhum módulo';
        $('.sf-total', float).textContent = `${formatarBRL(r.totalMensal)}/mês`;
        float.classList.toggle('is-visible', floatSeen && !simInView);
    }
    new IntersectionObserver(([e]) => { simInView = e.isIntersecting; updateFloat(); }, { threshold: .25 }).observe(sim);

    /* ─────────────── Agentes de IA: cards + console ─────────────── */
    const agentCards = $$('.agent-card');
    const agentsGrid = $('#agentesGrid');
    const agentsPanel = $('.agents-panel');
    const consoleEl = $('#agentConsole');
    const ac = { avatar: $('#acAvatar'), name: $('#acName'), area: $('#acArea'), msg: $('#acMsg'), chips: $('#acChips') };
    const AGENT_MS = 7000;
    let agentIdx = 0, agentStart = 0, agentRaf = null, agentVisible = false, agentPaused = false, pausedAt = 0, agentTyper = null;

    const typeConsole = (text, done) => {
        clearInterval(agentTyper);
        if (reduceMotion) { ac.msg.textContent = text; done(); return; }
        consoleEl.classList.add('is-typing');
        ac.msg.textContent = '';
        let i = 0;
        agentTyper = setInterval(() => {
            i += 2;
            ac.msg.textContent = text.slice(0, i);
            if (i >= text.length) { clearInterval(agentTyper); ac.msg.textContent = text; done(); }
        }, 22);
    };

    const showAgent = (i, { focus = false, scroll = true } = {}) => {
        agentIdx = i;
        const card = agentCards[i];
        agentCards.forEach((c, j) => {
            const on = j === i;
            c.classList.toggle('is-active', on);
            c.setAttribute('aria-selected', String(on));
            c.tabIndex = on ? 0 : -1;
            $('.agent-progress i', c).style.setProperty('--p', 0);
        });
        if (focus) card.focus({ preventScroll: true });
        // mobile carousel: bring the active card into view without moving the page
        if (scroll && agentsGrid.scrollWidth > agentsGrid.clientWidth + 4) {
            agentsGrid.scrollTo({ left: card.offsetLeft - 20, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
        const d = card.dataset;
        ac.avatar.src = `assets/img/agentes/${d.agentKey}.jpg`;
        ac.name.textContent = d.agentName;
        ac.area.textContent = `Agente de IA · ${d.agentArea}`;
        ac.chips.innerHTML = d.agentChips.split('|').map(c => `<span>${c}</span>`).join('');
        typeConsole(d.agentMsg, () => consoleEl.classList.remove('is-typing'));
        agentStart = performance.now();
    };

    // progress bar + auto-advance, only while on screen and not hovered/focused
    const agentTick = (now) => {
        agentRaf = requestAnimationFrame(agentTick);
        if (!agentVisible || agentPaused || document.hidden) return;
        const p = Math.min(1, (now - agentStart) / AGENT_MS);
        $('.agent-progress i', agentCards[agentIdx]).style.setProperty('--p', p.toFixed(4));
        if (p >= 1) showAgent((agentIdx + 1) % agentCards.length);
    };

    const pauseAgents = () => { if (!agentPaused) { agentPaused = true; pausedAt = performance.now(); } };
    const resumeAgents = () => { if (agentPaused) { agentPaused = false; agentStart += performance.now() - pausedAt; } };

    agentCards.forEach((c, i) => {
        c.addEventListener('click', () => showAgent(i));
        c.addEventListener('keydown', (e) => {
            if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
            e.preventDefault();
            showAgent((i + (e.key === 'ArrowRight' ? 1 : -1) + agentCards.length) % agentCards.length, { focus: true });
        });
    });

    if (!reduceMotion) {
        agentsPanel.addEventListener('mouseenter', pauseAgents);
        agentsPanel.addEventListener('mouseleave', resumeAgents);
        agentsPanel.addEventListener('focusin', pauseAgents);
        agentsPanel.addEventListener('focusout', (e) => { if (!agentsPanel.contains(e.relatedTarget)) resumeAgents(); });
        new IntersectionObserver(([e]) => {
            const was = agentVisible;
            agentVisible = e.isIntersecting;
            if (agentVisible && !agentRaf) { showAgent(0, { scroll: false }); agentRaf = requestAnimationFrame(agentTick); }
            else if (agentVisible && !was) agentStart = performance.now();
        }, { threshold: .35 }).observe(agentsPanel);
    }

    // "Conheça os agentes": restart the tour from the first agent
    $$('[data-highlight-agents]').forEach(b => b.addEventListener('click', () => {
        agentPaused = false;
        showAgent(0);
    }));

    render();

    /* ─────────────── Como funciona: linha de progresso ─────────────── */
    const steps = $$('.step');
    const stepsEl = $('#steps');
    const lightSteps = (p) => {
        stepsEl.style.setProperty('--fill', p.toFixed(3));
        steps.forEach((s, i) => s.classList.toggle('is-lit', p >= i / (steps.length - 1) - .02));
    };
    if (hasGsap && !reduceMotion) {
        ScrollTrigger.create({
            trigger: stepsEl, start: 'top 78%', end: 'bottom 55%', scrub: .6,
            onUpdate: (self) => lightSteps(self.progress),
        });
    } else {
        lightSteps(1);
    }

    /* ─────────────── Depoimentos ─────────────── */
    const videoCards = $$('.video-card');
    const videos = videoCards.map(c => $('video', c));
    videoCards.forEach(card => {
        const v = $('video', card);
        $('.video-play', card).addEventListener('click', () => {
            videos.forEach(o => o !== v && o.pause());
            v.controls = true;
            v.play().catch(() => {});
        });
        v.addEventListener('play', () => { videos.forEach(o => o !== v && o.pause()); card.classList.add('is-playing'); });
        v.addEventListener('ended', () => { card.classList.remove('is-playing'); v.controls = false; v.load(); });
    });

    /* ─────────────── Pop-up de formulário ─────────────── */
    const lead = $('#lead');
    const dialog = $('.lead-dialog', lead);
    const form = $('#leadForm');
    const summary = $('#leadSummary');
    const content = $('#leadContent');
    const success = $('#leadSuccess');
    let lastFocus = null;

    const fillSummary = (fromSim) => {
        const { mods, r, ia } = estado();
        const set = (name, value) => { form.elements[name].value = value; };
        if (fromSim && r.valido) {
            summary.innerHTML = `
                <div class="ls-mods">${mods.map(m => `<span>${NOMES[m]}</span>`).join('')}${ia ? '<span>Agentes de IA</span>' : ''}</div>
                <div class="ls-total"><span>Plano ${PERIODO_NOME[periodo]}${r.meses > 1 ? ` · cobrança de ${formatarBRL(r.totalPeriodo)}` : ''}</span><strong>${formatarBRL(r.totalMensal)}/mês</strong></div>
                <p class="ls-impl">+ Implementação conforme o seu sistema, definida na reunião.</p>`;
            set('modulos', mods.map(m => NOMES[m]).join(', '));
            set('periodo', periodo);
            set('agentes_ia', ia ? 'sim' : 'não');
            set('total_mensal', formatarBRL(r.totalMensal));
            set('total_periodo', formatarBRL(r.totalPeriodo));
        } else {
            summary.innerHTML = 'Ainda não montou sua DUBY? Sem problema: na demonstração ajudamos você a escolher os módulos ideais.';
            ['modulos', 'periodo', 'agentes_ia', 'total_mensal', 'total_periodo'].forEach(n => set(n, ''));
        }
    };

    const focusables = () => $$('button, [href], input, select, textarea', dialog).filter(e => !e.disabled && e.offsetParent !== null);

    const openLead = (trigger) => {
        lastFocus = trigger || document.activeElement;
        fillSummary(trigger && trigger.hasAttribute('data-from-sim'));
        content.hidden = false;
        success.hidden = true;
        lead.hidden = false;
        document.body.classList.add('is-locked');
        if (hasGsap && !reduceMotion) {
            gsap.fromTo('.lead-backdrop', { opacity: 0 }, { opacity: 1, duration: .4, ease: 'power2.out' });
            gsap.fromTo(dialog, { y: 40, scale: .96, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: .6, ease: 'expo.out' });
        }
        setTimeout(() => (focusables()[1] || dialog).focus(), 60); // first field (after the close button)
    };

    const closeLead = () => {
        const done = () => {
            lead.hidden = true;
            document.body.classList.remove('is-locked');
            if (!success.hidden) { form.reset(); $$('.field', form).forEach(f => f.classList.remove('has-error')); }
            lastFocus && lastFocus.focus && lastFocus.focus();
        };
        if (hasGsap && !reduceMotion) {
            gsap.to('.lead-backdrop', { opacity: 0, duration: .3 });
            gsap.to(dialog, { y: 24, scale: .97, opacity: 0, duration: .3, ease: 'power2.in', onComplete: done });
        } else done();
    };

    document.addEventListener('click', (e) => {
        const opener = e.target.closest('[data-open-lead]');
        if (opener && !opener.disabled) { e.preventDefault(); openLead(opener); return; }
        if (e.target.closest('[data-close-lead]')) closeLead();
    });

    document.addEventListener('keydown', (e) => {
        if (lead.hidden) return;
        if (e.key === 'Escape') { e.preventDefault(); closeLead(); return; }
        if (e.key !== 'Tab') return;
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // WhatsApp mask
    const tel = form.elements.telefone;
    tel.addEventListener('input', () => {
        let d = tel.value.replace(/\D/g, '').slice(0, 11);
        if (d.length > 10) d = d.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
        else if (d.length > 6) d = d.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        else if (d.length > 2) d = d.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        else if (d.length) d = d.replace(/^(\d*)/, '($1');
        tel.value = d;
    });

    $$('input', form).forEach(i => i.addEventListener('input', () => i.closest('.field') && i.closest('.field').classList.remove('has-error')));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const v = (n) => form.elements[n].value.trim();
        const checksForm = {
            nome: v('nome').length > 1,
            telefone: v('telefone').replace(/\D/g, '').length >= 10,
            empresa: v('empresa').length > 1,
            erp: v('erp').length > 1,
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email')),
        };
        let firstBad = null;
        Object.entries(checksForm).forEach(([n, ok]) => {
            const field = form.elements[n].closest('.field');
            field.classList.toggle('has-error', !ok);
            if (!ok && !firstBad) firstBad = form.elements[n];
        });
        if (firstBad) { firstBad.focus(); return; }

        const payload = Object.fromEntries(new FormData(form).entries());
        Object.assign(payload, {
            origem: 'LP DUBY (nova)',
            url: window.location.href,
            referrer: document.referrer || 'direto',
            timestamp: new Date().toISOString(),
        });
        // A equipe do cliente conecta o envio ouvindo este evento (ver comentário no HTML).
        window.dispatchEvent(new CustomEvent('duby:lead', { detail: payload }));

        content.hidden = true;
        success.hidden = false;
        icons();
        $('button', success).focus();
    });
})();
