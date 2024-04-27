import React, { useEffect } from 'react';
import './Modal.css'; // Import CSS for modal styling

const Modal = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    let timeout;
    if (isOpen) {
      timeout = setTimeout(() => {
        onClose();
      }, 2000); // Automatically close modal after 4 seconds
    }

    return () => clearTimeout(timeout);
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
