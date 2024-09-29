import Image from "next/image";
import React, { useEffect, useState } from "react";

interface IProps {
  src: string;
  width: number;
  height: number;
}

const RemoteImage = (props: IProps) => {
  const { src, width, height } = props;
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
      onError={() => setImageError(true)}
      onLoad={() => setImageError(false)}
    />
  );
};

export default RemoteImage;
