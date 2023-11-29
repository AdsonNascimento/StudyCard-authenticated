import React, { useEffect } from 'react';
import Popup from '../Popup';

function PopupWrapper(props) {
  const { popupData, setPopupData } = props;

  const handleClosePopup = () => {
    setPopupData(null);
  };

  useEffect(() => {
    if (popupData) {
      const timer = setTimeout(() => {
        handleClosePopup();
      }, popupData.seconds * 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [popupData]);

  return (
    <div>
      {popupData && (
        <Popup
          type={popupData.type}
          text={popupData.text}
          seconds={popupData.seconds}
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
}

export default PopupWrapper;