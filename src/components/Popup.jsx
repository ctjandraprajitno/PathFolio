import React from 'react';

function Popup({ children, onClose }) {
	if (!children) return null;
	return (
		<div className="popup">
			<div className="popupContent">
				<button className="popupClose" onClick={onClose}>×</button>
				{children}
			</div>
		</div>
	);
}

export default Popup;
