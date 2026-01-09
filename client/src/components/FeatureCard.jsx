import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color = '#3b82f6' }) => {
    return (
        <div className="feature-card-item">
            <div className="feature-icon-wrapper">
                <Icon size={24} color={color} />
            </div>
            <h3 className="feature-title">{title}</h3>
            <p className="feature-desc">
                {description}
            </p>
        </div>
    );
};

export default FeatureCard;
