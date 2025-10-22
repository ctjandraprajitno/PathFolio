import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/SingleInputPopup.css';

// storageType: 'currentJob' -> saves under 'currentJob'
// storageType: 'targetJob' -> saves as userInfo.targetJob inside 'userInfo' object
export default function SingleInputPopup(props) {
	var isOpen = props.isOpen;
	var title = props.title;
	var label = props.label;
	var initialValue = props.initialValue;
	var storageType = props.storageType; // 'currentJob' or 'targetJob'
	var onSaved = props.onSaved;

	var [value, setValue] = useState(initialValue || '');

	if (!isOpen) return null;

	function handleSave() {
		var val = value || '';

		if (typeof onSaved === 'function') {
			try {
				onSaved(storageType, val);
			} catch (e) {
				// ignore
			}
			return;
		}

		try {
			window.dispatchEvent(new CustomEvent('singleInputSaved', { detail: { type: storageType, value: val } }));
		} catch (e) {}
	}

	return (
		<div className="single-input-overlay">
			<div className="single-input-box">
				<h3>{title}</h3>
				<label style={{display:'block', marginBottom:6}}>{label}</label>
				<input className="single-input-field" value={value} onChange={function(e){ setValue(e.target.value); }} />
				<div className="single-input-actions">
					<button className="single-input-save" onClick={handleSave}>Save</button>
				</div>
			</div>
		</div>
	);
}

SingleInputPopup.propTypes = {
	isOpen: PropTypes.bool,
	title: PropTypes.string,
	label: PropTypes.string,
	initialValue: PropTypes.string,
	storageType: PropTypes.oneOf(['currentJob','targetJob']).isRequired,
	onSaved: PropTypes.func,
};

