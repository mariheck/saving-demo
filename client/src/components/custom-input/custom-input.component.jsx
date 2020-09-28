import React from 'react';
import './custom-input.styles.scss';

const CustomInput = ({ textarea, handleChange, label, ...props }) => (
    <div className={`custom-input ${props.type}`}>
        {textarea ? (
            <textarea onChange={handleChange} {...props} />
        ) : (
            <input onChange={handleChange} {...props} />
        )}

        <label
            htmlFor={props.id}
            className={`${
                props.type !== 'checkbox' && props.value.length ? 'shrink' : ''
            }`}
        >
            {label}
        </label>
    </div>
);

export default CustomInput;
