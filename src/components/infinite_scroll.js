import React, { useState,useEffect } from 'react';
import axios from 'axios';

const InfiniteScroll = (props) =>{

    let [data,setdata] = useState([]);
    let [maxCount,setmaxCount] = useState(0);
    let [count,setcount] = useState(1);

    function getApi(number){
        let url = 'http://open-api.myhelsinki.fi/v1/events/?distance_filter=60.1229%2C24.9343%2C5&language_filter=en&limit=20&start='+number;
        axios.get(url).then((response)=>{
            setdata( data = data.concat(response.data.data));
            setmaxCount( maxCount = response.data.meta.count)
        }).catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        let value = 1;
        getApi(value);
    },[]);
    function onScroll(e){
        const reachedBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if(reachedBottom){
            setcount(count = count+1);
            if(count <= maxCount){
                getApi(count);
            }
        }
    }
    function detailPage(name,description, value){
        let detail = {
            name : name,
            description : description
        };
        props.history.push(value.id+'/detailpage',detail);
    }
        return (
            <div>
                <div className="scroll" onScroll={onScroll}>
                        {data.map((value,index)=>{
                            return(
                                <div onClick={detailPage.bind(this,value.name.fi,value.description.intro, value)} key={index} className="align">
                                    <div className="content">
                                    <b>{value.name.fi}</b>
                                    <p> {value.description.intro} </p>
                                    </div>          
                                </div>
                            )
                        })}
                                    <div className="spinner">
                                        <div className="spinner-grow text-primary spinner-align" role="status"></div>
                                        <div className="spinner-grow text-primary spinner-align" role="status"></div>
                                        <div className="spinner-grow text-primary spinner-align" role="status"></div>
                                        <div className="spinner-grow text-primary spinner-align" role="status"></div>
                                        <div className="spinner-grow text-primary spinner-align" role="status"></div>
                                    </div>
                    </div>
            </div>
        );
    }

export default InfiniteScroll;