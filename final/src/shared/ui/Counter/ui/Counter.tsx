import { ChangeEventHandler } from 'react';
import classNames from 'classnames';
import s from './Counter.module.css';

type CounterProps = {
	value: number;
	onChange: ChangeEventHandler<HTMLInputElement>;
	onIncrement: () => void;
	onDecrement: () => void;
	incrementDisabled?: boolean;
	decrementDisabled?: boolean;
	className?: string;
};

export const Counter = ({
	value,
	onChange,
	onIncrement,
	onDecrement,
	incrementDisabled = false,
	decrementDisabled = false,
	className,
}: CounterProps) => {
	return (
		<div className={classNames(s.counter, className)}>
			<button
				type='button'
				className={s.button}
				onClick={onDecrement}
				disabled={decrementDisabled}>
				-
			</button>
			<input
				type='number'
				className={s.input}
				value={value}
				onChange={onChange}
			/>
			<button
				type='button'
				className={s.button}
				onClick={onIncrement}
				disabled={incrementDisabled}>
				+
			</button>
		</div>
	);
};
