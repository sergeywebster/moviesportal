import { useEffect, useState } from "react";
import arrow from '../../src/assets/direction-arrow.svg'

const Carousel = () => {

    const images = [
        "https://picsum.photos/1920/700",
        "https://picsum.photos/1920/701",
        "https://picsum.photos/1920/702"
    ];

    // Define currentIndex
    const [currentIndex, setCurrentIndex] = useState(0);
   
    // Use SetInterval for changing images
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlider() 
        }, 8000);

        return () => {clearInterval(interval)};
       
    }, [currentIndex]);

    // Previous slider button
    const prevSlider = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }

    // Next slider button
    const nextSlider = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }


    // Change current image by clicking by dots
    const chooseImageHandler = (index) => {
        setCurrentIndex(index);
    }

    
    return (
        <section className="w-full relative aspect-[1920/500] bg-gray-100">
            {/* Render images */}
            {images.map((image, index) => (
                <div className="absolute z-0" key={index}>
                    <img src={image}  alt="" className={`aspect-[1920/500] object-cover transition-opacity duration-700 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`} loading="lazy"/>
                </div>
            ))}

             {/* Render buttons */}
            <div className="absolute z-10 w-full top-[45%]">
                <div className="flex justify-between px-5">
                    <button onClick={prevSlider} className="bg-white w-10 h-10 p-2 flex justify-center items-center rotate-180 border-0 bg-opacity-50 hover:bg-opacity-90 transition-colors duration-300"><img src={arrow}/></button>
                    <button onClick={nextSlider} className="bg-white w-10 h-10 p-2 flex justify-center items-center border-0 bg-opacity-50  hover:bg-opacity-90 transition-colors duration-300"><img src={arrow}/></button>
                </div>
            </div>
           
           {/* Render dots */}
            <div className="w-full absolute bottom-5 z-10">
                <div className="flex justify-center gap-2">
                    {images.map((image, index) => (
                        <button key={index} onClick={() => chooseImageHandler(index)} className={`w-4 h-4 rounded-full overflow-hidden indent-20 ${currentIndex === index ? 'bg-orange-600' : 'bg-white'}`}>{index}</button>
                    ))}
                </div>
            </div>
        </section>
    )

}

export default Carousel;

