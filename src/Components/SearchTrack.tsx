import React, {useEffect, useState} from "react";
import '../index.css'
import SearchTrackCard from "./TrackCard";
import {useSearchParams} from "react-router-dom";
import {HttpsRequest, GetRequest} from '../Request'

function SearchTrack() {

    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("value")) {
            getTracks();
        }
    }, [searchParams.get("value")]);

    const [result,setResult] = useState([]);

    function getTracks() {
        let getRequest = new GetRequest(new HttpsRequest('GET','track.search'))
        getRequest.getTracks(searchParams.get("value")!).then(res => {
            if (res.results.trackmatches.track.length) {
                setResult(res.results.trackmatches.track)
            }
            else alert(`Произошла ошибка поиска, повторите попытку`);
        })
    }

    return (
        <div className="content">
            {result.map((track:any) => {
                return (
                    <SearchTrackCard name={track.name} img={track.image[3]["#text"]} artist={track.artist}/>
                )
            })}
        </div>
    )
}

export default SearchTrack;