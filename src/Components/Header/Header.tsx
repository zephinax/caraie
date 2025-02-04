import './Header.css';
import content from './../../Assets/Languages.json';
import { IoHeart } from 'react-icons/io5';
import { IoNotificationsSharp } from 'react-icons/io5';
import { IoSettingsSharp } from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';
import { BiSearchAlt } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import ToolTip from '../ToolTip/ToolTip';
export default function Header() {
  return (
    <>
      <div className="header container">
        <div className="header-left">
          <Link to="/" className="header-logo">
            <img
              src={new URL('/Images/logo.png', import.meta.url).href}
              alt="Caraie logo"
            />
          </Link>
          <div className="header-search">
            <Link to="/Category" className="header-search-btn">
              <VscSettings />
            </Link>
            <input
              className="header-search-input"
              type="text"
              placeholder={content.En['header-search']}
            />
            <button className="header-search-btn ">
              <BiSearchAlt />
            </button>
          </div>
        </div>
        <div className="header-right">
          <button className="header-action tool-tip">
            <IoHeart />
            <span className="tool-tip-text tool-tip-top">Favorite Cars</span>
          </button>
          <button className="header-action tool-tip">
            <IoNotificationsSharp />
            <span className="tool-tip-text tool-tip-top">Alerts</span>
          </button>
          <button className="header-action tool-tip">
            <IoSettingsSharp />
            <span className="tool-tip-text tool-tip-top">Setting</span>
          </button>
          <button className="header-action tool-tip">
            <img
              src={new URL('/Images/profile.png', import.meta.url).href}
              alt=""
            />
            <span className="tool-tip-text tool-tip-top">Account</span>
          </button>
        </div>
      </div>
      <div className="mobile-header-search container">
        <button className="header-search-btn tool-tip">
          <VscSettings />
          <ToolTip style={{ top: 30, left: -30 }} text="Search Setting" />
        </button>
        <input
          className="header-search-input"
          type="text"
          placeholder={content.En['header-search']}
        />
        <button className="header-search-btn tool-tip">
          <BiSearchAlt />
          <ToolTip
            style={{
              top: 30,
              left: -8,
              transform: 'scaleX(-1)',
            }}
            text="Search"
          />
        </button>
      </div>
    </>
  );
}
