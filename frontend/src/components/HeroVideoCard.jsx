import React, { use, useRef, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ReactPlayer from 'react-player'


import { selectLoggedInUser } from '../reducers/auth/authReducer';

const HeroVideoCard = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [duration, setDuration] = useState(0);
  const loggedInUser = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    if(video.path) {
      const videoElement = videoRef.current;
      if(videoElement) {
        videoElement.onloadedmetadata = () => {
          setDuration(videoElement.duration);
        };
      }
    }
  }, [video.path]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setIsHovered(true);
  };
  return (
    <div className='heroVideoCard flex flex-col gap-3 relative bg-white rounded-md margin-2 h-52' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
      <video src={video.path} style={{display: "none"}} preload='metadata' ref={videoRef}/>

      <div className="overflow-hidden mb-2 relative" style={{width: "100%", height: "100%", cursor: "pointer"}}>
      <ReactPlayer url={video.path} light={video.thumbnail} width={'100%'} height={'100%'} controls={isPlaying} 
      playing={isPlaying}
      onPause={() => setIsPlaying(false)}
      onPlay={() => setIsPlaying(true)}
      />
      </div>
    </div>
  )
}

export default HeroVideoCard
