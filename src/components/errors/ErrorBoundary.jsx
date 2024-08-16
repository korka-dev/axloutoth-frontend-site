// eslint-disable-next-line no-unused-vars
import React, {Component} from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // You can log the error or send it to a logging service
        console.error('Error caught by error boundary:', error, errorInfo);
    }

    render() {
        const {hasError} = this.state;
        const {errorMessage, children} = this.props;

        if (hasError) {
            // Render a custom error message or use the provided one
            return <div>{errorMessage || 'Something went wrong. Please try again later.'}</div>;
        }

        return children;
    }
}

export default ErrorBoundary;