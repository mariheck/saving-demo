import React from 'react';
import { Icon } from 'semantic-ui-react';
import './snackbar.styles.scss';

const Snackbar = ({ alert, message, icon = '' }) => (
    <div className={`snackbar ${alert}`}>
        {icon.length ? (
            <Icon name={icon} />
        ) : alert === 'error' ? (
            <Icon name="x" />
        ) : alert === 'success' ? (
            <Icon name="check" />
        ) : (
            <Icon name="info circle" />
        )}
        {message}
    </div>
);

export default Snackbar;
