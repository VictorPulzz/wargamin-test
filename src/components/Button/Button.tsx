import clsx from 'clsx';
import React, { FC, HTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button: FC<ButtonProps> = ({ label, className, ...props }) => {
  return (
    <button className={clsx(styles.button, className)} {...props}>
      {label}
    </button>
  );
};
