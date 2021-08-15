import PropTypes from "prop-types";
import ClickAwayListener from "react-click-away-listener";

const Modal = ({ modalOpen, setModalOpen, title, footer, children }) => {
  return (
    <div
      className={`modal z-50 transition-all duration-300 fixed w-full h-full top-0 left-0 flex items-center justify-center ${
        !modalOpen && "opacity-0 pointer-events-none"
      }`}
    >
      <div className="modal-overlay absolute w-full h-full bg-black opacity-50"></div>

      <div className="modal-container max-h-192 hover:overflow-y-overlay has-cool-scrollbar bg-white text-gray-900 dark:bg-lighterBlack dark:text-gray-200 w-11/12 md:max-w-xl mx-auto rounded shadow-lg z-50">
        <ClickAwayListener onClickAway={() => modalOpen && setModalOpen(false)}>
          <div className="modal-content text-left  h-full flex flex-col ">
            <div className="modal-title py-4 px-6 flex justify-between items-center pb-3 shadow-lg dark:bg-lightBlack">
              {title && <p className="text-2xl font-semibold ">{title}</p>}
              <div className="modal-close cursor-pointer z-50">
                <i onClick={() => setModalOpen(false)} className="fa fa-times"></i>
              </div>
            </div>
            <div className="modal-body px-6 py-4">{children}</div>
            {footer && (
              <div className="modal-footer py-2 px-4 bg-gray-100 mt-auto">
                <div className="flex justify-end pt-2">{footer}</div>
              </div>
            )}
          </div>
        </ClickAwayListener>
      </div>
    </div>
  );
};

Modal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  title: PropTypes.string,
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Modal;
