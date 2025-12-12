// src/components/StarRating.jsx
import React from 'react';

/**
 * StarRating Component
 *
 * Props:
 *  - value: current rating (1–5)
 *  - onChange: function called when user selects a star
 */
export default function StarRating({ value = 0, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Rating Stars"
      className="flex items-center"
      style={{ userSelect: 'none' }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          role="radio"
          aria-checked={value === star}
          onClick={() => onChange(star)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onChange(star);
          }}
          className="px-1 text-xl"
          title={`${star} star${star > 1 ? 's' : ''}`}
        >
          {/* filled star if selected or less, else empty */}
          <span aria-hidden>{star <= value ? '★' : '☆'}</span>
          <span className="sr-only">{star} star</span>
        </button>
      ))}
    </div>
  );
}
