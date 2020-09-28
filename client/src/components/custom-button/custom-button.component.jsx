import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ color, onButtonAction = null, children, ...props }) => (
    <button className={color} {...props} onClick={onButtonAction}>
        {children}
    </button>
);

export default CustomButton;
