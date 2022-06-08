import React from "react";
import '../index.css'
import md5_encode from "../MD5";

interface ILovedTrackCard {
    name:string,
    artist:string,
    img:string
}

function LovedTrackCard({name,img,artist}:ILovedTrackCard) {

    async function unlove_track(track_name:string,artist:string) {
        let api_key = '906db58ae0258689ba249d53210358ee';
        let sk = 'PEJSZfVNq8UlcfpQoiME1HzKEaFYAClf';
        let secret = '04e5fe9b4835a8387149c2770345a9af';
        const params = new URLSearchParams( {'track': `${track_name}`,'artist': `${artist}`,'api_key': `${api_key}`,
            'api_sig': `${md5_encode(api_key,artist,sk,track_name,secret)}`,'sk': `${sk}`,'method': 'track.unlove'});
        let response = await fetch(`https://ws.audioscrobbler.com/2.0/`, {
            method: 'POST',
            body: params,
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
                    '(KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36', 'Content-Type':'application/x-www-form-urlencoded'}
        })
        if (!response.ok) {
            alert("Ошибка, удаление совергишть не удалось");
            throw new Error('Ошибка, проверьте параметры запроса')
        }
        else {
            alert("Трек успешно удален, обновите страницу")
        }
    }

    return (
        <div className="content__favorite">
            <button className="favorite__delete-btn" onClick={() => unlove_track(name,artist)}>удалить</button>
            <img className="favorite__image" src={img} />
            <p className="favorite__headline">{artist}</p>
            <p className="favorite__quantity">{name}</p>
        </div>
    )
}

export default LovedTrackCard