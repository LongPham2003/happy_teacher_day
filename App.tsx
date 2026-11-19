import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  BookOpen,
  Flower2,
  Heart,
  Mail,
  Music2,
  Pause,
  Play,
  Quote,
  Sparkles,
  Volume2,
  VolumeX,
  X,
  Star,
  GraduationCap,
} from 'lucide-react';

const teacherName = 'Vui Nguyễn';
const words = ['Truyền Cảm Hứng', 'Dẫn Dắt Chúng Em'];

const vocabulary = [
  {
    word: 'Inspiring',
    phonetic: '/ɪnˈspaɪərɪŋ/',
    vi: 'Truyền cảm hứng',
    memory: 'Cô không chỉ dạy chúng em kiến thức, mà còn dạy cách sống.',
    color: '#FFF0E6',
    accent: '#E8552D',
  },
  {
    word: 'Devoted',
    phonetic: '/dɪˈvoʊ.t̬ɪd/',
    vi: 'Tận tâm',
    memory: 'Cô luôn sẵn sàng ở lại thêm vài phút.',
    color: '#F0EBF8',
    accent: '#7C3AED',
  },
  {
    word: 'Patient',
    phonetic: '/ˈpeɪ.ʃənt/',
    vi: 'Kiên nhẫn',
    memory: 'Cô giải thích lại lần thứ ..., vẫn chậm rãi như lần đầu.',
    color: '#ECFDF5',
    accent: '#059669',
  },
  {
    word: 'Radiant',
    phonetic: '/ˈreɪ.di.ənt/',
    vi: 'Rạng rỡ',
    memory:
      'Cô bước vào lớp với nụ cười, và cả buổi học bỗng nhẹ nhàng hẳn đi.',
    color: '#FFFBEB',
    accent: '#D97706',
  },
];

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85',
    alt: 'Giáo viên chia sẻ khoảnh khắc ấm áp với học sinh',
    caption: 'Nơi sự tò mò bắt đầu',
  },
  {
    src: 'https://images.unsplash.com/photo-1758270704226-db897b180243?auto=format&fit=crop&w=1200&q=85',
    alt: 'Học sinh giơ tay phát biểu trong giờ học',
    caption: 'Mỗi cánh tay, mỗi tiếng nói',
  },
  {
    src: 'https://images.unsplash.com/photo-1578593139939-cccb1e98698c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Khung cảnh lớp học vĩnh cửu',
    caption: 'Những bài học chúng em giữ mãi',
  },
];

// ── Petal particle canvas ──────────────────────────────────────────────────
function PetalCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const petalShapes = ['🌸', '🌺', '🌼', '✿', '❋', '✦', '⭐'];
    let raf = 0;
    let w = 0,
      h = 0;
    type Petal = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      rotSpeed: number;
      sway: number;
      swaySpeed: number;
      swayOffset: number;
      symbol: string;
      hue: number;
    };
    let petals: Petal[] = [];

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      petals = Array.from({ length: Math.min(45, Math.floor(w / 28)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h - h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: 0.4 + Math.random() * 0.9,
        size: 10 + Math.random() * 20,
        opacity: 0.15 + Math.random() * 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        sway: 20 + Math.random() * 30,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayOffset: Math.random() * Math.PI * 2,
        symbol: petalShapes[Math.floor(Math.random() * petalShapes.length)],
        hue: Math.floor(Math.random() * 360),
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      petals.forEach((p) => {
        p.swayOffset += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayOffset) * 0.4;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        if (p.y > h + 30) {
          p.y = -30;
          p.x = Math.random() * w;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.symbol, 0, 0);
        ctx.restore();
      });
      raf = requestAnimationFrame(() => draw(t + 1));
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

// ── Floating lanterns in hero ──────────────────────────────────────────────
function FloatingLanterns() {
  const lanterns = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 5 + ((i * 13) % 95),
    delay: i * 0.7,
    duration: 6 + (i % 4),
    size: 18 + (i % 3) * 8,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute bottom-0 text-2xl"
          style={{ left: `${l.x}%`, fontSize: l.size }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: `-${80 + l.id * 5}vh`, opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          🏮
        </motion.div>
      ))}
    </div>
  );
}

// ── FerrymanScene (original preserved + enhancements) ─────────────────────
function FerrymanScene() {
  return (
    <div className="ferryman-scene pointer-events-none absolute inset-x-0 bottom-0 h-[62%] overflow-hidden">
      <svg
        viewBox="0 0 1600 680"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="riverSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FDFBF7" stopOpacity="0" />
            <stop offset="0.46" stopColor="#FCEBD4" stopOpacity=".5" />
            <stop offset="1" stopColor="#C97B45" stopOpacity=".6" />
          </linearGradient>
          <linearGradient id="riverWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5C97A" stopOpacity=".35" />
            <stop offset=".5" stopColor="#D4813A" stopOpacity=".55" />
            <stop offset="1" stopColor="#7A3A18" stopOpacity=".85" />
          </linearGradient>
          <linearGradient id="boatWood" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D6A263" />
            <stop offset=".24" stopColor="#A96C3F" />
            <stop offset=".64" stopColor="#68402E" />
            <stop offset="1" stopColor="#332822" />
          </linearGradient>
          <linearGradient id="boatInner" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#D9AA6D" />
            <stop offset=".44" stopColor="#8B5938" />
            <stop offset="1" stopColor="#392A24" />
          </linearGradient>
          <linearGradient id="boatLip" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#F4D59A" />
            <stop offset=".35" stopColor="#B9824B" />
            <stop offset=".7" stopColor="#E0B56D" />
            <stop offset="1" stopColor="#573825" />
          </linearGradient>
          <linearGradient id="keelShade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6F3A1B" />
            <stop offset="1" stopColor="#281B18" />
          </linearGradient>
          <linearGradient id="aoDai" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFF9EC" />
            <stop offset=".46" stopColor="#EACCB2" />
            <stop offset="1" stopColor="#B76E79" />
          </linearGradient>
          <radialGradient id="sunHalo">
            <stop offset="0" stopColor="#FFD580" stopOpacity=".95" />
            <stop offset=".28" stopColor="#FFAA33" stopOpacity=".45" />
            <stop offset="1" stopColor="#FF7A00" stopOpacity="0" />
          </radialGradient>
          <filter id="sceneShadow" x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow
              dx="0"
              dy="16"
              stdDeviation="12"
              floodColor="#172B37"
              floodOpacity=".28"
            />
          </filter>
          <filter id="softBlur">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="reflectionBlur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="warmGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Sky gradient */}
        <rect width="1600" height="680" fill="url(#riverSky)" />

        {/* Sun with warm glow */}
        <circle cx="1240" cy="185" r="220" fill="url(#sunHalo)" />
        <circle cx="1240" cy="185" r="44" fill="#FFB833" opacity=".85" />
        <circle cx="1240" cy="185" r="30" fill="#FFD35A" opacity=".92" />

        {/* Sun rays */}
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 1240 + Math.cos(angle) * 52;
          const y1 = 185 + Math.sin(angle) * 52;
          const x2 = 1240 + Math.cos(angle) * 90;
          const y2 = 185 + Math.sin(angle) * 90;
          return (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFD35A"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 2 + i * 0.15,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          );
        })}

        {/* Far mountains */}
        <motion.g
          className="scene-far"
          animate={{ x: [-8, 8, -8] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path
            d="M0 322C133 257 230 274 339 322C470 207 601 231 738 330C877 246 963 249 1079 321C1248 214 1375 253 1600 313V428H0Z"
            fill="#C8824A"
            opacity=".15"
          />
          <path
            d="M0 363C167 303 268 322 389 371C519 285 642 301 765 373C916 300 1039 310 1164 369C1340 292 1462 327 1600 367V448H0Z"
            fill="#A05A28"
            opacity=".18"
          />
        </motion.g>

        {/* River water */}
        <path
          d="M0 401C287 377 482 407 731 391C1044 371 1270 390 1600 376V680H0Z"
          fill="url(#riverWater)"
        />

        {/* Golden water reflections */}
        <g opacity=".3" stroke="#FFD580" strokeWidth="3" strokeLinecap="round">
          <path d="M59 469H377M1035 456H1390M1211 517H1546M129 574H509" />
          <path d="M902 604H1270M531 504H715M15 631H270" />
        </g>

        <g
          className="water-lines"
          opacity=".3"
          stroke="#FFCB7A"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <path d="M0 444C190 421 310 465 499 443S835 426 1010 449S1375 467 1600 431" />
          <path d="M0 526C198 498 376 545 583 519S974 509 1189 535S1438 542 1600 521" />
          <path d="M0 623C253 590 397 647 666 613S1056 602 1298 629S1509 637 1600 622" />
        </g>

        {/* Boat reflection */}
        <motion.g
          className="boat-reflection"
          opacity=".18"
          filter="url(#reflectionBlur)"
          animate={{ scaleY: [0.8, 1, 0.8], opacity: [0.1, 0.22, 0.1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '820px 560px' }}
        >
          <path
            d="M421 575Q800 650 1193 553Q1083 654 615 654Z"
            fill="#102F3D"
          />
          <path d="M979 571L1074 670" stroke="#102F3D" strokeWidth="14" />
        </motion.g>

        {/* Main boat group */}
        <motion.g
          filter="url(#sceneShadow)"
          animate={{ y: [0, -7, 0], rotate: [-0.35, 0.35, -0.35] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '810px 540px' }}
        >
          <path
            d="M418 486C642 508 876 551 1192 466C1114 516 1000 554 796 565C620 567 492 534 418 486Z"
            fill="url(#boatInner)"
          />
          <path
            d="M429 483C653 505 879 540 1190 462"
            fill="none"
            stroke="url(#boatLip)"
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path
            d="M554 509L585 548M722 531L734 561M901 527L892 553M1068 495L1038 533"
            stroke="#5B341F"
            strokeWidth="8"
            opacity=".72"
          />
          <path
            d="M512 507C686 535 856 551 1099 493"
            stroke="#F5C978"
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".5"
          />

          {/* Student 1 */}
          <g>
            <ellipse cx="719" cy="423" rx="28" ry="30" fill="#D9A682" />
            <path
              d="M691 418Q703 376 733 390Q757 397 742 426Q728 409 691 418Z"
              fill="#253945"
            />
            <path
              d="M682 450Q720 427 756 454L773 506Q723 520 670 499Z"
              fill="#384E68"
            />
            <path
              d="M678 466L625 441"
              stroke="#D9A682"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path d="M619 432L659 444L644 469L606 451Z" fill="#F0D9A0" />
          </g>
          {/* Student 2 */}
          <g>
            <ellipse cx="839" cy="438" rx="27" ry="29" fill="#D9A682" />
            <path
              d="M810 433Q818 393 851 405Q872 414 860 439Q842 420 810 433Z"
              fill="#47362E"
            />
            <path
              d="M801 463Q838 439 875 466L892 519Q839 530 786 512Z"
              fill="#A45E68"
            />
            <path
              d="M800 480L753 461"
              stroke="#D9A682"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path d="M744 451L783 464L769 488L731 472Z" fill="#E8E1F0" />
          </g>
          {/* Student 3 */}
          <g>
            <ellipse cx="950" cy="419" rx="28" ry="30" fill="#D9A682" />
            <path
              d="M921 413Q930 375 960 390Q979 399 970 428Q953 405 921 413Z"
              fill="#283D3D"
            />
            <path
              d="M915 449Q950 426 985 453L1002 506Q947 520 899 499Z"
              fill="#5E7662"
            />
            <path
              d="M922 465L881 449"
              stroke="#D9A682"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path d="M871 439L908 452L897 475L859 461Z" fill="#F4E3C5" />
          </g>

          {/* Teacher figure (áo dài) */}
          <g>
            <path
              d="M1041 448Q1074 404 1103 448L1119 528Q1078 542 1023 522Z"
              fill="url(#aoDai)"
            />
            <path
              d="M1071 450L1051 542L1095 542L1105 453Z"
              fill="#F4E8DC"
              opacity=".78"
            />
            <ellipse cx="1078" cy="374" rx="31" ry="36" fill="#D8A17E" />
            <path
              d="M1045 374Q1043 328 1080 329Q1120 332 1110 383Q1093 360 1045 374Z"
              fill="#2B3036"
            />
            <circle cx="1104" cy="339" r="16" fill="#2B3036" />
            <path
              d="M1052 411Q1077 426 1101 407"
              stroke="#D8A17E"
              strokeWidth="13"
              strokeLinecap="round"
            />
            <path
              d="M1098 417L1162 466"
              stroke="#D8A17E"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <path
              d="M1151 454L1242 614"
              stroke="#75451F"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M1227 591Q1276 631 1246 657Q1219 637 1227 591Z"
              fill="#9B5B21"
            />
            <path
              d="M1042 517L1017 555"
              stroke="#B76E79"
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M1096 517L1125 554"
              stroke="#EACCB2"
              strokeWidth="15"
              strokeLinecap="round"
            />
          </g>

          {/* Boat hull */}
          <path
            d="M415 487C510 527 638 562 802 571C961 579 1104 538 1194 462C1174 520 1143 566 1085 596C917 640 694 635 532 584C480 563 442 530 415 487Z"
            fill="url(#boatWood)"
          />
          <path
            d="M415 487C519 530 644 557 802 566C958 575 1099 535 1194 462"
            fill="none"
            stroke="url(#boatLip)"
            strokeWidth="11"
            strokeLinecap="round"
          />
          <path
            d="M492 549C658 603 892 615 1103 552C1076 581 1034 599 982 613C820 646 657 625 548 590C524 580 506 566 492 549Z"
            fill="url(#keelShade)"
            opacity=".88"
          />
          <path
            d="M485 535C653 590 894 602 1122 530"
            fill="none"
            stroke="#E1A34F"
            strokeWidth="4"
            strokeLinecap="round"
            opacity=".55"
          />
          <path
            d="M560 565C706 604 891 606 1056 566M606 587C755 617 884 617 1008 590"
            fill="none"
            stroke="#F2C36F"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity=".3"
          />
          <path
            d="M429 490Q400 486 378 469Q405 508 452 527"
            fill="none"
            stroke="#8B4A20"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M1187 465Q1214 442 1225 417Q1220 466 1182 500"
            fill="none"
            stroke="#6A371D"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Animated water sparkle */}
        <motion.path
          d="M1184 554Q1234 570 1286 551"
          fill="none"
          stroke="#FFE5A0"
          strokeWidth="4"
          strokeLinecap="round"
          animate={{ pathLength: [0.15, 1, 0.15], opacity: [0.15, 0.7, 0.15] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Foreground reeds */}
        <g className="foreground-reeds" fill="#5A3010" opacity=".5">
          <path d="M23 680Q42 571 38 474Q64 566 72 680ZM79 680Q103 596 113 531Q126 609 123 680Z" />
          <path d="M1475 680Q1497 563 1494 489Q1518 584 1520 680ZM1530 680Q1555 586 1560 519Q1579 605 1574 680Z" />
        </g>
      </svg>
      <div className="river-vignette absolute inset-0" />
    </div>
  );
}

// ── Floral card background for Letter Modal (inspired by 20/11 greeting card) ─
function FloralCardBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
      <svg
        viewBox="0 0 640 860"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          {/* Paper subtle grain gradient */}
          <linearGradient id="paperBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCFAF5" />
            <stop offset="50%" stopColor="#FAF6ED" />
            <stop offset="100%" stopColor="#F6EFE0" />
          </linearGradient>

          {/* Yellow petal gradients */}
          <linearGradient id="petalYellow1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
            <stop offset="45%" stopColor="#FDE6A4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F3C36A" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="petalYellow2" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F7CE79" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#FDEAB8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFF7E0" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="petalApricot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE8D1" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#F9CA9E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E69C5C" stopOpacity="0.8" />
          </linearGradient>

          {/* Blue forget-me-not petal gradient */}
          <linearGradient id="bluePetalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C4E0FA" stopOpacity="0.98" />
            <stop offset="55%" stopColor="#8EBEEC" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#679FD4" stopOpacity="0.9" />
          </linearGradient>

          {/* Leaves gradient */}
          <linearGradient id="leafSage" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#C8DABF" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#96B48D" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6C8F62" stopOpacity="0.8" />
          </linearGradient>

          {/* Flower core radial gradient */}
          <radialGradient id="flowerCenterYellow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8C4A19" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#C57528" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#E2A63B" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F7D06E" stopOpacity="0" />
          </radialGradient>

          {/* Soft blur for watercolor effect */}
          <filter
            id="watercolorSoft"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="0.8" />
          </filter>
        </defs>

        {/* Card Background */}
        <rect width="640" height="860" fill="url(#paperBg)" />

        {/* Elegant double border like high-end greeting cards */}
        <rect
          x="14"
          y="14"
          width="612"
          height="832"
          fill="none"
          stroke="#D8C29D"
          strokeWidth="1.2"
          strokeOpacity="0.4"
          rx="12"
        />
        <rect
          x="19"
          y="19"
          width="602"
          height="822"
          fill="none"
          stroke="#CBB38B"
          strokeWidth="0.6"
          strokeDasharray="4 4"
          strokeOpacity="0.3"
          rx="10"
        />

        {/* 
        <g opacity="0.12" className="select-none pointer-events-none">
          <text
            x="320"
            y="95"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="18"
            fontStyle="italic"
            letterSpacing="2"
            fill="#1E293B"
          >
            Tri ân Thầy Cô
          </text>
          <text
            x="320"
            y="120"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontSize="10"
            fontWeight="700"
            letterSpacing="4"
            fill="#1E293B"
          >
            NGÀY NHÀ GIÁO VIỆT NAM
          </text>
        
          <text
            x="245"
            y="280"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="170"
            fontWeight="600"
            letterSpacing="-8"
            fill="#1E293B"
          >
            20
          </text>
          <text
            x="250"
            y="390"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontSize="26"
            fontWeight="600"
            letterSpacing="6"
            fill="#1E293B"
          >
            THÁNG
          </text>
          <text
            x="410"
            y="390"
            textAnchor="middle"
            fontFamily="'Playfair Display', serif"
            fontSize="170"
            fontWeight="600"
            letterSpacing="-8"
            fill="#1E293B"
          >
            11
          </text>
        </g> 

      */}

        {/* Top-Right Forget-Me-Not Flowers & Branch */}
        <g id="topRightFlowers" opacity="0.88" transform="translate(480, 20)">
          {/* Stem & Leaves */}
          <path
            d="M70,20 Q40,60 10,110 Q-10,150 0,190"
            fill="none"
            stroke="#9BB290"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M45,45 Q20,35 25,20 Q45,28 45,45 Z" fill="url(#leafSage)" />
          <path d="M25,85 Q0,75 5,60 Q25,68 25,85 Z" fill="url(#leafSage)" />
          <path
            d="M10,135 Q-15,125 -10,110 Q10,118 10,135 Z"
            fill="url(#leafSage)"
          />

          {/* Blue forget-me-not flower 1 */}
          <g transform="translate(65, 30) scale(0.9)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.5" fill="#E8821E" />
          </g>

          {/* Blue forget-me-not flower 2 */}
          <g transform="translate(35, 75) scale(0.8)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.5" fill="#E8821E" />
          </g>

          {/* Blue forget-me-not flower 3 */}
          <g transform="translate(90, 85) scale(0.75)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.5" fill="#E8821E" />
          </g>

          {/* Blue forget-me-not flower 4 */}
          <g transform="translate(15, 125) scale(0.85)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.5" fill="#E8821E" />
          </g>
        </g>

        {/* Right-Edge Forget-Me-Not Cascade (matches image) */}
        <g id="rightCascade" opacity="0.9" transform="translate(560, 240)">
          <path
            d="M40,0 Q-10,80 15,160 Q35,220 5,300"
            fill="none"
            stroke="#9BB290"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path d="M20,60 Q-5,50 0,35 Q20,43 20,60 Z" fill="url(#leafSage)" />
          <path
            d="M28,140 Q5,130 10,115 Q30,123 28,140 Z"
            fill="url(#leafSage)"
          />
          <path
            d="M22,230 Q0,218 5,200 Q25,210 22,230 Z"
            fill="url(#leafSage)"
          />

          {/* Flowers down the right edge */}
          <g transform="translate(15, 30) scale(0.8)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.2" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.3" fill="#E8821E" />
          </g>
          <g transform="translate(35, 95) scale(0.95)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.2" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.3" fill="#E8821E" />
          </g>
          <g transform="translate(0, 160) scale(0.75)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.2" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.3" fill="#E8821E" />
          </g>
          <g transform="translate(25, 230) scale(0.9)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-9"
                rx="6.5"
                ry="8"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.2" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.3" fill="#E8821E" />
          </g>
        </g>

        {/* ── BOTANICAL FLOWERS ON BOTTOM (Golden Yellow Watercolor Poppies & Anemones) ── */}

        {/* Big Yellow Flower 1 - Left Edge (like in image) */}
        <g id="bigYellowLeft" opacity="0.92" transform="translate(30, 480)">
          {/* Leaves */}
          <path
            d="M-10,30 Q40,-20 80,0 Q60,40 -10,30 Z"
            fill="url(#leafSage)"
            opacity="0.75"
          />
          <path
            d="M10,90 Q70,70 90,110 Q40,120 10,90 Z"
            fill="url(#leafSage)"
            opacity="0.7"
          />

          {/* Watercolor Yellow Flower - 6 Large Petals */}
          <g transform="translate(30, 40)">
            <ellipse
              cx="-20"
              cy="-55"
              rx="36"
              ry="50"
              fill="url(#petalYellow1)"
              transform="rotate(-30)"
              filter="url(#watercolorSoft)"
            />
            <ellipse
              cx="40"
              cy="-50"
              rx="38"
              ry="52"
              fill="url(#petalYellow2)"
              transform="rotate(25)"
              filter="url(#watercolorSoft)"
            />
            <ellipse
              cx="60"
              cy="15"
              rx="36"
              ry="48"
              fill="url(#petalYellow1)"
              transform="rotate(70)"
              filter="url(#watercolorSoft)"
            />
            <ellipse
              cx="10"
              cy="65"
              rx="40"
              ry="52"
              fill="url(#petalYellow2)"
              transform="rotate(130)"
              filter="url(#watercolorSoft)"
            />
            <ellipse
              cx="-55"
              cy="30"
              rx="38"
              ry="48"
              fill="url(#petalYellow1)"
              transform="rotate(-110)"
              filter="url(#watercolorSoft)"
            />
            <ellipse
              cx="-60"
              cy="-25"
              rx="35"
              ry="48"
              fill="url(#petalApricot)"
              transform="rotate(-65)"
              filter="url(#watercolorSoft)"
            />

            {/* Inner layered petals */}
            <circle
              cx="-5"
              cy="-10"
              r="34"
              fill="url(#petalYellow2)"
              opacity="0.7"
            />
            <circle
              cx="10"
              cy="5"
              r="30"
              fill="url(#petalYellow1)"
              opacity="0.65"
            />

            {/* Flower center */}
            <circle cx="0" cy="0" r="22" fill="url(#flowerCenterYellow)" />
            {/* Stamens */}
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i * 30 * Math.PI) / 180;
              return (
                <circle
                  key={i}
                  cx={Math.cos(a) * 16}
                  cy={Math.sin(a) * 16}
                  r="2"
                  fill="#78350F"
                  opacity="0.8"
                />
              );
            })}
          </g>
        </g>

        {/* Small Yellow Flower - Mid-Left */}
        <g id="midYellow" opacity="0.88" transform="translate(130, 640)">
          <path
            d="M-10,10 Q20,-20 40,-5 Q25,20 -10,10 Z"
            fill="url(#leafSage)"
            opacity="0.8"
          />
          <ellipse
            cx="-15"
            cy="-30"
            rx="22"
            ry="32"
            fill="url(#petalYellow1)"
            transform="rotate(-25)"
          />
          <ellipse
            cx="25"
            cy="-25"
            rx="24"
            ry="34"
            fill="url(#petalYellow2)"
            transform="rotate(30)"
          />
          <ellipse
            cx="30"
            cy="15"
            rx="22"
            ry="30"
            fill="url(#petalYellow1)"
            transform="rotate(85)"
          />
          <ellipse
            cx="-5"
            cy="35"
            rx="24"
            ry="32"
            fill="url(#petalApricot)"
            transform="rotate(145)"
          />
          <ellipse
            cx="-35"
            cy="10"
            rx="22"
            ry="30"
            fill="url(#petalYellow2)"
            transform="rotate(-100)"
          />
          <circle cx="0" cy="0" r="14" fill="url(#flowerCenterYellow)" />
        </g>

        {/* Huge Bottom-Center Yellow Flower (main centerpiece in reference image) */}
        <g
          id="giantBottomFlower"
          opacity="0.94"
          transform="translate(320, 780)"
        >
          {/* Leaves surrounding */}
          <path
            d="M-140,-50 Q-80,-120 -30,-80 Q-70,-20 -140,-50 Z"
            fill="url(#leafSage)"
            opacity="0.8"
          />
          <path
            d="M120,-40 Q180,-110 210,-60 Q170,-10 120,-40 Z"
            fill="url(#leafSage)"
            opacity="0.8"
          />

          {/* 7 Massive Watercolor Petals */}
          <ellipse
            cx="-65"
            cy="-80"
            rx="60"
            ry="78"
            fill="url(#petalYellow1)"
            transform="rotate(-35)"
            filter="url(#watercolorSoft)"
          />
          <ellipse
            cx="30"
            cy="-95"
            rx="65"
            ry="85"
            fill="url(#petalYellow2)"
            transform="rotate(10)"
            filter="url(#watercolorSoft)"
          />
          <ellipse
            cx="100"
            cy="-60"
            rx="58"
            ry="78"
            fill="url(#petalApricot)"
            transform="rotate(45)"
            filter="url(#watercolorSoft)"
          />
          <ellipse
            cx="120"
            cy="20"
            rx="60"
            ry="76"
            fill="url(#petalYellow1)"
            transform="rotate(95)"
            filter="url(#watercolorSoft)"
          />
          <ellipse
            cx="20"
            cy="70"
            rx="65"
            ry="82"
            fill="url(#petalYellow2)"
            transform="rotate(160)"
            filter="url(#watercolorSoft)"
          />
          <ellipse
            cx="-90"
            cy="30"
            rx="60"
            ry="76"
            fill="url(#petalApricot)"
            transform="rotate(-120)"
            filter="url(#watercolorSoft)"
          />
          <ellipse
            cx="-110"
            cy="-40"
            rx="55"
            ry="74"
            fill="url(#petalYellow1)"
            transform="rotate(-70)"
            filter="url(#watercolorSoft)"
          />

          {/* Soft inner petal layer */}
          <circle
            cx="-10"
            cy="-15"
            r="55"
            fill="url(#petalYellow2)"
            opacity="0.75"
          />
          <circle
            cx="15"
            cy="5"
            r="50"
            fill="url(#petalYellow1)"
            opacity="0.7"
          />

          {/* Large Center with pistils */}
          <circle cx="0" cy="0" r="36" fill="url(#flowerCenterYellow)" />
          {Array.from({ length: 18 }, (_, i) => {
            const a = (i * 20 * Math.PI) / 180;
            return (
              <circle
                key={i}
                cx={Math.cos(a) * 26}
                cy={Math.sin(a) * 26}
                r="2.8"
                fill="#854D0E"
                opacity="0.85"
              />
            );
          })}
        </g>

        {/* Bottom Left White-Cream Camellia Flower (like in reference image) */}
        <g
          id="bottomWhiteFlower"
          opacity="0.95"
          transform="translate(100, 810)"
        >
          <ellipse
            cx="-45"
            cy="-45"
            rx="44"
            ry="56"
            fill="#FFFDF5"
            stroke="#F1DEC6"
            strokeWidth="1"
            transform="rotate(-30)"
          />
          <ellipse
            cx="25"
            cy="-50"
            rx="46"
            ry="60"
            fill="#FFFDF8"
            stroke="#F1DEC6"
            strokeWidth="1"
            transform="rotate(20)"
          />
          <ellipse
            cx="60"
            cy="5"
            rx="44"
            ry="55"
            fill="#FFF8EB"
            stroke="#F1DEC6"
            strokeWidth="1"
            transform="rotate(75)"
          />
          <ellipse
            cx="0"
            cy="45"
            rx="46"
            ry="58"
            fill="#FFFBF0"
            stroke="#F1DEC6"
            strokeWidth="1"
            transform="rotate(140)"
          />
          <ellipse
            cx="-55"
            cy="10"
            rx="42"
            ry="54"
            fill="#FFFDF5"
            stroke="#F1DEC6"
            strokeWidth="1"
            transform="rotate(-100)"
          />
          <circle cx="0" cy="0" r="22" fill="url(#flowerCenterYellow)" />
        </g>

        {/* Clustered Blue Forget-Me-Nots at Bottom Right Corner */}
        <g
          id="bottomRightBlueCluster"
          opacity="0.96"
          transform="translate(470, 780)"
        >
          <path
            d="M0,0 Q-40,-40 -20,-80 Q20,-60 0,0 Z"
            fill="url(#leafSage)"
            opacity="0.8"
          />
          <path
            d="M50,-30 Q80,-70 110,-40 Q80,-10 50,-30 Z"
            fill="url(#leafSage)"
            opacity="0.8"
          />

          {/* Blue flower 1 */}
          <g transform="translate(-20, -50) scale(1.15)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-10"
                rx="7.5"
                ry="9.5"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="4.2" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.8" fill="#D97706" />
          </g>

          {/* Blue flower 2 */}
          <g transform="translate(50, -20) scale(1.05)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-10"
                rx="7.5"
                ry="9.5"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="4" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.6" fill="#D97706" />
          </g>

          {/* Blue flower 3 */}
          <g transform="translate(10, 30) scale(1.25)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-10"
                rx="7.5"
                ry="9.5"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="4.5" fill="#FFE27A" />
            <circle cx="0" cy="0" r="2" fill="#D97706" />
          </g>

          {/* Blue flower 4 */}
          <g transform="translate(85, 20) scale(0.95)">
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <ellipse
                key={idx}
                cx="0"
                cy="-10"
                rx="7.5"
                ry="9.5"
                fill="url(#bluePetalGrad)"
                transform={`rotate(${angle})`}
              />
            ))}
            <circle cx="0" cy="0" r="3.5" fill="#FFE27A" />
            <circle cx="0" cy="0" r="1.5" fill="#D97706" />
          </g>
        </g>

        {/* Scattered soft watercolor splatters / golden sparkles */}
        <g opacity="0.35">
          <circle cx="160" cy="180" r="3" fill="#D97706" />
          <circle cx="185" cy="210" r="1.8" fill="#D97706" />
          <circle cx="480" cy="160" r="2.5" fill="#679FD4" />
          <circle cx="510" cy="190" r="1.6" fill="#679FD4" />
          <circle cx="460" cy="460" r="2" fill="#D97706" />
          <circle cx="210" cy="560" r="2.2" fill="#D97706" />
        </g>
      </svg>
    </div>
  );
}

// ── Letter modal ───────────────────────────────────────────────────────────
function LetterModal({ onClose }: { onClose: () => void }) {
  const [language, setLanguage] = useState<'en' | 'vi'>('vi');

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-[#172033]/70 p-3 sm:p-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Thư tri ân thầy cô 20/11"
        className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-2xl border border-[#D8C29D] bg-[#FCFAF5] shadow-[0_20px_60px_rgba(30,41,59,0.3)] overflow-hidden"
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 30, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
      >
        {/* Full-bleed Botanical Watercolor Greeting Card Background */}
        <FloralCardBackground />

        {/* Fixed / Always Visible Close Button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-30 flex size-9 items-center justify-center rounded-full bg-white/95 text-slate-700 shadow-md border border-amber-200/80 transition hover:bg-amber-600 hover:text-white hover:scale-105 active:scale-95"
          aria-label="Đóng thư"
        >
          <X size={18} />
        </button>

        {/* Scrollable Greeting Card Content Area */}
        <div className="relative z-10 overflow-y-auto px-5 py-6 sm:px-10 sm:py-9">
          {/* Top Title inspired directly by reference image */}
          <div className="text-center select-none pt-1 pb-4 border-b border-[#E8DFD2]/80">
            <p className="font-display text-base sm:text-lg italic tracking-widest text-slate-700">
              Tri ân Thầy Cô
            </p>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.28em] text-amber-800/80 mt-0.5">
              NGÀY NHÀ GIÁO VIỆT NAM
            </p>
            <div className="mt-2 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-amber-700/30" />
              <span className="font-display text-xs font-bold tracking-wider text-amber-900">
                20 · THÁNG · 11
              </span>
              <span className="h-px w-10 bg-amber-700/30" />
            </div>
          </div>

          {/* Subheader with Language switcher */}
          <div className="my-5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-800">
              <Flower2 size={15} /> 🌸 Thiệp gửi cô
            </div>
          </div>

          {/* Letter Body - Clean typography directly on card */}
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="font-display mb-4 text-2xl sm:text-3xl text-slate-800 font-semibold">
                {`Kính gửi cô ${teacherName},`}
              </h3>

              <div className="space-y-4 text-[14.5px] sm:text-[15.5px] leading-relaxed text-slate-700 font-normal">
                {
                  <>
                    <p>
                      Cảm ơn cô vì đã dạy chúng em nhiều hơn cả kiến thức. Trong
                      lớp học của cô, mỗi từ mới là một cánh cửa mở ra thế giới,
                      mỗi lỗi sai là một bài học quý giá, và mỗi bạn học sinh
                      đều cảm thấy vui vẻ.
                    </p>
                    <p>
                      Sự kiên nhẫn, vui vẻ và niềm tin của cô vào chúng em đã
                      giúp chúng em trưởng thành từng ngày. Mai này, dù có quên
                      một quy tắc ngữ pháp, chúng em vẫn luôn nhớ cô.
                    </p>
                    <p className="font-medium text-amber-900">
                      🌸 Chúc mừng ngày Nhà Giáo Việt Nam 20/11. Chúc cô luôn
                      mạnh khoẻ, hạnh phúc và mãi rạng rỡ như ánh mặt trời !
                    </p>
                  </>
                }
              </div>

              {/* Sign-off */}
              <div className="mt-8 text-right pb-3">
                <p className="text-xs sm:text-sm italic text-slate-600">
                  {language === 'en'
                    ? 'With all our gratitude,'
                    : 'Với tất cả lòng biết ơn,'}
                </p>
                <motion.p
                  className="signature mt-1 text-3xl sm:text-4xl text-amber-700 font-bold"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ delay: 0.25, duration: 1.2 }}
                >
                  {'Học sinh của cô 💛'}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Audio player ───────────────────────────────────────────────────────────
function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Autoplay sau tương tác đầu tiên của người dùng (click/touch bất kỳ đâu)
  useEffect(() => {
    const tryAutoplay = async () => {
      if (!audioRef.current || userInteracted) return;
      try {
        await audioRef.current.play();
        setUserInteracted(true);
      } catch {
        // Trình duyệt chặn autoplay — chờ người dùng tương tác
      }
    };

    // Thử autoplay ngay
    tryAutoplay();

    // Lắng nghe tương tác đầu tiên để phát nhạc
    const handleInteraction = async () => {
      if (userInteracted || !audioRef.current) return;
      try {
        await audioRef.current.play();
        setUserInteracted(true);
      } catch {
        // ignore
      }
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [userInteracted]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
        setUserInteracted(true);
      } catch {
        setPlaying(false);
        return;
      }
    }
    setPlaying(!playing);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-amber-200/70 bg-[#fffdf8]/90 p-2 shadow-lg backdrop-blur-md sm:bottom-6 sm:right-6">
      <audio
        ref={audioRef}
        loop
        muted={muted}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
        src="/nhac.mp3"
      />
      <button
        onClick={togglePlay}
        className="relative grid size-10 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white transition hover:from-amber-600 hover:to-amber-800"
        aria-label={playing ? 'Dừng nhạc nền' : 'Phát nhạc nền'}
      >
        {playing && (
          <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-30" />
        )}
        {playing ? (
          <Pause size={17} fill="currentColor" />
        ) : (
          <Play size={17} fill="currentColor" />
        )}
      </button>
      <div className="hidden pr-1 sm:block">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-700">
          <Music2 size={11} /> Nhạc nền 🎵
        </div>
        <p className="text-xs font-medium text-slate-700">
          {playing ? 'Đang phát...' : 'Nhấn để phát'}
        </p>
      </div>
      <button
        onClick={() => setMuted(!muted)}
        className="grid size-8 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label={muted ? 'Bật âm thanh' : 'Tắt tiếng'}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}

// ── Stats ribbon ───────────────────────────────────────────────────────────
function StatsRibbon() {
  const stats = [
    { icon: '📚', value: '∞', label: 'Bài học mang theo mãi' },
    { icon: '💡', value: '∞', label: 'Điều đã học được' },
    { icon: '❤️', value: '1', label: 'Người cô tuyệt vời' },
    { icon: '🌸', value: '20/11', label: 'Ngày tri ân' },
  ];

  return (
    <section className="border-y border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 py-10">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 sm:grid-cols-4 sm:px-8">
        {stats.map(({ icon, value, label }, i) => (
          <motion.div
            key={label}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-3xl">{icon}</span>
            <span className="font-display mt-2 text-3xl font-bold text-amber-700">
              {value}
            </span>
            <span className="mt-1 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── Dedication quote ───────────────────────────────────────────────────────
function DedicationQuote() {
  const quotes = [
    {
      text: '"Nghề giáo là nghề cao quý nhất trong tất cả các nghề cao quý."',
      author: 'Hồ Chí Minh',
    },
    { text: '"Không thầy đố mày làm nên."', author: 'Tục ngữ Việt Nam' },
    {
      text: '"Muốn sang thì bắc cầu kiều, muốn con hay chữ thì yêu lấy thầy."',
      author: 'Ca dao Việt Nam',
    },
  ];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % quotes.length), 5000);
    return () => clearInterval(id);
  }, [quotes.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-700 via-red-600 to-orange-500 px-5 py-16 text-white sm:px-8">
      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Star decorations */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute text-yellow-300 text-xl"
          style={{ top: `${15 + i * 18}%`, left: `${3 + i * 22}%` }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ⭐
        </motion.span>
      ))}
      <div className="relative mx-auto max-w-3xl text-center">
        <div className="mb-6 flex justify-center"></div>
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-balance text-2xl italic leading-relaxed sm:text-3xl">
              {quotes[idx].text}
            </p>
            <p className="mt-4 text-sm font-bold uppercase tracking-widest text-yellow-300">
              — {quotes[idx].author}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-8 flex justify-center gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? 'w-6 bg-yellow-300' : 'w-2 bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────
function App() {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [letterOpen, setLetterOpen] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState<
    (typeof photos)[number] | null
  >(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const current = words[wordIndex];
    if (typed.length < current.length) {
      timeout = setTimeout(
        () => setTyped(current.slice(0, typed.length + 1)),
        90
      );
    } else {
      timeout = setTimeout(() => {
        setTyped('');
        setWordIndex((index) => (index + 1) % words.length);
      }, 1700);
    }
    return () => clearTimeout(timeout);
  }, [typed, wordIndex]);

  return (
    <main className="overflow-hidden bg-[#FDFBF7] text-slate-800">
      {/* ── Navigation ── */}
      <nav className="absolute inset-x-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#"
          className="font-display flex items-center gap-2 text-lg font-semibold"
        >
          <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-amber-500 to-red-600 text-white text-sm font-bold shadow-md">
            20
          </span>
          <span className="text-sm tracking-wide text-slate-700">Tháng 11</span>
        </a>
        <div className="flex items-center gap-4">
          <a
            href="#gratitude"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-amber-700"
          >
            Tri ân cô
          </a>
          <a
            href="#memories"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-amber-700"
          >
            Kỷ niệm
          </a>
        </div>
      </nav>

      {/* ── Hero section ── */}
      <section className="relative flex min-h-[100svh] items-center justify-center px-5 pb-16 pt-28 text-center overflow-hidden">
        {/* Warm golden gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50 via-orange-50/30 to-[#FDFBF7]" />
        <PetalCanvas />
        <FloatingLanterns />
        <div className="hero-glow absolute left-1/2 top-[42%] size-[min(78vw,620px)] -translate-x-1/2 -translate-y-1/2 rounded-full" />
        <FerrymanScene />

        <motion.div
          className="relative z-10 mx-auto -mt-24 max-w-5xl sm:-mt-32"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="mb-6 inline-flex items-center gap-3 rounded-full border border-red-200/60 bg-white/80 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-red-700 shadow-sm backdrop-blur"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(220,38,38,0)',
                '0 0 0 8px rgba(220,38,38,0.08)',
                '0 0 0 0 rgba(220,38,38,0)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <span>🇻🇳</span>
            Ngày Nhà Giáo Việt Nam · 20/11
            <Star size={12} className="text-amber-500" fill="currentColor" />
          </motion.div>

          {/* Main heading */}
          <h1 className="font-display text-balance text-[clamp(2.8rem,7.5vw,6.8rem)] leading-[0.92] tracking-[-0.045em] text-slate-800">
            Chúc Mừng
            <br />
            <span className="bg-gradient-to-r from-amber-600 via-red-600 to-orange-500 bg-clip-text text-transparent">
              Ngày Nhà Giáo
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-display mx-auto mt-5 max-w-3xl text-balance text-[clamp(1.2rem,3vw,2.1rem)] italic leading-tight text-slate-600">
            Kính tặng cô <span className="text-amber-700">{teacherName}</span>
            <br />
            <span className="text-slate-400 text-[0.85em]">Người đã </span>
            <span className="inline-block min-w-[9ch] text-slate-800 text-[0.85em]">
              {typed}
              <span className="typing-cursor">|</span>
            </span>
          </p>

          {/* CTA button */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setLetterOpen(true)}
              className="envelope-button group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-br from-amber-600 to-red-600 px-8 py-4 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-1"
            >
              <span className="absolute inset-0 -z-10 rounded-full bg-amber-500/40 blur-xl transition group-hover:scale-110" />
              <Mail size={18} />
              Mở Thiệp 💌
              <Sparkles size={15} className="text-yellow-300" />
            </button>
            <a
              href="#gratitude"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-700 backdrop-blur transition hover:border-amber-400 hover:text-amber-700"
            >
              <BookOpen size={16} />
              Khám phá
            </a>
          </div>
        </motion.div>

        {/* Scroll arrow */}
        <a
          href="#gratitude"
          aria-label="Cuộn xuống phần tiếp theo"
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-slate-400"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </a>
      </section>

      {/* ── Stats ribbon ── */}
      <StatsRibbon />

      {/* ── Vocabulary of Gratitude ── */}
      <section
        id="gratitude"
        className="relative border-y border-[#E8DFD2] bg-[#F7F1E8] px-5 py-24 sm:px-8 sm:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="section-kicker">
                🌸 Ngôn từ là cách chúng em nói lời cảm ơn cô
              </p>
              <h2 className="font-display mt-3 text-4xl tracking-tight sm:text-6xl">
                Từ Điển Tri Ân
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-500">
              Di chuột hoặc chạm vào mỗi thẻ để khám phá những khoảnh khắc nhỏ
              chúng em sẽ mãi ghi nhớ.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {vocabulary.map((item, index) => (
              <motion.div
                key={item.word}
                className="flip-card h-80 cursor-pointer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.1 }}
                tabIndex={0}
              >
                <div className="flip-card-inner">
                  {/* Front */}
                  <div
                    className="flip-face flex flex-col justify-between border border-slate-800/10 p-6"
                    style={{ background: item.color }}
                  >
                    <div className="flex justify-between">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        No. 0{index + 1}
                      </span>
                      <BookOpen size={18} style={{ color: item.accent }} />
                    </div>
                    <div>
                      <h3 className="font-display text-4xl">{item.word}</h3>
                      <p
                        className="mt-1 text-sm font-semibold"
                        style={{ color: item.accent }}
                      >
                        {item.vi}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">
                        {item.phonetic}
                      </p>
                    </div>
                    <p
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ color: item.accent }}
                    >
                      Lật thẻ →
                    </p>
                  </div>
                  {/* Back */}
                  <div className="flip-face flip-back flex flex-col justify-between bg-slate-800 p-7 text-white">
                    <Quote className="text-amber-400" size={28} />
                    <p className="font-display text-xl leading-snug italic">
                      &ldquo;{item.memory}&rdquo;
                    </p>
                    <div className="h-px w-10 bg-amber-500" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dedication quote ── */}

      <DedicationQuote />

      {/* ── Memories section ── */}
      <section
        id="memories"
        className="relative bg-slate-800 px-5 py-24 text-white sm:px-8 sm:py-32"
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        {/* Warm overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-red-900/10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker text-amber-400">
              📸 Những khoảnh khắc đẹp
            </p>
            <h2 className="font-display mt-4 text-5xl leading-[1.05] sm:text-7xl">
              Bài học phai.
              <br />
              <span className="italic text-[#F5C97A]">Kỷ niệm còn mãi.</span>
            </h2>
            <p className="mt-6 max-w-md leading-7 text-slate-300">
              Những tiếng cười giữa bài học. Nụ cười sau một câu trả lời dũng
              cảm. Những ngày bình thường lặng lẽ trở thành kỷ niệm đẹp.
            </p>
            <p className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
              <Sparkles size={14} /> Chạm vào ảnh để xem rõ hơn
            </p>
          </div>
          <div className="relative h-[440px] sm:h-[520px]">
            {photos.map((photo, index) => (
              <motion.button
                key={photo.src}
                onClick={() => setZoomedPhoto(photo)}
                className={`polaroid absolute left-1/2 top-1/2 w-[68%] max-w-sm bg-[#fffdf8] p-3 pb-12 shadow-2xl ${
                  index === 0
                    ? '-translate-x-[75%] -translate-y-[60%] -rotate-8'
                    : index === 1
                      ? '-translate-x-[25%] -translate-y-[38%] rotate-7'
                      : '-translate-x-[53%] -translate-y-[15%] -rotate-2'
                }`}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 220 }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-56 w-full object-cover sm:h-72"
                />
                <span className="signature absolute bottom-3 left-0 right-0 text-center text-xl text-slate-700">
                  {photo.caption}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 px-5 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="text-5xl"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌸
          </motion.div>
          <p className="font-display mt-4 text-3xl text-slate-800">
            Cảm ơn cô đã giúp chúng em nở rộ.
          </p>
          <p className="mt-3 text-slate-500 leading-relaxed max-w-md mx-auto">
            "Cảm ơn cô đã giúp chúng em trưởng thành. Mỗi bài học cô dạy là hành
            trang, mỗi nụ cười của cô là động lực. Chúng em luôn biết ơn cô."
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <span className="text-2xl">🌺</span>
            <span className="text-2xl">💛</span>
            <span className="text-2xl">🏮</span>
            <span className="text-2xl">⭐</span>
            <span className="text-2xl">🌸</span>
          </div>
          <div className="mt-8 flex items-center justify-center gap-3">
            <GraduationCap size={18} className="text-amber-700" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Biết ơn · 20 Tháng 11 · Ngày Nhà Giáo Việt Nam
            </p>
            <GraduationCap size={18} className="text-amber-700" />
          </div>
        </div>
      </footer>

      {/* ── Modals ── */}
      <AnimatePresence>
        {letterOpen && <LetterModal onClose={() => setLetterOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {zoomedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/85 p-5 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedPhoto(null)}
          >
            <motion.figure
              initial={{ scale: 0.8, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-w-4xl bg-[#fffdf8] p-3 pb-14 shadow-2xl"
            >
              <button
                onClick={() => setZoomedPhoto(null)}
                className="absolute -right-3 -top-3 grid size-10 place-items-center rounded-full bg-white text-slate-800 shadow-lg"
                aria-label="Đóng ảnh"
              >
                <X size={20} />
              </button>
              <img
                src={zoomedPhoto.src}
                alt={zoomedPhoto.alt}
                className="max-h-[72vh] w-full object-contain"
              />
              <figcaption className="signature absolute bottom-3 left-0 right-0 text-center text-2xl text-slate-700">
                {zoomedPhoto.caption}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
      <AudioPlayer />
    </main>
  );
}

export default App;
