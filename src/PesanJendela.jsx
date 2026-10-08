import { useState } from "react";

const MENU = [
  { nama: "Nasi Goreng", harga: 18000 },
  { nama: "Mie Ayam", harga: 15000 },
  { nama: "Soto Ayam", harga: 17000 },
  { nama: "Ayam Geprek", harga: 20000 },
  { nama: "Es Teh Manis", harga: 5000 },
];

const CUACA = {
  cerah: { label: "Cerah", icon: "☀️", saran: "Panas-panas gini, cocok yang seger: Es Teh Manis", menu: "Es Teh Manis" },
  hujan: { label: "Hujan", icon: "🌧️", saran: "Lagi hujan, enaknya yang berkuah: Soto Ayam", menu: "Soto Ayam" },
  mendung: { label: "Mendung", icon: "☁️", saran: "Mendung gini pas buat yang mengenyangkan: Nasi Goreng", menu: "Nasi Goreng" },
};

const rp = (n) => "Rp" + n.toLocaleString("id-ID");

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
.page{min-height:100vh;background:#f1e6d6;display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-family:'Poppins',sans-serif;padding:20px;color:#3b2f1a}
.hint{font-size:13px;color:#7a6850;margin-bottom:12px}
.rod{width:392px;max-width:96vw;height:10px;border-radius:6px;background:#5b3b25;position:relative;z-index:5}
.window{position:relative;width:360px;max-width:92vw;height:560px;border:12px solid #8a5a3b;border-top-width:0;
  border-radius:0 0 8px 8px;overflow:hidden;background:#fff;box-shadow:0 20px 40px rgba(80,50,20,.3)}
.sky{position:absolute;inset:0;transition:background .8s}
.sky.cerah{background:linear-gradient(#7fcdf5,#e0f4ff)}
.sky.hujan{background:linear-gradient(#5f6e84,#9aa8ba)}
.sky.mendung{background:linear-gradient(#a3afbd,#d3d9e1)}
.hill{position:absolute;bottom:0;left:-20%;width:140%;height:90px;border-radius:50% 50% 0 0;background:#6fae6b}
.sun{position:absolute;top:26px;right:36px;width:54px;height:54px;border-radius:50%;background:#ffd84d;
  box-shadow:0 0 0 10px rgba(255,216,77,.3),0 0 40px 16px rgba(255,216,77,.5);transition:opacity .6s,transform .6s}
.cloud{position:absolute;width:90px;height:30px;border-radius:30px;background:#fff;opacity:.9;transition:opacity .6s;
  animation:geser 14s linear infinite alternate}
.cloud::before{content:"";position:absolute;left:14px;top:-16px;width:38px;height:38px;border-radius:50%;background:#fff}
.cloud::after{content:"";position:absolute;left:44px;top:-10px;width:30px;height:30px;border-radius:50%;background:#fff}
.hujan .cloud,.mendung .cloud{background:#8e98a8}
.hujan .cloud::before,.hujan .cloud::after,.mendung .cloud::before,.mendung .cloud::after{background:#8e98a8}
@keyframes geser{from{transform:translateX(-20px)}to{transform:translateX(60px)}}
.drop{position:absolute;top:60px;width:2px;height:14px;border-radius:2px;background:rgba(220,235,255,.8);
  animation:jatuh .9s linear infinite;transition:opacity .5s}
@keyframes jatuh{from{transform:translateY(-10px)}to{transform:translateY(190px)}}
.card{position:absolute;left:14px;right:14px;top:150px;bottom:14px;background:rgba(255,252,245,.94);
  backdrop-filter:blur(6px);border-radius:18px;padding:16px 16px 14px;box-sizing:border-box;overflow:auto;
  box-shadow:0 8px 24px rgba(0,0,0,.18);transition:opacity .6s .3s,transform .6s .3s}
.card.tutup{opacity:0;transform:translateY(20px);pointer-events:none}
.card h2{margin:0;font-size:17px;font-weight:600}
.chips{display:flex;gap:6px;margin:8px 0 6px}
.chip{flex:1;border:1.5px solid #ecdcb8;background:#fff;border-radius:10px;padding:6px 0;font:inherit;font-size:11px;cursor:pointer}
.chip.aktif{background:#3f6b5a;border-color:#3f6b5a;color:#fff}
.saran{font-size:11px;background:#fff1cf;border-radius:8px;padding:6px 8px;margin-bottom:10px}
.f{margin-bottom:8px}
.f label{display:block;font-size:11px;font-weight:500;margin-bottom:3px}
.f input,.f select{width:100%;box-sizing:border-box;padding:8px 10px;border-radius:9px;border:1.5px solid #ecdcb8;
  font:inherit;font-size:12px;background:#fff;outline:none}
.f input:focus,.f select:focus{border-color:#3f6b5a}
.qty{display:flex;align-items:center;gap:10px;margin-bottom:8px;font-size:12px}
.qty button{width:28px;height:28px;border-radius:8px;border:1.5px solid #ecdcb8;background:#fff;font-size:15px;cursor:pointer}
.btn{width:100%;padding:10px;border:none;border-radius:10px;background:#d9692a;color:#fff;font:inherit;font-weight:600;
  font-size:13px;cursor:pointer;transition:.2s}
.btn:hover{background:#c25a20}
.ok{margin-top:8px;font-size:12px;text-align:center;color:#2f7d4f;background:#e4f5ea;border-radius:8px;padding:8px}
.tirai{position:absolute;top:0;bottom:0;width:50%;z-index:4;cursor:pointer;
  transition:transform 1s cubic-bezier(.6,.05,.3,1);
  background:repeating-linear-gradient(90deg,#c9573a 0 14px,#b44a2f 14px 22px,#d4654a 22px 30px);
  box-shadow:inset 0 -30px 40px rgba(0,0,0,.12)}
.tirai.kiri{left:0;border-right:2px solid rgba(0,0,0,.15)}
.tirai.kanan{right:0;border-left:2px solid rgba(0,0,0,.15)}
.buka .kiri{transform:translateX(-88%)}
.buka .kanan{transform:translateX(88%)}
`;

export default function PesanJendela() {
  const [buka, setBuka] = useState(false);
  const [cuaca, setCuaca] = useState("hujan");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [menu, setMenu] = useState("Soto Ayam");
  const [jml, setJml] = useState(1);
  const [done, setDone] = useState(false);

  const harga = MENU.find((m) => m.nama === menu).harga;
  const pilihCuaca = (c) => {
    setCuaca(c);
    setMenu(CUACA[c].menu);
  };
  const kirim = () => {
    if (nama && alamat) setDone(true);
  };

  return (
    <div className="page">
      <style>{css}</style>
      <div className="hint">{buka ? "Klik tirai lagi buat nutup" : "Klik tirainya buat buka jendela"}</div>
      <div className="rod" />
      <div className={"window " + (buka ? "buka" : "")}>
        <div className={"sky " + cuaca}>
          <div className="sun" style={{ opacity: cuaca === "cerah" ? 1 : 0, transform: cuaca === "cerah" ? "scale(1)" : "scale(.6)" }} />
          <div className="cloud" style={{ top: 50, left: 30, opacity: cuaca === "cerah" ? 0.7 : 1 }} />
          <div className="cloud" style={{ top: 90, left: 150, opacity: cuaca === "cerah" ? 0 : 1 }} />
          {Array.from({ length: 22 }).map((_, i) => (
            <div
              key={i}
              className="drop"
              style={{
                left: 8 + i * 15 + "px",
                animationDelay: (i % 7) * 0.13 + "s",
                animationDuration: 0.7 + (i % 3) * 0.2 + "s",
                opacity: cuaca === "hujan" ? 1 : 0,
              }}
            />
          ))}
          <div className="hill" />
        </div>

        <div className={"card " + (buka ? "" : "tutup")}>
          <h2>Pesan makanan 🍜</h2>
          <div className="chips">
            {Object.entries(CUACA).map(([k, v]) => (
              <button key={k} className={"chip " + (cuaca === k ? "aktif" : "")} disabled={!buka} onClick={() => pilihCuaca(k)}>
                {v.icon} {v.label}
              </button>
            ))}
          </div>
          <div className="saran">{CUACA[cuaca].saran}</div>

          <div className="f">
            <label>Nama</label>
            <input disabled={!buka} value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama kamu" />
          </div>
          <div className="f">
            <label>Alamat antar</label>
            <input disabled={!buka} value={alamat} onChange={(e) => setAlamat(e.target.value)} placeholder="Jl. Contoh No. 1" />
          </div>
          <div className="f">
            <label>Menu</label>
            <select disabled={!buka} value={menu} onChange={(e) => setMenu(e.target.value)}>
              {MENU.map((m) => (
                <option key={m.nama}>{m.nama}</option>
              ))}
            </select>
          </div>
          <div className="qty">
            Jumlah
            <button disabled={!buka} onClick={() => setJml(Math.max(1, jml - 1))}>-</button>
            <b>{jml}</b>
            <button disabled={!buka} onClick={() => setJml(jml + 1)}>+</button>
          </div>
          <button className="btn" disabled={!buka} onClick={kirim}>
            Pesan sekarang · {rp(harga * jml)}
          </button>
          {done && (
            <div className="ok">
              Oke {nama}, {jml} {menu} lagi dibuat!
            </div>
          )}
        </div>

        <div className="tirai kiri" onClick={() => setBuka(!buka)} />
        <div className="tirai kanan" onClick={() => setBuka(!buka)} />
      </div>
    </div>
  );
}
