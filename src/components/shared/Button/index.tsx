import React, { ReactNode } from "react";

import cx from "classnames";

import { Button as ShadCNButton } from "@/components/ui/button";
import Loader from "../Loader";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  variant?:
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link"
    | "invincible";
  loading?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
  children: ReactNode;
}

const Button = (props: IButton) => {
  const {
    variant,
    loading,
    className,
    children,
    disabled,
    type = "submit",
    ...rest
  } = props;
  return (
    <>
      <ShadCNButton
        disabled={loading || disabled}
        variant={variant}
        className={cx(
          `font-geist-500 gap-1 rounded-[6px] h-10 px-[10px] ${className} `,
          {
            "opacity-70 cursor-not-allowed border-neutral-500": disabled,
          },
          { "cursor-progress opacity-85": loading }
        )}
        type={type}
        {...rest}
      >
        {loading ? <Loader /> : children}
      </ShadCNButton>
    </>
  );
};

export default Button;
