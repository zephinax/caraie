import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './CarDetail.css';
import Gallery from '../../Components/Gallery/Gallery';
import Content from '../../Components/Content/Content';
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
  const location = useLocation();
  const [targetCar, setTargetCar] = useState<Car | null>(null);
  const pathParts = location.pathname.split('/');
  const carId = pathParts[pathParts.length - 1];
  const [loading, setLoading] = useState(true);
  const { data: carsData, loading: carsLoading } =
    useFetchJson<Car[]>('cars.json');

  useEffect(() => {
    const setTargerCar = async () => {
      if (carsData && carId) {
        const car = await carsData.find((car) => car.id === carId);
        await setTargetCar(car ?? null);
        setLoading(false);
      }
      window.scrollTo({ top: 0 });
    };
    if (!carsLoading) {
      setTargerCar();
    }
  }, [carId, carsData, carsLoading]);

  return (
    <>
      <div className='detail-wrapper container'>
        {targetCar && <Gallery />}
        {targetCar && <Content data={targetCar} />}
      </div>
      {targetCar && !loading && (
        <CarWrapper
          title='Similar Cars'
          linkTitle='View All'
          url='Cars.json'
          filter={`${targetCar.category}`}
          remove={`${targetCar.name}`}
        />
      )}
      <div style={{ marginBottom: '16px' }}></div>
      <LoadingSpiner loading={loading || carsLoading} />
    </>
  );
}
