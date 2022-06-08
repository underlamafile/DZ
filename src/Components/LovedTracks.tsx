import React, {useEffect, useState} from 'react';
import LovedTrackCard from "./LovedTrackCard";

function LovedTracks() {

    const [result,setResult] = useState([]);

    useEffect(() => {
        setLovedTracks()
    }, []);

    async function getLovedTracks() {
        try {
            const response = await fetch(`https://ws.audioscrobbler.com/2.0/?api_key=906db58ae0258689ba249d53210358ee&method=user.getlovedtracks&user=Foxyb0y&format=json`, {
                method: 'GET'
            });
            return await response.json()
        } catch (err:any) {
            alert(`Произошла ошибка поиска${err.message}`);
            throw new Error(`Произошла ошибка поиска${err.message}`);
        }
    }

    function setLovedTracks() {
        getLovedTracks().then(res => {
            console.log(res);
            setResult(res.lovedtracks.track)
        })
    }

    return (
        <div className="content">
            {result.map((track:any) => {
                return (
                    <LovedTrackCard name={track.name} img={track.image[3]["#text"]} artist={track.artist.name}/>
                )
            })}
        </div>
    )

}

export default LovedTracks