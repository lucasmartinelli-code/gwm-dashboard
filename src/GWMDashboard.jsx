import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend, ComposedChart, Line } from "recharts";

const RAW = [
  { id:"160572791349", payerId:"1484140576", date:"28/05/2026 10:32", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
  { id:"160572791103", payerId:"1838848438", date:"28/05/2026 10:29", status:"approved",  detail:"accredited",                           amount:35,  method:"visa",   op:"regular_payment"   },
  { id:"160571983281", payerId:"1265525820", date:"28/05/2026 10:25", status:"rejected",  detail:"cc_rejected_high_risk",                amount:56,  method:"master", op:"regular_payment"   },
  { id:"160571883291", payerId:"1514735909", date:"28/05/2026 10:24", status:"approved",  detail:"accredited",                           amount:56,  method:"master", op:"regular_payment"   },
  { id:"160565153747", payerId:"1815500727", date:"28/05/2026 09:42", status:"approved",  detail:"accredited",                           amount:56,  method:"master", op:"regular_payment"   },
  { id:"160565702963", payerId:"1912296216", date:"28/05/2026 09:36", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
  { id:"160565462825", payerId:"1912296216", date:"28/05/2026 09:33", status:"rejected",  detail:"cc_rejected_bad_filled_card_number",   amount:56,  method:"master", op:"regular_payment"   },
  { id:"160565142647", payerId:"1581203984", date:"28/05/2026 09:28", status:"approved",  detail:"accredited",                           amount:35,  method:"visa",   op:"regular_payment"   },
  { id:"161352197548", payerId:"1566390850", date:"28/05/2026 09:18", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
  { id:"161352196990", payerId:"1555359166", date:"28/05/2026 09:11", status:"approved",  detail:"accredited",                           amount:35,  method:"amex",   op:"regular_payment"   },
  { id:"161351065404", payerId:"1599256717", date:"28/05/2026 09:10", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
  { id:"161351802722", payerId:"1600195052", date:"28/05/2026 09:05", status:"approved",  detail:"accredited",                           amount:56,  method:"visa",   op:"recurring_payment" },
  { id:"161352240296", payerId:"1600195052", date:"28/05/2026 09:04", status:"rejected",  detail:"cc_rejected_bad_filled_date",          amount:56,  method:"visa",   op:"recurring_payment" },
  { id:"160559020761", payerId:"1559600815", date:"28/05/2026 08:39", status:"approved",  detail:"accredited",                           amount:56,  method:"master", op:"regular_payment"   },
  { id:"160558592313", payerId:"1998998126", date:"28/05/2026 08:31", status:"approved",  detail:"accredited",                           amount:35,  method:"visa",   op:"regular_payment"   },
  { id:"161345533868", payerId:"1784034780", date:"28/05/2026 08:25", status:"approved",  detail:"accredited",                           amount:350, method:"master", op:"regular_payment"   },
  { id:"161346216960", payerId:"1842289964", date:"28/05/2026 08:21", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
  { id:"161345698566", payerId:"1614691440", date:"28/05/2026 08:12", status:"approved",  detail:"accredited",                           amount:56,  method:"master", op:"regular_payment"   },
  { id:"160553990079", payerId:"1891394997", date:"28/05/2026 08:08", status:"approved",  detail:"accredited",                           amount:56,  method:"visa",   op:"regular_payment"   },
  { id:"160553706047", payerId:"1891394997", date:"28/05/2026 08:06", status:"rejected",  detail:"cc_rejected_bad_filled_security_code", amount:56,  method:"master", op:"regular_payment"   },
  { id:"160554314907", payerId:"3255242841", date:"28/05/2026 07:58", status:"approved",  detail:"accredited",                           amount:350, method:"visa",   op:"regular_payment"   },
  { id:"160554148285", payerId:"1559552633", date:"28/05/2026 07:50", status:"approved",  detail:"accredited",                           amount:35,  method:"amex",   op:"regular_payment"   },
  { id:"161341030588", payerId:"1613699617", date:"28/05/2026 07:23", status:"approved",  detail:"accredited",                           amount:35,  method:"visa",   op:"regular_payment"   },
  { id:"160549202711", payerId:"1530034030", date:"28/05/2026 06:57", status:"approved",  detail:"accredited",                           amount:56,  method:"master", op:"regular_payment"   },
  { id:"161336464760", payerId:"1615013446", date:"28/05/2026 06:28", status:"rejected",  detail:"cc_rejected_bad_filled_security_code", amount:35,  method:"master", op:"regular_payment"   },
  { id:"160545202003", payerId:"1586129248", date:"28/05/2026 06:23", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
  { id:"160545018051", payerId:"1586129248", date:"28/05/2026 06:19", status:"rejected",  detail:"cc_rejected_call_for_authorize",       amount:35,  method:"master", op:"regular_payment"   },
  { id:"161332497454", payerId:"1447323829", date:"28/05/2026 05:33", status:"approved",  detail:"accredited",                           amount:35,  method:"master", op:"regular_payment"   },
];

const COLLECTOR_ID = "3166103110";
const METHOD_COLORS = { master:"#3b82f6", visa:"#a855f7", amex:"#10b981" };
const STATUS_COLORS = { approved:"#22c55e", rejected:"#ef4444", refunded:"#f59e0b" };
const REJ_COLORS = {
  cc_rejected_high_risk:                "#ef4444",
  cc_rejected_bad_filled_card_number:   "#f87171",
  cc_rejected_bad_filled_date:          "#fca5a5",
  cc_rejected_bad_filled_security_code: "#fb923c",
  cc_rejected_call_for_authorize:       "#f59e0b",
  cc_rejected_insufficient_amount:      "#fbbf24",
};
const REJ_SHORT = {
  cc_rejected_high_risk:                "High Risk",
  cc_rejected_bad_filled_card_number:   "Nº Cartão",
  cc_rejected_bad_filled_date:          "Data",
  cc_rejected_bad_filled_security_code: "CVV",
  cc_rejected_call_for_authorize:       "Call Auth",
  cc_rejected_insufficient_amount:      "Fundos",
};
const REJ_LABEL = {
  cc_rejected_high_risk:                "High Risk (PF)",
  cc_rejected_bad_filled_card_number:   "Nº Cartão inválido",
  cc_rejected_bad_filled_date:          "Data inválida",
  cc_rejected_bad_filled_security_code: "CVV inválido",
  cc_rejected_call_for_authorize:       "Call for Auth (banco)",
  cc_rejected_insufficient_amount:      "Fundos insuficientes",
};

function parseDate(str) {
  const [d, t] = str.split(" ");
  const [day, mon, year] = d.split("/");
  return new Date(`${year}-${mon}-${day}T${t}:00`);
}

function pct(a, b) { return b === 0 ? 0 : Math.round((a / b) * 1000) / 10; }
function brl(v)    { return `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`; }

// ── user_try_last: janela 24h rolante por Payer+Collector+Amount ──
function applyUserTryLast(rows) {
  // Ordena mais recente primeiro para facilitar agrupamento
  const sorted = [...rows].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  const kept = new Set();
  const groups = {}; // key → timestamp mais recente já registrado

  sorted.forEach(r => {
    const ts  = parseDate(r.date).getTime();
    const key = `${r.payerId}|${COLLECTOR_ID}|${r.amount}`;
    if (!(key in groups)) {
      // Primeira vez vendo este grupo → é o mais recente → mantém
      groups[key] = ts;
      kept.add(r.id);
    } else {
      // Já vimos um mais recente. Verifica se está dentro de 24h
      const diff = groups[key] - ts; // ms
      if (diff <= 24 * 60 * 60 * 1000) {
        // Mesma intenção de compra dentro de 24h → descarta (retentativa)
      } else {
        // Além de 24h → nova intenção, mantém e atualiza âncora
        groups[key] = ts;
        kept.add(r.id);
      }
    }
  });
  return rows.filter(r => kept.has(r.id));
}

const Tip = ({ active, payload, label, metric }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:7, padding:"9px 13px", fontSize:11, minWidth:150 }}>
      <div style={{ color:"#64748b", marginBottom:5, fontSize:10 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.stroke || "#e2e8f0", marginBottom:2 }}>
          {p.name}: {p.name === "Aprovação" ? `${p.value}%` : metric === "brl" ? brl(p.value) : p.value}
        </div>
      ))}
    </div>
  );
};

export default function GWMDashboard() {
  const [metric,  setMetric]  = useState("qty");   // "qty" | "brl"
  const [tryLast, setTryLast] = useState(false);   // último intento por payer
  const [tab,     setTab]     = useState("overview");

  // Dataset após filtro user_try_last
  const data = useMemo(() => tryLast ? applyUserTryLast(RAW) : RAW, [tryLast]);
  const removedCount = RAW.length - data.length;

  // ── KPIs ──
  const total      = data.length;
  const volTotal   = data.reduce((s, r) => s + r.amount, 0);
  const approved   = data.filter(r => r.status === "approved");
  const rejected   = data.filter(r => r.status === "rejected");
  const volApproved = approved.reduce((s, r) => s + r.amount, 0);
  const volRejected = rejected.reduce((s, r) => s + r.amount, 0);
  const aproQty    = pct(approved.length, total);
  const aproBrl    = pct(volApproved, volTotal);
  const aproVal    = metric === "qty" ? aproQty : aproBrl;
  const statusColor = aproVal >= 75 ? "#22c55e" : aproVal >= 50 ? "#f59e0b" : "#ef4444";
  const statusLabel = aproVal >= 75 ? "NORMAL"  : aproVal >= 50 ? "ALERTA"  : "CRÍTICO";

  // ── Rejeições ──
  const rejMap = {};
  rejected.forEach(r => {
    if (!rejMap[r.detail]) rejMap[r.detail] = { qty:0, brl:0 };
    rejMap[r.detail].qty++;
    rejMap[r.detail].brl += r.amount;
  });
  const rejData = Object.entries(rejMap)
    .sort((a, b) => b[1][metric] - a[1][metric])
    .map(([code, v]) => ({
      code, label: REJ_LABEL[code]||code, short: REJ_SHORT[code]||code,
      qty: v.qty, brl: v.brl,
      shareQty: pct(v.qty, total), shareBrl: pct(v.brl, volTotal),
    }));

  // ── Bandeiras ──
  const methodMap = {};
  data.forEach(r => {
    if (!methodMap[r.method]) methodMap[r.method] = { qty:0, brl:0 };
    methodMap[r.method].qty++;
    methodMap[r.method].brl += r.amount;
  });
  const methodData = Object.entries(methodMap)
    .map(([name, v]) => ({
      name, qty: v.qty, brl: v.brl,
      share: pct(metric === "qty" ? v.qty : v.brl, metric === "qty" ? total : volTotal),
    }))
    .sort((a, b) => b[metric] - a[metric]);

  // ── Pie ──
  const pieData = [
    { name:"Aprovadas",  value: metric==="qty" ? approved.length : volApproved, color:"#22c55e" },
    { name:"Rejeitadas", value: metric==="qty" ? rejected.length : volRejected, color:"#ef4444" },
  ].filter(d => d.value > 0);

  // ── Hourly: aprovadas vs rejeitadas ──
  const hourMap = {};
  data.forEach(r => {
    const h = r.date.split(" ")[1].split(":")[0] + "h";
    if (!hourMap[h]) hourMap[h] = { hora:h, aprovadas_qty:0, rejeitadas_qty:0, aprovadas_brl:0, rejeitadas_brl:0 };
    if (r.status==="approved") { hourMap[h].aprovadas_qty++;  hourMap[h].aprovadas_brl  += r.amount; }
    if (r.status==="rejected") { hourMap[h].rejeitadas_qty++; hourMap[h].rejeitadas_brl += r.amount; }
  });
  const hourData = Object.values(hourMap).sort((a,b)=>parseInt(a.hora)-parseInt(b.hora)).map(h => ({
    hora: h.hora,
    Aprovadas:  metric==="qty" ? h.aprovadas_qty  : h.aprovadas_brl,
    Rejeitadas: metric==="qty" ? h.rejeitadas_qty : h.rejeitadas_brl,
    apro_pct: pct(metric==="qty" ? h.aprovadas_qty : h.aprovadas_brl,
                  metric==="qty" ? h.aprovadas_qty+h.rejeitadas_qty : h.aprovadas_brl+h.rejeitadas_brl),
  }));

  // ── Hourly: recusas empilhadas + linha aprovação ──
  const allRejCodes = [...new Set(rejected.map(r => r.detail))];
  const hourRejMap = {};
  data.forEach(r => {
    const h = r.date.split(" ")[1].split(":")[0] + "h";
    if (!hourRejMap[h]) hourRejMap[h] = { hora:h, _tot_qty:0, _apro_qty:0, _tot_brl:0, _apro_brl:0 };
    hourRejMap[h]._tot_qty++;
    hourRejMap[h]._tot_brl += r.amount;
    if (r.status==="approved") { hourRejMap[h]._apro_qty++; hourRejMap[h]._apro_brl += r.amount; }
    if (r.status==="rejected") {
      hourRejMap[h][r.detail+"_qty"] = (hourRejMap[h][r.detail+"_qty"]||0) + 1;
      hourRejMap[h][r.detail+"_brl"] = (hourRejMap[h][r.detail+"_brl"]||0) + r.amount;
    }
  });
  const hourRejData = Object.values(hourRejMap).sort((a,b)=>parseInt(a.hora)-parseInt(b.hora)).map(h => {
    const tot  = metric==="qty" ? h._tot_qty  : h._tot_brl;
    const apro = metric==="qty" ? h._apro_qty : h._apro_brl;
    const row  = { hora: h.hora, "Aprovação": pct(apro, tot) };
    allRejCodes.forEach(code => { row[REJ_SHORT[code]||code] = h[code+"_"+(metric==="brl"?"brl":"qty")]||0; });
    return row;
  });

  return (
    <div style={{ background:"#070b12", minHeight:"100vh", fontFamily:"'IBM Plex Mono','Courier New',monospace", color:"#e2e8f0", padding:"20px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600;700&display=swap');
        * { box-sizing:border-box; }
        .card { background:#0f172a; border:1px solid #1e293b; border-radius:8px; }
        .fade { animation:fd .3s ease; }
        @keyframes fd { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:none} }
        .tbtn { background:none; border:none; cursor:pointer; font-family:inherit; font-size:11px; letter-spacing:.1em; padding:6px 14px; border-radius:5px; transition:all .15s; }
        .mbtn { border:none; cursor:pointer; font-family:inherit; font-size:11px; font-weight:700; letter-spacing:.1em; padding:6px 16px; border-radius:5px; transition:all .2s; }
      `}</style>

      {/* ── HEADER ── */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18, borderBottom:"1px solid #1e293b", paddingBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:6, background:"linear-gradient(135deg,#1d4ed8,#7c3aed)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700 }}>G</div>
          <div>
            <div style={{ fontSize:15, fontWeight:700, color:"#f1f5f9", letterSpacing:".06em" }}>GWM · DASHBOARD ANALÍTICO</div>
            <div style={{ fontSize:9, color:"#334155", letterSpacing:".12em" }}>SELLER 3166103110 · MLB · 28/05/2026</div>
          </div>
        </div>

        {/* ── TOGGLE GROUP ── */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>

          {/* QTD / R$ */}
          <div style={{ display:"flex", background:"#0f172a", border:"1px solid #1e293b", borderRadius:7, padding:3 }}>
            {[["qty","QTD"],["brl","R$"]].map(([k,l]) => (
              <button key={k} className="mbtn" onClick={() => setMetric(k)}
                style={{ background: metric===k ? "linear-gradient(135deg,#1d4ed8,#7c3aed)" : "none", color: metric===k ? "#fff" : "#475569" }}>
                {l}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width:1, height:28, background:"#1e293b" }} />

          {/* Último Intento por Payer */}
          <button className="mbtn" onClick={() => setTryLast(p => !p)}
            style={{
              background: tryLast ? "linear-gradient(135deg,#065f46,#047857)" : "#0f172a",
              color:  tryLast ? "#6ee7b7" : "#475569",
              border: `1px solid ${tryLast ? "#065f46" : "#1e293b"}`,
              fontSize:10, padding:"6px 12px", position:"relative",
            }}>
            {tryLast && <span style={{ position:"absolute", top:-5, right:-5, width:8, height:8, background:"#10b981", borderRadius:"50%", border:"1px solid #070b12" }} />}
            ÚLTIMO INTENTO / PAYER
          </button>

          {/* Badge de retentativas removidas */}
          {tryLast && removedCount > 0 && (
            <div style={{ background:"#1c1107", border:"1px solid #92400e", borderRadius:5, padding:"4px 10px", fontSize:10, color:"#fbbf24" }}>
              {removedCount} retentativa{removedCount>1?"s":""} removida{removedCount>1?"s":""}
            </div>
          )}
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ display:"flex", gap:4, marginBottom:16, background:"#0f172a", borderRadius:7, padding:4, width:"fit-content", border:"1px solid #1e293b" }}>
        {[["overview","VISÃO GERAL"],["rejeicoes","REJEIÇÕES"],["timeline","TIMELINE"],["transacoes","TRANSAÇÕES"]].map(([k,l]) => (
          <button key={k} className="tbtn" onClick={() => setTab(k)}
            style={{ color:tab===k?"#f1f5f9":"#475569", background:tab===k?"#1e3a5f":"none", fontWeight:tab===k?600:400 }}>
            {l}
          </button>
        ))}
      </div>

      <div className="fade" key={tab+metric+tryLast}>

        {/* ════ OVERVIEW ════ */}
        {tab==="overview" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10 }}>
              {[
                { l:"APROVAÇÃO",     v:`${aproVal}%`,                                          sub:statusLabel, color:statusColor },
                { l:"TOTAL",         v: metric==="qty"?total:brl(volTotal),                    sub: metric==="qty"?"transações":"volume total" },
                { l:"APROVADAS",     v: metric==="qty"?approved.length:brl(volApproved),       sub:`${metric==="qty"?aproQty:aproBrl}%` },
                { l:"REJEITADAS",    v: metric==="qty"?rejected.length:brl(volRejected),       sub:`${metric==="qty"?pct(rejected.length,total):pct(volRejected,volTotal)}%` },
                { l:"VOL. APROVADO", v: brl(volApproved),                                      sub:`de ${brl(volTotal)} total` },
              ].map(({ l, v, sub, color }) => (
                <div key={l} className="card" style={{ padding:"12px 14px" }}>
                  <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em" }}>{l}</div>
                  <div style={{ fontSize:20, fontWeight:700, color:color||"#f1f5f9", marginTop:4, lineHeight:1.1 }}>{v}</div>
                  <div style={{ fontSize:10, color:"#334155", marginTop:3 }}>{sub}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div className="card" style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:4 }}>
                  STATUS · {metric==="qty"?"QUANTIDADE":"VALOR R$"}{tryLast?" · ÚLTIMO INTENTO":""}
                </div>
                <ResponsiveContainer width="100%" height={190}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={72} innerRadius={42} paddingAngle={3}>
                      {pieData.map((d,i) => <Cell key={i} fill={d.color} />)}
                    </Pie>
                    <Legend formatter={v => <span style={{ fontSize:11, color:"#94a3b8" }}>{v}</span>} />
                    <Tooltip content={<Tip metric={metric} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="card" style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:12 }}>
                  MIX DE BANDEIRAS · {metric==="qty"?"QTD":"R$"}{tryLast?" · ÚLTIMO INTENTO":""}
                </div>
                {methodData.map(({ name, qty, brl:b, share }) => (
                  <div key={name} style={{ marginBottom:11 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, marginBottom:3 }}>
                      <span style={{ color:"#94a3b8", textTransform:"capitalize" }}>{name}</span>
                      <span style={{ color:METHOD_COLORS[name]||"#64748b", fontWeight:600 }}>
                        {metric==="qty" ? `${qty} txns` : brl(b)} · {share}%
                      </span>
                    </div>
                    <div style={{ background:"#1e293b", borderRadius:3, height:5 }}>
                      <div style={{ width:`${share}%`, height:"100%", background:METHOD_COLORS[name]||"#64748b", borderRadius:3, transition:"width 1s" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════ REJEIÇÕES ════ */}
        {tab==="rejeicoes" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div className="card" style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>
                  MOTIVOS · {metric==="qty"?"QUANTIDADE":"VALOR R$"}{tryLast?" · ÚLTIMO INTENTO":""}
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={rejData} layout="vertical" margin={{ left:0, right:24 }}>
                    <XAxis type="number" tick={{ fontSize:10, fill:"#475569" }} tickFormatter={v => metric==="brl"?`R$${v}`:v} />
                    <YAxis type="category" dataKey="short" tick={{ fontSize:10, fill:"#64748b" }} width={72} />
                    <Tooltip content={<Tip metric={metric} />} />
                    <Bar dataKey={metric} name={metric==="qty"?"Ocorrências":"Valor R$"} radius={[0,3,3,0]}>
                      {rejData.map((d,i) => <Cell key={i} fill={REJ_COLORS[d.code]||"#ef4444"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="card" style={{ padding:"14px 16px" }}>
                <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>SHARE SOBRE TOTAL</div>
                {rejData.length===0 && <div style={{ color:"#334155", fontSize:12 }}>Nenhuma rejeição</div>}
                {rejData.map((r,i) => (
                  <div key={i} style={{ background:"#070b12", borderRadius:5, padding:"9px 11px", marginBottom:7 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:2 }}>
                      <span style={{ fontSize:11, color:"#cbd5e1" }}>{r.label}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:REJ_COLORS[r.code]||"#ef4444" }}>
                        {metric==="qty"?`${r.shareQty}%`:`${r.shareBrl}%`}
                      </span>
                    </div>
                    <div style={{ fontSize:10, color:"#475569" }}>
                      {metric==="qty"?`${r.qty} ocorrência${r.qty>1?"s":""}`:brl(r.brl)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card" style={{ padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>REJEIÇÕES POR BANDEIRA</div>
              <div style={{ display:"flex", gap:10 }}>
                {["master","visa","amex"].map(m => {
                  const ms   = data.filter(r => r.method===m);
                  const mr   = ms.filter(r => r.status==="rejected");
                  if (!ms.length) return null;
                  const volMs = ms.reduce((s,r)=>s+r.amount,0);
                  const volMr = mr.reduce((s,r)=>s+r.amount,0);
                  const rate  = metric==="qty" ? pct(mr.length,ms.length) : pct(volMr,volMs);
                  return (
                    <div key={m} style={{ flex:1, background:"#070b12", borderRadius:6, padding:"10px 12px" }}>
                      <div style={{ fontSize:10, color:METHOD_COLORS[m], fontWeight:600, textTransform:"capitalize", marginBottom:4 }}>{m}</div>
                      <div style={{ fontSize:22, fontWeight:700, color:"#f1f5f9" }}>{rate}%</div>
                      <div style={{ fontSize:10, color:"#475569" }}>
                        {metric==="qty"?`${mr.length}/${ms.length} rejeitadas`:`${brl(volMr)} / ${brl(volMs)}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ════ TIMELINE ════ */}
        {tab==="timeline" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div className="card" style={{ padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>
                TRANSAÇÕES POR HORA · {metric==="qty"?"QUANTIDADE":"VALOR R$"}{tryLast?" · ÚLTIMO INTENTO":""}
              </div>
              <ResponsiveContainer width="100%" height={210}>
                <BarChart data={hourData} margin={{ left:0, right:10 }}>
                  <XAxis dataKey="hora" tick={{ fontSize:10, fill:"#475569" }} />
                  <YAxis tick={{ fontSize:10, fill:"#475569" }} />
                  <Tooltip content={<Tip metric={metric} />} />
                  <Bar dataKey="Aprovadas"  stackId="a" fill="#22c55e" radius={[0,0,0,0]} />
                  <Bar dataKey="Rejeitadas" stackId="a" fill="#ef4444" radius={[3,3,0,0]} />
                  <Legend formatter={v => <span style={{ fontSize:11, color:"#94a3b8" }}>{v}</span>} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card" style={{ padding:"14px 16px" }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em", marginBottom:10 }}>
                RECUSAS POR MOTIVO + TAXA DE APROVAÇÃO · {metric==="qty"?"QUANTIDADE":"VALOR R$"}{tryLast?" · ÚLTIMO INTENTO":""}
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <ComposedChart data={hourRejData} margin={{ left:0, right:44 }}>
                  <XAxis dataKey="hora" tick={{ fontSize:10, fill:"#475569" }} />
                  <YAxis yAxisId="left"  tick={{ fontSize:10, fill:"#475569" }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize:10, fill:"#94a3b8" }} tickFormatter={v=>`${v}%`} domain={[0,100]} />
                  <Tooltip content={({ active, payload, label }) => {
                    if (!active||!payload?.length) return null;
                    return (
                      <div style={{ background:"#0f172a", border:"1px solid #334155", borderRadius:7, padding:"9px 13px", fontSize:11 }}>
                        <div style={{ color:"#64748b", marginBottom:5, fontSize:10 }}>{label}</div>
                        {payload.map((p,i) => (
                          <div key={i} style={{ color:p.color||p.stroke||"#e2e8f0", marginBottom:2 }}>
                            {p.name}: {p.name==="Aprovação"?`${p.value}%`:metric==="brl"?brl(p.value):p.value}
                          </div>
                        ))}
                      </div>
                    );
                  }} />
                  {allRejCodes.map((code,i) => (
                    <Bar key={code} yAxisId="left" dataKey={REJ_SHORT[code]||code}
                      stackId="r" fill={REJ_COLORS[code]||"#ef4444"}
                      radius={i===allRejCodes.length-1?[3,3,0,0]:[0,0,0,0]} />
                  ))}
                  <Line yAxisId="right" type="monotone" dataKey="Aprovação"
                    stroke="#60a5fa" strokeWidth={2.5} dot={{ fill:"#60a5fa", r:4 }} />
                  <Legend formatter={v => <span style={{ fontSize:10, color:"#94a3b8" }}>{v}</span>} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              {["regular_payment","recurring_payment"].map(op => {
                const ops    = data.filter(r => r.op===op);
                const apro   = ops.filter(r => r.status==="approved");
                const volOp  = ops.reduce((s,r)=>s+r.amount,0);
                const volAp  = apro.reduce((s,r)=>s+r.amount,0);
                const rate   = metric==="qty" ? pct(apro.length,ops.length) : pct(volAp,volOp);
                return (
                  <div key={op} className="card" style={{ padding:"12px 14px" }}>
                    <div style={{ fontSize:9, color:"#475569", letterSpacing:".1em", marginBottom:6 }}>{op.replace("_"," ").toUpperCase()}</div>
                    <div style={{ fontSize:22, fontWeight:700, color:"#f1f5f9" }}>
                      {metric==="qty"?ops.length:brl(volOp)}
                      <span style={{ fontSize:11, color:"#475569", marginLeft:4 }}>{metric==="qty"?"txns":"total"}</span>
                    </div>
                    <div style={{ fontSize:11, color:"#94a3b8", marginTop:4 }}>
                      Aprovação: <span style={{ color:"#22c55e", fontWeight:600 }}>{rate}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════ TRANSAÇÕES ════ */}
        {tab==="transacoes" && (
          <div className="card" style={{ padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:9, color:"#475569", letterSpacing:".12em" }}>
                TRANSAÇÕES · {data.length} registros{tryLast?` (${removedCount} retentativas excluídas)`:""}
              </div>
              {tryLast && (
                <div style={{ fontSize:10, color:"#10b981", background:"#052e16", border:"1px solid #065f46", borderRadius:4, padding:"3px 9px" }}>
                  ✓ último intento / payer ativo
                </div>
              )}
            </div>
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid #1e293b" }}>
                    {["ID","Hora","Payer ID","Status","Detalhe","Valor","Bandeira","Operação"].map(h => (
                      <th key={h} style={{ textAlign:"left", padding:"6px 10px", color:"#475569", fontSize:9, letterSpacing:".1em", fontWeight:500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((r,i) => (
                    <tr key={r.id} style={{ borderBottom:"1px solid #0f172a", background:i%2===0?"transparent":"#070b12" }}>
                      <td style={{ padding:"7px 10px", color:"#334155", fontSize:10 }}>{r.id}</td>
                      <td style={{ padding:"7px 10px", color:"#64748b" }}>{r.date.split(" ")[1]}</td>
                      <td style={{ padding:"7px 10px", color:"#475569", fontSize:10 }}>{r.payerId}</td>
                      <td style={{ padding:"7px 10px" }}>
                        <span style={{ background:STATUS_COLORS[r.status]+"22", color:STATUS_COLORS[r.status], borderRadius:4, padding:"2px 7px", fontSize:10, fontWeight:600 }}>
                          {r.status}
                        </span>
                      </td>
                      <td style={{ padding:"7px 10px", color:"#64748b", fontSize:10 }}>{REJ_LABEL[r.detail]||r.detail}</td>
                      <td style={{ padding:"7px 10px", color:"#94a3b8" }}>R$ {r.amount.toFixed(2)}</td>
                      <td style={{ padding:"7px 10px", color:METHOD_COLORS[r.method]||"#64748b", textTransform:"capitalize" }}>{r.method}</td>
                      <td style={{ padding:"7px 10px", color:"#475569", fontSize:10 }}>{r.op.replace("_payment","")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
