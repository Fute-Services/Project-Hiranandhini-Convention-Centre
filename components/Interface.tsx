'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { CATS, FILM_SRC, IMG, SPACES } from '@/lib/data'

type View = 'plan' | 'space' | 'film'
const catById = Object.fromEntries(CATS.map((c) => [c.id, c]))

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export default function Interface() {
  const [view, setView] = useState<View>('plan')
  const [cat, setCat] = useState('all')
  const [idx, setIdx] = useState(0)
  const [shot, setShot] = useState(0)
  const [panelOn, setPanelOn] = useState(true)
  const [pick, setPick] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)
  const [filmMissing, setFilmMissing] = useState(false)
  const vid = useRef<HTMLVideoElement>(null)

  const total = SPACES.length
  const space = SPACES[idx]

  const closeFilm = useCallback(() => {
    vid.current?.pause()
    setPlaying(false)
  }, [])

  const go = useCallback(
    (v: View) => {
      if (v !== 'film') closeFilm()
      setView(v)
    },
    [closeFilm],
  )

  const openSpace = useCallback(
    (i: number) => {
      setIdx((i + total) % total)
      setShot(0)
      go('space')
    },
    [total, go],
  )

  const pickCat = (id: string) => {
    setCat(id)
    setPick(null)
    setHover(null)
    setPanelOn(true)
  }

  const onFilmError = () => {
    closeFilm()
    setFilmMissing(true)
  }
  const play = () => {
    const v = vid.current
    if (!v) return
    setFilmMissing(false)
    if (v.getAttribute('src') !== FILM_SRC) v.setAttribute('src', FILM_SRC)
    setPlaying(true)
    v.play()?.catch(() => {
      if (v.error) onFilmError()
    })
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && view !== 'plan') go('plan')
      if (view === 'space' && e.key === 'ArrowRight') openSpace(idx + 1)
      if (view === 'space' && e.key === 'ArrowLeft') openSpace(idx - 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [view, idx, go, openSpace])

  const shownCount = SPACES.filter((s) => cat === 'all' || s.cat === cat).length
  const on = (v: View) => (view === v ? ' on' : '')

  return (
    <div id="app">
      <section id="plan" className={`view${on('plan')}`} aria-label="Master plan">
        <div className="stage" id="stage">
          <img className="cover" id="hero" src={IMG.cam1} alt="Aerial view of the convention centre, its dome, roof terraces and forecourt" />
          {SPACES.map((s, i) => {
            const vis = (cat === 'all' || s.cat === cat) && (pick === null || pick === i)
            return (
              <div
                key={s.id}
                className={`spot${s.x > 62 ? ' flip' : ''}${vis ? '' : ' hide'}${hover === i ? ' on' : ''}`}
                style={{ left: `${s.x}%`, top: `${s.y}%`, ['--i' as string]: i }}
              >
                <button type="button" aria-label={`Open ${s.name}, ${s.floor}`} onClick={() => openSpace(i)}>
                  <Icon d={catById[s.cat].icon!} />
                </button>
                <div className="tip">
                  <b>{s.name}</b>
                  <span>{s.floor}</span>
                </div>
              </div>
            )
          })}
        </div>
        <div className="scrim-b" />

        <div className={`panel glass${panelOn ? '' : ' away'}`} id="panel">
          {cat === 'all' ? (
            <div key="all" className="swap">
              <div className="eyebrow">Interactive master plan</div>
              <h1 className="display" style={{ marginTop: 14 }}>Explore the centre</h1>
              <p style={{ marginTop: 14 }}>
                A convention and leisure destination in Alibaug, set beneath a copper dome. Three floors bring together a convention hall, conference rooms, restaurants, sports courts, a pool and a wellness floor.
              </p>
              <p className="hint" style={{ marginTop: 14 }}>Select a marker on the plan to step inside, or filter the spaces below.</p>
            </div>
          ) : (
            <div key={cat} className="swap">
              <div className="eyebrow">{shownCount} spaces</div>
              <h2 className="display" style={{ margin: '14px 0' }}>{catById[cat].label}</h2>
              <div className="rows">
                {SPACES.map((s, i) =>
                  s.cat !== cat ? null : (
                    <button
                      key={s.id}
                      style={{ ['--i' as string]: i }}
                      type="button"
                      aria-pressed={pick === i}
                      onClick={() => (pick === i ? openSpace(i) : setPick(i))}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      onMouseLeave={() => setHover(null)}
                      onBlur={() => setHover(null)}
                    >
                      <b>{s.name}</b>
                      <span>{pick === i ? 'Open →' : s.floor}</span>
                    </button>
                  ),
                )}
              </div>
            </div>
          )}
          <button type="button" className="ghost" onClick={() => setPanelOn(false)}>Hide this panel</button>
        </div>
        <button type="button" className={`glass pill${panelOn ? ' away' : ''}`} id="panelShow" tabIndex={panelOn ? -1 : 0} onClick={() => setPanelOn(true)}>
          Show details
        </button>

        <div className="dock">
          <div className="seg glass" role="group" aria-label="Filter the spaces by type">
            {CATS.map((c) => (
              <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => pickCat(c.id)}>
                <span>{c.label}</span>
                <span className="count">{c.id === 'all' ? total : SPACES.filter((s) => s.cat === c.id).length}</span>
              </button>
            ))}
          </div>
          <button type="button" className="cta" onClick={() => go('film')}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            <span>Watch the walkthrough</span>
          </button>
        </div>
      </section>

      <section id="space" className={`view${on('space')}`} aria-label="Space detail">
        <img className="cover" id="spaceImg" key={`${idx}-${shot}`} src={IMG[space.shots[shot]]} alt={`Render of the ${space.name}`} />
        <div className="scrim-b" />
        <button type="button" className="glass pill" id="back" onClick={() => go('plan')}>
          <Icon d="M15 6l-6 6 6 6" />
          <span>Back to the master plan</span>
        </button>
        <div className="sheet">
          <div className="info glass" key={idx}>
            <div className="eyebrow">{catById[space.cat].label} · {space.floor}</div>
            <h2 className="display">{space.name}</h2>
            <p>{space.desc}</p>
          </div>
          <div className="steps" key={`s${idx}`}>
            <button type="button" className="glass step" onClick={() => openSpace(idx - 1)}>
              <Icon d="M15 6l-6 6 6 6" />
              <span><small>Previous</small><b>{SPACES[(idx - 1 + total) % total].name}</b></span>
            </button>
            <div className="thumbs glass" role="group" aria-label="Views of this space">
              {space.shots.length > 1 &&
                space.shots.map((key, n) => (
                  <button key={key} type="button" aria-label={`${space.name}, view ${n + 1} of ${space.shots.length}`} aria-pressed={n === shot} onClick={() => setShot(n)}>
                    <img src={IMG[key]} alt="" />
                  </button>
                ))}
            </div>
            <button type="button" className="glass step next" onClick={() => openSpace(idx + 1)}>
              <span><small>Next</small><b>{SPACES[(idx + 1) % total].name}</b></span>
              <Icon d="M9 6l6 6-6 6" />
            </button>
          </div>
        </div>
      </section>

      <section id="film" className={`view${on('film')}${playing ? ' playing' : ''}`} aria-label="Walkthrough film">
        <img className="cover" id="poster" src={IMG.cam8} alt="The convention centre lit up at night, seen from the air" />
        <div className="shade" />
        <div className="film-c">
          <div className="eyebrow">Walkthrough film</div>
          <h2 className="display">Take the guided walkthrough</h2>
          <button type="button" className="play" aria-label="Play the walkthrough film" onClick={play}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          </button>
          <p id="filmNote" role="status">
            {filmMissing && (
              <>
                The film was not found. Save the walkthrough video in the <code>public</code> folder as <code>walkthrough.mp4</code> and press play again.
              </>
            )}
          </p>
          <button type="button" className="ghost" style={{ alignSelf: 'center' }} onClick={() => go('plan')}>Back to the master plan</button>
        </div>
        <video id="vid" ref={vid} controls playsInline preload="none" onError={onFilmError} onEnded={closeFilm} />
        <button type="button" className="glass pill" id="filmClose" onClick={closeFilm}>
          <Icon d="M15 6l-6 6 6 6" />
          <span>Close the film</span>
        </button>
      </section>

      <header className="top">
        <div className="brand">
          <div className="eyebrow">Alibaug</div>
          <div className="brand-name">Hiranandhini Convention Centre</div>
        </div>
        <nav className="seg glass" aria-label="Views">
          <button type="button" aria-pressed={view !== 'film'} onClick={() => go('plan')}>Master plan</button>
          <button type="button" aria-pressed={view === 'film'} onClick={() => go('film')}>Walkthrough</button>
        </nav>
      </header>
    </div>
  )
}
