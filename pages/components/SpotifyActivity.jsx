import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa"; 
import Image from 'next/image';
import { motion } from "framer-motion";
import InlineLink from "./InlineLink";

export default function SpotifyActivity() {
  const [data, setData] = useState(null);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [loading, setLoading] = useState(true);

  const [socket, setSocket] = useState(null);
  const [heartbeatInterval, setHeartbeatInterval] = useState(30000);

  useEffect(() => {
    const websocketUrl = 'wss://api.lanyard.rest/socket';
    const websocket = new WebSocket(websocketUrl);

    setSocket(websocket);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.onopen = () => {
      socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: '682607343707488388' } }));
    };
  
    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      if (data.op === 1) setHeartbeatInterval(data.d?.heartbeat_interval);
      if (data.t === 'INIT_STATE') setData(data.d);
      else if (data.t === 'PRESENCE_UPDATE') setData(data.d);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const interval = setInterval(() => {
      socket.send(JSON.stringify({ op: 3 }));
    }, heartbeatInterval);

    return () => {
      clearInterval(interval);
    };
  }, [socket, heartbeatInterval]);

  useEffect(() => {
    if (!data) return;
    setLoading(false);
    if (!data.spotify) return;
  
    const startTimestamp = data.spotify.timestamps.start;
    const endTimestamp = data.spotify.timestamps.end;
    const currentTimestamp = Date.now();
    
    const elapsedMilliseconds = currentTimestamp - startTimestamp;
    const totalMilliseconds = endTimestamp - startTimestamp;
    
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const totalSeconds = Math.floor(totalMilliseconds / 1000);

    setTotalSeconds(totalSeconds);
    setCurrentSeconds(elapsedSeconds % totalSeconds);

    const interval = setInterval(() => {
      setCurrentSeconds(currentSeconds => currentSeconds + 1);
    }, 1000);

    const timeout = setTimeout(() => {
      setData(null);
    }, totalMilliseconds);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [data]);

  return (
    (!loading && data?.spotify) ? (
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2, delay: .2, ease: 'easeInOut' }} key={data.spotify.session_id}>
        <div className="my-3 text-xs flex items-center gap-1.5 text-light-tertiaryText dark:text-dark-tertiaryText flex-wrap">
          Şu anda <span className="text-green-400 flex items-center gap-x-1 -mr-1"><FaSpotify className='inline' size={18} /> Spotify</span>'da <Image src={data.spotify.album_art_url} width={18} height={18} className='rounded-full inline' alt='Spotify Logo' /> <InlineLink className='text-light-primaryText dark:text-neutral-200 inline-flex items-center -mr-1' underlineDisabled={true} to={`https://open.spotify.com/intl-tr/track/${data.spotify.track_id}`}>{data.spotify.song}</InlineLink> dinliyorum.
        </div>

        <div className='flex-1 h-0.5 bg-light-tertiary dark:bg-dark-tertiary rounded-full relative' >
          <div className='h-full bg-green-500 rounded-full absolute transition-all duration-1000 ease-in-out' style={{ width: `${(currentSeconds / totalSeconds) * 100}%` }} />
          <span className="h-full w-full rounded-full absolute transition-all duration-1000 ease-in-out flex justify-end items-center left-8 text-xs text-light-tertiaryText dark:text-dark-tertiaryText" style={{ maxWidth: `${(currentSeconds / totalSeconds) * 100}%` }}>
            {Math.floor(currentSeconds / 60)}:{currentSeconds % 60 < 10 ? `0${currentSeconds % 60}` : currentSeconds % 60}
          </span>
        </div>
      </motion.div>
    ) : (loading && (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .2, delay: .2, ease: 'easeInOut' }} key={'loadingSpotifyActivity'}>
        <div className="my-3 text-xs flex items-center gap-1.5 text-light-tertiaryText dark:text-dark-tertiaryText flex-wrap">
          <span className="text-green-400 flex items-center gap-x-1 -mr-1"><FaSpotify className='inline' size={18} /> Spotify</span> aktivitesi yükleniyor..
        </div>

        <div className='flex-1 h-0.5 bg-light-tertiary dark:bg-dark-tertiary rounded-full relative' />
      </motion.div>
    ))
  );
};
