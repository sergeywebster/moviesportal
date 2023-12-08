import { useState } from "react";

const Tests = () => {

    const array = ['todd', 'bob', 'emily'];

    const [active, setActive] = useState(null);
    
    const clickHandler = (id) => {
       setActive(id);
    }

    return (
        <>
            {array.map((item, id) => (
                <button onClick={() => clickHandler(id)} key={id} className={`block ${active === id ? 'font-bold' : 'font-extralight'}`}>{item}</button>
            ))}
        </>
    )
}

export default Tests;