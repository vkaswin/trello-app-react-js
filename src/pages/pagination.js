import React, { useState,useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Pagination = (props) =>{

    let [empty,setempty] = useState(true);
    let [maxCount,setmaxCount] = useState(0);
    let [data,setdata] = useState([]);

    function getApi(number){
        let url = 'http://open-api.myhelsinki.fi/v1/events/?distance_filter=60.1229%2C24.9343%2C5&language_filter=en&limit=20&start='+number;
        axios.get(url).then((response)=>{
            setmaxCount(maxCount = response.data.meta.count);
            setdata(data = response.data.data);
            if(data.length == 0){
                setempty(empty = false)
            }
            else{
                setempty(empty = true)
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        let count = 1;
        getApi(count);
    },[]);
    function handlePageClick(event){
        getApi(event.selected+1);
        window.scrollTo(0,0);
    }
    function detailPage(name,description){
        let detail = {
            name : name,
            description : description
        };
        props.history.push('/detailpage',detail);
    }
        let Data = data.map((value,index)=>{
            return(
                <div onClick={detailPage.bind(this,value.name.fi,value.description.intro)} key={index} className="align">
                    <div className="content">
                    <b>{value.name.fi}</b>
                    <p> {value.description.intro} </p> 
                    </div>       
                </div>
        )})
        return (
                <div>
                        {empty ? <div> {Data} </div> : 
                        <div className="no-record">
                            <b>No Records Found</b>
                        </div> }
                        <div className={data.length < 6 ? "footer":undefined }>
                        <ReactPaginate
                          previousLabel={'previous'}
                          nextLabel={'next'}
                          pageCount={maxCount-1}
                          marginPagesDisplayed={2}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                        activeClassName={'pagination-active'}
                        />
                        </div>
                </div>
        );
    }

export default Pagination;