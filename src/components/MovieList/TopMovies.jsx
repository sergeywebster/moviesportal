import { useState, useEffect} from "react";

import Movie from "../MovieList/Movie/Movie";
import Sorting from "./Sorting";
import ErrorMessage from "../ErrorMessage";
import apiUrls from "../../helpers/apiUrls";
import PreloadingList from "./PreloadingList";
import useFetch from "../../hooks/useFetch"; // Custom hook for fetching data


const fetchURL = apiUrls.top250;


const TopMovies = () => {
  const [selectedValue, setSelectedValue] = useState('rank');
  const [apiData, setApiData] = useState([]);
  const fetchingData = useFetch();
  const { isLoading, errorMessage, isResponseValid, fetchData } = fetchingData;


  // Fetch movies from API
  useEffect(() => {
    const manageData = ({ items }) => {
      if (!items || items.length === 0) {
        throw new Error('Array is invalid');
      }

      const loadedData = items.map((item) => ({
        id: item.id,
        rank: item.rank,
        title: item.title,
        year: item.year,
        image: item.image,
        crew: item.crew,
        imDbRating: item.imDbRating,
        imDbRatingCount: item.imDbRatingCount
      }));

      // Change state with new array 
      setApiData(loadedData);

      // Change sorting of array
      sortMovies(selectedValue);
    };

    // Call function and catch errors
    fetchData({ url: fetchURL }, manageData);

  }, [selectedValue, fetchData]);

  // Get selected value from child Sorting.jsx
  const selectedValueHandler = (value) => {
    setSelectedValue(value);
  };

  // Sorting by selected value
  const sortMovies = (sortingBy) => {
    setApiData((movies) => {
      switch (sortingBy) {
        case 'rank':
          return [...movies].sort((a, b) => a.rank - b.rank);
        case 'yearA':
          return [...movies].sort((a, b) => a.year - b.year);
        case 'yearD':
          return [...movies].sort((a, b) => b.year - a.year);
        case 'voices':
          return [...movies].sort((a, b) => b.imDbRatingCount - a.imDbRatingCount);
        default:
          return movies;
      }
    });
  };

 
  return (
    <>
      <div className="max-w-[768px] mx-auto ">
        <div className="pt-20 text-center">
          <h1 className="text-[36px] font-bold">Top 250 Movies</h1>
        </div>

        <div>
            {/* Sorting */}
            <Sorting onSelectedValue={selectedValueHandler} />

            {/* Movies List */}
            {isLoading && <PreloadingList />}
            {isResponseValid && <Movie moviesData={apiData}/>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </div>
      </div>
    </>
  );
};

export default TopMovies;
