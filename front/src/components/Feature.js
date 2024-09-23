import React from "react";

export default function Feature({ iconSrc, alt, title, description }) {
  return (
    <div className="feature-item">
      <img src={iconSrc} alt={alt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
}
