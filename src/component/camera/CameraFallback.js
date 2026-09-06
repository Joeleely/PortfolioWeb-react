export default function CameraFallback() {
  return (
    <svg className="camera-fallback" viewBox="0 0 520 420" role="img" aria-label="Stylized dark camera with a cyan lens">
      <defs>
        <linearGradient id="camera-body" x2="0.8" y2="1"><stop stopColor="#476171" /><stop offset="1" stopColor="#101e2c" /></linearGradient>
        <radialGradient id="camera-glass"><stop stopColor="#061421" /><stop offset=".6" stopColor="#143b54" /><stop offset="1" stopColor="#0ef" /></radialGradient>
      </defs>
      <ellipse cx="270" cy="340" rx="140" ry="18" fill="#00eeff" opacity=".08" />
      <g transform="rotate(-7 260 210)">
        <path d="M104 152 131 130H409V272L383 296H104Z" fill="#09141e" stroke="#467180" />
        <rect x="102" y="151" width="285" height="145" rx="17" fill="url(#camera-body)" stroke="#648390" />
        <path d="M206 152v-28h72v28" fill="#243f51" stroke="#648390" />
        <rect x="118" y="137" width="45" height="15" rx="5" fill="#53717e" />
        <rect x="117" y="179" width="47" height="101" rx="10" fill="#101e29" />
        <path d="M168 184H373" stroke="#00eeff" opacity=".7" />
        <circle cx="272" cy="231" r="83" fill="#08131e" stroke="#668a98" strokeWidth="5" />
        <circle cx="272" cy="231" r="68" fill="#173241" stroke="#00eeff" strokeWidth="3" />
        <circle cx="272" cy="231" r="53" fill="url(#camera-glass)" />
        <circle cx="272" cy="231" r="30" fill="#071422" stroke="#457792" />
        <path d="M236 214a40 40 0 0 1 48-22" fill="none" stroke="#b6ffff" strokeWidth="5" opacity=".7" />
        <circle cx="359" cy="173" r="4" fill="#00eeff" />
        <text x="180" y="174" fill="#e1f8ff" fontFamily="monospace" fontSize="10" letterSpacing="3">JOEVRY</text>
      </g>
    </svg>
  );
}
