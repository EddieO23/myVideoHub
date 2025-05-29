import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { toast } from 'sonner';


import { downloadVideo, IVideo } from "../reducers/video/videoReducer";
import backendApi from '../api/backendApi.js'
import Layout from "../components/Layout";



const SingleVideoPage = () => {
  const {id} = useParams()
  const [video, setVideo] = useState(null) 
  const [loading, setLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  
  const dispatch = useDispatch() 

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setLoading(true)
        const {data} = await backendApi.get(`/api/v1/aws/fetch-single/video/${id}`)
        
        if(data.success) {
          setVideo(data.video)
        }

      } catch (error) {
        toast.error('failed to fetch video')
      } finally {
        setLoading(false)
      }
    }
    if(id) {
      fetchVideo()
    }
  }, [id])

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      if(id) {
        await dispatch(downloadVideo({id}))
        toast.success('Video downloaded')
      }
    } catch (error) {
      toast.error('Downloading failed')
    } finally {
      setIsDownloading(false)
    }
  }

  if(loading) return <p className='text-lg texct-center'>Loading...</p>

  return (
    <Layout>
      {/* Video Overlay */}
      <div className="relative w-full h-[69vh]">
        {video && !isPlaying && (<div></div>)}
      </div>
    </Layout>
  )
}

export default SingleVideoPage
