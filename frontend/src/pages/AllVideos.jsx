import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton'


import {
  fetchVideosForPublic,
  getSearchResults,
  selectPublicVideos,
  selectSearchResults,
  selectVideoLoading,
} from '../reducers/video/videoReducer';
import Layout from '../components/Layout';
import HeroVideoCard from '../components/HeroVideoCard.jsx';

const AllVideos = () => {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const searchResults = useSelector(selectSearchResults);
  const isLoading = useSelector(selectVideoLoading)
  const dispatch = useDispatch();
  const publicVideos = useSelector(selectPublicVideos);

  useEffect(() => {
    if (searchTerm) {
      dispatch(getSearchResults(searchTerm));
    }
    dispatch(fetchVideosForPublic());
  }, [dispatch, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(query);
  };

  return (
    <Layout>
      <div className='w-full p-4'>
        <main className='w-[95vw]'>
          {/* Search Bar */}

          <div className='mt-3 px-3 w-full flex justify-center'>
            <input
              type='search'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className='w-8/12 block rounded-full p-2 focus:outline-none border border-black focus:border-none focus:outline-blue-600 bg-bgOne'
            />
            <button
              onClick={handleSearch}
              className='ml-2 px-4 py-2 bg-blue-500 text-white rounded-full'
            >
              Search
            </button>
          </div>

          <div className='mt-7'>
            {searchTerm ? (
              <div className='grid grid-cols-1 gap-2 mg:grid-cols-2 lg:grid-cols-3'>
                {searchResults.map((video, index) => <HeroVideoCard key={video._id} video={video}/> )}
              </div>
            ) : publicVideos.length === 0 ? (
              <div className='text-center text-gray-500'>
                No videos available
              </div>
            ) : 
            isLoading ? <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {[...Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    height={300}
                    width={200}
                    className="rounded-lg"
                  />
                ))}
            </div> : 
            (
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {publicVideos.map((video, index) => (
                  <HeroVideoCard key={index} video={video} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default AllVideos;
