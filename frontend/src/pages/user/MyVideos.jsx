import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'


import {fetchVideosForUser, selectUserVideos} from '../../reducers/video/videoReducer.js'
import {useConfig} from '../../customHooks/useConfigHook.js'
import SideBar from '../../components/SideBar.jsx'
import HeroVideoCard from '../../components/HeroVideoCard.jsx'
import VideoCard from "../../components/VideoCard.jsx"

const MyVideos = () => {
  const dispatch = useDispatch()
  const {configWithJWT} = useConfig()
  const videos = useSelector(selectUserVideos);

  useEffect(() => {
    dispatch(fetchVideosForUser({ configWithJwt: configWithJWT }));
  }, []);


  return (
    <div className="flex w-full gap-2 ">
      <SideBar/>
      <main className="flex-1 lg:ml-64">
        <section className="p-4 mt-3">
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
          {videos?.map((video) => 
          <VideoCard key={video._id} video={video}/>)}
          </div>
        </section>
      </main>
    </div>
  )
}

export default MyVideos