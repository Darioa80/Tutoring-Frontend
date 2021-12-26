import { useState, useEffect } from 'react';


export const useError= () => {

    const [httpError, setHttpError] = useState({occured: false, message: ""});


    const HttpErrorDetected = (error) =>{

        let message;
        if(error.response){
            message = error.response.data.message;
        }
        else{
            message = "Error connecting to server, please try again later."
        }
         
        setHttpError({occured: true, message});
    }

    const CloseModal = () =>{
        setHttpError({occured: false, message: ""});

    }

    const loadingHttpResponse = (loading) =>{
        if(loading){
            setHttpError({occured: "loading", message: ""});

        }
        else {
            setHttpError({occured: false, message: ""});

        }
    }


    return {httpError, HttpErrorDetected, CloseModal, loadingHttpResponse};
};