import React from "react";
import ReactDOM from "react-dom/client";

const MODAL_STYLE = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  padding: "50px",
  zIndex: 1000,
};
const OVERLAY_STYLE = {
  position: "fixed",
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: "rgba(0,0,0,0.7)",
  zIndex: 1000,
};

function Modal({ open, children }) {
  if (!open) return null;
  return ReactDOM.createPortal(
    <div style={OVERLAY_STYLE}>
      <div style={MODAL_STYLE}>{children}</div>
    </div>,
    document.getElementById("modal-portal")
  );
}

export default Modal;
