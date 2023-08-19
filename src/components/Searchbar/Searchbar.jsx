import { useState } from 'react';

import PropTypes from 'prop-types';

import { ReactComponent as SearchIcon } from 'icons/icon-search.svg';

import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [filter, setFilter] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(filter);
  };

  const handleСhange = ({ target }) => {
    setFilter(target.value);
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button type="submit" className={styles.button}>
          <SearchIcon width="24" height="24" fill="#808080" />
          <span className={styles.buttonLabel}>Search</span>
        </button>

        <input
          className={styles.input}
          onChange={handleСhange}
          name="filter"
          value={filter}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
