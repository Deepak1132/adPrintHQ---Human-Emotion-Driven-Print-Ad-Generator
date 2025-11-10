
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L14.09 8.26L20 10.35L14.09 12.44L12 18.7L9.91 12.44L4 10.35L9.91 8.26L12 2z" />
    <path d="M18 6L17.1 8.7L15 9.1L17.1 9.5L18 12.2L18.9 9.5L21 9.1L18.9 8.7L18 6z" />
    <path d="M6 18L6.9 15.3L9 14.9L6.9 14.5L6 11.8L5.1 14.5L3 14.9L5.1 15.3L6 18z" />
  </svg>
);
