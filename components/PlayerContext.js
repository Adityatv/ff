import React, { createContext, useState, useRef, useEffect } from 'react'

export const PlayerContext = createContext()

export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const [track, setTrack] = useState(null)
  const [playing, setPlaying] = useState(false)

  useEffect(()=>{
    const a = audioRef.current
    if(!a) return
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    a.addEventListener('play', onPlay)
    a.addEventListener('pause', onPause)
    return ()=> {
      a.removeEventListener('play', onPlay)
      a.removeEventListener('pause', onPause)
    }
  },[audioRef.current])

  const play = (id, meta) => {
    setTrack({ id, meta })
    if(audioRef.current){
      audioRef.current.src = '/api/stream/' + id
      audioRef.current.play().catch(()=>{})
      setPlaying(true)
    }
  }

  const toggle = () => {
    if(!audioRef.current) return
    if(playing){ audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play().catch(()=>{}); setPlaying(true) }
  }

  const value = { audioRef, track, playing, play, toggle }

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} style={{display:'none'}} preload="metadata" />
    </PlayerContext.Provider>
  )
}
