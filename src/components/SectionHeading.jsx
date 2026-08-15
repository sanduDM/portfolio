import React from 'react';

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  const parts = eyebrow ? eyebrow.trim().split(/\s+/) : [];
  const prompt = parts[0] === '$' ? '$' : eyebrow;
  const command = parts[0] === '$' ? parts.slice(1).join(' ') : '';

  return (
    <div className={`section-heading ${center ? 'section-heading-center' : ''}`}>
      <span className="eyebrow">
        {parts[0] === '$' ? (
          <>
            <span className="eyebrow-prompt">{prompt}</span>
            <span className="eyebrow-command"> {command}</span>
          </>
        ) : (
          eyebrow
        )}
      </span>
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
