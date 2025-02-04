import './Ads.css';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';

export interface Ad {
  title: string;
  desc: string;
  img: string;
  id: string;
}

const data = [
  {
    id: '1',
    title: 'The Best Platform for Car Rental',
    desc: 'Ease of doing a car rental safely and reliably. Of course at a low price.',
    img: 'Ad1.png',
  },
  {
    id: '2',
    title: 'Easy way to rent a car at a low price',
    desc: 'Providing cheap car rental services and safe and comfortable facilities.',
    img: 'Ad2.png',
  },
];

export default function Ads() {
  return (
    <div className="ads container">
      {data &&
        data.map((ad: Ad) => {
          return (
            <Link
              key={ad.id}
              to="/Category"
              className="ad-card user-select-none">
              <div className="ad-content">
                <div className="ad-description">
                  <h1>{ad.title}</h1>
                  <p>{ad.desc}</p>
                </div>
              </div>
              <div className="ad-image-container">
                <div>
                  <img
                    src={
                      new URL(`/assets/images/${ad.img}`, import.meta.url).href
                    }
                    alt={ad.title}
                  />
                </div>
                <span className="ad-btn">
                  Rental Car
                  <MdKeyboardArrowRight size={24} />
                </span>
              </div>
            </Link>
          );
        })}
    </div>
  );
}
