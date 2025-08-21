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
        d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm20.7 35.1c-3.4 0-6.6-1.3-9.1-3.6v16.7c0 8.4-6.8 15.2-15.2 15.2s-15.2-6.8-15.2-15.2 6.8-15.2 15.2-15.2c.8 0 1.6.1 2.3.2v7.4c-.8-.3-1.6-.4-2.3-.4-4.2 0-7.6 3.4-7.6 7.6s3.4 7.6 7.6 7.6 7.6-3.4 7.6-7.6V21.7h7.6c0 5.1 4.1 9.1 9.1 9.1v4.3z"
        fill="currentColor"
      />
    </svg>
  );
};

export default TikTokIcon;