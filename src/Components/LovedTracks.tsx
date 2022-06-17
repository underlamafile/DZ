import React, {useEffect, useState} from 'react';
import LovedTrackCard from "./LovedTrackCard";
import {HttpsRequest, GetRequest} from "../Request";

function LovedTracks() {

    const [result,setResult] = useState([]);
    const [deleted,setDeleted] = useState('');

    useEffect(() => {
        setTimeout(() => {
            setLovedTracks();
        }, 1000);
    }, [deleted]);

    const updateData = (value:string) => {
        setDeleted(value)
    }

    function setLovedTracks() {
        let getRequest = new GetRequest(new HttpsRequest('GET','user.getlovedtracks'),'Foxyb0y')
        getRequest.getTracks(undefined).then(res => {
            setResult(res.lovedtracks.track)
        })
    }

    return (
        <div className="content">
            {result.map((track:any) => {
                return (
                    <LovedTrackCard name={track.name} img={track.image[3]["#text"]} artist={track.artist.name}
                                    updateData={updateData}/>
                )
            })}
        </div>
    )

}

export default LovedTracks