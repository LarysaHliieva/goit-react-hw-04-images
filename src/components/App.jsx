import React, { useState, useEffect, useRef } from 'react';

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

  const galleryRef = useRef();

  useEffect(() => {
    if (!filter) {
      return;
    }

    const fetchImages = async () => {
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
    };

    fetchImages();
  }, [filter, page]);

  useEffect(() => {
    if (items.length) {
      smoothScroll();
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

  const smoothScroll = () => {
    const { height: cardHeight } =
      galleryRef.current.firstElementChild.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };

  const isNotFound = !Boolean(items.length) && filter && !loading;

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={onSearch} />

      <div ref={galleryRef}>
        {Boolean(items.length) && <ImageGallery items={items} />}
      </div>

      {error && (
        <p className={styles.message}>
          😥 Something went wrong... Please, reload and try again!
        </p>
      )}

      <Loader visible={loading} />

      {residue > 0 && <Button onClick={loadMore} disabled={loading} />}

      {isNotFound && (
        <p className={styles.message}>
          🙄 Sorry... Nothing was found for your request.
        </p>
      )}
    </div>
  );
};

// export class App1 extends Component {
//   state = {
//     items: [],
//     filter: '',
//     loading: false,
//     error: null,
//     page: 1,
//     residue: 0,
//   };

//   galleryRef = React.createRef();

// async componentDidUpdate(prevProps, prevState) {
//   const { filter, page, items } = this.state;

//   if (prevState.filter !== filter || prevState.page !== page) {
//     this.fetchImages();
//   }

//   if (items.length > prevState.items.length) {
//     this.smoothScroll();
//   }
// }

// async fetchImages() {
//   const { filter, page } = this.state;
//   this.setState({ loading: true });

//   try {
//     const images = await API.searchImages(filter, page, perPage);
//     this.setState(state => ({
//       items: [...state.items, ...images.hits],
//       residue: images.total - page * perPage,
//     }));
//   } catch (error) {
//     console.log(error.message);
//     this.setState({ error: error.message });
//   } finally {
//     this.setState({ loading: false });
//   }
// }

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   onSearch = filter => {
//     if (filter === this.state.filter && this.state.page === 1) {
//       return;
//     }

//     this.setState({ filter, items: [], page: 1, residue: 0 });
//   };

//   smoothScroll() {
//     const { height: cardHeight } =
//       this.galleryRef.current.firstElementChild.firstElementChild.getBoundingClientRect();
//     window.scrollBy({
//       top: cardHeight * 2,
//       behavior: 'smooth',
//     });
//   }

//   render() {
//     const { items, filter, loading, error, residue } = this.state;
//     const isNotFound = !Boolean(items.length) && filter && !loading;

//     return (
//       <div className={styles.app}>
//         <Searchbar onSubmit={this.onSearch} />

//         <div ref={this.galleryRef}>
//           {Boolean(items.length) && <ImageGallery items={items} />}
//         </div>

//         {error && (
//           <p className={styles.message}>
//             😥 Something went wrong... Please, reload and try again!
//           </p>
//         )}

//         <Loader visible={loading} />

//         {residue > 0 && <Button onClick={this.loadMore} disabled={loading} />}

//         {isNotFound && (
//           <p className={styles.message}>
//             🙄 Sorry... Nothing was found for your request.
//           </p>
//         )}
//       </div>
//     );
//   }
// }
