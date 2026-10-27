// @ts-nocheck — the calculators from the CanadianSME Tools prototype, ported verbatim. Rates are the
// prototype's published 2026 figures (CRA T4127, Jan 2026; Revenu Québec); the page states they are illustrative, not tax advice.
/* eslint-disable */
export class ToolsLogic {
  props: any
  __host: any
  constructor(props) {
    this.props = props
    this.state = { ...this.state, view: props.view || 'index' }
  }
  setState(update, cb?) {
    this.__host && this.__host.__setLogicState(update, cb)
  }
  // ── 2026 figures — CRA T4127 (122nd ed., Jan 2026), Revenu Québec ──
  // Verified Oct 2026. Update every January (and July if CRA issues a
  // mid-year edition). Annual statutory 2026 values are used, not the
  // prorated July-December payroll rates.
  static YEAR = 2026;
  static CPP = { rate: 0.0595, base: 0.0495, exempt: 3500, ympe: 74600, yampe: 85000, rate2: 0.04 };
  static QPP = { rate: 0.0630, base: 0.0530, exempt: 3500, ympe: 74600, yampe: 85000, rate2: 0.04 };
  static EI = { rate: 0.0163, employerFactor: 1.4, mie: 68900 };
  static EI_QC = { rate: 0.0130, employerFactor: 1.4, mie: 68900 };
  static QPIP = { employee: 0.0043, employer: 0.00602, self: 0.00764, mie: 103000 };
  static FED = {
    bpaMax: 16452, bpaMin: 14829, bpaFrom: 181440, bpaTo: 258482, cea: 1501, qcAbatement: 0.165,
    brackets: [[58523, 0.14], [117045, 0.205], [181440, 0.26], [258482, 0.29], [Infinity, 0.33]]
  };
  static ON_SURTAX = [[5818, 0.20], [7446, 0.36]];

  // ── Provinces: sales tax + 2026 income tax brackets and BPA ───────
  static PROVINCES = [
    { name: 'Alberta', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 22769, brackets: [[61200, 0.08], [154259, 0.10], [185111, 0.12], [246813, 0.13], [370220, 0.14], [Infinity, 0.15]] },
    { name: 'British Columbia', gst: 5, extra: 7, extraLabel: 'PST', system: 'GST + 7% PST', bpa: 13216, brackets: [[50363, 0.056], [100728, 0.077], [115648, 0.105], [140430, 0.1229], [190405, 0.147], [265545, 0.168], [Infinity, 0.205]] },
    { name: 'Manitoba', gst: 5, extra: 7, extraLabel: 'RST', system: 'GST + 7% RST', bpa: 15780, brackets: [[47000, 0.108], [100000, 0.1275], [Infinity, 0.174]] },
    { name: 'New Brunswick', gst: 0, extra: 15, extraLabel: 'HST', system: '15% HST', bpa: 13664, brackets: [[52333, 0.094], [104666, 0.14], [193861, 0.16], [Infinity, 0.195]] },
    { name: 'Newfoundland and Labrador', gst: 0, extra: 15, extraLabel: 'HST', system: '15% HST', bpa: 13094, brackets: [[44678, 0.087], [89354, 0.145], [159528, 0.158], [223340, 0.178], [285319, 0.198], [570638, 0.208], [1141275, 0.213], [Infinity, 0.218]] },
    { name: 'Northwest Territories', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 18198, brackets: [[53003, 0.059], [106009, 0.086], [172346, 0.122], [Infinity, 0.1405]] },
    { name: 'Nova Scotia', gst: 0, extra: 14, extraLabel: 'HST', system: '14% HST', bpa: 11932, brackets: [[30995, 0.0879], [61991, 0.1495], [97417, 0.1667], [157124, 0.175], [Infinity, 0.21]] },
    { name: 'Nunavut', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 19659, brackets: [[55801, 0.04], [111602, 0.07], [181439, 0.09], [Infinity, 0.115]] },
    { name: 'Ontario', gst: 0, extra: 13, extraLabel: 'HST', system: '13% HST', bpa: 12989, brackets: [[53891, 0.0505], [107785, 0.0915], [150000, 0.1116], [220000, 0.1216], [Infinity, 0.1316]] },
    { name: 'Prince Edward Island', gst: 0, extra: 15, extraLabel: 'HST', system: '15% HST', bpa: 15000, brackets: [[33928, 0.095], [65820, 0.1347], [106890, 0.166], [142520, 0.1762], [200000, 0.19], [Infinity, 0.20]] },
    { name: 'Quebec', gst: 5, extra: 9.975, extraLabel: 'QST', system: 'GST + 9.975% QST', bpa: 18952, brackets: [[54345, 0.14], [108680, 0.19], [132245, 0.24], [Infinity, 0.2575]] },
    { name: 'Saskatchewan', gst: 5, extra: 6, extraLabel: 'PST', system: 'GST + 6% PST', bpa: 20381, brackets: [[54532, 0.105], [155805, 0.125], [Infinity, 0.145]] },
    { name: 'Yukon', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 16452, brackets: [[58523, 0.064], [117045, 0.09], [181440, 0.109], [500000, 0.128], [Infinity, 0.15]] }
  ];

  static FREQ = [
    { name: 'Weekly (52 per year)', per: 52 },
    { name: 'Every two weeks (26 per year)', per: 26 },
    { name: 'Twice a month (24 per year)', per: 24 },
    { name: 'Monthly (12 per year)', per: 12 }
  ];

  static TOOLS = [
    { key: 'gst', mark: '%', title: 'GST/HST Calculator', desc: 'Provincial and federal rates for every province and territory, including HST provinces.' },
    { key: 'payroll', mark: '$', title: 'Payroll Deductions Estimator', desc: 'CPP, EI, and income tax withheld per pay period, by province.' },
    { key: 'cashflow', mark: '≈', title: 'Cash-Flow Forecaster', desc: 'Project 13 weeks of inflows and outflows, including remittance dates.' },
    { key: 'loan', mark: '⌾', title: 'Loan Payment Calculator', desc: 'Compare BDC term loan, operating line, and equipment financing scenarios.' },
    { key: 'self-employed', mark: '§', title: 'Self-Employed Tax Estimator', desc: 'Income tax, both halves of CPP, monthly set-aside and quarterly instalments for sole proprietors.' },
    { key: 'import', mark: '⇄', title: 'Import Landed Cost Calculator', desc: 'Exchange, freight, duty, tariffs and border GST/HST, per unit, with a margin-safe price.' },
    { key: 'pricing', mark: '±', title: 'Pricing and Break-Even Calculator', desc: 'Break-even sales, markup vs margin, and the price rise needed when your costs go up.' }
  ];
  static CURRENCIES = ['USD', 'EUR', 'CNY', 'GBP', 'MXN'];

  state = {
    view: 'index',
    gstProv: 'Ontario', gstMode: 'add', gstAmount: 1000,
    payGross: 65000, payProv: 'Ontario', payFreq: 'Every two weeks (26 per year)',
    payBasis: 'salary', payRate: 24, payHours: 40,
    cashOpening: 40000, cashIn: 14000, cashOut: 9000, cashPayroll: 12000,
    cashPayrollFreq: 'Every two weeks', cashGst: 9500, cashOneOff: 0, cashOneOffWeek: 6,
    loanAmount: 150000, loanRate: 8.5, loanYears: 5,
    selfIncome: 85000, selfProv: 'Ontario', selfT4: 0,
    impValue: 10000, impCur: 'USD', impFx: 1.38, impFreight: 650, impDuty: 6.5, impSurtax: 0, impBroker: 150, impProv: 'Ontario', impUnits: 200, impMargin: 40,
    prPrice: 120, prVar: 55, prFixed: 18000, prUnits: 400, prRise: 8
  };

  componentDidMount() {}
  componentWillUnmount() {}

  prov(name) { return ToolsLogic.PROVINCES.find(p => p.name === name) || ToolsLogic.PROVINCES[8]; }
  money(n) {
    const v = Math.round((Number(n) || 0) * 100) / 100;
    return (v < 0 ? '−$' : '$') + Math.abs(v).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  money0(n) {
    const v = Math.round(Number(n) || 0);
    return (v < 0 ? '−$' : '$') + Math.abs(v).toLocaleString('en-CA');
  }
  bracketTax(income, brackets) {
    let tax = 0, floor = 0;
    for (const [cap, rate] of brackets) {
      if (income <= floor) break;
      tax += (Math.min(income, cap) - floor) * rate;
      floor = cap;
    }
    return tax;
  }
  num(e) { const v = parseFloat(e.target.value); return isNaN(v) ? 0 : v; }

  // ── GST/HST ───────────────────────────────────────────────────────
  gst() {
    const p = this.prov(this.state.gstProv);
    const federal = p.gst, extra = p.extra;
    const totalRate = federal + extra;
    const amt = Math.max(0, Number(this.state.gstAmount) || 0);
    let base, tax;
    if (this.state.gstMode === 'add') { base = amt; tax = amt * totalRate / 100; }
    else { base = amt / (1 + totalRate / 100); tax = amt - base; }
    const fedPart = base * federal / 100, extraPart = base * extra / 100;
    return { p, federal, extra, totalRate, base, tax, total: base + tax, fedPart, extraPart };
  }

  // ── Shared income-tax engine (2026) ───────────────────────────────
  fedBpa(ni) {
    const f = ToolsLogic.FED;
    if (ni <= f.bpaFrom) return f.bpaMax;
    if (ni >= f.bpaTo) return f.bpaMin;
    return f.bpaMax - (f.bpaMax - f.bpaMin) * (ni - f.bpaFrom) / (f.bpaTo - f.bpaFrom);
  }
  ontarioHealthPremium(ti) {
    const steps = [[20000, 0, 0.06, 300], [36000, 300, 0.06, 450], [48000, 450, 0.25, 600], [72000, 600, 0.25, 750], [200000, 750, 0.25, 900]];
    let prem = 0;
    for (const [from, baseAmt, r, cap] of steps) if (ti > from) prem = Math.min(cap, baseAmt + (ti - from) * r);
    return prem;
  }
  // taxable: income after deductions. credits: base CPP/QPP + EI + QPIP amounts.
  incomeTax(taxable, p, credits, employmentIncome) {
    const qc = p.name === 'Quebec';
    const f = ToolsLogic.FED, low = f.brackets[0][1];
    const ceaAmt = Math.min(f.cea, Math.max(0, employmentIncome || 0));
    let federal = Math.max(0, this.bracketTax(taxable, f.brackets) - low * (this.fedBpa(taxable) + ceaAmt + credits));
    const abatement = qc ? federal * f.qcAbatement : 0;
    federal -= abatement;
    const pLow = p.brackets[0][1];
    const basic = Math.max(0, this.bracketTax(taxable, p.brackets) - pLow * (p.bpa + (qc ? 0 : credits)));
    let surtax = 0, health = 0;
    if (p.name === 'Ontario') {
      for (const [thr, r] of ToolsLogic.ON_SURTAX) surtax += Math.max(0, basic - thr) * r;
      health = this.ontarioHealthPremium(taxable);
    }
    return { federal, abatement, provBasic: basic, surtax, health, provincial: basic + surtax + health };
  }

  // ── Payroll ───────────────────────────────────────────────────────
  payroll() {
    const p = this.prov(this.state.payProv);
    const qc = p.name === 'Quebec';
    const freq = ToolsLogic.FREQ.find(f => f.name === this.state.payFreq) || ToolsLogic.FREQ[1];
    const per = freq.per;
    const hourly = this.state.payBasis === 'hourly';
    const rate = Math.max(0, Number(this.state.payRate) || 0);
    const hours = Math.max(0, Number(this.state.payHours) || 0);
    const gross = hourly ? rate * hours * 52 : Math.max(0, Number(this.state.payGross) || 0);

    const pen = qc ? ToolsLogic.QPP : ToolsLogic.CPP;
    const cpp1 = Math.min(Math.max(gross - pen.exempt, 0), pen.ympe - pen.exempt) * pen.rate;
    const cpp2 = Math.min(Math.max(gross - pen.ympe, 0), pen.yampe - pen.ympe) * pen.rate2;
    const cppBase = cpp1 * pen.base / pen.rate;
    const cpp = cpp1 + cpp2;

    const ei = qc ? ToolsLogic.EI_QC : ToolsLogic.EI;
    const eiPrem = Math.min(gross, ei.mie) * ei.rate;
    const eiEmployer = eiPrem * ei.employerFactor;

    const qpipIns = qc ? Math.min(gross, ToolsLogic.QPIP.mie) : 0;
    const qpip = qpipIns * ToolsLogic.QPIP.employee;
    const qpipEmployer = qpipIns * ToolsLogic.QPIP.employer;

    // Enhanced CPP and CPP2 are deductions; base CPP, EI and QPIP are credits.
    const taxable = Math.max(0, gross - (cpp1 - cppBase) - cpp2);
    const t = this.incomeTax(taxable, p, cppBase + eiPrem + qpip, gross);

    const totalDed = cpp + eiPrem + qpip + t.federal + t.provincial;
    const net = gross - totalDed;
    const employerTotal = gross + cpp + eiEmployer + qpipEmployer;

    return { p, qc, gross, per, hourly, rate, hours, cpp, cpp1, cpp2, eiPrem, eiEmployer, qpip, qpipEmployer, federal: t.federal, provincial: t.provincial, tax: t, totalDed, net, employerTotal, penName: qc ? 'QPP' : 'CPP' };
  }

  // ── Cash flow ─────────────────────────────────────────────────────
  cash() {
    const open = Number(this.state.cashOpening) || 0;
    const inflow = Math.max(0, Number(this.state.cashIn) || 0);
    const opex = Math.max(0, Number(this.state.cashOut) || 0);
    const pay = Math.max(0, Number(this.state.cashPayroll) || 0);
    const gstAmt = Math.max(0, Number(this.state.cashGst) || 0);
    const oneOff = Math.max(0, Number(this.state.cashOneOff) || 0);
    const oneOffWeek = Math.min(13, Math.max(1, Math.round(Number(this.state.cashOneOffWeek) || 1)));

    const freqMap = { 'Weekly': 1, 'Every two weeks': 2, 'Twice a month': 2, 'Monthly': 4 };
    const step = freqMap[this.state.cashPayrollFreq] || 2;

    let bal = open, low = open, lowWeek = 0, firstNeg = 0;
    const rows = [];
    for (let w = 1; w <= 13; w++) {
      let out = opex;
      const notes = [];
      if (w % step === 0) { out += pay; notes.push('Payroll'); }
      if (w === 13 && gstAmt > 0) { out += gstAmt; notes.push('GST/HST remittance'); }
      if (w === oneOffWeek && oneOff > 0) { out += oneOff; notes.push('One-off cost'); }
      bal += inflow - out;
      if (bal < low) { low = bal; lowWeek = w; }
      if (bal < 0 && firstNeg === 0) firstNeg = w;
      rows.push({
        week: 'Week ' + w,
        note: notes.join(' · '),
        inflow: this.money0(inflow),
        outflow: this.money0(out),
        balance: this.money0(bal),
        color: bal < 0 ? '#B42318' : bal < inflow ? '#B54708' : '#14181D',
        bg: bal < 0 ? '#FEF3F2' : w % 2 === 0 ? '#FCFCFD' : '#fff'
      });
    }
    return { rows, low, lowWeek, firstNeg, closing: bal, inflow };
  }

  // ── Loan ──────────────────────────────────────────────────────────
  payment(principal, annualRate, years) {
    const r = annualRate / 100 / 12, n = years * 12;
    if (principal <= 0 || n <= 0) return 0;
    if (r === 0) return principal / n;
    return principal * r / (1 - Math.pow(1 + r, -n));
  }

  // ── Self-employed ─────────────────────────────────────────────────
  selfEmployed() {
    const p = this.prov(this.state.selfProv);
    const qc = p.name === 'Quebec';
    const ni = Math.max(0, Number(this.state.selfIncome) || 0);
    const t4 = Math.max(0, Number(this.state.selfT4) || 0);
    const pen = qc ? ToolsLogic.QPP : ToolsLogic.CPP;
    // Pensionable room left after employment earnings
    const t4Pens = Math.min(Math.max(t4 - pen.exempt, 0), pen.ympe - pen.exempt);
    const room1 = Math.max(0, (pen.ympe - pen.exempt) - t4Pens);
    const exemptLeft = Math.max(0, pen.exempt - t4);
    const se1 = Math.min(Math.max(ni - exemptLeft, 0), room1);
    const cppSelf1 = se1 * pen.rate * 2;
    const room2 = Math.max(0, (pen.yampe - pen.ympe) - Math.max(0, Math.min(t4, pen.yampe) - pen.ympe));
    const se2 = Math.min(Math.max(t4 + ni - Math.max(pen.ympe, t4), 0), room2);
    const cppSelf2 = se2 * pen.rate2 * 2;
    const half1 = cppSelf1 / 2, base = half1 * pen.base / pen.rate;
    // Employer half + enhanced employee part + employee CPP2 are deductions; employee base part is a credit
    const deduction = half1 + (half1 - base) + cppSelf2;
    const qpipIns = qc ? Math.max(0, Math.min(ni, Math.max(0, ToolsLogic.QPIP.mie - t4))) : 0;
    const qpip = qpipIns * ToolsLogic.QPIP.self;
    const qpipCredit = qpipIns * ToolsLogic.QPIP.employee;
    // Credits from the T4 job (base CPP, EI, QPIP) so the tax is not overstated
    const ei = qc ? ToolsLogic.EI_QC : ToolsLogic.EI;
    const t4Credits = t4Pens * pen.base + Math.min(t4, ei.mie) * ei.rate + (qc ? Math.min(t4, ToolsLogic.QPIP.mie) * ToolsLogic.QPIP.employee : 0);
    const t4Ded = t4Pens * (pen.rate - pen.base) + Math.max(0, Math.min(t4, pen.yampe) - pen.ympe) * pen.rate2;
    const taxable = Math.max(0, ni + t4 - deduction - t4Ded);
    const withJob = this.incomeTax(Math.max(0, t4 - t4Ded), p, t4Credits, t4);
    const all = this.incomeTax(taxable, p, base + qpipCredit + t4Credits, t4);
    const fed = all.federal - withJob.federal, prov = all.provincial - withJob.provincial;
    const incomeTax = Math.max(0, fed + prov);
    const total = cppSelf1 + cppSelf2 + qpip + incomeTax;
    // Instalments: net tax owing > $3,000 ($1,800 in Quebec, federal only)
    const owingTest = qc ? fed : total;
    const threshold = qc ? 1800 : 3000;
    return { p, qc, ni, t4, cppSelf1, cppSelf2, qpip, fed, prov, incomeTax, total, monthly: total / 12, instalments: owingTest > threshold, quarter: total / 4, rate: ni > 0 ? total / ni : 0, penName: qc ? 'QPP' : 'CPP' };
  }

  // ── Import landed cost ────────────────────────────────────────────
  landed() {
    const p = this.prov(this.state.impProv);
    const v = Math.max(0, Number(this.state.impValue) || 0);
    const fx = Math.max(0, Number(this.state.impFx) || 0);
    const goods = v * fx;
    const freight = Math.max(0, Number(this.state.impFreight) || 0);
    const duty = goods * Math.max(0, Number(this.state.impDuty) || 0) / 100;
    const surtax = goods * Math.max(0, Number(this.state.impSurtax) || 0) / 100;
    const broker = Math.max(0, Number(this.state.impBroker) || 0);
    const units = Math.max(1, Math.round(Number(this.state.impUnits) || 1));
    const hst = p.gst === 0;
    const borderRate = hst ? p.extra : 5;
    const borderTax = (goods + duty + surtax) * borderRate / 100;
    const landed = goods + freight + duty + surtax + broker;
    const perUnit = landed / units;
    const margin = Math.min(95, Math.max(0, Number(this.state.impMargin) || 0));
    const price = perUnit / (1 - margin / 100);
    const noTariff = (landed - surtax) / units;
    return { p, hst, borderRate, goods, freight, duty, surtax, broker, units, borderTax, landed, perUnit, price, margin, noTariff };
  }

  // ── Pricing and break-even ────────────────────────────────────────
  pricing() {
    const price = Math.max(0, Number(this.state.prPrice) || 0);
    const vc = Math.max(0, Number(this.state.prVar) || 0);
    const fixed = Math.max(0, Number(this.state.prFixed) || 0);
    const units = Math.max(0, Number(this.state.prUnits) || 0);
    const rise = Math.max(0, Number(this.state.prRise) || 0) / 100;
    const cm = price - vc;
    const cmPct = price > 0 ? cm / price : 0;
    const be = cm > 0 ? fixed / cm : Infinity;
    const profit = cm * units - fixed;
    const markup = vc > 0 ? cm / vc : 0;
    const vc2 = vc * (1 + rise);
    const keepDollar = vc2 + cm;
    const keepPct = cmPct < 1 ? vc2 / (1 - cmPct) : Infinity;
    const cm2 = price - vc2;
    const be2 = cm2 > 0 ? fixed / cm2 : Infinity;
    const unitsToKeepProfit = cm2 > 0 ? (profit + fixed) / cm2 : Infinity;
    return { price, vc, fixed, units, rise, cm, cmPct, be, profit, markup, vc2, keepDollar, keepPct, cm2, be2, unitsToKeepProfit };
  }

  renderVals() {
    const v = this.state.view;
    const provinceNames = ToolsLogic.PROVINCES.map(p => p.name);
    const tabs = [{ key: 'index', label: 'All tools', hash: '#index' }].concat(
      ToolsLogic.TOOLS.map(t => ({ key: t.key, label: t.title.replace(' Calculator', '').replace(' Estimator', '').replace(' Forecaster', ''), hash: '#' + t.key }))
    ).map(t => ({
      label: t.label, hash: t.hash,
      border: t.key === v ? '#004FB8' : 'transparent',
      color: t.key === v ? '#004FB8' : '#5A6470'
    }));

    const g = this.gst();
    const gstRows = [
      { label: this.state.gstMode === 'add' ? 'Amount before tax' : 'Amount before tax (backed out)', value: this.money(g.base), weight: '400' }
    ];
    if (g.federal > 0) gstRows.push({ label: 'GST at ' + g.federal + '%', value: this.money(g.fedPart), weight: '400' });
    if (g.extra > 0) gstRows.push({ label: g.p.extraLabel + ' at ' + g.extra + '%', value: this.money(g.extraPart), weight: '400' });
    gstRows.push({ label: 'Total tax', value: this.money(g.tax), weight: '600' });
    gstRows.push({ label: 'Total charged', value: this.money(g.total), weight: '700' });

    const pay = this.payroll();
    const d = n => this.money(n / pay.per);
    const payRows = [
      { label: pay.hourly ? 'Gross pay (' + (pay.hours * (52 / pay.per)).toFixed(1) + ' h)' : 'Gross pay', employee: d(pay.gross), employer: '—', weight: '400', bg: '#fff' },
      { label: pay.penName + ' contribution', employee: d(pay.cpp), employer: d(pay.cpp), weight: '400', bg: '#FCFCFD' },
      { label: pay.qc ? 'EI premium (Quebec rate)' : 'EI premium', employee: d(pay.eiPrem), employer: d(pay.eiEmployer), weight: '400', bg: '#fff' },
      ...(pay.qc ? [{ label: 'QPIP premium', employee: d(pay.qpip), employer: d(pay.qpipEmployer), weight: '400', bg: '#FCFCFD' }] : []),
      { label: pay.qc ? 'Federal income tax (after 16.5% Quebec abatement)' : 'Federal income tax', employee: d(pay.federal), employer: '—', weight: '400', bg: '#FCFCFD' },
      { label: pay.p.name + (pay.p.name === 'Ontario' ? ' income tax (incl. surtax and health premium)' : ' income tax'), employee: d(pay.provincial), employer: '—', weight: '400', bg: '#fff' },
      { label: 'Total deductions', employee: d(pay.totalDed), employer: d(pay.cpp + pay.eiEmployer + pay.qpipEmployer), weight: '600', bg: '#F4F6F8' },
      { label: 'Net pay', employee: d(pay.net), employer: '—', weight: '700', bg: '#F4F6F8' }
    ];
    const pen = pay.qc ? ToolsLogic.QPP : ToolsLogic.CPP;
    const eiCfg = pay.qc ? ToolsLogic.EI_QC : ToolsLogic.EI;
    const payCeilings = [
      { label: pay.penName + ' rate and ceiling', value: (pen.rate * 100).toFixed(2) + '% to $' + pen.ympe.toLocaleString('en-CA') },
      { label: pay.penName + '2 rate and band', value: '4.00% from $' + pen.ympe.toLocaleString('en-CA') + ' to $' + pen.yampe.toLocaleString('en-CA') },
      { label: 'Basic exemption', value: '$' + pen.exempt.toLocaleString('en-CA') },
      { label: 'EI rate and maximum insurable', value: (eiCfg.rate * 100).toFixed(2) + '% to $' + eiCfg.mie.toLocaleString('en-CA') },
      ...(pay.qc ? [{ label: 'QPIP rate and maximum insurable', value: (ToolsLogic.QPIP.employee * 100).toFixed(3) + '% to $' + ToolsLogic.QPIP.mie.toLocaleString('en-CA') }] : []),
      { label: 'Federal lowest rate and basic personal amount', value: '14% · $' + ToolsLogic.FED.bpaMax.toLocaleString('en-CA') },
      { label: 'Canada employment amount', value: '$' + ToolsLogic.FED.cea.toLocaleString('en-CA') },
      { label: pay.p.name + ' basic personal amount', value: '$' + pay.p.bpa.toLocaleString('en-CA') }
    ];

    const c = this.cash();
    const shortfall = c.low < 0;
    const tight = !shortfall && c.low < c.inflow;

    const amt = Math.max(0, Number(this.state.loanAmount) || 0);
    const rate = Number(this.state.loanRate) || 0;
    const yrs = Math.max(1, Math.round(Number(this.state.loanYears) || 1));
    const monthly = this.payment(amt, rate, yrs);
    const totalPaid = monthly * yrs * 12;
    const lineMonthly = amt * (rate + 1.5) / 100 / 12;
    const equipMonthly = this.payment(amt, rate - 1, Math.min(yrs, 7));

    const setLoan = (a, r, y) => () => this.setState({ loanAmount: a, loanRate: r, loanYears: y });

    return {
      taxYear: ToolsLogic.YEAR,
      tabs, provinceNames,
      tools: ToolsLogic.TOOLS.map(t => ({ ...t, hash: '#' + t.key })),
      freqNames: ToolsLogic.FREQ.map(f => f.name),
      noSubmit: e => e.preventDefault(),

      showIndex: v === 'index',
      showCalc: v !== 'index',
      showGst: v === 'gst',
      showPayroll: v === 'payroll',
      showCash: v === 'cashflow',
      showLoan: v === 'loan',
      showSelf: v === 'self-employed',
      showImport: v === 'import',
      showPricing: v === 'pricing',

      // GST
      gstProv: this.state.gstProv,
      gstAmount: this.state.gstAmount,
      onGstProv: e => this.setState({ gstProv: e.target.value }),
      onGstAmount: e => this.setState({ gstAmount: this.num(e) }),
      setGstAdd: () => this.setState({ gstMode: 'add' }),
      setGstRemove: () => this.setState({ gstMode: 'remove' }),
      gstAddOn: this.state.gstMode === 'add',
      gstRemoveOn: this.state.gstMode === 'remove',
      gstAddBorder: this.state.gstMode === 'add' ? '#D71920' : '#D0D5DD',
      gstAddBg: this.state.gstMode === 'add' ? '#D71920' : '#fff',
      gstAddFg: this.state.gstMode === 'add' ? '#fff' : '#14181D',
      gstRemBorder: this.state.gstMode === 'remove' ? '#D71920' : '#D0D5DD',
      gstRemBg: this.state.gstMode === 'remove' ? '#D71920' : '#fff',
      gstRemFg: this.state.gstMode === 'remove' ? '#fff' : '#14181D',
      gstTotalLabel: this.state.gstMode === 'add' ? 'Total to charge the customer' : 'Tax inside that total',
      gstTotal: this.state.gstMode === 'add' ? this.money(g.total) : this.money(g.tax),
      gstRateNote: g.p.system + ' — ' + g.totalRate.toFixed(g.totalRate % 1 === 0 ? 0 : 3) + '% combined',
      gstRows,
      gstGuidance: g.extra > 0 && g.federal > 0
        ? g.p.extraLabel + ' is administered by ' + g.p.name + ', separately from GST. You file and remit the two taxes to different authorities on different schedules.'
        : g.federal === 0
          ? 'HST combines the federal and provincial portions into one tax, filed and remitted to the CRA in a single return.'
          : 'No provincial sales tax applies here — you charge the 5% GST only, and remit it to the CRA.',
      gstTable: ToolsLogic.PROVINCES.map((p, i) => ({
        name: p.name, system: p.system,
        rate: (p.gst + p.extra).toFixed((p.gst + p.extra) % 1 === 0 ? 0 : 3) + '%',
        bg: p.name === this.state.gstProv ? '#FEF3F2' : i % 2 === 0 ? '#fff' : '#FCFCFD'
      })),

      // Payroll
      payGross: this.state.payGross,
      payProv: this.state.payProv,
      payFreq: this.state.payFreq,
      payRate: this.state.payRate,
      payHours: this.state.payHours,
      payIsHourly: pay.hourly,
      payIsSalary: !pay.hourly,
      paySalBorder: pay.hourly ? '#D0D5DD' : '#D71920',
      paySalBg: pay.hourly ? '#fff' : '#D71920',
      paySalFg: pay.hourly ? '#14181D' : '#fff',
      payHrBorder: pay.hourly ? '#D71920' : '#D0D5DD',
      payHrBg: pay.hourly ? '#D71920' : '#fff',
      payHrFg: pay.hourly ? '#fff' : '#14181D',
      setPaySalary: () => this.setState({ payBasis: 'salary' }),
      setPayHourly: () => this.setState({ payBasis: 'hourly' }),
      onPayRate: e => this.setState({ payRate: this.num(e) }),
      onPayHours: e => this.setState({ payHours: this.num(e) }),
      payGrossNote: pay.hourly
        ? this.money(pay.rate) + ' × ' + pay.hours + ' h a week = ' + this.money0(pay.gross) + ' a year'
        : this.money(pay.gross / pay.per) + ' gross each pay period',
      payHourlyEquiv: pay.hourly
        ? 'Equivalent salary ' + this.money0(pay.gross)
        : 'About ' + this.money(pay.gross / 2080) + ' an hour at 40 h a week',
      onPayGross: e => this.setState({ payGross: this.num(e) }),
      onPayProv: e => this.setState({ payProv: e.target.value }),
      onPayFreq: e => this.setState({ payFreq: e.target.value }),
      payNet: this.money(pay.net / pay.per),
      payPeriodNote: pay.per + ' pay periods a year · ' + this.money0(pay.net) + ' net annually',
      payEmployerCost: this.money(pay.employerTotal / pay.per),
      payEmployerNote: this.money0(pay.employerTotal - pay.gross) + ' a year above salary',
      payRows, payCeilings,
      payRemitNote: pay.qc
        ? 'Quebec employers remit QPP, QPIP, and Quebec income tax to Revenu Québec, and federal income tax and EI to the CRA. Two remittances, two schedules.'
        : 'New employers usually remit monthly, by the 15th of the month after you withheld the deductions. The CRA moves you to accelerated remitting once your average monthly withholding passes $25,000.',

      // Cash flow
      cashOpening: this.state.cashOpening,
      cashIn: this.state.cashIn,
      cashOut: this.state.cashOut,
      cashPayroll: this.state.cashPayroll,
      cashPayrollFreq: this.state.cashPayrollFreq,
      cashGst: this.state.cashGst,
      cashOneOff: this.state.cashOneOff,
      cashOneOffWeek: this.state.cashOneOffWeek,
      onCashOpening: e => this.setState({ cashOpening: this.num(e) }),
      onCashIn: e => this.setState({ cashIn: this.num(e) }),
      onCashOut: e => this.setState({ cashOut: this.num(e) }),
      onCashPayroll: e => this.setState({ cashPayroll: this.num(e) }),
      onCashPayrollFreq: e => this.setState({ cashPayrollFreq: e.target.value }),
      onCashGst: e => this.setState({ cashGst: this.num(e) }),
      onCashOneOff: e => this.setState({ cashOneOff: this.num(e) }),
      onCashOneOffWeek: e => this.setState({ cashOneOffWeek: this.num(e) }),
      cashRows: c.rows,
      cashLow: this.money0(c.low),
      cashVerdict: shortfall
        ? 'You run out of cash in week ' + c.firstNeg + ', bottoming out at ' + this.money0(c.low) + ' in week ' + c.lowWeek + '. Line up an operating line, delay a discretionary cost, or tighten collections before then — arranging credit is far easier while the balance is still positive.'
        : tight
          ? 'Tightest in week ' + c.lowWeek + ', with less than one week of collections in reserve. That is survivable but leaves no room for a late-paying customer.'
          : 'You stay positive across the quarter, with your tightest week at ' + this.money0(c.low) + ' in week ' + c.lowWeek + ' and closing at ' + this.money0(c.closing) + '. Worth stress-testing: cut weekly collections by 20% and see what happens.',
      cashVerdictBg: shortfall ? '#FEF3F2' : tight ? '#FFFAEB' : '#101828',
      cashVerdictFg: shortfall ? '#912018' : tight ? '#7A2E0E' : '#fff',
      cashVerdictBorder: shortfall ? '#FDA29B' : tight ? '#FEC84B' : '#101828',

      // Self-employed
      ...(() => {
        const r = this.selfEmployed();
        const pct = n => (n * 100).toFixed(1) + '%';
        const row = (label, value, w, bg) => ({ label, value, weight: w || '400', bg: bg || '#fff' });
        return {
          selfIncome: this.state.selfIncome, selfProv: this.state.selfProv, selfT4: this.state.selfT4,
          onSelfIncome: e => this.setState({ selfIncome: this.num(e) }),
          onSelfProv: e => this.setState({ selfProv: e.target.value }),
          onSelfT4: e => this.setState({ selfT4: this.num(e) }),
          selfMonthly: this.money0(r.monthly),
          selfNote: this.money0(r.total) + ' for the year — about ' + pct(r.rate) + ' of your net business income.',
          selfRows: [
            row('Net business income', this.money0(r.ni)),
            row(r.penName + ' (both halves, ' + (r.qc ? '12.6' : '11.9') + '%)', this.money0(r.cppSelf1), '400', '#FCFCFD'),
            row(r.penName + '2 (both halves, 8%)', this.money0(r.cppSelf2)),
            ...(r.qc ? [row('QPIP (self-employed rate)', this.money0(r.qpip), '400', '#FCFCFD')] : []),
            row(r.qc ? 'Federal income tax (after Quebec abatement)' : 'Federal income tax', this.money0(r.fed), '400', '#FCFCFD'),
            row(r.p.name + ' income tax', this.money0(r.prov)),
            row('Total to set aside', this.money0(r.total), '700', '#F4F6F8')
          ],
          selfTips: [
            r.instalments
              ? 'You will likely be asked to pay quarterly instalments: about ' + this.money0(r.quarter) + ' on March 15, June 15, September 15 and December 15. The CRA requires them when net tax owing is over ' + (r.qc ? '$1,800 federally' : '$3,000') + ' this year and in either of the two previous years.'
              : 'At this income your tax owing is under the instalment threshold, so you can likely pay in one amount with your return — but still set money aside monthly.',
            'Self-employed returns are due June 15, but any balance owing is due April 30. Interest runs from May 1.',
            'GST/HST you collect is not income and is not in these figures. Keep it in a separate account and remit it on its own schedule.',
            'Incorporating, RRSP contributions, the home-office and vehicle deductions can all change this number. Run it past an accountant before you rely on it.'
          ]
        };
      })(),

      // Import
      ...(() => {
        const r = this.landed();
        const row = (label, value, w, bg) => ({ label, value, weight: w || '400', bg: bg || '#fff' });
        return {
          impValue: this.state.impValue, impCur: this.state.impCur, impFx: this.state.impFx, impFreight: this.state.impFreight,
          impDuty: this.state.impDuty, impSurtax: this.state.impSurtax, impBroker: this.state.impBroker, impProv: this.state.impProv,
          impUnits: this.state.impUnits, impMargin: this.state.impMargin, impCurrencies: ToolsLogic.CURRENCIES,
          onImpValue: e => this.setState({ impValue: this.num(e) }),
          onImpCur: e => this.setState({ impCur: e.target.value }),
          onImpFx: e => this.setState({ impFx: this.num(e) }),
          onImpFreight: e => this.setState({ impFreight: this.num(e) }),
          onImpDuty: e => this.setState({ impDuty: this.num(e) }),
          onImpSurtax: e => this.setState({ impSurtax: this.num(e) }),
          onImpBroker: e => this.setState({ impBroker: this.num(e) }),
          onImpProv: e => this.setState({ impProv: e.target.value }),
          onImpUnits: e => this.setState({ impUnits: this.num(e) }),
          onImpMargin: e => this.setState({ impMargin: this.num(e) }),
          impPerUnit: this.money(r.perUnit),
          impNote: 'Price at ' + r.margin + '% gross margin: ' + this.money(r.price) + ' per unit, before ' + (r.hst ? 'HST' : 'sales tax') + '.' + (r.surtax > 0 ? ' The surtax alone adds ' + this.money(r.surtax / r.units) + ' per unit.' : ''),
          impRows: [
            row('Goods in CAD (' + this.state.impCur + ' at ' + (Number(this.state.impFx) || 0) + ')', this.money0(r.goods)),
            row('Freight and insurance', this.money0(r.freight), '400', '#FCFCFD'),
            row('Customs duty', this.money0(r.duty)),
            row('Surtax / counter-tariff', this.money0(r.surtax), '400', '#FCFCFD'),
            row('Broker and fees', this.money0(r.broker)),
            row('Landed cost (excluding recoverable tax)', this.money0(r.landed), '600', '#F4F6F8'),
            row((r.hst ? r.borderRate + '% HST' : '5% GST') + ' paid at the border', this.money0(r.borderTax), '400', '#fff'),
            row('Cash needed up front', this.money0(r.landed + r.borderTax), '700', '#F4F6F8'),
            row('Landed cost per unit', this.money(r.perUnit), '700', '#fff')
          ],
          impTips: [
            'GST/HST paid at the border is recoverable as an input tax credit if you are GST/HST-registered — but you still need the cash on the day the goods are released.',
            (r.p.extraLabel === 'PST' || r.p.extraLabel === 'RST') ? r.p.name + ' ' + r.p.extraLabel + ' is not collected at the border. Goods you resell are generally exempt; goods you use in the business may require you to self-assess it.' : r.p.name === 'Quebec' ? 'QST is not collected by the CBSA. If you are QST-registered, account for it with Revenu Québec.' : 'Keep the B3 / CARM release documents: they are your proof for the input tax credit.',
            'Duty rates depend on the tariff classification (HS code) and origin. Goods that qualify under CUSMA, CETA or CPTPP may enter duty-free with the right proof of origin.',
            'Exchange rates move. Re-run this at 5% weaker Canadian dollar before you commit to a large order.'
          ]
        };
      })(),

      // Pricing
      ...(() => {
        const r = this.pricing();
        const pct = n => isFinite(n) ? (n * 100).toFixed(1) + '%' : '—';
        const u = n => isFinite(n) ? Math.ceil(n).toLocaleString('en-CA') : 'Not reachable';
        const row = (label, value, w, bg) => ({ label, value, weight: w || '400', bg: bg || '#fff' });
        return {
          prPrice: this.state.prPrice, prVar: this.state.prVar, prFixed: this.state.prFixed, prUnits: this.state.prUnits, prRise: this.state.prRise,
          onPrPrice: e => this.setState({ prPrice: this.num(e) }),
          onPrVar: e => this.setState({ prVar: this.num(e) }),
          onPrFixed: e => this.setState({ prFixed: this.num(e) }),
          onPrUnits: e => this.setState({ prUnits: this.num(e) }),
          onPrRise: e => this.setState({ prRise: this.num(e) }),
          prBreakEven: isFinite(r.be) ? u(r.be) + ' units' : 'Not reachable',
          prNote: isFinite(r.be)
            ? this.money0(r.be * r.price) + ' in monthly sales. ' + (r.units >= r.be ? 'You are ' + u(r.units - r.be) + ' units above it.' : 'You are ' + u(r.be - r.units) + ' units short.')
            : 'Your price does not cover your variable cost, so every sale loses money. Raise the price or cut the cost per unit first.',
          prRows: [
            row('Contribution per unit', this.money(r.cm)),
            row('Gross margin', pct(r.cmPct), '400', '#FCFCFD'),
            row('Markup on cost', pct(r.markup)),
            row('Monthly sales', this.money0(r.price * r.units), '400', '#FCFCFD'),
            row('Monthly fixed costs', this.money0(r.fixed)),
            row(r.profit >= 0 ? 'Monthly profit' : 'Monthly loss', this.money0(r.profit), '700', '#F4F6F8')
          ],
          prRiseRows: [
            row('New variable cost per unit (+' + (r.rise * 100).toFixed(1) + '%)', this.money(r.vc2)),
            row('Price to keep the same dollars per unit', this.money(r.keepDollar), '600', '#FCFCFD'),
            row('Price to keep the same ' + pct(r.cmPct) + ' margin', isFinite(r.keepPct) ? this.money(r.keepPct) : '—', '600'),
            row('Or units needed at today’s price to keep profit', u(r.unitsToKeepProfit), '400', '#FCFCFD')
          ],
          prTips: [
            'Margin and markup are not the same: a 50% markup is only a 33% margin. Quote and compare using margin.',
            'Holding the same percentage margin needs a bigger price rise than holding the same dollars — but it protects you if costs keep climbing.',
            'Most customers notice one clear increase less than several small ones. Explain the cost driver (fuel, materials, tariffs) when you raise prices.',
            'Run break-even on your slowest month. If that month is below break-even, plan cash for it with the cash-flow forecaster.'
          ]
        };
      })(),

      // Loan
      loanAmount: this.state.loanAmount,
      loanRate: this.state.loanRate,
      loanYears: this.state.loanYears,
      loanRateLabel: rate.toFixed(2) + '%',
      loanTermLabel: yrs + (yrs === 1 ? ' year' : ' years'),
      onLoanAmount: e => this.setState({ loanAmount: this.num(e) }),
      onLoanRate: e => this.setState({ loanRate: this.num(e) }),
      onLoanYears: e => this.setState({ loanYears: this.num(e) }),
      loanMonthly: this.money(monthly),
      loanInterest: this.money0(totalPaid - amt),
      loanTotal: this.money0(totalPaid),
      loanCompare: [
        { name: 'Term loan', note: 'Fixed amortizing payment over ' + yrs + (yrs === 1 ? ' year' : ' years') + '. Predictable, and the balance actually goes down.', monthly: this.money(monthly), interest: this.money0(totalPaid - amt) },
        { name: 'Operating line of credit', note: 'Interest-only on what you draw, typically 1–2% above a term rate. Cheap monthly, but the principal never clears itself.', monthly: this.money(lineMonthly), interest: this.money0(lineMonthly * 12) + ' a year, ongoing' },
        { name: 'Equipment financing', note: 'Secured against the asset, so often a point cheaper — but tied to that purchase and capped near the asset life.', monthly: this.money(equipMonthly), interest: this.money0(equipMonthly * Math.min(yrs, 7) * 12 - amt) }
      ],
      loanPresets: [
        { label: 'BDC small business loan', detail: '$100,000 over 5 years, around 8.5%', apply: setLoan(100000, 8.5, 5) },
        { label: 'Equipment purchase', detail: '$250,000 over 7 years, around 7.25%', apply: setLoan(250000, 7.25, 7) },
        { label: 'Working capital top-up', detail: '$50,000 over 3 years, around 10.5%', apply: setLoan(50000, 10.5, 3) }
      ],
      loanChecklist: [
        'Ask for the total cost of borrowing in dollars, not just the rate — setup fees, standby charges, and insurance are often quoted separately.',
        'Check the prepayment terms. Some term loans charge three months of interest to pay out early, which matters if you expect a strong year.',
        'Confirm whether a personal guarantee is required, and for how much. This is the single most consequential clause for an owner-operator.',
        'Run the payment against your worst quarter, not your average one. Debt service is due whether the season cooperates or not.',
        'If the rate is variable, model it two points higher before you sign.'
      ]
    };
  }
}

