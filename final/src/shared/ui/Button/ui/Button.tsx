import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import s from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary';
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
};

export const Button = ({
	variant = 'primary',
	size = 'medium',
	fullWidth = false,
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			className={classNames(
				s.button,
				s[variant],
				s[size],
				{
					[s.fullWidth]: fullWidth,
				},
				className
			)}
		/>
	);
};
