import { useState, useMemo } from 'react';
import { IoClose, IoCheckmarkCircle } from 'react-icons/io5';
import './RentalModal.css';

interface CarData {
  id: string;
  name: string;
  category: string;
  price: string;
  discount: string;
  img: string;
}

interface RentalModalProps {
  car: CarData;
  isOpen: boolean;
  onClose: () => void;
}

const CITIES = [
  'New York',
  'Los Angeles',
  'San Francisco',
  'Miami',
  'Chicago',
  'Houston',
  'London',
  'Tokyo',
  'Paris',
  'Dubai',
];

export default function RentalModal({ car, isOpen, onClose }: RentalModalProps) {
  const assetBase = '/';

  const [pickupCity, setPickupCity] = useState('New York');
  const [dropoffCity, setDropoffCity] = useState('New York');

  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const [dropoffDate, setDropoffDate] = useState(() => {
    const next = new Date();
    next.setDate(next.getDate() + 3);
    return next.toISOString().split('T')[0];
  });

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Calculate rental duration in days
  const days = useMemo(() => {
    const start = new Date(pickupDate).getTime();
    const end = new Date(dropoffDate).getTime();
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [pickupDate, dropoffDate]);

  const dailyPrice = car.discount ? parseFloat(car.discount) : parseFloat(car.price);
  const subtotal = Math.round(dailyPrice * days);
  const insuranceFee = 20;
  const totalPrice = subtotal + insuranceFee;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const ref = `CAR-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingRef(ref);
    setIsSuccess(true);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className='rental-modal-backdrop' onClick={onClose}>
      <div className='rental-modal' onClick={(e) => e.stopPropagation()}>
        <div className='rental-modal-header'>
          <h2>{isSuccess ? 'Reservation Confirmed' : `Rent ${car.name}`}</h2>
          <button
            className='rental-modal-close-btn'
            onClick={onClose}
            aria-label='Close'>
            <IoClose />
          </button>
        </div>

        {isSuccess ? (
          <div className='rental-success-box'>
            <div className='rental-success-icon'>
              <IoCheckmarkCircle />
            </div>
            <h3 className='rental-success-title'>Booking Successful!</h3>
            <p className='rental-success-desc'>
              Thank you, <strong>{fullName}</strong>! Your rental reservation for the{' '}
              <strong>{car.name}</strong> has been confirmed.
            </p>
            <div className='rental-summary-box' style={{ width: '100%', maxWidth: '360px' }}>
              <div className='rental-summary-row'>
                <span>Booking Reference:</span>
                <strong>{bookingRef}</strong>
              </div>
              <div className='rental-summary-row'>
                <span>Pickup / Drop-off:</span>
                <span>{pickupCity} → {dropoffCity}</span>
              </div>
              <div className='rental-summary-row'>
                <span>Duration:</span>
                <span>{days} {days === 1 ? 'day' : 'days'}</span>
              </div>
              <div className='rental-summary-row total'>
                <span>Total Paid:</span>
                <span>${totalPrice}.00</span>
              </div>
            </div>
            <button className='rental-confirm-btn' onClick={handleDone}>
              Back to Fleet
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className='rental-modal-body'>
              {/* Car thumbnail header */}
              <div className='rental-car-preview'>
                <img
                  src={
                    car.img
                      ? `${assetBase}Images/cars/${car.img}`
                      : `${assetBase}Images/noImg.webp`
                  }
                  alt={car.name}
                />
                <div className='rental-car-info'>
                  <h3>{car.name}</h3>
                  <p>
                    {car.category} • ${dailyPrice}/day
                  </p>
                </div>
              </div>

              {/* Renter information */}
              <div className='rental-form-grid'>
                <div className='rental-form-group'>
                  <label>Full Name *</label>
                  <input
                    type='text'
                    placeholder='e.g. John Doe'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className='rental-form-group'>
                  <label>Phone Number *</label>
                  <input
                    type='tel'
                    placeholder='+1 (555) 000-0000'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className='rental-form-group'>
                  <label>Email Address</label>
                  <input
                    type='email'
                    placeholder='john@example.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className='rental-form-group'>
                  <label>Pick-Up Location</label>
                  <select
                    value={pickupCity}
                    onChange={(e) => setPickupCity(e.target.value)}>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='rental-form-group'>
                  <label>Drop-Off Location</label>
                  <select
                    value={dropoffCity}
                    onChange={(e) => setDropoffCity(e.target.value)}>
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='rental-form-group'>
                  <label>Pick-Up Date</label>
                  <input
                    type='date'
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    required
                  />
                </div>
                <div className='rental-form-group'>
                  <label>Drop-Off Date</label>
                  <input
                    type='date'
                    value={dropoffDate}
                    onChange={(e) => setDropoffDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Cost summary breakdown */}
              <div className='rental-summary-box'>
                <div className='rental-summary-row'>
                  <span>
                    Rental ({days} {days === 1 ? 'day' : 'days'} × ${dailyPrice})
                  </span>
                  <span>${subtotal}.00</span>
                </div>
                <div className='rental-summary-row'>
                  <span>Standard Protection & Insurance</span>
                  <span>${insuranceFee}.00</span>
                </div>
                <div className='rental-summary-row total'>
                  <span>Total Amount</span>
                  <span>${totalPrice}.00</span>
                </div>
              </div>
            </div>

            <div className='rental-modal-footer'>
              <button
                type='button'
                className='rental-cancel-btn'
                onClick={onClose}>
                Cancel
              </button>
              <button type='submit' className='rental-confirm-btn'>
                Confirm Reservation (${totalPrice})
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
