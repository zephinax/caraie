import { useId, Fragment } from 'react';
import './Rating.css';

interface RatingProps {
  rating?: number;
}

export default function Rating({ rating = 0 }: RatingProps) {
  const maxRating = 5;
  const clampedRating = Math.min(Math.max(rating, 0), maxRating);
  const uniqueId = useId();

  return (
    <div className='rating'>
      {Array.from({ length: maxRating }, (_, index) => (
        <Fragment key={index}>
          <input
            type='radio'
            id={`${uniqueId}-star-${index + 1}`}
            name={`${uniqueId}-star-radio`}
            value={`star-${index + 1}`}
            checked={index < clampedRating}
            readOnly
          />
          <label htmlFor={`${uniqueId}-star-${index + 1}`}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <path
                pathLength='360'
                d='M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z'
              />
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}
