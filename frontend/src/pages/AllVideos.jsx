import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { fetchVideosForPublic, selectPublicVideos } from '../reducers/video/videoReducer';
import Layout from '../components/Layout';
import HeroVideoCard from "../components/HeroVideoCard.jsx";


const AllVideos = () => {
  const dispatch = useDispatch();
  const publicVideos = useSelector(selectPublicVideos);
  
  useEffect(() => {
    dispatch(fetchVideosForPublic())
  }, []);

  return (
    <Layout>
      <div className='w-full p-4 '>
        <main className='w-[95vw]'>
          <div className='grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3'>
            {publicVideos?.map((video, index) =>  (
              <HeroVideoCard key={index} video={video}/>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AllVideos;
