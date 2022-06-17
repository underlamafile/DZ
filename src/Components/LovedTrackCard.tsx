import React, {useEffect, useState} from "react";
import '../index.css'
import {HttpsRequest,PostRequest} from '../Request'

interface ILovedTrackCard {
    name:string,
    artist:string,
    img:string,
    updateData:(value:string) => void
}

function LovedTrackCard({name,img,artist,updateData}:ILovedTrackCard) {

    return (
        <div className="content__favorite">
            <button className="favorite__delete-btn" onClick={() => {
                let postRequest = new PostRequest(new HttpsRequest('POST','track.unlove'))
                postRequest.deleteTrack(name,artist);
                updateData(name)
            }}>удалить</button>
            <img className="favorite__image" src={img} />
            <p className="favorite__headline">{artist}</p>
            <p className="favorite__quantity">{name}</p>
        </div>
    )
}

export default LovedTrackCard