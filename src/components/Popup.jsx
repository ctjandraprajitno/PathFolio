import React from 'react';

const Popup = ({ children, onClose }) => {
	if (!children) return null;
	return (
		<div className="popup">
			<div className="popupContent">
				<button className="popupClose" onClick={onClose}>×</button>
				{children}
			</div>
		</div>
	);
};

export default Popup;
