import React, {useContext, useEffect, useState} from "react";
import '../index.css'
import SearchTrackCard from "./TrackCard";
import {useSearchParams} from "react-router-dom";
//import {TracksContext} from "../App";

function SearchTrack() {

    //const {result} = useContext(TracksContext)

    const [searchParams] = useSearchParams();

    useEffect(() => {
        getTracks()
    }, [searchParams.get("value")]);

    const [result,setResult] = useState([]);

    async function search_track(value:string) {
        try {
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?api_key=906db58ae0258689ba249d53210358ee&method=track.search&track=${value}&format=json`, {
                method: 'GET'
            });
            return await response.json()
        } catch (err:any) {
            alert(`Произошла ошибка поиска${err.message}`);
            throw new Error(`Произошла ошибка поиска${err.message}`);
        }
    }

    function getTracks() {
        search_track(searchParams.get("value")!).then(res => {
            if (searchParams.get("value")) {
                setResult(res.results.trackmatches.track)
            }
            console.log(res);
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