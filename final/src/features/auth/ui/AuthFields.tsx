import { TextField } from '@mui/material';
import { Controller, type Control } from 'react-hook-form';
import type { AuthCredentials } from '~shared/store/api/authApi';

type AuthFieldsProps = {
	control: Control<AuthCredentials>;
};

export const AuthFields = ({ control }: AuthFieldsProps) => (
	<>
		<Controller
			name='email'
			control={control}
			render={({ field, fieldState: { error } }) => (
				<TextField
					margin='normal'
					label='Email Address'
					type='email'
					fullWidth
					required
					autoComplete='email'
					error={!!error?.message}
					helperText={error?.message}
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
