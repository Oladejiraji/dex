"use client";
import React, { ReactNode } from "react";
import Image from "next/image";

import cx from "classnames";

import { Input as ShadInput } from "../../ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
  subText?: string;
  iconBefore?: boolean;
  icon?: any;
  className?: string;
  inButton?: ReactNode;
  inButtonClassNames?: string;
}

const Input = ({
  label,
  containerClass,
  id,
  required,
  type = "text",
  subText,
  icon,
  className,
  iconBefore,
  inButton,
  inButtonClassNames,
  ...rest
}: InputProps) => {
  return (
    <div
      className={cx(
        "space-y-0",
        { "flex flex-col gap-1": !!label },
        { [`${containerClass}`]: !!containerClass }
      )}
    >
      <div className="relative">
        {iconBefore && icon && (
          <span className="absolute top-[50%] translate-y-[-50%] left-0">
            <Image src={icon} alt="icon" />
          </span>
        )}
        {inButton && (
          <span
            className={cx("absolute top-[50%] translate-y-[-50%] right-6", {
              [`${inButtonClassNames}`]: !!inButtonClassNames,
            })}
          >
            {inButton}
          </span>
        )}
        <ShadInput
          className={cx(
            " bg-neutral-650 rounded-lg !mt-0 border border-neutral-400 focus:ring-transparent focus-visible:ring-transparent w-full",
            { [`${className}`]: !!className },
            {
              "pl-[14px]": iconBefore,
            }
          )}
          id={id}
          min="0"
          type={type}
          {...rest}
        />
      </div>
    </div>
  );
};

export default Input;
