import './modal.scss';

const Modal = ({ children, onClose }) => {
  return (
    <div className='modalOverlay' onClick={onClose}>
      <div className='modalContent' onClick={(e) => e.stopPropagation()}>
        <span className='close' onClick={onClose}>X</span>
        {children}
      </div>
    </div>
  );
};

export default Modal;