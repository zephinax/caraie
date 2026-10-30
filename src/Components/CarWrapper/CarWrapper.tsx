import { Link } from 'react-router-dom';
import CarCard from '../CarCard/CarCard';
import './CarWrapper.css';
import { useEffect, useState } from 'react';
import { useFetchJson } from '../../Hooks/useFetchJson';
import { IoCarSportOutline } from 'react-icons/io5';

interface Car {
  id: string | number;
  name: string;
  category: string;
  fuelCapacity: string;
  gear: string;
  img: string;
  personCapacity: string;
  price: string;
  discount: string;
  isLiked?: string;
}

interface CarWrapperProps {
  slide?: boolean;
  title: string;
  url?: string;
  linkTitle?: string;
  link?: string;
  remove?: string;
  setLoad?: void;
  filter?: string;
  cars?: Car[];
  onResetFilters?: () => void;
}

export default function CarWrapper({
  slide,
  title,
  filter,
  remove,
  linkTitle,
  link = '/',
  cars: passedCars,
  onResetFilters,
}: CarWrapperProps) {
  const [internalCars, setInternalCars] = useState<Car[] | null>(null);
  const { data: carsData } = useFetchJson<Car[]>('cars.json');

  useEffect(() => {
    if (passedCars !== undefined) return;
    if (!carsData) return;

    if (filter) {
      const filteredCars = carsData.filter((car: Car) => car.category === filter);
      if (remove) {
        const removedTarget = filteredCars.filter((car: Car) => car.name !== remove);
        setInternalCars(removedTarget);
      } else {
        setInternalCars(filteredCars);
      }
    } else {
      setInternalCars(carsData);
    }
  }, [filter, remove, carsData, passedCars]);

  const displayedCars = passedCars !== undefined ? passedCars : internalCars;

  return (
    <div className='car-wrapper'>
      <div className='section-title-container container'>
        <h2 className='section-title'>{title}</h2>
        {linkTitle && (
          <Link className='section-view-all' to={link}>
            {linkTitle}
          </Link>
        )}
      </div>

      {displayedCars && displayedCars.length === 0 ? (
        <div
          className='container'
          style={{
            padding: '48px 20px',
            textAlign: 'center',
            backgroundColor: 'var(--secondary-bg)',
            borderRadius: '10px',
            marginTop: '16px',
            boxShadow: 'rgba(0, 0, 0, 0.02) 0px 5px 10px',
          }}>
          <IoCarSportOutline
            size={48}
            style={{ color: 'var(--secondary-text)', opacity: 0.7, marginBottom: '12px' }}
          />
          <h3
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--primary-text)',
              marginBottom: '8px',
            }}>
            No cars found matching your criteria
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: 'var(--secondary-text)',
              marginBottom: '16px',
            }}>
            Try adjusting your search query, price range, or category filters.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              style={{
                backgroundColor: 'var(--primary-blue)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 20px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
              }}>
              Reset All Filters
            </button>
          )}
        </div>
      ) : (
        <div
          className={`car-wrapper-grid container ${
            slide ? 'car-wrapper-slide' : ''
          }`}>
          {Array.isArray(displayedCars) &&
            displayedCars.map((car: Car) => (
              <CarCard
                id={car.id}
                key={car.id}
                name={car.name}
                category={car.category}
                fuelCapacity={car.fuelCapacity}
                gear={car.gear}
                img={car.img}
                personCapacity={car.personCapacity}
                price={car.price}
                discount={car.discount}
                isLiked={car.isLiked}
              />
            ))}
        </div>
      )}
    </div>
  );
}
