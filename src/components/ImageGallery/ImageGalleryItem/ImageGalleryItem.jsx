import { Component } from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/Modal/Modal';

import styles from './ImageGalleryItem.module.css';

class ImageGalleryItem extends Component {
  state = {
    isOpenModal: false,
  };

  openModal = () => {
    this.setState({ isOpenModal: true });
  };

  closeModal = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props.item;
    const { isOpenModal } = this.state;
    const { openModal, closeModal } = this;

    return (
      <>
        <li className={styles.galleryItem} onClick={openModal}>
          <img className={styles.image} src={webformatURL} alt={tags} />
        </li>
        {isOpenModal && (
          <Modal url={largeImageURL} alt={tags} onClose={closeModal} />
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
