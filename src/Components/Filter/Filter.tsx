import './Filter.css';
import { HiArrowsUpDown } from 'react-icons/hi2';
import { useState } from 'react';

interface FilterProps {
  onLocationChange?: (pickupLocation: string, dropoffLocation: string) => void;
}

const CITIES = [
  'Select your city',
  'New York',
  'Los Angeles',
  'San Francisco',
  'Miami',
  'Chicago',
  'Houston',
  'London',
  'Paris',
  'Tokyo',
  'Dubai',
];

const TIMES = [
  'Select your time',
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
  '08:00 PM',
];

export default function Filter({ onLocationChange }: FilterProps) {
  const [reverse, setReverse] = useState(false);

  const [pickupCity, setPickupCity] = useState('New York');
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('10:00 AM');

  const [dropoffCity, setDropoffCity] = useState('Los Angeles');
  const [dropoffDate, setDropoffDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 3);
    return tomorrow.toISOString().split('T')[0];
  });
  const [dropoffTime, setDropoffTime] = useState('12:00 PM');

  const handleSwap = () => {
    setReverse((prev) => !prev);
    const tempCity = pickupCity;
    const tempDate = pickupDate;
    const tempTime = pickupTime;

    setPickupCity(dropoffCity);
    setPickupDate(dropoffDate);
    setPickupTime(dropoffTime);

    setDropoffCity(tempCity);
    setDropoffDate(tempDate);
    setDropoffTime(tempTime);

    onLocationChange?.(dropoffCity, tempCity);
  };

  return (
    <div className='filter container'>
      {/* Pick-Up */}
      <div className='pick-up'>
        <div className='filter-title'>
          <div className={`filter-circle ${!reverse ? 'active-circle' : ''}`}>
            <div></div>
          </div>
          <h1>Pick - Up</h1>
        </div>
        <div className='filter-options'>
          <div className='filter-option-selector'>
            <h2>Locations</h2>
            <div className='filter-option-wrapper'>
              <select
                className='filter-select'
                value={pickupCity}
                onChange={(e) => {
                  setPickupCity(e.target.value);
                  onLocationChange?.(e.target.value, dropoffCity);
                }}>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='filter-option-selector'>
            <h2>Date</h2>
            <div className='filter-option-wrapper'>
              <input
                type='date'
                className='filter-input'
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
              />
            </div>
          </div>
          <div className='filter-option-selector'>
            <h2>Time</h2>
            <div className='filter-option-wrapper'>
              <select
                className='filter-select'
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reverse Button */}
      <div
        className='filter-reverse'
        onClick={handleSwap}
        title='Swap Pick-Up and Drop-Off'
        role='button'
        tabIndex={0}>
        <HiArrowsUpDown size={28} />
      </div>

      {/* Drop-Off */}
      <div className='drop-off'>
        <div className='filter-title'>
          <div className={`filter-circle ${reverse ? 'active-circle' : ''}`}>
            <div></div>
          </div>
          <h1>Drop - Off</h1>
        </div>
        <div className='filter-options'>
          <div className='filter-option-selector'>
            <h2>Locations</h2>
            <div className='filter-option-wrapper'>
              <select
                className='filter-select'
                value={dropoffCity}
                onChange={(e) => {
                  setDropoffCity(e.target.value);
                  onLocationChange?.(pickupCity, e.target.value);
                }}>
                {CITIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='filter-option-selector'>
            <h2>Date</h2>
            <div className='filter-option-wrapper'>
              <input
                type='date'
                className='filter-input'
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
              />
            </div>
          </div>
          <div className='filter-option-selector'>
            <h2>Time</h2>
            <div className='filter-option-wrapper'>
              <select
                className='filter-select'
                value={dropoffTime}
                onChange={(e) => setDropoffTime(e.target.value)}>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
