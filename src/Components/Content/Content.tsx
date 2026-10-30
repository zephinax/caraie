import { useState } from 'react';
import './Content.css';
import Rating from '../Rating/Rating';
import Like from '../Like/Like';
import DecoderText from '../DecoderText/DecoderText';
import RentalModal from '../RentalModal/RentalModal';

interface Data {
  data: {
    name: string;
    description: string;
    category: string;
    personCapacity: string;
    gear: string;
    fuelCapacity: string;
    discount: string;
    price: string;
    rating: string;
    id: string;
    isLiked: string;
    img?: string;
  };
}

export default function Content({ data }: Data) {
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

  return (
    <>
      <div className='detail-card'>
        <div className='detail-top'>
          <div className='detail-top-left'>
            <h2 className='detail-name'>
              <DecoderText text={data.name} />
            </h2>
            <Rating rating={Number(data.rating)} />
          </div>
          <div className='detail-top-right'>
            <Like carId={data.id} isLiked={data.isLiked} />
          </div>
        </div>
        <div className='detail-desc'>
          <p>{data.description}</p>
          <div className='detail-info'>
            <div className='👍🏻'>
              <div className='🙏🏻'>
                <span className='info-title'>Category</span>
                <span>{data.category}</span>
              </div>
              <div className='🙏🏻'>
                <span className='info-title'>Capacity</span>
                <span>{data.personCapacity} Person</span>
              </div>
            </div>
            <div className='👍🏻'>
              <div className='🙏🏻'>
                <span className='info-title'>Gearbox</span>
                <span>{data.gear}</span>
              </div>
              <div className='🙏🏻'>
                <span className='info-title'>FuelCap</span>
                <span>{data.fuelCapacity}L</span>
              </div>
            </div>
          </div>
        </div>
        <div className='car-price-and-rent'>
          <div className='car-price user-select-none'>
            {data.discount !== '' && (
              <span id='discount'>${data.discount}</span>
            )}
            <span id='price'>${data.price}</span>
            <span style={{ fontSize: '13px', color: 'var(--secondary-text)', marginLeft: '4px' }}>
              / day
            </span>
          </div>
          <button
            type='button'
            onClick={() => setIsRentalModalOpen(true)}
            className='car-rent-btn user-select-none'
            style={{ border: 'none', cursor: 'pointer' }}>
            Rent Now
          </button>
        </div>
      </div>

      <RentalModal
        car={{
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          discount: data.discount,
          img: data.img || '',
        }}
        isOpen={isRentalModalOpen}
        onClose={() => setIsRentalModalOpen(false)}
      />
    </>
  );
}
