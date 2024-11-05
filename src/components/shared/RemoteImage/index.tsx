import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IProps {
  src: string;
  width: number;
  height: number;
  className?: string;
}

const RemoteImage = (props: IProps) => {
  const { src, width, height, className = "" } = props;
  const [imageError, setImageError] = useState(false);
  const fallbackUrl = "/svgs/coin.svg";
  useEffect(() => {
    if (!src) return;
    setImageError(false);
  }, [src]);
  return (
    <Image
      src={imageError ? fallbackUrl : src}
      unoptimized
      alt="Chain Image"
      width={width}
      height={height}
      className={className}
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
};

export default RemoteImage;
