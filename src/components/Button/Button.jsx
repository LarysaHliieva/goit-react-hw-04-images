import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ onClick, disabled = false }) => {
  return (
    <button
      className={styles.loadMore}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
