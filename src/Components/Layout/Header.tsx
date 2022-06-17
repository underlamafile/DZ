import React, {useContext, useState} from "react";
import '../../index.css'
import dots from '../../images/dots.png';
import logo from '../../images/logo.png';
import {useNavigate} from "react-router-dom";

function Header() {
    const [value, setValue] = useState('')

    const navigate = useNavigate();

    const send_data = () => {
        navigate(`/search?value=${value}`)
    }



    return (
        <header className="header">
            <img src={dots} width="27" height="5"/>
            <a href="#" className="header__logo link">
                <img src={logo} alt="Логотип" width="32" height="32"/>
                <h1 className="hearer__title">Spotify</h1>
            </a>
            <input type="search" value={value} onChange={e => setValue(e.target.value)} className="header__search"
                   placeholder="Исполнитель, трек, или подкаст"/>
            <button onClick={send_data}>Поиск</button>
            <nav className="header__navigation">
                <a href="/" className="link">Home</a>
                <a href="/" className="link">About</a>
            </nav>
        </header>
    );
}

export default Header;