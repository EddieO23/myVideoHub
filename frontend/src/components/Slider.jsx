import Slider from 'react-slick';


import HeroVideoCard from './HeroVideoCard';



const VideoSlider = ({ videos }) => {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
   <Slider {...sliderSettings}>
      {videos?.map((video) => (
        <HeroVideoCard key={video._id} video={video} />
      ))}
    </Slider>
  );
};

export default VideoSlider;
