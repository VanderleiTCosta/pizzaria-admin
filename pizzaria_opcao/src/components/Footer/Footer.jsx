import {assets} from "../../assets/assets";
import Logo from "../../assets/Logo-pizzaria.svg";
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">

        <div className="footer-content-left">
            <img src={Logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos amet obcaecati fugiat deserunt aut. Et nulla, ullam consequuntur corrupti quas eveniet laborum aut molestiae mollitia perspiciatis assumenda illo repudiandae alias.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>

        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>

        
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright 2024 © OpcaoLanches.com - All Right Reserved.
      </p>
    </div>
  )
}

export default Footer
