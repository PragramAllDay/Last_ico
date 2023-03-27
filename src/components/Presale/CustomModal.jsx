import React, { useState, useEffect } from "react";
import "./modal.css";
import Modal from "react-overlays/Modal";


export default function CustomModal(props) {
    const { showModal, setShowModal, handleClose, handleSuccess } = props;
  // React state to control Modal visibility
//   const [showModal, setShowModal] = useState(false);

  // Backdrop JSX code
  const renderBackdrop = (props) => <div className="backdrop" {...props} />;

//   var handleClose = () => setShowModal(false);

//   var handleSuccess = () => {
//     console.log("success");
//   };

useEffect(() => { 
    setShowModal(showModal)
}, [showModal])


  return (
    <div className="modal-example">
      
      <Modal
        className="modal"
        show={showModal}
        onHide={handleClose}
        renderBackdrop={renderBackdrop}
      >
        <div>
          <div className="modal-header">
            <div className="modal-title">Modal Heading</div>
            <div>
              <span className="close-button" onClick={handleClose}>
                x
              </span>
            </div>
          </div>
          <div className="modal-desc">
            <p>{}</p>
          </div>
          <div className="modal-footer">
            <button className="secondary-button" onClick={handleClose}>
              Close
            </button>
            <button className="primary-button" onClick={handleSuccess}>
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}