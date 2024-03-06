import React, { useEffect } from 'react';
import css from 'styles/Modal.module.css';

export const Modal = ({ largeImageURL, alt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.Overlay} onClick={(e) => {
      e.target === e.currentTarget && onClose();
    }}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={alt} />
      </div>
    </div>
  );
};
