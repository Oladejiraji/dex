import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface IProps {
  src: string;
  width: number;
  height: number;
  className?: string;
  alt?: string;
}

const RemoteImage = (props: IProps) => {
  const { src, alt, width, height, className = '' } = props;
  const [imageError, setImageError] = useState(false);
  const fallbackUrl = '/svgs/coin.svg';
  useEffect(() => {
    if (!src) return;
    setImageError(false);
  }, [src]);
  return (
    <Image
      src={imageError || !src ? fallbackUrl : src}
      alt={alt || 'Chain Image'}
      width={width}
      height={height}
      className={className}
      unoptimized
      style={{ width, height }}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
};

export default RemoteImage;
