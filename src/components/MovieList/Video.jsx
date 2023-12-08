const Video = ({videoUrl, errorMessage}) => {
    return (
        <>
        <div className="w-full h-full rounded-md overflow-hidden">
            {videoUrl 
            
                ? <iframe 
                    src={`${videoUrl}?autoplay=true&width=570`} 
                    width="100%" 
                    height="100%" 
                    allowFullScreen={true}
                    className="aspect-video"
                >
                </iframe>    
                : <div className="flex w-full h-full items-center justify-center text-white bg-black">{errorMessage}</div>
            }  
        </div>
        </>
    )
}

export default Video;