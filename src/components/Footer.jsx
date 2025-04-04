import { Link } from "react-router-dom"
export default function Footer() {
  return (
    <footer>
        {/*about*/}
        <div className="about">
            <h3>about us</h3>
            <p>“Discover the magic of Egypt with our expertly curated tours.”</p>
        </div>
        <div className="social-links">
          {/*socialmedia links*/}  
            <ul>
                <li><Link to="#">facebook</Link></li>
                <li><Link to="#">instgram</Link></li>
                <li><Link to="#">whatsapp</Link></li>
            </ul>
        </div>
        <div className="contact-details">
            {/*contact details*/}
            <h2 >Contact Us</h2>
          <p>📍 Cairo, Egypt</p>
          <p>📧 info@kemetWonders.com</p>
          <p>📞 +20 123 456 789</p>
        </div>
         {/*copy rights*/}
        <div className="copy-r">
        <p>© 2025 Egypt Explorer. All rights reserved.</p>
      </div>
    </footer>
  )
}
