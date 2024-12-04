import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeel } from "./topMeel";
import CarouselItem from './CarouselItem';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const MultiItemCarousel = () => {
    const setting = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false
    };

    return (
        <div>
            <Slider {...setting}>
                {topMeel.map((item, index) => 
                    <CarouselItem key={index} image={item.image} title={item.title} /> 
                )}
            </Slider>
        </div>
    );
}

export default MultiItemCarousel
