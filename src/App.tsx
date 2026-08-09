import { useEffect, useRef, useState } from 'react'

// ── Design tokens ──────────────────────────────────────────────────────────
const T = {
  void: '#0A0A0B',
  panel: '#17171B',
  ivory: '#F5F3EE',
  brass: '#D4A94E',
  indigo: '#6B5CA5',
  grey: '#8A8A90',
}

const mono = { fontFamily: "'JetBrains Mono', monospace" } as const
const serif = { fontFamily: "'Fraunces', serif" } as const
const sans = { fontFamily: "'Inter', sans-serif" } as const

// ── Reduced-motion detection ───────────────────────────────────────────────
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// ── Reveal hook ────────────────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (prefersReducedMotion()) { setVisible(true); return }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Fade-rise / fade helpers ───────────────────────────────────────────────
function fadeRise(visible: boolean, delay = 0, rise = 14, duration = 520): React.CSSProperties {
  if (prefersReducedMotion()) return {}
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : `translateY(${rise}px)`,
    transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
  }
}
function fadeOnly(visible: boolean, delay = 0, duration = 420): React.CSSProperties {
  if (prefersReducedMotion()) return {}
  return {
    opacity: visible ? 1 : 0,
    transition: `opacity ${duration}ms ease-out ${delay}ms`,
  }
}

// ── Stat count-up ──────────────────────────────────────────────────────────
function useCountUp(target: string, running: boolean, duration = 900) {
  const [display, setDisplay] = useState(prefersReducedMotion() ? target : '0')
  useEffect(() => {
    if (!running || prefersReducedMotion()) { setDisplay(target); return }
    const num = parseFloat(target.replace(/[^0-9.]/g, ''))
    const suffix = target.replace(/[0-9.]/g, '')
    if (isNaN(num)) { setDisplay(target); return }
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(eased * num) + suffix)
      if (t < 1) raf = requestAnimationFrame(step)
      else setDisplay(target)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [running, target, duration])
  return display
}

// ── VU Level Meter ─────────────────────────────────────────────────────────
const meterStats = [
  { value: '4+', label: 'YRS EXP', height: 72 },
  { value: '30+', label: 'APPS SHIPPED', height: 58 },
  { value: '4', label: 'COMPANIES', height: 50 },
  { value: '3', label: 'PLATFORMS BUILT', height: 65 },
  { value: '4+', label: 'YEARS FLUTTER', height: 88 },
]

function StatLabel({ value, label, running, delay, isHot, isMid }: {
  value: string; label: string; running: boolean; delay: number; isHot: boolean; isMid: boolean
}) {
  const displayed = useCountUp(value, running, 900)
  const rm = prefersReducedMotion()
  return (
    <div
      className="meter-stat-label"
      style={{
        textAlign: 'center', marginBottom: '4px',
        opacity: rm || running ? 1 : 0,
        transition: rm ? undefined : `opacity 400ms ease-out ${delay}ms`,
      }}
    >
      <div style={{ ...mono, fontSize: '11px', fontWeight: 600, color: isHot ? T.brass : isMid ? T.ivory : T.grey, lineHeight: 1.1, whiteSpace: 'nowrap' }}>
        {displayed}
      </div>
      <div style={{ ...mono, fontSize: '7px', color: T.grey, letterSpacing: '0.05em', whiteSpace: 'nowrap', marginTop: '2px' }}>
        {label}
      </div>
    </div>
  )
}

function LevelMeter({ running }: { running: boolean }) {
  const [settled, setSettled] = useState(false)
  const rm = prefersReducedMotion()
  useEffect(() => {
    if (!running) return
    const t = setTimeout(() => setSettled(true), rm ? 0 : 900)
    return () => clearTimeout(t)
  }, [running, rm])

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '20px 20px 0', height: '160px', position: 'relative' }}>
      {/* Scale */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4px 0' }}>
        {['+6', '0', '-6', '-12', '-∞'].map((v) => (
          <span key={v} style={{ ...mono, fontSize: '8px', color: T.grey, opacity: 0.5, lineHeight: 1 }}>{v}</span>
        ))}
      </div>
      {/* Bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', paddingLeft: '32px', height: '100%' }}>
        {meterStats.map((s, i) => {
          const isHot = s.height > 85
          const isMid = s.height > 65 && !isHot
          return (
            <div key={i} className="meter-bar-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
              <StatLabel value={s.value} label={s.label} running={running} delay={i * 60} isHot={isHot} isMid={isMid} />
              <div style={{ width: '18px', height: '80px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: `${s.height}%`,
                  background: isHot
                    ? `linear-gradient(to top, ${T.brass}, #E8C870)`
                    : isMid
                      ? `linear-gradient(to top, ${T.indigo}, #9B8DC4)`
                      : `linear-gradient(to top, rgba(107,92,165,0.6), rgba(107,92,165,0.3))`,
                  borderRadius: '2px',
                  transformOrigin: 'bottom',
                  animation: settled
                    ? `meter-idle ${2.2 + i * 0.3}s ${i * 0.1}s ease-in-out infinite`
                    : running
                      ? `meter-settle 0.8s ${i * 40}ms ease-out both`
                      : undefined,
                }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Header ─────────────────────────────────────────────────────────────────
function Header() {
  const [loaded, setLoaded] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rm = prefersReducedMotion()
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60)
    return () => clearTimeout(t)
  }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = ['Work', 'Experience', 'Skills', 'Contact']

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled || menuOpen ? T.panel : 'rgba(10,10,11,0.88)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled || menuOpen ? `1px solid rgba(245,243,238,0.10)` : `1px solid rgba(245,243,238,0.06)`,
      ...(rm ? {} : { opacity: loaded ? 1 : 0, transition: 'opacity 300ms ease-out, background 200ms, border-color 200ms' }),
    }}>
      <div className="header-inner" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 28px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="header-brand" style={{ ...mono, fontSize: '12px', color: T.ivory, letterSpacing: '0.08em', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0, flex: '1 1 auto', marginRight: '12px' }}>
          YAZAN ALSHIKH&nbsp;&nbsp;—&nbsp;&nbsp;SENIOR FLUTTER DEVELOPER
        </span>
        <nav className="site-nav" style={{ display: 'flex', gap: '28px' }}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="link-underline"
              style={{ ...sans, fontSize: '11px', color: T.grey, letterSpacing: '0.06em', textTransform: 'uppercase' as const, transition: 'color 150ms ease-out' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = T.ivory)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = T.grey)}
            >
              {item}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span style={{ ...mono, fontSize: '10px', color: T.ivory, letterSpacing: '0.1em' }}>
            {menuOpen ? '✕ CLOSE' : '☰ MENU'}
          </span>
        </button>
      </div>
      {menuOpen && (
        <nav
          style={{
            borderTop: `1px solid rgba(245,243,238,0.08)`,
            padding: '8px 18px 18px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                ...sans, fontSize: '14px', color: T.grey, letterSpacing: '0.04em',
                textTransform: 'uppercase' as const, padding: '12px 0',
                borderBottom: `1px solid rgba(245,243,238,0.05)`,
              }}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero() {
  const [phase, setPhase] = useState(0)
  const rm = prefersReducedMotion()
  useEffect(() => {
    if (rm) { setPhase(4); return }
    const ts = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 400),
      setTimeout(() => setPhase(3), 500),
      setTimeout(() => setPhase(4), 600),
    ]
    return () => ts.forEach(clearTimeout)
  }, [rm])

  return (
    <section className="hero-section" style={{ padding: '130px 28px 100px', maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
      <div aria-hidden style={{
        position: 'absolute', top: '10%', right: '0', width: '560px', height: '560px', maxWidth: '90vw',
        borderRadius: '50%', background: `radial-gradient(circle, ${T.indigo} 0%, transparent 70%)`,
        animation: 'indigo-bloom 6s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
      }} />
      <div className="hero-grid" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr auto', gap: '60px', alignItems: 'start' }}>
        <div style={{ maxWidth: '560px' }}>
          <div style={{ ...fadeRise(phase >= 1, 0, 16, 600), ...mono, fontSize: '11px', color: T.brass, letterSpacing: '0.15em', marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: T.brass, animation: 'live-pulse 1.8s ease-in-out infinite', flexShrink: 0 }} />
            LIVE — AVAILABLE FOR REMOTE ROLES
          </div>
          <h1 style={{ ...fadeRise(phase >= 1, 0, 16, 600), ...serif, fontSize: 'clamp(30px, 4.5vw, 56px)', fontWeight: 600, color: T.ivory, lineHeight: 1.1, margin: '0 0 24px', letterSpacing: '-0.02em' }}>
            Code that aligns with business goals, not just specs.
          </h1>
          <p style={{ ...fadeRise(phase >= 2, 0, 14, 560), ...sans, fontSize: 'clamp(14px, 2vw, 16px)', color: T.grey, lineHeight: 1.75, margin: '0 0 40px', fontWeight: 300 }}>
            Senior Flutter Engineer with 4+ years building and scaling production-grade mobile platforms across fintech, healthcare, real-time communication, and data-driven consumer apps — offline-first architecture, live audio and messaging, secure data pipelines, and high-performance apps shipped to Google Play and the App Store.
          </p>
          <div style={{ ...fadeRise(phase >= 3, 0, 12, 520), display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {/* Primary CTA */}
            <a
              href="mailto:yazan.alshikh@outlook.com"
              className="btn-primary"
              style={{ ...sans, fontSize: '13px', fontWeight: 500, color: '#0A0A0B', background: T.brass, padding: '12px 26px', border: `1px solid ${T.brass}`, letterSpacing: '0.02em' }}
            >
              Email Yazan
            </a>
            {/* Ghost CTA */}
            <a
              href="tel:+963931697454"
              className="btn-ghost"
              style={{ ...mono, fontSize: '12px', color: T.ivory, background: 'transparent', padding: '12px 24px', border: `1px solid rgba(245,243,238,0.2)`, letterSpacing: '0.04em' }}
            >
              +963 931 697 454
            </a>
            {/* Download CV */}
            <a
              href={`${import.meta.env.BASE_URL}Yazan-Alshikh-CV.pdf`}
              download="Yazan-Alshikh-CV.pdf"
              className="btn-ghost"
              style={{ ...mono, fontSize: '12px', color: T.ivory, background: 'transparent', padding: '12px 24px', border: `1px solid rgba(245,243,238,0.2)`, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              ↓ Download CV
            </a>
          </div>
        </div>
        {/* Meter panel */}
        <div className="hero-meter-panel meter-panel-glow" style={{ ...fadeRise(phase >= 3, 60, 12, 500), background: T.panel, border: `1px solid rgba(245,243,238,0.05)`, padding: '16px', minWidth: '280px' }}>
          <div style={{ ...mono, fontSize: '9px', color: T.grey, letterSpacing: '0.15em', marginBottom: '8px', opacity: 0.6 }}>
            SIGNAL MONITOR / CH 1–5
          </div>
          <LevelMeter running={phase >= 4} />
          <div style={{ ...mono, fontSize: '8px', color: T.grey, opacity: 0.4, marginTop: '12px', letterSpacing: '0.1em' }}>
            ● REC&nbsp;&nbsp;● LIVE&nbsp;&nbsp;○ MUTE
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Divider ────────────────────────────────────────────────────────────────
function Divider() {
  return <div className="section-pad" style={{ maxWidth: '1080px', margin: '0 auto', padding: '0 28px', borderTop: `1px solid rgba(245,243,238,0.06)` }} />
}

// ── Experience ─────────────────────────────────────────────────────────────
const experiences = [
  {
    role: 'Senior Flutter Developer', company: 'Pharaon Group', period: '2026/03 – Present',
    scope: 'Refactoring a large-scale IPTV platform and shipping Askoonect, a tendering and procurement platform.',
    bullets: [
      'Refactored and enhanced a large-scale IPTV application, improving performance, code maintainability, and streaming reliability',
      'Continuous improvement and feature development for the Sawa mobile app — stability, UX, bug fixing',
      'Developing and maintaining Askoonect: dynamic workflows, API integrations, scalable architecture',
      'Applied Clean Architecture and modular design across projects',
    ],
    stack: ['Flutter', 'REST APIs', 'Clean Architecture', 'Riverpod', 'Performance Optimization'],
    current: true,
  },
  {
    role: 'Senior Flutter Developer', company: 'Dream WD LLC', period: '2024/10 – 2026/02',
    scope: 'Owned a production real-time voice platform used for live audio rooms with 50+ concurrent speakers.',
    bullets: [
      'Owns and maintains a real-time voice platform (Zego Cloud, WebRTC) with background audio services and Firebase-based signaling',
      'Designed and stabilized a low-latency audio pipeline for 50+ concurrent speakers per room — reconnection handling, network fallback, audio focus management',
      'Led a national-scale Qatari Calendar platform: prayer times, Qibla direction, Adhan notifications, offline religious content',
      "Implemented background scheduling, timezone-aware notifications, and resilient data caching for reliability even when the app isn't running",
    ],
    stack: ['Flutter', 'WebRTC', 'Zego', 'Firebase', 'Background Services', 'Push Notifications'],
    current: false,
  },
  {
    role: 'Flutter Developer', company: 'Vroad LLC', period: '2023/10 – 2024/08',
    scope: 'Owned roughly a third of all active mobile products, end to end.',
    bullets: [
      'Led delivery of six production mobile apps across logistics, service booking, and business operations — Google Play, TestFlight, App Store',
      'Owned architecture, releases, hotfixes, and feature delivery for ~1/3 of all active mobile products',
      'Built scalable UI and API integration with GetX, REST, and offline caching for stable operation under poor network conditions',
    ],
    stack: ['Flutter', 'REST APIs', 'GetX', 'Firebase', 'App Store & Play Store distribution'],
    current: false,
  },
  {
    role: 'Flutter Developer', company: 'Future Code LLC', period: '2022/06 – 2023/10',
    scope: 'Built the real-time layer behind three production platforms.',
    bullets: [
      'Engineered three production platforms: captain tracking, e-commerce, real-time operations',
      'Built Socket.IO-based real-time communication, reducing message latency and improving live update reliability',
      'Delivered performance-optimized UIs and custom widgets that improved engagement and session duration',
      'Designed local caching and sync pipelines for offline operation with seamless server reconciliation',
    ],
    stack: ['Flutter', 'Socket.IO', 'REST APIs', 'Custom UI', 'Offline Sync'],
    current: false,
  },
]

function ChannelStrip({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { ref, visible } = useReveal(0.1)
  const rm = prefersReducedMotion()
  const gainPct = exp.current ? 92 : Math.max(30, 78 - index * 14)

  return (
    <div
      ref={ref}
      className="channel-strip"
      tabIndex={0}
      role="button"
      aria-expanded={open}
      style={{
        background: T.panel,
        border: `1px solid rgba(245,243,238,0.05)`,
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '34px 1fr',
        opacity: rm || visible ? 1 : 0,
        ...(rm ? {} : {
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 500ms ease-out ${index * 70}ms, transform 500ms ease-out ${index * 70}ms, box-shadow 180ms ease-out, background-color 180ms ease-out`,
        }),
      }}
      onClick={() => setOpen(!open)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open) } }}
    >
      {/* Gain rail — vertical fader track representing seniority/recency */}
      <div style={{
        borderRight: `1px solid rgba(245,243,238,0.06)`,
        background: 'rgba(0,0,0,0.18)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '14px 0', position: 'relative',
      }}>
        <div
          className="channel-led"
          style={{
            width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0, marginBottom: '10px',
            background: exp.current ? T.brass : 'rgba(138,138,144,0.4)',
            boxShadow: exp.current ? `0 0 6px rgba(212,169,78,0.7)` : 'none',
          }}
        />
        <div style={{ flex: 1, width: '3px', background: 'rgba(245,243,238,0.07)', borderRadius: '2px', position: 'relative', minHeight: '64px' }}>
          <div
            className="channel-rail-fill"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: rm || visible ? `${gainPct}%` : '0%',
              borderRadius: '2px',
              background: exp.current
                ? `linear-gradient(to top, ${T.brass}, #E8C870)`
                : `linear-gradient(to top, ${T.indigo}, rgba(107,92,165,0.5))`,
            }}
          />
        </div>
        <span style={{ ...mono, fontSize: '8px', color: T.grey, opacity: 0.4, marginTop: '10px', letterSpacing: '0.05em' }}>
          {String(experiences.length - index).padStart(2, '0')}
        </span>
      </div>

      <div>
        <div className="channel-row" style={{ padding: '22px 24px', display: 'grid', gridTemplateColumns: '1fr auto', gap: '20px', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
              {exp.current && (
                <span style={{ ...mono, fontSize: '9px', color: T.brass, letterSpacing: '0.15em', border: `1px solid rgba(212,169,78,0.4)`, padding: '2px 7px' }}>LIVE</span>
              )}
              <span style={{ ...serif, fontSize: '18px', fontWeight: 600, color: T.ivory }}>{exp.role}</span>
              <span style={{ ...sans, fontSize: '15px', color: T.grey, fontWeight: 300 }}>{exp.company}</span>
            </div>
            <p style={{ ...sans, fontSize: '13px', color: T.grey, margin: '6px 0 0', lineHeight: 1.5, fontWeight: 300, fontStyle: 'italic' }}>
              {exp.scope}
            </p>
          </div>
          {/* Date — brightens on hover like a channel going active */}
          <div className="channel-date-row" style={{
            display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0,
            ...(rm ? {} : {
              opacity: visible ? 1 : 0,
              transition: `opacity 400ms ease-out ${index * 70 + 100}ms, color 160ms ease-out`,
            }),
          }}>
            <span style={{ ...mono, fontSize: '11px', color: hovered ? T.ivory : T.grey, letterSpacing: '0.04em', whiteSpace: 'nowrap', transition: 'color 160ms ease-out' }}>
              {exp.period}
            </span>
            <span style={{ ...mono, fontSize: '10px', color: T.grey, opacity: 0.5, transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>
              ▶
            </span>
          </div>
        </div>

        {open && (
          <div style={{ padding: '0 24px 24px', borderTop: `1px solid rgba(245,243,238,0.05)` }}>
            <ul style={{ margin: '16px 0 20px', padding: '0 0 0 16px' }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{ ...sans, fontSize: '14px', color: T.grey, lineHeight: 1.7, marginBottom: '8px', fontWeight: 300 }}>{b}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              <span style={{ ...mono, fontSize: '9px', color: T.grey, opacity: 0.5, marginRight: '4px', letterSpacing: '0.1em' }}>STACK —</span>
              {exp.stack.map((s) => (
                <span key={s} style={{ ...mono, fontSize: '10px', color: T.grey, letterSpacing: '0.04em' }}>
                  {s}<span style={{ opacity: 0.3, marginLeft: '6px' }}>·</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Experience() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="experience" className="section-pad" style={{ padding: '80px 28px', maxWidth: '1080px', margin: '0 auto' }}>
      <div ref={ref} style={{ marginBottom: '52px', ...fadeRise(visible, 0, 12, 500) }}>
        <div style={{ ...mono, fontSize: '10px', color: T.brass, letterSpacing: '0.2em', marginBottom: '10px', opacity: 0.7 }}>CHANNELS</div>
        <h2 style={{ ...serif, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: T.ivory, margin: 0, letterSpacing: '-0.02em' }}>Experience</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {experiences.map((exp, i) => <ChannelStrip key={i} exp={exp} index={i} />)}
      </div>
    </section>
  )
}

// ── Projects ───────────────────────────────────────────────────────────────
const projects = [
  {
    name: 'TMKN | تمكن', sub: 'Educational Platform',
    desc: 'Smart digital learning platform connecting teachers and students: online lessons and recorded video, teacher–student communication and announcements, course materials, secure auth with teacher/student roles.',
    stack: ['Flutter', 'REST APIs', 'Firebase Cloud Messaging', 'Secure Storage'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.vroad.gsikw&hl=en',
    appStore: 'https://apps.apple.com/us/app/tmkn-%D8%AA%D9%85%D9%83%D9%86/id1590997791',
  },
  {
    name: 'Fitnet', sub: 'Fitness & Performance Platform',
    desc: 'Real-time fitness tracking with workout analytics, coach-driven training plans, and multimedia exercise content. Coach dashboards, performance reporting, scalable cloud-synced user data.',
    stack: ['Flutter', 'Firebase', 'REST APIs', 'Charts', 'Media Handling'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.fitnet.app.gym.fitnet_application&hl=en',
    appStore: 'https://apps.apple.com/us/app/fitnet-your-gym-partner/id6444032576',
  },
  {
    name: 'Quick Findout', sub: 'Inventory & Workforce Platform',
    desc: 'Enterprise-grade warehouse and staff management: role-based access control, real-time stock and attendance tracking, advanced reporting dashboards.',
    stack: ['Flutter', 'Drift (SQLite)', 'REST APIs', 'GetX'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.vroad.quickfindoutapp&hl=en',
    appStore: 'https://apps.apple.com/us/app/quick-findout/id6471904498',
  },
  {
    name: 'Fanoos | فانوس', sub: 'Ecommerce Platform',
    desc: 'Ecommerce platform for home appliances with smart product recommendations, real-time inventory, and subscription management.',
    stack: ['Flutter', 'Firebase Cloud Messaging', 'Secure Storage', 'REST APIs', 'Bloc'],
    googlePlay: 'https://play.google.com/store/apps/details?id=com.perlatech.fanoos&hl=en',
    appStore: 'https://apps.apple.com/us/app/fanoos-%D9%81%D8%A7%D9%86%D9%88%D8%B3/id6754273852',
  },
  {
    name: 'Askoonect', sub: 'Bidding and Procurement Platform',
    desc: 'Tendering and procurement platform: role-based access, dynamic project workflows, vendor submissions, real-time status updates, and automated notifications.',
    stack: ['Flutter', 'Clean Architecture', 'REST APIs', 'Socket-IO', 'Riverpod'],
    googlePlay: null,
    appStore: null,
  },
  {
    name: 'Like IPTV', sub: 'IPTV System',
    desc: 'Subscription-based IPTV platform: Live TV channels, Video on Demand, user authentication, and subscription management.',
    stack: ['Flutter', 'REST APIs', 'Riverpod', 'Video Players'],
    googlePlay: 'https://play.google.com/store/apps/details?id=co.ultrawares.like&hl=en',
    appStore: 'https://apps.apple.com/us/app/like-blue/id1615286301',
  },
]

// ── Store badge icons (inline SVG, no external deps) ──────────────────────
function GooglePlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M3.18 23.76c.3.17.65.19.97.07l11.2-6.47-2.5-2.5-9.67 8.9zM.5 1.4A1.5 1.5 0 0 0 0 2.5v19a1.5 1.5 0 0 0 .5 1.1l.06.06 10.64-10.64v-.25L.56 1.34.5 1.4zM20.3 10.37l-2.98-1.72-2.8 2.8 2.8 2.8 3-1.74a1.5 1.5 0 0 0 0-2.14zM4.15.24 15.35 6.7l-2.5 2.5L3.18.24A1.1 1.1 0 0 1 4.15.24z" />
    </svg>
  )
}
function AppStoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function StoreButton({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href === '#' ? undefined : '_blank'}
      rel="noreferrer"
      aria-label={label}
      className="store-btn"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        ...mono,
        fontSize: '10px',
        color: T.grey,
        textDecoration: 'none',
        padding: '5px 11px',
        border: `1px solid rgba(245,243,238,0.12)`,
        letterSpacing: '0.06em',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = T.brass
        el.style.borderColor = 'rgba(212,169,78,0.5)'
        el.style.backgroundColor = 'rgba(212,169,78,0.06)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement
        el.style.color = T.grey
        el.style.borderColor = 'rgba(245,243,238,0.12)'
        el.style.backgroundColor = 'transparent'
      }}
    >
      {icon}
      {label}
    </a>
  )
}

function ProjectCard({ p, index }: { p: typeof projects[0]; index: number }) {
  const { ref, visible } = useReveal(0.1)
  const rm = prefersReducedMotion()
  return (
    <div
      ref={ref}
      className="project-card"
      style={{
        background: T.panel, padding: '28px',
        border: `1px solid rgba(245,243,238,0.05)`,
        opacity: rm || visible ? 1 : 0,
        display: 'flex', flexDirection: 'column', gap: '14px',
        position: 'relative', overflow: 'hidden',
        clipPath: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 0 100%)',
        ...(rm ? {} : {
          transform: visible ? 'translateY(0)' : 'translateY(12px)',
          transition: `opacity 480ms ease-out ${index * 70}ms, transform 480ms ease-out ${index * 70}ms, box-shadow 220ms ease-out, border-color 220ms ease-out`,
        }),
      }}
    >
      {/* Diagonal corner accent */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, width: '22px', height: '22px',
        background: T.indigo, opacity: 0.35, clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
      }} />
      {/* Ghost index numeral */}
      <span aria-hidden className="project-ghost-num" style={{
        ...serif, position: 'absolute', top: '-8px', right: '14px', fontSize: '72px', fontWeight: 700,
        color: T.ivory, opacity: 0.05, lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div style={{ position: 'relative' }}>
        <div style={{ ...serif, fontSize: '18px', fontWeight: 600, color: T.ivory, marginBottom: '3px' }}>{p.name}</div>
        <div style={{ ...mono, fontSize: '9px', color: T.brass, letterSpacing: '0.1em', opacity: 0.8 }}>{p.sub}</div>
      </div>
      <p style={{ ...sans, fontSize: '13px', color: T.grey, lineHeight: 1.7, margin: 0, fontWeight: 300, flex: 1, position: 'relative' }}>{p.desc}</p>

      {/* Store links */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative' }}>
        {p.googlePlay && <StoreButton href={p.googlePlay} label="Google Play" icon={<GooglePlayIcon />} />}
        {p.appStore && <StoreButton href={p.appStore} label="App Store" icon={<AppStoreIcon />} />}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', paddingTop: '14px', borderTop: `1px solid rgba(245,243,238,0.06)`, position: 'relative' }}>
        {p.stack.map((s, si) => (
          <span
            key={s}
            className="stack-tag"
            style={{
              ...mono, fontSize: '9px', color: T.grey, letterSpacing: '0.05em',
              padding: '3px 8px', border: `1px solid rgba(245,243,238,0.08)`,
              ...(rm ? {} : {
                opacity: visible ? 1 : 0,
                transition: `opacity 300ms ease-out ${index * 70 + 200 + si * 30}ms, background-color 140ms ease-out, color 140ms ease-out, border-color 140ms ease-out`,
              }),
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

function Projects() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="work" className="section-pad" style={{ padding: '80px 28px', maxWidth: '1080px', margin: '0 auto' }}>
      <div ref={ref} style={{ marginBottom: '52px', ...fadeRise(visible, 0, 12, 500) }}>
        <div style={{ ...mono, fontSize: '10px', color: T.brass, letterSpacing: '0.2em', marginBottom: '10px', opacity: 0.7 }}>SELECTED WORK</div>
        <h2 style={{ ...serif, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: T.ivory, margin: 0, letterSpacing: '-0.02em' }}>Featured Projects</h2>
      </div>
      <div className="grid-projects" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
        {projects.map((p, i) => <ProjectCard key={i} p={p} index={i} />)}
      </div>
    </section>
  )
}

// ── Skills ─────────────────────────────────────────────────────────────────
const skillGroups = [
  { group: 'Mobile & UI', items: ['Flutter', 'Dart', 'Material & Cupertino', 'Custom Renderers', 'Animations', 'Adaptive UI', 'Deep Linking'] },
  { group: 'Architecture & State', items: ['Clean Architecture', 'BLoC', 'Cubit', 'GetX', 'Riverpod', 'Dependency Injection', 'Repository Pattern', 'Reactive Streams (RxDart)'] },
  { group: 'Data & Offline', items: ['Drift (SQLite)', 'ObjectBox', 'Hive', 'Offline-first Sync', 'Conflict Resolution', 'Local/Remote ID Mapping'] },
  { group: 'Networking & Realtime', items: ['Dio', 'Retrofit', 'REST APIs', 'WebSockets', 'Socket.IO', 'WebRTC', 'Zego Cloud'] },
  { group: 'Cloud & Backend', items: ['Firebase Auth', 'Firestore', 'FCM', 'Background Services', 'Push Notifications'] },
  { group: 'Security & Performance', items: ['AES/RSA encryption', 'Secure Storage', 'App Hardening', 'Memory & Rendering Optimization'] },
  { group: 'Release & Distribution', items: ['Google Play', 'App Store', 'TestFlight', 'CI/CD', 'Multi-environment builds'] },
  { group: 'AI & Dev Tooling', items: ['ChatGPT', 'Claude', 'Cursor', 'Copilot', 'Prompt Engineering', 'AI API Integration'] },
]

function SkillCard({ g, index }: { g: typeof skillGroups[0]; index: number }) {
  const { ref, visible } = useReveal(0.1)
  const rm = prefersReducedMotion()
  return (
    <div
      ref={ref}
      className="skill-card"
      style={{
        background: `${T.panel} radial-gradient(rgba(245,243,238,0.05) 1px, transparent 1px) 0 0/14px 14px`,
        padding: '24px 26px',
        border: `1px solid rgba(245,243,238,0.05)`,
        borderLeft: `2px solid rgba(107,92,165,0.4)`,
        ...(rm ? {} : {
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: `opacity 460ms ease-out ${index * 65}ms, transform 460ms ease-out ${index * 65}ms`,
        }),
      }}
    >
      <div style={{
        ...mono, fontSize: '9px', color: T.brass, letterSpacing: '0.18em',
        marginBottom: '16px', opacity: 0.8, paddingBottom: '12px',
        borderBottom: `1px solid rgba(245,243,238,0.06)`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{g.group.toUpperCase()}</span>
        <span style={{ opacity: 0.5 }}>{String(index + 1).padStart(2, '0')}</span>
      </div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', columnGap: '22px', rowGap: '10px',
        ...(rm ? {} : { opacity: visible ? 1 : 0, transition: `opacity 420ms ease-out ${index * 65 + 120}ms` }),
      }}>
        {g.items.map((item) => (
          <span key={item} className="skill-item" style={{ display: 'flex', alignItems: 'center', gap: '9px', padding: '4px 0' }}>
            <span className="skill-jack" aria-hidden style={{
              width: '5px', height: '5px', borderRadius: '50%',
              border: `1px solid rgba(138,138,144,0.5)`, background: 'transparent',
            }} />
            <span style={{ ...sans, fontSize: '13px', color: T.grey, fontWeight: 300, whiteSpace: 'nowrap' }}>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Skills() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section id="skills" className="section-pad" style={{ padding: '80px 28px', maxWidth: '1080px', margin: '0 auto' }}>
      <div ref={ref} style={{ marginBottom: '52px', ...fadeRise(visible, 0, 12, 500) }}>
        <div style={{ ...mono, fontSize: '10px', color: T.brass, letterSpacing: '0.2em', marginBottom: '10px', opacity: 0.7 }}>CAPABILITIES</div>
        <h2 style={{ ...serif, fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: T.ivory, margin: 0, letterSpacing: '-0.02em' }}>Skills</h2>
      </div>
      <div className="grid-skills" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {skillGroups.map((g, i) => <SkillCard key={i} g={g} index={i} />)}
      </div>
    </section>
  )
}

// ── Education + Languages ──────────────────────────────────────────────────
function EducationLanguages() {
  const { ref, visible } = useReveal(0.1)
  return (
    <section className="section-pad" style={{ padding: '40px 28px 80px', maxWidth: '1080px', margin: '0 auto' }}>
      <div ref={ref} className="grid-edu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {[0, 1].map((i) => (
          <div key={i} className="edu-card" style={{ background: T.panel, padding: '28px', border: `1px solid rgba(245,243,238,0.05)`, ...fadeRise(visible, i * 70, 10, 480) }}>
            {i === 0 ? (
              <>
                <div style={{ ...mono, fontSize: '9px', color: T.brass, letterSpacing: '0.18em', marginBottom: '16px', opacity: 0.7 }}>EDUCATION</div>
                <div style={{ ...serif, fontSize: '17px', fontWeight: 600, color: T.ivory, marginBottom: '4px' }}>Technical Computer College</div>
                <div style={{ ...sans, fontSize: '14px', color: T.grey, marginBottom: '12px', fontWeight: 300 }}>Damascus University</div>
                <div style={{ ...mono, fontSize: '11px', color: T.grey, opacity: 0.7 }}>Software Engineering, Mobile Development</div>
                <div style={{ ...mono, fontSize: '10px', color: T.grey, opacity: 0.4, marginTop: '4px' }}>2015 – 2019</div>
              </>
            ) : (
              <>
                <div style={{ ...mono, fontSize: '9px', color: T.brass, letterSpacing: '0.18em', marginBottom: '16px', opacity: 0.7 }}>LANGUAGES</div>
                {[{ lang: 'Arabic', level: 'Native' }, { lang: 'English', level: 'Professional working proficiency' }].map(({ lang, level }) => (
                  <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '14px', paddingBottom: '14px', borderBottom: `1px solid rgba(245,243,238,0.05)` }}>
                    <span style={{ ...serif, fontSize: '17px', fontWeight: 600, color: T.ivory }}>{lang}</span>
                    <span style={{ ...mono, fontSize: '10px', color: T.grey, opacity: 0.6, letterSpacing: '0.05em' }}>{level}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Contact ────────────────────────────────────────────────────────────────
function ContactChannel({ label, value, href, icon, delay, visible }: {
  label: string; value: string; href: string; icon: React.ReactNode; delay: number; visible: boolean
}) {
  return (
    <a
      href={href}
      className="contact-channel"
      style={{
        display: 'flex', alignItems: 'center', gap: '16px',
        padding: '20px 22px', background: 'rgba(0,0,0,0.18)',
        border: `1px solid rgba(245,243,238,0.08)`,
        textDecoration: 'none', flex: '1 1 240px', minWidth: '240px',
        ...fadeRise(visible, delay, 10, 560),
      }}
    >
      <span className="contact-channel-icon" style={{
        width: '38px', height: '38px', flexShrink: 0, borderRadius: '50%',
        border: `1px solid rgba(212,169,78,0.35)`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: T.brass,
      }}>
        {icon}
      </span>
      <span style={{ minWidth: 0 }}>
        <span style={{ ...mono, fontSize: '9px', color: T.grey, letterSpacing: '0.2em', opacity: 0.6, display: 'block', marginBottom: '5px' }}>
          {label}
        </span>
        <span style={{ ...sans, fontSize: '15px', fontWeight: 500, color: T.ivory, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {value}
        </span>
      </span>
      <span aria-hidden className="contact-channel-arrow" style={{ ...mono, fontSize: '13px', color: T.grey, marginLeft: 'auto', flexShrink: 0 }}>
        →
      </span>
    </a>
  )
}

function Contact() {
  const { ref, visible } = useReveal(0.12)
  return (
    <section id="contact" className="section-pad" style={{ background: T.panel, borderTop: `1px solid rgba(245,243,238,0.06)`, borderBottom: `1px solid rgba(245,243,238,0.06)`, padding: '96px 28px', position: 'relative', overflow: 'hidden' }}>
      <div aria-hidden style={{
        position: 'absolute', bottom: '-20%', left: '-10%', width: '480px', height: '480px', maxWidth: '80vw',
        borderRadius: '50%', background: `radial-gradient(circle, ${T.brass} 0%, transparent 70%)`,
        opacity: 0.06, pointerEvents: 'none',
      }} />
      <div ref={ref} style={{ maxWidth: '640px', margin: '0 auto', position: 'relative' }}>
        <div style={{ ...mono, fontSize: '10px', color: T.brass, letterSpacing: '0.2em', marginBottom: '20px', opacity: 0.7, display: 'flex', alignItems: 'center', gap: '8px', ...fadeRise(visible, 0, 14, 600) }}>
          <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: T.brass, animation: visible ? 'live-pulse 1.8s ease-in-out infinite' : undefined, flexShrink: 0 }} />
          FINAL CHANNEL
        </div>
        <h2 style={{ ...serif, fontSize: 'clamp(34px, 5vw, 60px)', fontWeight: 600, color: T.ivory, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.05, ...fadeRise(visible, 60, 16, 650) }}>
          Let's talk
        </h2>
        <div style={{ marginBottom: '40px', ...fadeRise(visible, 120, 12, 580) }}>
          <div style={{ ...sans, fontSize: '15px', color: T.grey, fontWeight: 300, lineHeight: 1.6 }}>Yazan Alshikh</div>
          <div style={{ ...sans, fontSize: '14px', color: T.grey, fontWeight: 300, opacity: 0.6 }}>Senior Flutter Developer — Syria (Remote-ready)</div>
        </div>
        <div className="contact-links" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <ContactChannel
            label="EMAIL"
            value="yazan.alshikh@outlook.com"
            href="mailto:yazan.alshikh@outlook.com"
            delay={200}
            visible={visible}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            }
          />
          <ContactChannel
            label="PHONE"
            value="+963 931 697 454"
            href="tel:+963931697454"
            delay={260}
            visible={visible}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1z" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  const { ref, visible } = useReveal(0.3)
  return (
    <footer className="section-pad" style={{ padding: '20px 28px' }}>
      <div ref={ref} style={{ maxWidth: '1080px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', ...fadeOnly(visible, 0, 400) }}>
        <a
          href="#contact"
          className="footer-name"
          style={{ ...mono, fontSize: '11px', color: T.grey, opacity: 0.4, letterSpacing: '0.04em', textDecoration: 'none' }}
        >
          Yazan Alshikh
        </a>
        <span style={{ ...mono, fontSize: '10px', color: T.grey, opacity: 0.25, letterSpacing: '0.06em' }}>© 2026</span>
      </div>
    </footer>
  )
}

// ── Root ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background: T.void, minHeight: '100vh' }}>
      <Header />
      <main>
        <Hero />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Skills />
        <Divider />
        <EducationLanguages />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
