import { TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Controller, type Control } from 'react-hook-form';
import type { AuthCredentials } from '~shared/store/api/authApi';

type AuthFieldsProps = {
	control: Control<AuthCredentials>;
	focusEmail?: boolean;
};

export const AuthFields = ({ control, focusEmail }: AuthFieldsProps) => {
	const emailInputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		if (focusEmail) {
			emailInputRef.current?.focus();
		}
	}, [focusEmail]);

	return (
		<>
			<Controller
				name='email'
				control={control}
				render={({ field: { ref, ...field }, fieldState: { error } }) => (
					<TextField
						margin='normal'
						label='Email Address'
						type='email'
						fullWidth
						required
						autoComplete='email'
						error={!!error?.message}
						helperText={error?.message}
						inputRef={(input: HTMLInputElement | null) => {
							emailInputRef.current = input;
							ref(input);
						}}
						{...field}
					/>
				)}
			/>
			<Controller
				name='password'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<TextField
						label='Password'
						type='password'
						error={!!error?.message}
						helperText={error?.message}
						margin='normal'
						fullWidth
						required
						{...field}
					/>
				)}
			/>
		</>
	);
};
