import React from "react";
import '../../index.css'
import home from '../../images/home.png';
import search from '../../images/search.png';
import media from '../../images/media.png';
import {Link} from "react-router-dom";

function Aside() {

    return (
        <aside className="accordion">
            <ul className="aside__menus">
                <li className="menu"><img src={home} width="16" height="16" /> Домой</li>
                <li className="menu"><img src={search} width="16" height="16" /> Поиск</li>
                <li className="menu"><img src={media} width="16" height="16" /> Моя медиатека</li>
                <br />
                <li className="menu">Создать плейлист</li>
                <li className="menu">
                    <Link className="link" to="/lovedTracks">Любимые треки</Link>
                </li>
            </ul>
            <hr className="hr__color" />
            <ul className="aside__playlists">
                <li className="playlist">Duo Mix</li>
                <li className="playlist">DOLLA DOLLA</li>
                <li className="playlist">RED BOTTOM💧_💧</li>
                <li className="playlist">Leonid,Pavel</li>
                <li className="playlist">Officer Down</li>
                <li className="playlist">Thirst</li>
                <li className="playlist">Feelin' Fine</li>
                <li className="playlist">THE SCOTTS</li>
                <li className="playlist">Duo Mix</li>
                <li className="playlist">DOLLA DOLLA</li>
                <li className="playlist">RED BOTTOM💧_💧</li>
                <li className="playlist">Leonid,Pavel</li>
                <li className="playlist">Officer Down</li>
                <li className="playlist">Thirst</li>
                <li className="playlist">Feelin' Fine</li>
                <li className="playlist">THE SCOTTS</li>
                <li className="playlist">Duo Mix</li>
                <li className="playlist">DOLLA DOLLA</li>
                <li className="playlist">RED BOTTOM💧_💧</li>
                <li className="playlist">Leonid,Pavel</li>
                <li className="playlist">Officer Down</li>
                <li className="playlist">Thirst</li>
                <li className="playlist">Feelin' Fine</li>
                <li className="playlist">THE SCOTTS</li>
            </ul>
        </aside>
    );
}

export default Aside;