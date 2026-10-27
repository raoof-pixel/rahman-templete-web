// @ts-nocheck — the calculators from the CanadianSME Tools prototype, ported verbatim. Rates are the
// prototype's published 2026 figures; the page states they are illustrative, not tax advice.
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
  // ── 2026 federal figures ──────────────────────────────────────────
  static YEAR = 2026;
  static CPP = { rate: 0.0595, exempt: 3500, ympe: 74600, yampe: 85000, rate2: 0.04 };
  static QPP = { rate: 0.0640, exempt: 3500, ympe: 74600, yampe: 85000, rate2: 0.04 };
  static EI = { rate: 0.0163, employerFactor: 1.4, mie: 68900 };
  static EI_QC = { rate: 0.0130, employerFactor: 1.4, mie: 68900 };
  static FED = {
    bpa: 16452,
    brackets: [[58523, 0.14], [117045, 0.205], [181440, 0.26], [258482, 0.29], [Infinity, 0.33]]
  };

  // ── Provinces: sales tax + simplified income tax ──────────────────
  static PROVINCES = [
    { name: 'Alberta', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 22323, brackets: [[60000, 0.08], [151234, 0.10], [181481, 0.12], [241975, 0.13], [362962, 0.14], [Infinity, 0.15]] },
    { name: 'British Columbia', gst: 5, extra: 7, extraLabel: 'PST', system: 'GST + 7% PST', bpa: 12932, brackets: [[49900, 0.0506], [99820, 0.077], [114600, 0.105], [139100, 0.1229], [188400, 0.147], [262460, 0.168], [Infinity, 0.205]] },
    { name: 'Manitoba', gst: 5, extra: 7, extraLabel: 'RST', system: 'GST + 7% RST', bpa: 15969, brackets: [[47900, 0.108], [102150, 0.1275], [Infinity, 0.174]] },
    { name: 'New Brunswick', gst: 0, extra: 15, extraLabel: 'HST', system: '15% HST', bpa: 13396, brackets: [[51300, 0.094], [102614, 0.14], [190060, 0.16], [Infinity, 0.195]] },
    { name: 'Newfoundland and Labrador', gst: 0, extra: 15, extraLabel: 'HST', system: '15% HST', bpa: 11067, brackets: [[44200, 0.087], [88400, 0.145], [157900, 0.158], [220900, 0.178], [282200, 0.198], [564500, 0.208], [1128500, 0.213], [Infinity, 0.218]] },
    { name: 'Northwest Territories', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 17842, brackets: [[51900, 0.059], [103800, 0.086], [168800, 0.122], [Infinity, 0.1405]] },
    { name: 'Nova Scotia', gst: 0, extra: 14, extraLabel: 'HST', system: '14% HST', bpa: 11744, brackets: [[30500, 0.0879], [61000, 0.1495], [95900, 0.1667], [154650, 0.175], [Infinity, 0.21]] },
    { name: 'Nunavut', gst: 5, extra: 0, extraLabel: '', system: 'GST only', bpa: 19274, brackets: [[54700, 0.04], [109400, 0.07], [177900, 0.09], [Infinity, 0.115]] },
    { name: 'Ontario', gst: 0, extra: 13, extraLabel: 'HST', system: '13% HST', bpa: 12747, brackets: [[53000, 0.0505], [106000, 0.0915], [150000, 0.1116], [220000, 0.1216], [Infinity, 0.1316]] },
    { name: 'Prince Edward Island', gst: 0, extra: 15, extraLabel: 'HST', system: '15% HST', bpa: 14650, brackets: [[33300, 0.095], [66600, 0.1347], [105000, 0.166], [140000, 0.1762], [Infinity, 0.19]] },
    { name: 'Quebec', gst: 5, extra: 9.975, extraLabel: 'QST', system: 'GST + 9.975% QST', bpa: 18571, brackets: [[54400, 0.14], [108800, 0.19], [132600, 0.24], [Infinity, 0.2575]] },
    { name: 'Saskatchewan', gst: 5, extra: 6, extraLabel: 'PST', system: 'GST + 6% PST', bpa: 19491, brackets: [[55500, 0.105], [158700, 0.125], [Infinity, 0.145]] },
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
    { key: 'loan', mark: '⌾', title: 'Loan Payment Calculator', desc: 'Compare BDC term loan, operating line, and equipment financing scenarios.' }
  ];

  state = {
    view: 'index',
    gstProv: 'Ontario', gstMode: 'add', gstAmount: 1000,
    payGross: 65000, payProv: 'Ontario', payFreq: 'Every two weeks (26 per year)',
    payBasis: 'salary', payRate: 24, payHours: 40,
    cashOpening: 40000, cashIn: 14000, cashOut: 9000, cashPayroll: 12000,
    cashPayrollFreq: 'Every two weeks', cashGst: 9500, cashOneOff: 0, cashOneOffWeek: 6,
    loanAmount: 150000, loanRate: 8.5, loanYears: 5
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
    const cpp = cpp1 + cpp2;

    const ei = qc ? ToolsLogic.EI_QC : ToolsLogic.EI;
    const eiPrem = Math.min(gross, ei.mie) * ei.rate;
    const eiEmployer = eiPrem * ei.employerFactor;

    const taxable = Math.max(0, gross - cpp2 * 1);
    const fedGross = this.bracketTax(taxable, ToolsLogic.FED.brackets);
    const fedCredit = ToolsLogic.FED.bpa * ToolsLogic.FED.brackets[0][1] + (cpp1 + eiPrem) * ToolsLogic.FED.brackets[0][1];
    const federal = Math.max(0, fedGross - fedCredit);

    const provGross = this.bracketTax(taxable, p.brackets);
    const provCredit = p.bpa * p.brackets[0][1] + (cpp1 + eiPrem) * p.brackets[0][1];
    const provincial = Math.max(0, provGross - provCredit);

    const totalDed = cpp + eiPrem + federal + provincial;
    const net = gross - totalDed;
    const employerTotal = gross + cpp + eiEmployer;

    return { p, qc, gross, per, hourly, rate, hours, cpp, cpp1, cpp2, eiPrem, eiEmployer, federal, provincial, totalDed, net, employerTotal, penName: qc ? 'QPP' : 'CPP' };
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
        color: bal < 0 ? '#D71920' : bal < inflow ? '#B54708' : '#101828',
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

  renderVals() {
    const v = this.state.view;
    const provinceNames = ToolsLogic.PROVINCES.map(p => p.name);
    const tabs = [{ key: 'index', label: 'All tools', hash: '#index' }].concat(
      ToolsLogic.TOOLS.map(t => ({ key: t.key, label: t.title.replace(' Calculator', '').replace(' Estimator', '').replace(' Forecaster', ''), hash: '#' + t.key }))
    ).map(t => ({
      label: t.label, hash: t.hash,
      border: t.key === v ? '#D71920' : 'transparent',
      color: t.key === v ? '#D71920' : '#667085'
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
      { label: 'Federal income tax', employee: d(pay.federal), employer: '—', weight: '400', bg: '#FCFCFD' },
      { label: pay.p.name + ' income tax', employee: d(pay.provincial), employer: '—', weight: '400', bg: '#fff' },
      { label: 'Total deductions', employee: d(pay.totalDed), employer: d(pay.cpp + pay.eiEmployer), weight: '600', bg: '#F4F6F8' },
      { label: 'Net pay', employee: d(pay.net), employer: '—', weight: '700', bg: '#F4F6F8' }
    ];
    const pen = pay.qc ? ToolsLogic.QPP : ToolsLogic.CPP;
    const eiCfg = pay.qc ? ToolsLogic.EI_QC : ToolsLogic.EI;
    const payCeilings = [
      { label: pay.penName + ' rate and ceiling', value: (pen.rate * 100).toFixed(2) + '% to $' + pen.ympe.toLocaleString('en-CA') },
      { label: pay.penName + '2 rate and band', value: '4.00% from $' + pen.ympe.toLocaleString('en-CA') + ' to $' + pen.yampe.toLocaleString('en-CA') },
      { label: 'Basic exemption', value: '$' + pen.exempt.toLocaleString('en-CA') },
      { label: 'EI rate and maximum insurable', value: (eiCfg.rate * 100).toFixed(2) + '% to $' + eiCfg.mie.toLocaleString('en-CA') },
      { label: 'Federal basic personal amount', value: '$' + ToolsLogic.FED.bpa.toLocaleString('en-CA') },
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
      gstAddFg: this.state.gstMode === 'add' ? '#fff' : '#475467',
      gstRemBorder: this.state.gstMode === 'remove' ? '#D71920' : '#D0D5DD',
      gstRemBg: this.state.gstMode === 'remove' ? '#D71920' : '#fff',
      gstRemFg: this.state.gstMode === 'remove' ? '#fff' : '#475467',
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
      paySalFg: pay.hourly ? '#475467' : '#fff',
      payHrBorder: pay.hourly ? '#D71920' : '#D0D5DD',
      payHrBg: pay.hourly ? '#D71920' : '#fff',
      payHrFg: pay.hourly ? '#fff' : '#475467',
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
