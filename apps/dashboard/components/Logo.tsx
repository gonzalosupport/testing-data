import clsx from 'clsx';
import Image from 'next/image';
import React, { forwardRef } from 'react';

interface Props extends React.HtmlHTMLAttributes<HTMLImageElement> {
  src?: string;
}

const Logo = forwardRef<HTMLImageElement, Props>(
  ({ className, ...otherProps }: Props, ref) => {
    return (
      <Image
        ref={ref}
        {...(otherProps as any)}
        width="500"
        height="500"
        className={clsx('w-10 h-auto', className)}
        alt="ChatsappAI"
      />
    );
  }
);

Logo.defaultProps = {
  src: '/logo.png',
};

export default Logo;
