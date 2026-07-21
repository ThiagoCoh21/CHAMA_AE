import React, { useState } from "react";

const Flame = ({ size = 160 }) => (
  <svg width={size} height={size * 1.32} viewBox="0 0 200 264" fill="none">
    <defs>
      <linearGradient id="fDeep" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FF7A18" />
        <stop offset="50%" stopColor="#F4451A" />
        <stop offset="100%" stopColor="#CE2410" />
      </linearGradient>
      <linearGradient id="fMid" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FFC02E" />
        <stop offset="55%" stopColor="#FF8A14" />
        <stop offset="100%" stopColor="#F0541A" />
      </linearGradient>
      <linearGradient id="fCore" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#FFF0A8" />
        <stop offset="55%" stopColor="#FFD046" />
        <stop offset="100%" stopColor="#FF9A1C" />
      </linearGradient>
      <linearGradient id="glove" x1="0.1" y1="0" x2="0.95" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#F4F7FA" />
        <stop offset="100%" stopColor="#C4CED8" />
      </linearGradient>
      <linearGradient id="cuff" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FBFDFF" />
        <stop offset="100%" stopColor="#B9C4CE" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="60%" r="55%">
        <stop offset="0%" stopColor="#FFDE8A" stopOpacity="0.9" />
        <stop offset="65%" stopColor="#FF9A28" stopOpacity="0.35" />
        <stop offset="100%" stopColor="#FF7A18" stopOpacity="0" />
      </radialGradient>
    </defs>

    <ellipse cx="100" cy="152" rx="95" ry="108" fill="url(#glow)" />

    {/* outer separated tongues */}
    <path d="M100 6c16 46 44 62 56 100 14 42-6 88-56 108-50-20-70-66-56-108C56 68 84 52 100 6z" fill="url(#fDeep)" />
    <path d="M40 62c12 22 8 40 4 60-5 26 8 54 30 68-36-12-56-48-46-84 3-14 8-30 12-44z" fill="url(#fDeep)" />
    <path d="M160 62c-12 22-8 40-4 60 5 26-8 54-30 68 36-12 56-48 46-84-3-14-8-30-12-44z" fill="url(#fDeep)" />
    <path d="M58 20c10 28 0 44-6 64 16-10 28-26 32-44 3-12-2-20-26-20z" fill="url(#fMid)" />
    <path d="M142 20c-10 28 0 44 6 64-16-10-28-26-32-44-3-12 2-20 26-20z" fill="url(#fMid)" />
    <path d="M26 108c8 18 4 32 2 46-3 20 8 38 24 48-30-12-42-42-34-70 2-8 5-16 8-24z" fill="url(#fMid)" />
    <path d="M174 108c-8 18-4 32-2 46 3 20-8 38-24 48 30-12 42-42 34-70-2-8-5-16-8-24z" fill="url(#fMid)" />

    {/* mid body */}
    <path d="M100 38c12 36 32 48 41 78 9 32-5 64-41 82-36-18-50-50-41-82 9-30 29-42 41-78z" fill="url(#fMid)" />
    <path d="M66 88c5 20-2 32-6 48-6 20 5 38 20 48-26-10-38-34-31-60 2-13 9-25 17-36z" fill="url(#fCore)" opacity="0.92" />
    <path d="M134 88c-5 20 2 32 6 48 6 20-5 38-20 48 26-10 38-34 31-60-2-13-9-25-17-36z" fill="url(#fCore)" opacity="0.92" />

    {/* bright core */}
    <path d="M100 78c9 26 23 34 29 56 7 24-4 48-29 60-25-12-36-36-29-60 6-22 20-30 29-56z" fill="url(#fCore)" />

    {/* sparks */}
    <circle cx="44" cy="48" r="3.2" fill="#FFE07A" />
    <circle cx="160" cy="42" r="2.6" fill="#FFE07A" />
    <circle cx="30" cy="92" r="2.2" fill="#FFCB4D" />
    <circle cx="172" cy="86" r="2.8" fill="#FFCB4D" />
    <circle cx="52" cy="196" r="2.4" fill="#FFCB4D" />
    <circle cx="150" cy="204" r="2" fill="#FFE07A" />

    {/* ---- goalkeeper glove, slight tilt ---- */}
    <g transform="rotate(-6 100 170)">
      <rect x="68" y="96" width="18" height="88" rx="9" fill="url(#glove)" />
      <rect x="88" y="82" width="19" height="102" rx="9.5" fill="url(#glove)" />
      <rect x="109" y="88" width="18" height="96" rx="9" fill="url(#glove)" />
      <rect x="129" y="106" width="17" height="78" rx="8.5" fill="url(#glove)" />
      <rect x="42" y="132" width="18" height="56" rx="9" fill="url(#glove)" transform="rotate(-24 51 160)" />

      <path d="M64 156h84c6 0 10 4 10 10v32c0 15-12 27-27 27H81c-15 0-27-12-27-27v-32c0-6 4-10 10-10z" fill="url(#glove)" />
      <path d="M64 156h84c6 0 10 4 10 10v5H54v-5c0-6 4-10 10-10z" fill="#DDE4EA" opacity="0.65" />
      <path d="M126 156h22c6 0 10 4 10 10v32c0 15-12 27-27 27h-8c14-6 21-20 21-36v-24c0-4-8-9-18-9z" fill="#CBD5DE" opacity="0.5" />

      <rect x="71" y="218" width="62" height="32" rx="13" fill="url(#cuff)" />
      <rect x="71" y="229" width="62" height="4" fill="#A9B5C0" opacity="0.5" />

      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2].map((c) => (
          <circle key={`${r}-${c}`} cx={91 + c * 11} cy={106 + r * 12} r="1.7" fill="#93A0AC" opacity="0.5" />
        ))
      )}
    </g>
  </svg>
);

const Field = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-3 mb-3 shadow-sm">
    <span className="text-slate-400 text-lg">{icon}</span>
    <input
      {...props}
      className="flex-1 outline-none text-slate-700 placeholder-slate-400 bg-transparent"
    />
  </div>
);

const Social = () => (
  <div className="flex justify-center gap-4 my-4">
    {["#EA4335", "#FFC107", "#1877F2"].map((c) => (
      <button
        key={c}
        className="w-12 h-12 rounded-xl shadow-md active:scale-95 transition"
        style={{ background: c }}
      />
    ))}
  </div>
);

const Splash = ({ go }) => (
  <div className="relative h-full flex flex-col items-center justify-between py-14 overflow-hidden">
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(150deg,#2FB6D9 0%,#3BC9A0 55%,#5BD35B 100%)" }}
    />
    <div className="absolute -left-10 top-0 w-40 h-[140%] rotate-[25deg] bg-white/10" />
    <div className="absolute left-24 top-0 w-16 h-[140%] rotate-[25deg] bg-white/10" />
    <div />
    <div className="relative flex flex-col items-center">
      <Flame />
      <h1 className="text-white text-4xl font-extrabold mt-4 drop-shadow-lg">Chama.AE</h1>
    </div>
    <div className="relative w-full px-8">
      <button
        onClick={() => go("signup")}
        className="w-full bg-white text-slate-800 font-semibold py-4 rounded-full shadow-lg active:scale-95 transition"
      >
        Get Started
      </button>
      <p
        onClick={() => go("login")}
        className="text-white/90 text-xs text-center mt-3 cursor-pointer"
      >
        I already have an account
      </p>
    </div>
  </div>
);

const Sheet = ({ title, children }) => (
  <div className="h-full flex flex-col">
    <div
      className="relative flex justify-center pt-10 pb-16"
      style={{ background: "linear-gradient(150deg,#2FB6D9 0%,#3BC9A0 60%,#5BD35B 100%)" }}
    >
      <div className="absolute -left-6 top-0 w-24 h-full rotate-[25deg] bg-white/10" />
      <Flame size={110} />
    </div>
    <div className="flex-1 bg-slate-50 rounded-t-[34px] -mt-8 px-7 pt-7 overflow-y-auto">
      <h2 className="text-2xl font-extrabold text-slate-800 text-center mb-6">{title}</h2>
      {children}
    </div>
  </div>
);

const Signup = ({ go }) => {
  const [agree, setAgree] = useState(false);
  return (
    <Sheet title="hello!">
      <Field icon="👤" placeholder="Username" />
      <Field icon="✉️" placeholder="Email" type="email" />
      <Field icon="🔒" placeholder="Password" type="password" />
      <label className="flex items-center gap-2 text-[11px] text-slate-500 mb-5">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        I agree to the <b className="text-sky-500">terms and conditions</b>
      </label>
      <button
        disabled={!agree}
        className="w-full bg-sky-400 disabled:opacity-40 text-white font-semibold py-3.5 rounded-full shadow-md active:scale-95 transition"
      >
        Sign Up
      </button>
      <p className="text-center text-slate-400 text-xs my-4">or</p>
      <Social />
      <p className="text-center text-xs text-slate-500 pb-6">
        Log in with your <b>social media</b> account —{" "}
        <span className="text-sky-500 cursor-pointer" onClick={() => go("login")}>
          entrar
        </span>
      </p>
    </Sheet>
  );
};

const Login = ({ go }) => (
  <Sheet title="welcome back!">
    <Field icon="✉️" placeholder="Email" type="email" />
    <Field icon="🔒" placeholder="Password" type="password" />
    <p className="text-right text-[11px] text-sky-500 mb-5 cursor-pointer">Esqueci minha senha</p>
    <button className="w-full bg-sky-400 text-white font-semibold py-3.5 rounded-full shadow-md active:scale-95 transition">
      Entrar
    </button>
    <p className="text-center text-slate-400 text-xs my-4">or</p>
    <Social />
    <p className="text-center text-xs text-slate-500 pb-6">
      Não tem conta?{" "}
      <span className="text-sky-500 cursor-pointer" onClick={() => go("signup")}>
        Cadastre-se
      </span>
    </p>
  </Sheet>
);

export default function App() {
  const [screen, setScreen] = useState("splash");
  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-6">
      <div className="w-[360px] h-[720px] bg-white rounded-[36px] overflow-hidden shadow-2xl">
        {screen === "splash" && <Splash go={setScreen} />}
        {screen === "signup" && <Signup go={setScreen} />}
        {screen === "login" && <Login go={setScreen} />}
      </div>
    </div>
  );
}
