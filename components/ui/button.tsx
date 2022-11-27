import React from 'react';
import { clss } from '../../helpers';

type Props = React.ComponentPropsWithoutRef<'button'> & {
  className?: string;
  active?: boolean;
  children?: JSX.Element;
};

function Button({ className, active, children, ...rest }: Props) {
  return (
    <button
      className={clss(
        `${className} text-gray-500 text-xs border border-gray-200 shadow-md rounded-sm p-1 min-w-[7rem] hover:bg-gray-100 transition-[background-color]`,
        {
          'bg-blue-400 text-white hover:bg-blue-400 shadow-sm': !!active,
        }
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
