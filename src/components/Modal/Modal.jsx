import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, alt, onClose }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleClose);

    return () => document.removeEventListener('keydown', handleClose);
  }, []);

  const handleClose = e => {
    if (e.currentTarget === e.target || e.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
