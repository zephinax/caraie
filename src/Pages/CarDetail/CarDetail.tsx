import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CarDetail.css';
import Gallery from '../../Components/Gallery/Gallery';
import Content from '../../Components/Content/Content';
import Reviews from '../../Components/Reviews/Reviews';
import CarWrapper from '../../Components/CarWrapper/CarWrapper';
import LoadingSpiner from '../../Components/LoadingSpiner/LoadingSpiner';
import { useFetchJson } from '../../Hooks/useFetchJson';

interface Car {
  id: string;
  name: string;
  category: string;
  fuelCapacity: string;
  gear: string;
  personCapacity: string;
  img: string;
  price: string;
  discount: string;
  description: string;
  rating: string;
  isLiked: string;
}

export default function CarDetail() {
  const { CarId } = useParams<{ CarId: string }>();
  const [targetCar, setTargetCar] = useState<Car | null>(null);
  const { data: carsData, loading: carsLoading } =
    useFetchJson<Car[]>('cars.json');

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (carsData && CarId) {
      const car = carsData.find((c) => String(c.id) === String(CarId));
      setTargetCar(car ?? null);
    }
  }, [CarId, carsData]);

  if (carsLoading) {
    return <LoadingSpiner loading={true} />;
  }

  if (!carsLoading && !targetCar) {
    return (
      <div
        className='container'
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <h2 style={{ fontSize: '24px', marginBottom: '12px', color: 'var(--primary-text)' }}>
          Vehicle Not Found
        </h2>
        <p style={{ color: 'var(--secondary-text)', marginBottom: '24px' }}>
          The car you are looking for might have been removed or does not exist.
        </p>
        <Link
          to='/category'
          style={{
            backgroundColor: 'var(--primary-blue)',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 600,
          }}>
          Browse Available Cars
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className='detail-wrapper container'>
        {targetCar && <Gallery />}
        {targetCar && <Content data={targetCar} />}
      </div>

      {targetCar && <Reviews carName={targetCar.name} />}

      {targetCar && (
        <CarWrapper
          title='Similar Cars'
          linkTitle='View All'
          link='/category'
          filter={targetCar.category}
          remove={targetCar.name}
        />
      )}

      <div style={{ marginBottom: '24px' }}></div>
    </>
  );
}
