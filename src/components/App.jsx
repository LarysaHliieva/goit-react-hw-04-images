import { useState, useEffect, useRef } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import * as API from 'services/api';

import styles from './App.module.css';

const perPage = 12;

export const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [residue, setResidue] = useState(0);

  const galleryRef = useRef(null);

  useEffect(() => {
    if (!filter) {
      return;
    }

    fetchImages();

    async function fetchImages() {
      setLoading(true);

      try {
        const images = await API.searchImages(filter, page, perPage);
        setItems(prevItems => [...prevItems, ...images.hits]);
        setResidue(images.total - page * perPage);
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  }, [filter, page]);

  useEffect(() => {
    if (items.length) {
      smoothScroll();
    }

    function smoothScroll() {
      const { height: cardHeight } =
        galleryRef.current.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  }, [items.length]);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSearch = search => {
    if (search === filter && page === 1) {
      return;
    }

    setFilter(search);
    setItems([]);
    setPage(1);
    setResidue(0);
  };

  const isNotFound = !Boolean(items.length) && filter && !loading;

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSearch} />

      {Boolean(items.length) && <ImageGallery items={items} ref={galleryRef} />}

      {error && (
        <p className={styles.message}>
          😥 Something went wrong... Please, reload and try again!
        </p>
      )}

      <Loader visible={loading} />

      {residue > 0 && <Button onClick={loadMore} disabled={loading} />}

      {isNotFound && (
        <p className={styles.message}>
          🙄 Sorry. Nothing was found for your request.
        </p>
      )}
    </div>
  );
};
