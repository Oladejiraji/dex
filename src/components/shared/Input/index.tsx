'use client';
import React, { ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import cx from 'classnames';

import { Input as ShadInput } from '../../ui/input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  containerClass?: string;
  iconBefore?: boolean;
  icon?: any;
  className?: string;
  inButton?: ReactNode;
  inButtonClassNames?: string;
  iconBeforeClassNames?: string;
}

const Input = React.forwardRef(
  (
    {
      label,
      containerClass,
      id,
      type = 'text',
      icon,
      className,
      iconBefore,
      iconBeforeClassNames,
      inButton,
      inButtonClassNames,
      ...rest
    }: InputProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    return (
      <div className={cx('space-y-0', { 'flex flex-col gap-1': !!label }, { [`${containerClass}`]: !!containerClass })}>
        <div className="relative">
          {iconBefore && icon && (
            <span
              className={cx('absolute left-0 top-[50%] translate-y-[-50%]', {
                [`${iconBeforeClassNames}`]: !!iconBeforeClassNames,
              })}
            >
              <Image src={icon} alt="icon" width={11} height={11} />
            </span>
          )}
          <AnimatePresence>
            {inButton && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={cx('absolute right-6 top-[50%] translate-y-[-50%]', {
                  [`${inButtonClassNames}`]: !!inButtonClassNames,
                })}
              >
                {inButton}
              </motion.span>
            )}
          </AnimatePresence>
          <ShadInput
            className={cx(
              'bg-neutral-650 !mt-0 w-full rounded-lg border border-neutral-400 focus:ring-transparent focus-visible:ring-transparent',
              {
                'pl-[0.88rem]': iconBefore,
              },
              { [`${className}`]: !!className }
            )}
            id={id}
            min="0"
            type={type}
            ref={ref}
            {...rest}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = 'AppInput';
export default Input;
