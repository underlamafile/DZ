import React from "react";
import '../index.css'

interface ISearchTrackCard {
    name:string,
    artist:string,
    img:string
}

function SearchTrackCard({name,img,artist}:ISearchTrackCard) {

    return (
        <div className="content__favorite">
            <img className="favorite__image" src={img} />
            <p className="favorite__headline">{artist}</p>
            <p className="favorite__quantity">{name}</p>
        </div>
    )
}

export default SearchTrackCard