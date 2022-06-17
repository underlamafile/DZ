import React from "react";
import '../../index.css';
import friend from '../../images/friend.png';
import avatar1 from '../../images/avatar1.jpg';
import avatar2 from '../../images/avatar2.jpg';
import avatar3 from '../../images/avatar3.jpg';

function AsideFriends() {
    return (
        <aside className="friends">
            <div>
                <span className="friends__text">Лента друзей </span>
                <img src={friend} width="20" height="20" />
            </div>
            <hr className="hr__color" />
                <ul className="friends__list">
                    <li>
                        <img src={avatar1} width="64" height="64" className="avatar" />
                            <ul className="friends__track">
                                <li> Иван Иванов</li>
                                <li> DADDY-PSY</li>
                                <li>PSY</li>
                            </ul>
                    </li>
                    <br />
                        <li>
                            <img src={avatar2} width="64" height="64" className="avatar" />
                                <ul className="friends__track">
                                    <li> Павел Павлов</li>
                                    <li> Donda-Hurricane</li>
                                    <li>Kanye West</li>
                                </ul>
                        </li>
                        <br />
                        <li>
                            <img src={avatar3} width="64" height="64" className="avatar" />
                            <ul className="friends__track">
                                <li> Андрей Андреев</li>
                                <li> Dystopia-Mafia</li>
                                <li>Travis Scott</li>
                            </ul>
                        </li>
                </ul>
        </aside>
    );
}

export default AsideFriends;