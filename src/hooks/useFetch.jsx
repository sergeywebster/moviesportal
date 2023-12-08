import { useCallback, useState } from "react";

const useFetch = () => {

    const [isResponseValid, setIsResponseValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback( async (requestedOptions, manageData) => {
        setIsResponseValid(true);
        setIsLoading(true);

        try {
            // Fetch data from api
            const response = await fetch(
                requestedOptions.url, {
                    method: requestedOptions.method ? requestedOptions.method : 'GET',
                    headers: requestedOptions.headers ? requestedOptions.headers : {},
                    body: requestedOptions.body ?  JSON.stringify(requestedOptions.body) : null
                }
            );

            // Check is response is valid
            if(!response.ok) {
                throw new Error('Response is valid');
            }
            const responseData = await response.json();           

            if(responseData.errorMessage) {
                throw new Error(responseData.errorMessage);
            }

            // Function that manage response data
            manageData(responseData);
                        
            

        } catch (error) {
            console.log(error.message);
            setIsResponseValid(false);
            setErrorMessage('Sorry, this content temprorary unavailable')
        }

        // Finish loading
        setIsLoading(false);
    }, []); 

    return {
        isLoading,
        errorMessage,
        isResponseValid,
        fetchData, 
    }

   
}

export default useFetch;