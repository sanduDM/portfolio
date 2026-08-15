import React from 'react';

export default function SkillCard({ title, items, cloudStatus, cloudNote, isCloud = false }) {
  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <h3>{title}</h3>
      </div>
      <div className="skill-tags">
        {items.map((item) => (
          <span key={item} className="skill-tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
