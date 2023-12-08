import { useContext, useEffect, useState } from "react";
import { db } from "../../../helpers/firebase";
import {set, ref, onValue, remove} from "firebase/database"; 
import AuthContext from "../../Auth/auth-context";
import Description from "./Description";
import { createPortal } from "react-dom";
import Modal from "../../UI/Modals/Modal";
import ModalContext from "../../UI/Modals/modal-context";
import Trailer from "../Trailer";


const Movie = ({ moviesData }) => {
    const [apiData, setApiData] = useState({});
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const modalContext = useContext(ModalContext);
    const userContext = useContext(AuthContext);

    // Open modal window with trailer by clicking on movie in movielist
    const onShowTrailerHandler = (movie) => {
        modalContext.openModal();
        setApiData(movie);
    }

    // Function to add a movie to the watched list
    const addToFavoriteListHandler = (movieID) => {
            if(userContext.isLoggedIn) {
                // Add the movie ID to the wathed list in the database
                set(ref(db, `/${userContext.user.uid}/favoriteList/${movieID}`), {
                    id: movieID
                })
            } else {
                confirm('Registration')
            }
    }

    // Function to remove a movie from the watched list
    const removeFromFavoriteListHandler = (movieID) => {
        // Remove the movie ID from the wathed list in the database
        remove(ref(db, `/${userContext.user.uid}/favoriteList/${movieID}`));
    }

  
  
    useEffect(() => {
        // Load user's watched movies from the database
            if(userContext.user) {
                
                onValue(ref(db, `/${userContext.user.uid}/favoriteList/`), snapshot => {
                    const data = snapshot.val();
                    if(data) {
                        const moviesID = Object.values(data).map(movie => movie.id);
                        setFavoriteMovies(moviesID);
                    } else {
                        setFavoriteMovies([]);
                    }
                });
            } else {
                setFavoriteMovies([]);
            }
               
    }, [userContext]);

    
    return (
        <>
        
        {moviesData.map((movie) => (
            <div className="flex gap-5 bg-gray-50 hover:shadow-md transition-shadow duration-500 rounded-md p-5 my-5" data-id={movie.id} key={movie.id}>
                <div className="flex items-center w-7 font-bold">{movie.rank}</div>
                <div className="rounded-md bg-slate-200">
                    <img src={movie.image} className="w-[80px] rounded-md text-xs" loading="lazy" alt={movie.title}/>
                </div>
                <div>
                    <Description title={movie.title} year={movie.year} crew={movie.crew} imDbRating={movie.imDbRating} imDbRatingCount={movie.imDbRatingCount} titleStyle={'text-black font-bold'}/>
                    <div>
                        <button onClick={() => onShowTrailerHandler(movie)} className="inline-flex items-center bg-violet-500 text-white text-xs rounded-xl px-3 py-1 mt-2 hover:scale-110 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 mr-1 fill-white">
                                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                            Trailer
                        </button>
                    </div>
                </div>
                <div className="ml-auto">
                    {favoriteMovies.includes(movie.id)
                        ? <button onClick={() => removeFromFavoriteListHandler(movie.id)} type="button" className="inline-flex items-center rounded-md bg-[#2e3b5b] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                            Watchlist
                        </button>
                        : <button onClick={() => addToFavoriteListHandler(movie.id)} type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg>
                            Watchlist
                        </button>
                    }
                </div>
            </div>
         ))}
 

        {modalContext.showModal && createPortal(
            <Modal onClose={modalContext.closeModal} styles={'w-full h-full max-w-[920px] max-h-[484px]'}>
                <Trailer 
                   movies={moviesData}
                   movie={apiData}
                />
            </Modal>, 
        document.body)}
            
        </>  
    )
}

export default Movie;

