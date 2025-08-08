import React, { useContext } from 'react'
import { PlayerContext } from './PlayerContext'

export default function BottomPlayer(){
  const { track, playing, toggle } = useContext(PlayerContext)
  return (
    <div className="player-fixed">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <img src={track?.meta?.snippet?.thumbnails?.default?.url || '/placeholder.png'} className="thumb" />
        <div style={{minWidth:0}}>
          <div style={{fontWeight:700,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',maxWidth:350}}>
            {track?.meta?.snippet?.title || 'Not playing'}
          </div>
          <div style={{color:'#9aa1a0',fontSize:13}}>{track?.meta?.snippet?.channelTitle || ''}</div>
        </div>
      </div>
      <div style={{marginLeft:'auto',display:'flex',gap:12,alignItems:'center'}}>
        <button onClick={toggle} className="px-3 py-2 rounded border">{playing ? '▮▮' : '►'}</button>
      </div>
    </div>
  )
}
