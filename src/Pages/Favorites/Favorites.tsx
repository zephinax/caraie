import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IoHeartOutline } from 'react-icons/io5';
import { useFavorites } from '../../Context/FavoritesContext';
import { useFetchJson } from '../../Hooks/useFetchJson';
import CarCard from '../../Components/CarCard/CarCard';
import LoadingSpiner from '../../Components/LoadingSpiner/LoadingSpiner';
import './Favorites.css';

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
  isLiked?: string;
}

export default function Favorites() {
  const { isFavorite } = useFavorites();
  const { data: carsData, loading } = useFetchJson<Car[]>('cars.json');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const favoriteCars = useMemo(() => {
    if (!carsData) return [];
    return carsData.filter((car) => isFavorite(car.id));
  }, [carsData, isFavorite]);

  return (
    <div className='favorites-page container'>
      <div className='favorites-header'>
        <div className='favorites-title'>
          <span>Favorite Cars</span>
          <span className='favorites-count-badge'>
            {favoriteCars.length} {favoriteCars.length === 1 ? 'car' : 'cars'}
          </span>
        </div>
        {favoriteCars.length > 0 && (
          <Link to='/category' className='favorites-view-all'>
            Explore More Cars
          </Link>
        )}
      </div>

      <LoadingSpiner loading={loading} />

      {!loading && favoriteCars.length > 0 && (
        <div className='favorites-grid'>
          {favoriteCars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              name={car.name}
              category={car.category}
              fuelCapacity={car.fuelCapacity}
              gear={car.gear}
              personCapacity={car.personCapacity}
              img={car.img}
              price={car.price}
              discount={car.discount}
              isLiked='true'
            />
          ))}
        </div>
      )}

      {!loading && favoriteCars.length === 0 && (
        <div className='favorites-empty'>
          <IoHeartOutline className='favorites-empty-icon' />
          <h2>No favorite cars saved yet</h2>
          <p>
            Explore our vehicle collection and tap the heart icon on any car to
            save it here for quick access.
          </p>
          <Link to='/category' className='favorites-browse-btn'>
            Browse All Cars
          </Link>
        </div>
      )}
    </div>
  );
}
