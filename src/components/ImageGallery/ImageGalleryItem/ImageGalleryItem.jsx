import { useState } from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { webformatURL, tags, largeImageURL } = item;

  return (
    <>
      <li className={styles.galleryItem} onClick={() => setIsOpenModal(true)}>
        <img className={styles.image} src={webformatURL} alt={tags} />
      </li>
      {isOpenModal && (
        <Modal
          url={largeImageURL}
          alt={tags}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
