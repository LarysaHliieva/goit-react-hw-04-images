import { Component } from 'react';

import PropTypes from 'prop-types';

import { ReactComponent as SearchIcon } from 'icons/icon-search.svg';

import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };

  handleСhange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { filter } = this.state;
    const { handleSubmit, handleСhange } = this;

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
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
