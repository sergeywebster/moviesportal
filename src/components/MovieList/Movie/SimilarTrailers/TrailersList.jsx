import { useEffect, useState } from "react";
import apiUrls from "../../../../helpers/apiUrls";
import SimilarTrailer from "./SimilarTrailer";

const fetchURL = apiUrls.trailer;

const TrailersList = ({data,  setChangeTrailer}) => {

   const [apiData, setApiData] = useState([]);
   const [isSelected, setIsSelected] =  useState(null);

   // Generate random 5 trailers
   const randomTrailers = [...data].sort(() => 0.5 - Math.random()).slice(0, 5);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Promise.all(
                    randomTrailers.map((item) =>
                        fetch(fetchURL + item.id)
                        .then((response) => response.json())
                    )
                );
             

                const updatedTrailers = response.map((item, id) => ({
                    ...randomTrailers[id],
                    errorMessage: item.errorMessage,
                    linkEmbed: item.linkEmbed,
                    thumbnailUrl: item.thumbnailUrl,
                })).filter((item) => !item.errorMessage);

                  setApiData(updatedTrailers);

             
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData();

    }, []);

    // Choose trailer in popup and add selected class
    const chooseTrailerHandler = (e, trailer) => {
        e.preventDefault();
        setIsSelected(trailer.id);
        setChangeTrailer({...trailer});
    }

    return (
        <>
            <div className="border-t border-zinc-600 pt-3 mt-5">
                <h3 className="text-zinc-400">More trailers</h3>
                <div className="pt-3 flex flex-col overflow-y-auto scrollbar-hide max-h-64">
                    {apiData.map((trailer) =>  (
                       <SimilarTrailer 
                            {...trailer} 
                            key={trailer.id}  
                            onClickValue={(e) => chooseTrailerHandler(e, trailer)} 
                            isSelected={isSelected === trailer.id}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default TrailersList;