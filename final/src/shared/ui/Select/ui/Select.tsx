import { SelectHTMLAttributes } from 'react';

type SelectProps<Value extends string> = Omit<
	SelectHTMLAttributes<HTMLSelectElement>,
	'children' | 'defaultValue' | 'multiple' | 'onChange' | 'value'
> & {
	options: readonly { value: Value; label: string }[];
	value: Value;
	onChange: (value: Value) => void;
};

export const Select = <Value extends string>({
	options,
	value,
	onChange,
	...props
}: SelectProps<Value>) => (
	<select
		{...props}
		value={value}
		onChange={(event) => {
			const selectedValue = event.currentTarget.value;
			const option = options.find(({ value }) => value === selectedValue);

			if (option) {
				onChange(option.value);
			}
		}}>
		{options.map(({ value, label }) => (
			<option key={value} value={value}>
				{label}
			</option>
		))}
	</select>
);
