import { useEffect } from "react"
import {useDispatch, useSelector} from 'react-redux'


import {fetchVideosForUser, selectUserVideos} from '../../reducers/video/videoReducer.js'
import {useConfig} from '../../customHooks/useConfigHook.js'
import Layout from "../../components/Layout.jsx"
import HeroVideoCard from "../../components/HeroVideoCard.jsx"

const MyVideos = () => {
  const dispatch = useDispatch()
  const {configWithJWT} = useConfig()
  const videos = useSelector(selectUserVideos);

  useEffect(() => {
    dispatch(fetchVideosForUser({ configWithJwt: configWithJWT }));
  }, []);


  return (
    <Layout>
      <div className='w-full p-4'>
        <main className='w-[95vw]'>
          
          {videos?.length === 0 ? (
            <div className='text-center text-gray-500'>
              No videos available
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {videos?.map((video, index) => (
                <HeroVideoCard 
                  key={index} 
                  video={video}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </Layout>
  )
}

export default MyVideos