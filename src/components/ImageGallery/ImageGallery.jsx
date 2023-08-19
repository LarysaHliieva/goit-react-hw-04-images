import { forwardRef } from 'react';

import PropTypes from 'prop-types';

import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import styles from './ImageGallery.module.css';

const ImageGallery = forwardRef(({ items = [] }, ref) => {
  return (
    <ul className={styles.gallery} id="gallery" ref={ref}>
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
