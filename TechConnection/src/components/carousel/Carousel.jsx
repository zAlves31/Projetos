import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/images/carousel.png";

import carousel1 from "../../assets/images/carousel_items1.png";
import carousel2 from "../../assets/images/carousel-items2.png";
import carousel3 from "../../assets/images/carousel-items3.png"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Carousel = ({addStyles}) => {
    const [activeSlide, setActiveSlide] = useState(0);

    const carouselContent = [
        {
            title: "Conectando os Desenvolvedores de todo mundo!",
            text: "Imagine um mundo onde a paixão pela tecnologia se encontra em um espaço digital vibrante, conectado e acolhedor.",
            image: carousel1,
            imageClass: "mb-[80px] mt-[-150px]"
        },
        {
            title: "Conecte-se com sua conta do Github",
            text: "Ao conectar sua conta do GitHub, você não apenas amplia suas oportunidades de aprendizado e crescimento, mas também faz parte de uma comunidade vibrante e inovadora.",
            image: carousel2,
            imageClass: "mb-3 mt-[-90px]"
        },
        {
            title: "Compartilhe suas ideias com a comunidade",
            text: "Cada ideia compartilhada é uma oportunidade para aprender, ensinar e crescer coletivamente. Junte-se a nós e descubra como a troca de experiências pode transformar visões em realidades.",
            image: carousel3,
            imageClass: "mb-[80px] mt-[-100px]"
        }
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % carouselContent.length);
        }, 5000); 

        return () => clearInterval(intervalId);
    }, []);

    const handleNextSlide = () => {
        setActiveSlide((prev) => (prev + 1) % carouselContent.length);
    };

    const handlePrevSlide = () => {
        setActiveSlide((prev) => (prev - 1 + carouselContent.length) % carouselContent.length);
    };

    const handleDotClick = (index) => {
        setActiveSlide(index);
    };

    return (
        <div
            className={`w-[45vw] h-[96vh] rounded bg-primary-blue flex flex-col shadow-custom text-center justify-center items-center ${addStyles}`}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <img src={carouselContent[activeSlide].image} alt="" className={`w-[60%] ${carouselContent[activeSlide].imageClass}`} />

            <div className="flex flex-col items-center">
                <h1 className="text-secondary-white font-chackra font-semibold text-[24px] mb-2">{carouselContent[activeSlide].title}</h1>
                <p className="text-secondary-white font-verdana text-[12px] w-[85%]">{carouselContent[activeSlide].text}</p>
            </div>

            <div className="rounded flex mt-10 items-center justify-between w-[350px]">
                <IoIosArrowBack size={25} color={"#ffffff"} onClick={handlePrevSlide} />

                <div className="flex space-x-2">
                    {carouselContent.map((_, index) => (
                        <span
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className={`w-2.5 h-2.5 rounded-full cursor-pointer ${index === activeSlide ? 'bg-primary-purple' : 'bg-secondary-lightGray'
                                }`}
                        />
                    ))}
                </div>

                <IoIosArrowForward size={25} color={"#ffffff"} onClick={handleNextSlide} />
            </div>
        </div>
    );
}

export default Carousel;