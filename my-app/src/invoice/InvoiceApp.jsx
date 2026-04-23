import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

// ── Ganti password di sini ──
const SECRET = "bydev26";

const formatIDR = (n) =>
  "Rp " + Math.round(n).toLocaleString("id-ID");

const today = () => {
  const d = new Date();
  return d.toISOString().split("T")[0];
};

const autoInvNum = () => {
  const d = new Date();
  const ym = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}`;
  return `INV-${ym}-079`;
};

/* ───────── Print CSS (injected once) ───────── */
const PRINT_STYLE = `
* { cursor: auto !important; }
@media print {
  @page { size: A4; margin: 0; }
  body { margin: 0 !important; }
  .no-print { display: none !important; }
  .print-area { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 9999; background: white; }
}
`;

/* ───────── Invoice Preview ───────── */
const InvoicePreview = ({ form }) => {
  const total     = form.services.reduce((s, r) => s + (parseFloat(r.price) || 0), 0);
  const dp1       = total * (form.pct1 / 100);
  const dp2       = total * (form.pct2 / 100);
  const pelunasan = total * (form.pct3 / 100);

  return (
    <div id="invoice-preview" style={{ position: "relative", fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif", color: "#1e293b", background: "white", minHeight: "297mm" }}>

      {/* LUNAS stamp */}
      {form.lunas && (
        <div style={{
          position: "absolute", top: "45%", left: "50%",
          transform: "translate(-50%, -50%) rotate(-28deg)",
          border: "5px solid rgba(220,38,38,0.6)",
          borderRadius: 6, padding: "10px 36px",
          fontSize: 52, fontWeight: 900,
          color: "rgba(220,38,38,0.6)",
          letterSpacing: 10, pointerEvents: "none", zIndex: 10,
          whiteSpace: "nowrap", fontFamily: "serif",
        }}>LUNAS</div>
      )}

      {/* Header */}
      <div style={{ background: "#0f172a", color: "white", padding: "36px 52px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 3, color: "#38bdf8" }}>INVOICE</div>
          <div style={{ marginTop: 6, fontSize: 12, color: "#94a3b8" }}>{form.invNum}</div>
        </div>
        <div style={{ textAlign: "right", fontSize: 11, color: "#94a3b8", lineHeight: 1.8 }}>
          <div style={{ color: "white", fontWeight: 600, fontSize: 14 }}>Bryan Jacquellino</div>
          <div>Independent Tech Developer</div>
          <div>Yogyakarta, Indonesia</div>
          <div>jacquellinobryan@gmail.com</div>
        </div>
      </div>

      <div style={{ padding: "36px 52px" }}>

        {/* From / To / Dates */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Ditagihkan Kepada</div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{form.clientName || "Nama Klien"}</div>
            {form.clientCompany && <div style={{ fontSize: 12, color: "#475569" }}>{form.clientCompany}</div>}
            {form.clientEmail   && <div style={{ fontSize: 12, color: "#475569" }}>{form.clientEmail}</div>}
          </div>
          <div style={{ flex: 1, textAlign: "right" }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Detail Invoice</div>
            <div style={{ fontSize: 12, lineHeight: 2 }}>
              <span style={{ color: "#64748b" }}>Tanggal: </span>
              <strong>{form.invDate}</strong><br/>
              <span style={{ color: "#64748b" }}>Tanda Jadi (10%) jatuh tempo: </span>
              <strong>{form.dueDate}</strong>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #e2e8f0", marginBottom: 28 }}/>

        {/* Services table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
          <thead>
            <tr style={{ background: "#f8fafc" }}>
              <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 9, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", borderBottom: "2px solid #e2e8f0" }}>
                Deskripsi Layanan
              </th>
              <th style={{ textAlign: "right", padding: "12px 14px", fontSize: 9, fontWeight: 700, color: "#64748b", letterSpacing: 2, textTransform: "uppercase", borderBottom: "2px solid #e2e8f0", whiteSpace: "nowrap" }}>
                Harga
              </th>
            </tr>
          </thead>
          <tbody>
            {form.services.map((s, i) => (
              <tr key={i}>
                <td style={{ padding: "14px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12, verticalAlign: "top" }}>
                  <div style={{ fontWeight: 600 }}>{i + 1}. {s.name || "—"}</div>
                  {s.desc && <div style={{ fontSize: 10, color: "#64748b", marginTop: 3 }}>{s.desc}</div>}
                </td>
                <td style={{ padding: "14px 14px", borderBottom: "1px solid #f1f5f9", fontSize: 12, textAlign: "right", whiteSpace: "nowrap", verticalAlign: "top" }}>
                  {s.price ? formatIDR(s.price) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals + payment steps (right-aligned) */}
        <div style={{ marginLeft: "auto", width: "56%", marginBottom: 36 }}>
          {/* Total */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", fontSize: 13, borderBottom: "1px solid #e2e8f0" }}>
            <span style={{ color: "#64748b" }}>Total Project Value</span>
            <strong>{formatIDR(total)}</strong>
          </div>

          {/* Step 1 */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", marginTop: 12, background: "#eff6ff", borderRadius: 8, borderLeft: "4px solid #3b82f6" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1d4ed8" }}>Step 1 — Tanda Jadi ({form.pct1}%)</div>
              <div style={{ fontSize: 10, color: "#3b82f6", marginTop: 2 }}>Dibayar sebelum mulai · Jatuh tempo {form.dueDate}</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1d4ed8", alignSelf: "center", whiteSpace: "nowrap" }}>{formatIDR(dp1)}</div>
          </div>

          {/* Step 2 */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", marginTop: 8, background: "#faf5ff", borderRadius: 8, borderLeft: "4px solid #8b5cf6" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#6d28d9" }}>Step 2 — Termin ({form.pct2}%)</div>
              <div style={{ fontSize: 10, color: "#8b5cf6", marginTop: 2 }}>Dibayar setelah mockup / design disetujui</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#6d28d9", alignSelf: "center", whiteSpace: "nowrap" }}>{formatIDR(dp2)}</div>
          </div>

          {/* Step 3 */}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 16px", marginTop: 8, background: "#f0fdf4", borderRadius: 8, borderLeft: "4px solid #22c55e" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#15803d" }}>Step 3 — Pelunasan ({form.pct3}%)</div>
              <div style={{ fontSize: 10, color: "#22c55e", marginTop: 2 }}>Dibayar setelah website selesai & diserahkan</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#15803d", alignSelf: "center", whiteSpace: "nowrap" }}>{formatIDR(pelunasan)}</div>
          </div>
        </div>

        {/* Bank info */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 10, padding: "20px 24px", fontSize: 11, lineHeight: 2 }}>
          <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 4, color: "#0f172a" }}>Instruksi Pembayaran</div>
          <div>Bank: <strong>{form.bankName || "—"}</strong></div>
          <div>No. Rekening: <strong>{form.bankNumber || "—"}</strong></div>
          <div>Atas Nama: <strong>{form.bankOwner || "—"}</strong></div>
          {form.note && <div style={{ marginTop: 8, color: "#64748b", fontStyle: "italic" }}>{form.note}</div>}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, borderTop: "1px solid #f1f5f9", paddingTop: 16, fontSize: 10, color: "#94a3b8", textAlign: "center" }}>
          Terima kasih atas kepercayaan Anda · Bryan Jacquellino · jacquellinobryan@gmail.com
        </div>
      </div>
    </div>
  );
};

/* ───────── Main App ───────── */
export default function InvoiceApp() {
  const [auth, setAuth]   = useState(() => sessionStorage.getItem("inv_auth") === "1");
  const [pwd, setPwd]     = useState("");
  const [pwdErr, setPwdErr] = useState(false);

  const [form, setForm] = useState({
    invNum:       autoInvNum(),
    invDate:      today(),
    dueDate:      (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().split("T")[0]; })(),
    clientName:   "",
    clientCompany:"",
    clientEmail:  "",
    bankName:     "",
    bankNumber:   "",
    bankOwner:    "Bryan Jacquellino",
    note:         "*Proyek mulai dikerjakan (H+1) setelah pembayaran tanda jadi diterima.",
    pct1: 10,
    pct2: 40,
    pct3: 50,
    lunas: false,
    services: [
      { name: "", desc: "", price: "" },
    ],
  });

  const login = (e) => {
    e.preventDefault();
    if (pwd === SECRET) {
      sessionStorage.setItem("inv_auth", "1");
      setAuth(true);
    } else {
      setPwdErr(true);
      setTimeout(() => setPwdErr(false), 1500);
    }
  };

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const setService = (i, key, val) =>
    setForm(f => {
      const s = [...f.services];
      s[i] = { ...s[i], [key]: val };
      return { ...f, services: s };
    });

  const addService    = () => setForm(f => ({ ...f, services: [...f.services, { name: "", desc: "", price: "" }] }));
  const removeService = (i) => setForm(f => ({ ...f, services: f.services.filter((_, j) => j !== i) }));

  const downloadPDF = async () => {
    const el = document.getElementById("invoice-preview");
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgH = (canvas.height * pageW) / canvas.width;
    if (imgH <= pageH) {
      pdf.addImage(imgData, "JPEG", 0, 0, pageW, imgH);
    } else {
      let y = 0;
      while (y < imgH) {
        if (y > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, -y, pageW, imgH);
        y += pageH;
      }
    }
    pdf.save(`${form.invNum}.pdf`);
  };

  /* ── Password gate ── */
  if (!auth) return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      <style>{PRINT_STYLE}</style>
      <form onSubmit={login} className="w-full max-w-sm">
        <p className="text-xs font-mono text-violet-400 tracking-[0.2em] uppercase mb-3">Bryan Porto</p>
        <h1 className="text-2xl font-light text-white mb-8">Invoice Tool</h1>
        <input
          type="password"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          placeholder="Password"
          autoFocus
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-600
            text-sm focus:outline-none focus:border-violet-500 transition-colors
            ${pwdErr ? "border-red-500 animate-shake" : "border-white/10"}`}
        />
        {pwdErr && <p className="text-red-400 text-xs mt-2">Password salah.</p>}
        <button type="submit"
          className="w-full mt-4 py-3 rounded-xl bg-violet-600 hover:bg-violet-500
            text-white text-sm font-medium transition-colors">
          Masuk
        </button>
      </form>
    </div>
  );

  /* ── Invoice Tool ── */
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <style>{PRINT_STYLE}</style>

      {/* Top bar */}
      <div className="no-print sticky top-0 z-50 border-b border-white/[0.06] bg-[#09090b]/90 backdrop-blur-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-violet-400 tracking-widest uppercase">Invoice Generator</span>
          <span className="text-white/20">·</span>
          <span className="text-xs text-gray-500 font-mono">{form.invNum}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { sessionStorage.removeItem("inv_auth"); setAuth(false); }}
            className="px-3 py-1.5 text-xs text-gray-500 hover:text-white transition-colors">
            Keluar
          </button>
          <button onClick={downloadPDF}
            className="px-4 py-1.5 text-xs bg-violet-600 hover:bg-violet-500
              rounded-lg font-medium transition-colors">
            ↓ Download PDF
          </button>
        </div>
      </div>

      <div className="no-print flex gap-0 min-h-[calc(100vh-53px)]">

        {/* ── Form panel ── */}
        <div className="w-[420px] shrink-0 border-r border-white/[0.06] overflow-y-auto p-6 space-y-6">

          {/* Invoice meta */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Invoice</h2>
            <div className="space-y-2">
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">Nomor Invoice</label>
                <input value={form.invNum} onChange={e => set("invNum", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors font-mono"/>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Tanggal Invoice</label>
                  <input type="date" value={form.invDate} onChange={e => set("invDate", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"/>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 mb-1 block">Jatuh Tempo Step 1</label>
                  <input type="date" value={form.dueDate} onChange={e => set("dueDate", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"/>
                </div>
              </div>
            </div>
          </section>

          {/* Client info */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Klien</h2>
            <div className="space-y-2">
              {[
                { key: "clientName",    label: "Nama Klien / PIC",   ph: "Budi Santoso" },
                { key: "clientCompany", label: "Perusahaan (opsional)", ph: "PT. Maju Jaya" },
                { key: "clientEmail",   label: "Email (opsional)",    ph: "budi@company.com" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[11px] text-gray-500 mb-1 block">{f.label}</label>
                  <input value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                    placeholder={f.ph}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors"/>
                </div>
              ))}
            </div>
          </section>

          {/* Services */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Layanan</h2>
            <div className="space-y-3">
              {form.services.map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-gray-600">#{i + 1}</span>
                    {form.services.length > 1 && (
                      <button onClick={() => removeService(i)}
                        className="text-[11px] text-red-500/70 hover:text-red-400 transition-colors">
                        Hapus
                      </button>
                    )}
                  </div>
                  <input value={s.name} onChange={e => setService(i, "name", e.target.value)}
                    placeholder="Nama layanan (e.g. Landing Page Development)"
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors"/>
                  <input value={s.desc} onChange={e => setService(i, "desc", e.target.value)}
                    placeholder="Deskripsi singkat (opsional)"
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors"/>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">Rp</span>
                    <input type="number" value={s.price} onChange={e => setService(i, "price", e.target.value)}
                      placeholder="0"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors"/>
                  </div>
                </div>
              ))}
              <button onClick={addService}
                className="w-full py-2 text-xs text-violet-400 border border-dashed border-violet-500/30
                  rounded-xl hover:border-violet-500/60 hover:bg-violet-500/5 transition-all">
                + Tambah Layanan
              </button>
            </div>
          </section>

          {/* Bank info */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Info Rekening</h2>
            <div className="space-y-2">
              {[
                { key: "bankName",   label: "Nama Bank",      ph: "BCA / Mandiri / BRI..." },
                { key: "bankNumber", label: "Nomor Rekening",  ph: "1234567890" },
                { key: "bankOwner",  label: "Atas Nama",       ph: "Bryan Jacquellino" },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[11px] text-gray-500 mb-1 block">{f.label}</label>
                  <input value={form[f.key]} onChange={e => set(f.key, e.target.value)}
                    placeholder={f.ph}
                    className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors"/>
                </div>
              ))}
            </div>
          </section>

          {/* Payment steps */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Pembayaran (%)</h2>
            <div className="space-y-2">
              {[
                { key: "pct1", label: "Step 1 — Tanda Jadi" },
                { key: "pct2", label: "Step 2 — Termin" },
                { key: "pct3", label: "Step 3 — Pelunasan" },
              ].map(f => {
                const total = form.services.reduce((s, r) => s + (parseFloat(r.price) || 0), 0);
                const amt   = total * (form[f.key] / 100);
                return (
                  <div key={f.key} className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="text-[11px] text-gray-500 mb-1 block">{f.label}</label>
                      <div className="relative">
                        <input
                          type="number" min="0" max="100"
                          value={form[f.key]}
                          onChange={e => set(f.key, parseFloat(e.target.value) || 0)}
                          className="w-full pr-8 pl-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-violet-500 transition-colors"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                      </div>
                    </div>
                    <div className="shrink-0 pt-5 text-xs text-gray-500 font-mono min-w-[90px] text-right">
                      {total ? formatIDR(amt) : "—"}
                    </div>
                  </div>
                );
              })}
              {(() => {
                const sum = form.pct1 + form.pct2 + form.pct3;
                return sum !== 100
                  ? <p className="text-[11px] text-amber-400">⚠ Total {sum}% — sebaiknya 100%</p>
                  : <p className="text-[11px] text-green-500">✓ Total 100%</p>;
              })()}
            </div>
          </section>

          {/* LUNAS toggle */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Status</h2>
            <button
              onClick={() => set("lunas", !form.lunas)}
              className={`w-full py-2.5 text-sm font-semibold rounded-xl border transition-all ${
                form.lunas
                  ? "bg-red-500/15 border-red-500/40 text-red-400"
                  : "bg-white/[0.03] border-white/[0.07] text-gray-500 hover:border-white/20 hover:text-gray-400"
              }`}
            >
              {form.lunas ? "LUNAS — Stempel Aktif" : "Tandai LUNAS"}
            </button>
          </section>

          {/* Note */}
          <section>
            <h2 className="text-xs font-mono text-gray-500 tracking-widest uppercase mb-3">Catatan</h2>
            <textarea value={form.note} onChange={e => set("note", e.target.value)} rows={3}
              className="w-full px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-700 focus:outline-none focus:border-violet-500 transition-colors resize-none"/>
          </section>

          {/* Summary */}
          {(() => {
            const total = form.services.reduce((s, r) => s + (parseFloat(r.price) || 0), 0);
            if (!total) return null;
            return (
              <section className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 space-y-2">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-3">Ringkasan Pembayaran</p>
                <div className="flex justify-between text-sm"><span className="text-gray-400">Total</span><span>{formatIDR(total)}</span></div>
                <div className="flex justify-between text-sm text-blue-400"><span>Step 1 · {form.pct1}% Tanda Jadi</span><span>{formatIDR(total * form.pct1 / 100)}</span></div>
                <div className="flex justify-between text-sm text-violet-400"><span>Step 2 · {form.pct2}% Termin</span><span>{formatIDR(total * form.pct2 / 100)}</span></div>
                <div className="flex justify-between text-sm text-green-400"><span>Step 3 · {form.pct3}% Pelunasan</span><span>{formatIDR(total * form.pct3 / 100)}</span></div>
              </section>
            );
          })()}
        </div>

        {/* ── Preview panel ── */}
        <div className="flex-1 bg-[#111] overflow-y-auto p-8">
          <div className="max-w-[794px] mx-auto shadow-2xl rounded-xl overflow-hidden">
            <InvoicePreview form={form} />
          </div>
        </div>
      </div>

    </div>
  );
}
