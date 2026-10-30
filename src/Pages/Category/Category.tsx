import './Category.css';
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategorySelector from '../../Components/CategorySelector/CategorySelector';
import Filter from '../../Components/Filter/Filter';
import CarWrapper from '../../Components/CarWrapper/CarWrapper';
import LoadingSpiner from '../../Components/LoadingSpiner/LoadingSpiner';
import { useFetchJson } from '../../Hooks/useFetchJson';
import { VscSettings } from 'react-icons/vsc';
import { IoClose } from 'react-icons/io5';

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

const CATEGORY_TYPES = ['Sport', 'Hypercar', 'Luxury', 'SUV', 'Hatchback'];
const CAPACITY_TYPES = ['2 Person', '4 Person', '5 Person', '6 Person'];

export default function Category() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: carsData, loading } = useFetchJson<Car[]>('cars.json');

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | null>(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState<boolean>(false);

  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute absolute minimum and maximum price based on actual cars data
  const { minCarPrice, maxCarPrice } = useMemo(() => {
    if (!carsData || carsData.length === 0) {
      return { minCarPrice: 60, maxCarPrice: 400 };
    }
    const numericPrices = carsData
      .map((car) => parseFloat(car.price))
      .filter((price) => !isNaN(price) && price > 0);

    if (numericPrices.length === 0) {
      return { minCarPrice: 60, maxCarPrice: 400 };
    }

    return {
      minCarPrice: Math.floor(Math.min(...numericPrices)),
      maxCarPrice: Math.ceil(Math.max(...numericPrices)),
    };
  }, [carsData]);

  const activeMinPrice = selectedMinPrice !== null ? selectedMinPrice : minCarPrice;
  const activeMaxPrice = selectedMaxPrice !== null ? selectedMaxPrice : maxCarPrice;

  // Compute counts dynamically from dataset
  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CATEGORY_TYPES.forEach((t) => (counts[t] = 0));
    if (carsData) {
      carsData.forEach((car) => {
        if (counts[car.category] !== undefined) {
          counts[car.category]++;
        }
      });
    }
    return counts;
  }, [carsData]);

  const capacityCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    CAPACITY_TYPES.forEach((c) => (counts[c] = 0));
    if (carsData) {
      carsData.forEach((car) => {
        const key = `${car.personCapacity} Person`;
        if (counts[key] !== undefined) {
          counts[key]++;
        }
      });
    }
    return counts;
  }, [carsData]);

  // Toggle category type selection
  const handleTypeToggle = (type: string, isChecked: boolean) => {
    setSelectedTypes((prev) =>
      isChecked ? [...prev, type] : prev.filter((t) => t !== type)
    );
  };

  // Toggle capacity selection
  const handleCapacityToggle = (capacity: string, isChecked: boolean) => {
    setSelectedCapacities((prev) =>
      isChecked ? [...prev, capacity] : prev.filter((c) => c !== capacity)
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedTypes([]);
    setSelectedCapacities([]);
    setSelectedMinPrice(null);
    setSelectedMaxPrice(null);
    if (searchQuery) {
      setSearchParams({});
    }
  };

  // Filter cars based on types, capacities, price bounds, and search query
  const filteredCars = useMemo(() => {
    if (!carsData) return [];

    return carsData.filter((car) => {
      // 1. Search Query filter (by car name or category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = car.name.toLowerCase().includes(query);
        const matchesCat = car.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCat) {
          return false;
        }
      }

      // 2. Category Types filter
      if (selectedTypes.length > 0) {
        if (!selectedTypes.includes(car.category)) {
          return false;
        }
      }

      // 3. Capacity filter
      if (selectedCapacities.length > 0) {
        const capLabel = `${car.personCapacity} Person`;
        if (!selectedCapacities.includes(capLabel)) {
          return false;
        }
      }

      // 4. Price filter: within [activeMinPrice, activeMaxPrice]
      const priceNum = parseFloat(car.price);
      if (!isNaN(priceNum)) {
        if (priceNum < activeMinPrice || priceNum > activeMaxPrice) {
          return false;
        }
      }

      return true;
    });
  }, [carsData, searchQuery, selectedTypes, selectedCapacities, activeMinPrice, activeMaxPrice]);

  const hasActiveFilters =
    selectedTypes.length > 0 ||
    selectedCapacities.length > 0 ||
    activeMinPrice > minCarPrice ||
    activeMaxPrice < maxCarPrice ||
    Boolean(searchQuery);

  const activeFiltersCount =
    selectedTypes.length +
    selectedCapacities.length +
    (activeMinPrice > minCarPrice ? 1 : 0) +
    (activeMaxPrice < maxCarPrice ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className='category-container'>
      {/* Mobile Filter Toggle Bar */}
      <div className='category-mobile-filter-bar'>
        <button
          className='category-mobile-filter-btn'
          onClick={() => setIsMobileFiltersOpen((prev) => !prev)}>
          <VscSettings />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <span className='category-active-count'>{activeFiltersCount}</span>
          )}
        </button>
        {hasActiveFilters && (
          <button className='category-reset-btn' onClick={resetFilters}>
            Clear all
          </button>
        )}
      </div>

      {/* Sidebar Filters */}
      <aside
        className={`category-selector ${
          isMobileFiltersOpen ? 'open' : ''
        }`}>
        <div className='category-selector-header'>
          <h3 className='category-title'>Filter Vehicles</h3>
          {hasActiveFilters && (
            <button className='category-reset-btn' onClick={resetFilters}>
              Reset all
            </button>
          )}
        </div>

        {/* Search query pill if active */}
        {searchQuery && (
          <div className='search-active-pill'>
            <span>Search: &ldquo;{searchQuery}&rdquo;</span>
            <button
              onClick={() => {
                const nextParams = new URLSearchParams(searchParams);
                nextParams.delete('search');
                setSearchParams(nextParams);
              }}
              title='Remove search filter'>
              <IoClose size={16} />
            </button>
          </div>
        )}

        {/* Types */}
        <div className='category-section'>
          <h3 className='category-title'>TYPE</h3>
          {CATEGORY_TYPES.map((type) => (
            <CategorySelector
              key={type}
              title={type}
              number={typeCounts[type] || 0}
              checked={selectedTypes.includes(type)}
              onChange={(checked) => handleTypeToggle(type, checked)}
            />
          ))}
        </div>

        {/* Capacity */}
        <div className='category-section'>
          <h3 className='category-title'>CAPACITY</h3>
          {CAPACITY_TYPES.map((capacity) => (
            <CategorySelector
              key={capacity}
              title={capacity}
              number={capacityCounts[capacity] || 0}
              checked={selectedCapacities.includes(capacity)}
              onChange={(checked) => handleCapacityToggle(capacity, checked)}
            />
          ))}
        </div>

        {/* Dynamic Price Slider based on fleet prices */}
        <div className='category-section'>
          <div className='card-content'>
            <div className='card-title'>
              <span>PRICE RANGE</span>
              {(activeMinPrice > minCarPrice || activeMaxPrice < maxCarPrice) && (
                <button
                  className='category-reset-btn'
                  style={{ fontSize: '11px', padding: 0 }}
                  onClick={() => {
                    setSelectedMinPrice(null);
                    setSelectedMaxPrice(null);
                  }}>
                  Reset
                </button>
              )}
            </div>

            <div className='values'>
              <span>${activeMinPrice}.00</span>
              <span>${activeMaxPrice}.00</span>
            </div>

            <small className='current-range'>
              Filter: <strong>${activeMinPrice} - ${activeMaxPrice}</strong> / day
            </small>

            <div className='price-slider-group'>
              <div>
                <div className='price-slider-label'>
                  <span>Max Price Ceiling</span>
                  <strong>${activeMaxPrice}</strong>
                </div>
                <input
                  type='range'
                  className='price-slider-input'
                  min={minCarPrice}
                  max={maxCarPrice}
                  step={10}
                  value={activeMaxPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSelectedMaxPrice(Math.max(val, activeMinPrice));
                  }}
                />
              </div>

              <div>
                <div className='price-slider-label'>
                  <span>Min Price Floor</span>
                  <strong>${activeMinPrice}</strong>
                </div>
                <input
                  type='range'
                  className='price-slider-input'
                  min={minCarPrice}
                  max={maxCarPrice}
                  step={10}
                  value={activeMinPrice}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSelectedMinPrice(Math.min(val, activeMaxPrice));
                  }}
                />
              </div>

              <div className='price-fleet-bounds'>
                <span>Fleet Min: ${minCarPrice}</span>
                <span>Fleet Max: ${maxCarPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main cars display */}
      <main className='category-cars'>
        <Filter />
        <LoadingSpiner loading={loading} />
        {!loading && (
          <CarWrapper
            title={
              searchQuery
                ? `Search results for "${searchQuery}" (${filteredCars.length})`
                : hasActiveFilters
                ? `Filtered Cars (${filteredCars.length})`
                : 'All Cars'
            }
            cars={filteredCars}
            onResetFilters={resetFilters}
          />
        )}
      </main>
    </div>
  );
}
