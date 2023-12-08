const Sorting = (props) => {

    const sortingByHandler = (e) => {
        props.onSelectedValue(e.target.value);
    }

    return (
        <div className="flex justify-end items-center"> 
            <label htmlFor="sortby" className="mr-2">Sorting by:</label>
            <div className="bg-gray-100 rounded-md p-2"> 
                <select onChange={sortingByHandler} name="sortby" id="sortby" className="bg-gray-100 outline-none">
                    <option value="rank">Ranking</option>
                    <option value="yearA">Release Date ↓</option>
                    <option value="yearD">Release Date ↑</option>
                    <option value="voices">Number of Ratings</option>
                </select>
            </div>
        </div>
    )
};

export default Sorting;