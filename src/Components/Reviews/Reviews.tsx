import { useState } from 'react';
import Rating from '../Rating/Rating';
import './Reviews.css';

interface Review {
  id: string;
  name: string;
  role: string;
  date: string;
  rating: number;
  comment: string;
  avatarText: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Alex Stanton',
    role: 'Verified Renter',
    date: '21 July 2024',
    rating: 5,
    comment:
      'We are very happy with the service from Caraie. The vehicle was spotless, handed over promptly at the airport, and drove exceptionally well throughout our weekend trip.',
    avatarText: 'AS',
  },
  {
    id: 'rev-2',
    name: 'Skylar Dias',
    role: 'Business Traveler',
    date: '15 August 2024',
    rating: 4,
    comment:
      'Fantastic experience! The booking process was super smooth and the car performance was impressive. Highly recommend for any business or leisure travel.',
    avatarText: 'SD',
  },
  {
    id: 'rev-3',
    name: 'Marcus Vance',
    role: 'Automotive Enthusiast',
    date: '2 September 2024',
    rating: 5,
    comment:
      'The handling and comfort exceeded expectations. Acceleration is sharp, fuel economy was great for its category, and customer support was responsive.',
    avatarText: 'MV',
  },
];

export default function Reviews({ carName = 'this car' }: { carName?: string }) {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showAll, setShowAll] = useState(false);
  const [isWritingReview, setIsWritingReview] = useState(false);

  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState('5');
  const [formComment, setFormComment] = useState('');

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      name: formName.trim(),
      role: 'Verified Renter',
      date: 'Today',
      rating: Number(formRating),
      comment: formComment.trim(),
      avatarText: formName
        .trim()
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2),
    };

    setReviews([newRev, ...reviews]);
    setFormName('');
    setFormComment('');
    setIsWritingReview(false);
  };

  return (
    <section className='reviews-section container'>
      <div className='reviews-card'>
        <div className='reviews-header'>
          <div className='reviews-title-wrapper'>
            <h3 className='reviews-title'>Reviews</h3>
            <span className='reviews-count-badge'>{reviews.length}</span>
          </div>
          {!isWritingReview && (
            <button
              className='write-review-btn'
              onClick={() => setIsWritingReview(true)}>
              + Write a Review
            </button>
          )}
        </div>

        {isWritingReview && (
          <form className='review-form' onSubmit={handleSubmit}>
            <input
              className='review-form-input'
              type='text'
              placeholder='Your Full Name'
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
              <label>Rating:</label>
              <select
                className='review-form-input'
                style={{ width: 'auto' }}
                value={formRating}
                onChange={(e) => setFormRating(e.target.value)}>
                <option value='5'>5 Stars - Excellent</option>
                <option value='4'>4 Stars - Very Good</option>
                <option value='3'>3 Stars - Average</option>
                <option value='2'>2 Stars - Poor</option>
                <option value='1'>1 Star - Terrible</option>
              </select>
            </div>
            <textarea
              className='review-form-textarea'
              placeholder={`Share your experience driving ${carName}...`}
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              required
            />
            <div className='review-form-footer'>
              <button
                type='button'
                className='review-cancel-btn'
                onClick={() => setIsWritingReview(false)}>
                Cancel
              </button>
              <button type='submit' className='review-submit-btn'>
                Post Review
              </button>
            </div>
          </form>
        )}

        <div className='reviews-list'>
          {displayedReviews.map((rev) => (
            <div key={rev.id} className='review-card'>
              <div className='review-top'>
                <div className='reviewer-profile'>
                  <div className='reviewer-avatar'>{rev.avatarText}</div>
                  <div>
                    <h4 className='reviewer-name'>{rev.name}</h4>
                    <p className='reviewer-role'>{rev.role}</p>
                  </div>
                </div>
                <div className='review-meta'>
                  <span className='review-date'>{rev.date}</span>
                  <Rating rating={rev.rating} />
                </div>
              </div>
              <p className='review-comment'>{rev.comment}</p>
            </div>
          ))}
        </div>

        {reviews.length > 2 && (
          <button
            className='reviews-toggle-btn'
            onClick={() => setShowAll((prev) => !prev)}>
            {showAll ? 'Show Less' : `Show All (${reviews.length})`}
          </button>
        )}
      </div>
    </section>
  );
}
