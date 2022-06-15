import React from "react";
import '../../index.css';


function Footer() {
    return (
        <footer className="footer">
            <div className="footer__cover">
                <img src='../../images/cover.jpg' width="64" height="64" className="footer__avatar" />
                <ul className="footer__track">
                    <li className="track__name"> STARGAZING</li>
                    <li className="track__musician"> Travis Scott</li>
                </ul>
                <img className="like__button" src='../../images/like.png' width="16" height="16" />
            </div>
            <div>
                <ul className="footer__buttons">
                    <li className="footer__play">
                        <img className="footer__button" src="../../images/shuffle.png" width="20px" height="20px" />
                        <img className="footer__button" src="../../images/play-back.png" width="20px" height="20px" />
                        <img className="footer__button" src="../../images/play-button.png" width="25px" height="25px" />
                        <img className="footer__button" src="../../images/play-forward.png" width="20px" height="20px" />
                        <img className="footer__button" src="../../images/replay.png" width="20px" height="20px" />
                    </li>
                    <li className="footer__timecode">
                        <div>
                            <span className="footer__time">2:34</span>
                            <img className="time" src="/images/time.png" />
                            <span className="footer__time">4:40</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="footer__functions">
                <img src="../../images/mic.png" className="footer__function" width="20px" height="20px" />
                <img src="../../images/list.png" className="footer__function" width="20px" height="20px" />
                <img src="../../images/devices.png" className="footer__function" width="20px" height="20px" />
                <img src="../../images/volume.png" className="footer__function" width="20px" height="20px" />
                <img src="../../images/volume1.png" className="footer__function" width="64px" height="20px" />
                <img src="../../images/open.png" className="footer__function" width="20px" height="20px" />
            </div>
        </footer>
    );
}

export default Footer;