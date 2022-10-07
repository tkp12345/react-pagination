import React, {useEffect, useState} from 'react';
import './style.css'

const renderData = data =>{
    return(
        <ul>
            {data.map((todo,index)=>{
                return <li key={index}>{todo.title}</li>
            })}
        </ul>
    )
}

const Pagination = () => {
    const [data, setData] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage, setitemsPerPage] = useState(5);

    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(1);


    const handleClick = (e)=>{
        setcurrentPage(Number(e.target.id));
    }

    const pages=[];
    for(let i=1; i<=Math.ceil(data.length/itemsPerPage);i++){
        pages.push(i)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFistItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFistItem,indexOfLastItem);

    const renderPageNumbers = pages.map(number=>{
        if(number < maxPageNumberLimit+1 && number > minPageNumberLimit-1) {
            return (
                <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
                    {number}
                </li>
            )
        }else{
            return null;
        }


    })

    const handleNextBtn=()=>{
        setcurrentPage(currentPage+1);

        if(currentPage+1>maxPageNumberLimit){
            setMaxPageNumberLimit(maxPageNumberLimit+pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit+pageNumberLimit);
        }
    }
    const handlePrevBtn=()=>{
        setcurrentPage(currentPage-1);

        if((currentPage-1) % pageNumberLimit == 0){
            setMaxPageNumberLimit(maxPageNumberLimit-pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit-pageNumberLimit);
        }
    }


    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setData(json))
    })

    return (
        <>
            <ul className="pageNumbers">
                <li>
                    <button
                        disabled ={currentPage == pages[0]?true:false}
                    onClick={handlePrevBtn}>
                        {`< Previous`}
                    </button>
                </li>

                {renderPageNumbers}

                <li>
                    <button
                        disabled={currentPage == pages[pages.length-1]?true:false}
                    onClick={handleNextBtn}
                    >
                        {`Next >`}
                    </button>
                </li>
            </ul>
            {renderData(currentItems)}
    </>
            );
};

export default Pagination;