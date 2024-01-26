import React from 'react';
import { ClimbingBoxLoader } from 'react-spinners';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-spinner-container">
            <ClimbingBoxLoader color="#36d7b7" />
        </div>
    );
};

export default LoadingSpinner;