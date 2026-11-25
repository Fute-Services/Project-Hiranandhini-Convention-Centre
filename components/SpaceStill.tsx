'use client'

import { useEffect, useState } from 'react'

type Layer = { src: string; k: number }

// Cross-fades between stills: the current image stays on screen until the next
// one has loaded and decoded, then the new one fades in on top (no black gap).
export default function SpaceStill({ src, alt, id }: { src: string; alt: string; id?: string }) {
  const [layers, setLayers] = useState<Layer[]>([{ src, k: 0 }])
  const top = layers[layers.length - 1]

  useEffect(() => {
    if (src === top.src) return
    let alive = true
    const img = new Image()
    img.src = src
    const show = () => {
      if (alive) setLayers((l) => [l[l.length - 1], { src, k: l[l.length - 1].k + 1 }])
    }
    img.decode().then(show, show)
    return () => {
      alive = false
    }
  }, [src, top.src])

  return (
    <div className="cover" id={id}>
      {layers.map((l, i) => (
        <img
          key={l.k}
          className={`cover${i === layers.length - 1 ? ' still-in' : ''}`}
          src={l.src}
          alt={i === layers.length - 1 ? alt : ''}
          aria-hidden={i === layers.length - 1 ? undefined : true}
        />
      ))}
    </div>
  )
}
