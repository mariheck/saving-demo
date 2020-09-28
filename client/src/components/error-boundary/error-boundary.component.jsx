import React from 'react';
import './error-boundary.styles.scss';

class ErrorBoundary extends React.Component {
    state = {
        hasErrored: false
    };

    static getDerivedStateFromError(error) {
        // Process the error
        return { hasErrored: true };
    }

    render() {
        if (this.state.hasErrored) {
            return (
                <div className="error-overlay">
                    <div className="error-image"></div>
                    <h2 className="error-text">
                        Oh oh, il y a un problème avec cette page...
                    </h2>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
