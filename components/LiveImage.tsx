'use client'

import { useEffect, useRef, useState } from 'react'
import { clipOf } from '@/lib/data'

// Still image; spaces with a walkthrough clip play it once, full frame, over the still.
export default function LiveImage({ src, alt, id, live = true }: { src: string; alt: string; id?: string; live?: boolean }) {
  const vid = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const clip = clipOf(src)

  // onPlaying can fire before hydration attaches the handler, so also check on mount
  useEffect(() => {
    const v = vid.current
    if (v && !v.paused && v.readyState >= 3) setPlaying(true)
  }, [live])

  return (
    <div className="cover" id={id}>
      <img className="cover" src={src} alt={alt} />
      {live && clip && (
        <video
          ref={vid}
          className={`cover loop${playing ? ' ready' : ''}`}
          src={clip}
          poster={src}
          autoPlay
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onPlaying={() => setPlaying(true)}
        />
      )}
    </div>
  )
}
