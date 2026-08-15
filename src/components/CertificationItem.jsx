import React from 'react';

export default function CertificationItem({ item }) {
  return (
    <div className="certification-item">
      <div className="certification-header">
        <span className="cert-badge">Certification</span>
      </div>
      <h3>{item.title}</h3>

      {item.certificateUrl ? (
        <a href={item.certificateUrl} target="_blank" rel="noreferrer" className="primary-button small-button">
          View Certificate
        </a>
      ) : null}
    </div>
  );
}
