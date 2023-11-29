import React, { useEffect } from 'react';
import './style.scss'

export default function Popup(props) {
  const { type, text, seconds, onClose } = props;

  const typeToColor = {
    error: '#e71d36',
    alert: '#F0A202',
    success: '#2ec4b5',
  };

  const style = {
    '--type-color': typeToColor[type] || 'red',
    '--animation-seconds': `${seconds}s`,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, seconds * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [seconds, onClose]);

  return (
    <div className="popup-container">
      <div className="popup" style={style}>
        <p>{text}</p>
      </div>
    </div>
  );
}