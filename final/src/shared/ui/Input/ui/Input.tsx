import { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	variant?: 'default' | 'rounded';
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ variant = 'default', className, ...props }, ref) => {
		return (
			<input
				{...props}
				ref={ref}
				className={classNames(s.input, s[variant], className)}
			/>
		);
	}
);

Input.displayName = 'Input';
