import React, { useState, useEffect } from 'react';
import { PixabayApi } from 'helpers/pixabayApi';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hasMorePhotos, setHasMorePhotos] = useState(false);
  const [imageSetting, setImageSetting] = useState({
    largeImageURL: 'images/default-image.jpg',
    alt: 'default alt text',
  });

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await PixabayApi.fetchImages(query, page);
        setItems(prevItems => [...prevItems, ...response.hits]);
        setHasMorePhotos(page < Math.ceil(response.totalHits / 12));
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
    
  }, [query, page]);

  const handleClickOnLink = (href, alt) => {
    console.log('click on link');
    setModalIsOpen(true);
    setImageSetting({
      largeImageURL: href,
      alt,
    });
  };

  const handleSubmit = queryWord => {
    setQuery(queryWord);
    setPage(1);
    setItems([]);
  };

  const handleSearchChange = event => {
    console.log('Searchbar value changed');
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onChange={handleSearchChange} onSubmit={handleSubmit} />
      {items.length > 0 && (
        <>
          <ImageGallery items={items} onImageClick={handleClickOnLink} />
          {hasMorePhotos && <Button onClick={handleLoadMore}>Load More</Button>}
        </>
      )}
      {isLoading && <Loader />}
      {modalIsOpen && (
        <Modal
          largeImageURL={imageSetting.largeImageURL}
          alt={imageSetting.alt}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
