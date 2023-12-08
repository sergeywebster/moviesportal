const SimilarTrailer = ({title, year, thumbnailUrl, crew, isSelected, onClickValue}) => {
   
    return (
         <a onClick={onClickValue} href="#" 
            className={`text-white text-xs flex gap-3 hover:bg-zinc-700 p-1.5  li ${isSelected ? 'bg-zinc-700' : ''}`}
         > 
            <img src={thumbnailUrl} alt={title} className=" flex-shrink-0 w-[100px] h-[60px] object-cover"/>
            <div>
                <span className="line-clamp-1">{title} ({year}) </span>  
                <p className=" opacity-60 pt-1 line-clamp-2 text-[11px]">{crew}</p>
            </div>
        </a> 
    )
}

export default SimilarTrailer;