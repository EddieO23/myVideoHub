import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideosForPublic, selectPublicVideos } from '../reducers/video/videoReducer';
import Layout from '../components/Layout';
import HeroVideoCard from "../components/HeroVideoCard.jsx";

const AllVideos = () => {
  const dispatch = useDispatch();
  const publicVideos = useSelector(selectPublicVideos);
  
  useEffect(() => {
    dispatch(fetchVideosForPublic());
  }, [dispatch]);

  return (
    <Layout>
      <div className='w-full p-4'>
        <main className='w-[95vw]'>
          
          
          {publicVideos.length === 0 ? (
            <div className='text-center text-gray-500'>
              No videos available
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {publicVideos.map((video, index) => (
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
  );
};

export default AllVideos;
