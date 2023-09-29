import React, { ReactNode } from 'react';
import Loader from './Loader';

interface IProps {
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void
}

export default function Button(props: IProps) {
  const { onClick, loading, className, disabled, children } = props;

  return (
    <button
      className={`flex justify-center items-center gap-x-1 bg-blue-500 w-full mt-3 text-white h-11 px-4 rounded-lg focus:outline-none disabled:opacity-75 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {loading && (
        <Loader />
      )}
      {children}
    </button>
  )
}