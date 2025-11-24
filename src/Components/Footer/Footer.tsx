import './Footer.css';
import { Link } from 'react-router-dom';
export default function Footer() {
  const assetBase = '/';
  return (
    <div className="footer-container container">
      <div className="footer-top">
        <div className="footer-top-left">
          <Link to="/">
            <img
              className="footer-logo"
              src={`${assetBase}Images/logo.png`}
              alt="logo"
            />
          </Link>
          <p>
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        <ul className="footer-top-right">
          <li>
            <span>About</span>
            <a>How it works</a>
            <a>Featured</a>
            <a>Partnership</a>
            <a>Business Relation</a>
          </li>
          <li>
            <span>Community</span>
            <a>Events</a>
            <a>Blog</a>
            <a>Podcast</a>
            <a>Invite a friend</a>
          </li>
          <li>
            <span>Socials</span>
            <a>Discord</a>
            <a>Instagram</a>
            <a>Twitter</a>
            <a>Facebook</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          ©2024{' '}
          <a style={{ color: '#d24670' }} href="https://www.zephinax.ir">
            Zephinax.
          </a>{' '}
          All rights reserved
        </div>
        <div className="footer-bottom-right">
          <a href="">Privacy & Policy</a>
          <a href="">Terms & Condition</a>
        </div>
      </div>
    </div>
  );
}
