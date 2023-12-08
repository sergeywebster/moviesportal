import { useEffect, useState } from "react";
import apiUrls from "../../helpers/apiUrls";
import Video from "./Video";
import Description from "./Movie/Description";
import TrailersList from "./Movie/SimilarTrailers/TrailersList";
import PreloadingSpinner from "../UI/PreloadingSpinner";
import useFetch from "../../hooks/useFetch";

const fetchURL = apiUrls.trailer

const Trailer = ({movies, movie}) => {

    const fetchingData = useFetch();
    const {isLoading, errorMessage, isResponseValid,  fetchData} = fetchingData;
    const [apiData, setApiData] = useState({});


    const {id, rank, title, year, image, crew, imDbRating, imDbRatingCount} = movie;
    const [changeTrailer, setChangeTrailer] = useState(
        {
            title, 
            year, 
            image, 
            crew, 
            rank, 
            imDbRating, 
            imDbRatingCount
        }
    );

    useEffect(() => {
        const manageData = (responseData) => { 
            
            if (!responseData.linkEmbed) {
                throw new Error('No link to trailer');
            }
    
            const {linkEmbed, videoDescription, thumbnailUrl} = responseData;
    
            // Change state with current video and trailer link
          
            setApiData({
                linkEmbed, 
                videoDescription, 
                thumbnailUrl, 
            });
    
        }
    
        // Get api data for getting trailer link
        fetchData(
            { url: fetchURL + id}, 
            manageData
        );
    }, [])

    function Loading() {
        return <h2>🌀 Loading...</h2>;
      }
    

    return (
        <>
      
        <div className="flex gap-4 h-full">
                {/* Show Trailer */}
                <div className="w-4/6 flex h-full justify-center items-center">
                    {isResponseValid && isLoading 
                        ? <PreloadingSpinner/> 
                        : <Video videoUrl={changeTrailer.linkEmbed ? changeTrailer.linkEmbed : apiData.linkEmbed} errorMessage={errorMessage}/>
                    }
                   
                </div>
                
                <div className="w-4/12">
                    {/* Trailer info */}
                    <div className="flex gap-2">
                        <div className="flex-shrink-0"><img src={changeTrailer.image} className="w-[80px] rounded-sm" loading="lazy" alt="{title}"/></div>
                        <div className="text-zinc-400">
                            <Description title={changeTrailer.title} year={changeTrailer.year} crew={changeTrailer.crew} imDbRating={changeTrailer.imDbRating} imDbRatingCount={changeTrailer.imDbRatingCount} titleStyle={'text-white font-bold text-sm'}/>
                        </div>
                    </div>

                    {/* More trailers */}
                    {isLoading 
                        ? <PreloadingSpinner/> 
                        : <TrailersList data={movies} setChangeTrailer={setChangeTrailer}/>
                    }
                </div>
            </div>
        </>
    )
};

export default Trailer
