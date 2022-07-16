import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import './footer.css';


const Footer = () => {

    //TODO - Add events so when the icons are clicked, people are taken to the social media pages

    return (
        <div>
            <p className="creator">Created by: Chris Fleet</p>
                <div className="social-media">
                    <BsFacebook className="social-media-icons"/>
                    <BsInstagram className="social-media-icons"/>
                    <BsTwitter className="social-media-icons"/>
                    <BsLinkedin className="social-media-icons"/>
                </div>
        </div>
    )
}

export default Footer;