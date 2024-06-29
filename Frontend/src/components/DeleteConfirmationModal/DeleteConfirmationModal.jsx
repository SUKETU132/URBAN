import React from 'react';
import Modal from 'react-modal';
import './DeleteConfirmationModal.css';

Modal.setAppElement('#root');

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirm }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">
        <h2>Confirm Deletion</h2>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to delete this item?</p>
      </div>
      <div className="modal-footer">
        <button className="btn btn-confirm" onClick={onConfirm}>Yes, Delete</button>
        <button className="btn btn-cancel" onClick={onRequestClose}>Cancel</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
