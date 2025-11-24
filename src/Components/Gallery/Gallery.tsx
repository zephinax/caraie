import { useState } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './Gallery.css';

const assetBase = '/';

const images = [
  {
    original: `${assetBase}Images/carsInside/Carinside1.jpg`,
    thumbnail: `${assetBase}Images/carsInside/Carinside1.jpg`,
  },
  {
    original: `${assetBase}Images/carsInside/Carinside2.jpg`,
    thumbnail: `${assetBase}Images/carsInside/Carinside2.jpg`,
  },
  {
    original: `${assetBase}Images/carsInside/Carinside3.jpg`,
    thumbnail: `${assetBase}Images/carsInside/Carinside3.jpg`,
  },
  {
    original: `${assetBase}Images/carsInside/Carinside4.jpg`,
    thumbnail: `${assetBase}Images/carsInside/Carinside4.jpg`,
  },
];
export default function Gallery() {
  // const [mainImage] = useState('default');۱
  // const carAssets = [1, 2, 3];

  const [galleryImages] = useState(images);
  return (
    // <div className='gallery-wrapper user-select-none'>
    //   <div className='main-img'>
    //     <img
    //       style={{ borderRadius: '10px' }}
    //       src={
    //         mainImage === 'default'
    //           ? new URL(
    //               `/public/images/cars/${props.data.img}`,
    //               import.meta.url
    //             ).href
    //           : new URL(`/public/images/noImg.webp`, import.meta.url).href
    //       }
    //       alt=''
    //     />
    //   </div>
    //   <div className='car-assets'>
    //     {carAssets.map((image) => {
    //       const src = new URL(
    //         `/public/images/carsInside/Carinside${image}.jpg`,
    //         import.meta.url
    //       ).href;
    //       return (
    //         <div className='image-container' key={image}>
    //           <img src={src} alt='' />
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
    <ImageGallery items={galleryImages} />
  );
}
