import React from 'react'

import './modal.css'
import { TimesIcon } from 'react-line-awesome';

const Modal = ({ handleClose, show, children, title }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div id="modal" style={{ zIndex: "2" }} className={showHideClassName} >
      <section className="modal-main" style={{
        border:"solid 5px"
      }}>
        <div class="modal-title">
          <span style={{fontSize: "large"}}>{title}</span>
          <TimesIcon style={{color: "black"}} class="modal-close" onClick={handleClose} />
        </div>
        <div className="modal-content">
          {children}
        </div>
      </section>
    </div>
  );
};
export default Modal

