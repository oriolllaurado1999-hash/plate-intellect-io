import React from 'react';

interface TikTokIconProps {
  className?: string;
  size?: number;
}

const TikTokIcon = ({ className, size = 24 }: TikTokIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
    >
      <path
        d="M85 25c0-8-6-15-14-15s-15 7-15 15v25c0 3-2 5-5 5s-5-2-5-5V25c0-8-6-15-14-15s-15 7-15 15v45c0 8 6 15 14 15s15-7 15-15V45c0-3 2-5 5-5s5 2 5 5v25c0 8 6 15 14 15s15-7 15-15V25z"
        fill="currentColor"
      />
      <circle cx="32" cy="70" r="15" fill="currentColor" />
    </svg>
  );
};

export default TikTokIcon;