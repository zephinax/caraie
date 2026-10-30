import { useState, useRef, useEffect } from 'react';
import {
  IoHeart,
  IoNotificationsSharp,
  IoSettingsSharp,
  IoClose,
  IoPersonOutline,
} from 'react-icons/io5';
import { VscSettings } from 'react-icons/vsc';
import { BiSearchAlt } from 'react-icons/bi';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import content from '../../Assets/Languages.json';
import { useFavorites } from '../../Context/FavoritesContext';
import './Header.css';

export default function Header() {
  const assetBase = import.meta.env.BASE_URL;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { favoritesCount } = useFavorites();

  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  const [activePopover, setActivePopover] = useState<'alerts' | 'settings' | 'account' | null>(null);
  const [avatarError, setAvatarError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null) {
      setSearchValue(urlQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      navigate('/category');
    }
  };

  const togglePopover = (type: 'alerts' | 'settings' | 'account') => {
    setActivePopover((prev) => (prev === type ? null : type));
  };

  return (
    <>
      <header className='header container'>
        <div className='header-left'>
          <Link to='/' className='header-logo' title='Caraie Car Rental'>
            {!logoError ? (
              <img
                src={`${assetBase}Images/logo.png`}
                alt=''
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className='header-logo-text'>CARAIE</span>
            )}
          </Link>

          <form className='header-search' onSubmit={handleSearchSubmit}>
            <Link to='/category' className='header-search-btn' title='Filters & Category'>
              <VscSettings />
            </Link>
            <input
              className='header-search-input'
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={content.En['header-search']}
              aria-label='Search cars'
            />
            {searchValue && (
              <button
                type='button'
                className='header-search-btn'
                onClick={() => {
                  setSearchValue('');
                  navigate('/category');
                }}
                title='Clear search'>
                <IoClose size={18} />
              </button>
            )}
            <button type='submit' className='header-search-btn' title='Search' aria-label='Search'>
              <BiSearchAlt />
            </button>
          </form>
        </div>

        <div className='header-right' ref={popoverRef}>
          {/* Favorite Cars */}
          <Link
            to='/favorites'
            className='header-action tool-tip'
            aria-label='Favorite Cars'
            title='Favorite Cars'
            onClick={(e) => e.currentTarget.blur()}>
            <IoHeart size={20} />
            {favoritesCount > 0 && (
              <span className='header-badge'>{favoritesCount}</span>
            )}
            <span className='tool-tip-text'>Favorite Cars</span>
          </Link>

          {/* Alerts */}
          <button
            type='button'
            className={`header-action tool-tip ${activePopover === 'alerts' ? 'active-item' : ''}`}
            aria-label='Alerts'
            title='Notifications & Alerts'
            data-popover-open={activePopover === 'alerts'}
            onClick={(e) => {
              e.currentTarget.blur();
              togglePopover('alerts');
            }}>
            <IoNotificationsSharp size={18} />
            <span className='header-badge header-badge-blue'>2</span>
            {activePopover !== 'alerts' && <span className='tool-tip-text'>Alerts</span>}
          </button>

          {/* Settings */}
          <button
            type='button'
            className={`header-action tool-tip ${activePopover === 'settings' ? 'active-item' : ''}`}
            aria-label='Settings'
            title='Settings'
            data-popover-open={activePopover === 'settings'}
            onClick={(e) => {
              e.currentTarget.blur();
              togglePopover('settings');
            }}>
            <IoSettingsSharp size={18} />
            {activePopover !== 'settings' && <span className='tool-tip-text'>Settings</span>}
          </button>

          {/* Profile / Account */}
          <button
            type='button'
            className={`header-action tool-tip ${activePopover === 'account' ? 'active-item' : ''}`}
            aria-label='Account'
            title='My Account'
            data-popover-open={activePopover === 'account'}
            onClick={(e) => {
              e.currentTarget.blur();
              togglePopover('account');
            }}>
            {!avatarError ? (
              <img
                src={`${assetBase}Images/profile.png`}
                alt=''
                onError={() => setAvatarError(true)}
              />
            ) : (
              <IoPersonOutline size={20} />
            )}
            {activePopover !== 'account' && <span className='tool-tip-text'>Account</span>}
          </button>

          {/* Alerts Popover */}
          {activePopover === 'alerts' && (
            <div className='header-popover'>
              <div className='popover-header'>
                <span>Notifications & Deals</span>
                <IoClose
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActivePopover(null)}
                />
              </div>
              <div className='popover-item'>
                <strong>Weekend Special Offer! 🎉</strong>
                Get up to 20% discount on all Sports & Hypercars this weekend. Use code <code>WEEKEND20</code>.
              </div>
              <div className='popover-item'>
                <strong>New Fleet Arrival 🚗</strong>
                Lamborghini Aventador and Porsche 911 are now available for rent.
              </div>
            </div>
          )}

          {/* Settings Popover */}
          {activePopover === 'settings' && (
            <div className='header-popover'>
              <div className='popover-header'>
                <span>Quick Settings</span>
                <IoClose
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActivePopover(null)}
                />
              </div>
              <div className='popover-item'>
                <strong>Language</strong>
                English (US)
              </div>
              <div className='popover-item'>
                <strong>Currency</strong>
                USD ($)
              </div>
              <div className='popover-item'>
                <strong>Rental Protection</strong>
                Standard Insurance Included
              </div>
            </div>
          )}

          {/* Account Popover */}
          {activePopover === 'account' && (
            <div className='header-popover'>
              <div className='popover-header'>
                <span>My Account</span>
                <IoClose
                  style={{ cursor: 'pointer' }}
                  onClick={() => setActivePopover(null)}
                />
              </div>
              <div className='popover-item'>
                <strong>Zephinax User</strong>
                zephinax@example.com
              </div>
              <div className='popover-item'>
                <Link
                  to='/favorites'
                  style={{ color: 'var(--primary-blue)', fontWeight: 600 }}
                  onClick={() => setActivePopover(null)}>
                  View Saved Cars ({favoritesCount})
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Header Search */}
      <form className='mobile-header-search container' onSubmit={handleSearchSubmit}>
        <Link to='/category' className='header-search-btn' title='Search Settings' aria-label='Filter Settings'>
          <VscSettings size={18} />
        </Link>
        <input
          className='header-search-input'
          type='text'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder={content.En['header-search']}
          aria-label='Search cars'
        />
        {searchValue && (
          <button
            type='button'
            className='header-search-btn'
            onClick={() => {
              setSearchValue('');
              navigate('/category');
            }}
            title='Clear'
            aria-label='Clear search'>
            <IoClose size={18} />
          </button>
        )}
        <button type='submit' className='header-search-btn' title='Search' aria-label='Submit search'>
          <BiSearchAlt size={18} />
        </button>
      </form>
    </>
  );
}
