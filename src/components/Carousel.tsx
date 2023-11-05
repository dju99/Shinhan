import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ad1 from "../assets/img/Ad/ad_1.png";
import ad2 from "../assets/img/Ad/ad_2.jpg";
import ad3 from "../assets/img/Ad/ad_3.jpg";
import styled from "styled-components";

const Carousel = styled.div`
  width: 1280px;
  height: 400px;
  margin: 5px;
`;

const Img = styled.img`
  width: 1280px;
  height: 400px;
`;

function SimpleSlider() {
  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // 자동 재생을 활성화
    autoplaySpeed: 3000, // 슬라이드 간의 시간 간격 (밀리초)
  };

  return (
    <Carousel>
      <Slider {...settings}>
        <Img src={ad1} />
        <Img src={ad2} />
        <Img src={ad3} />
      </Slider>
    </Carousel>
  );
}

export default SimpleSlider;
