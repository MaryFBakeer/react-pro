import { saveUserSession } from '~shared/store/userSession';
import { AuthFields } from './AuthFields';
import { FC, useRef, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	Alert,
	Avatar,
	Box,
	CircularProgress,
	Container,
	Link,
	Typography,
} from '@mui/material';
import { Button } from '~shared/ui/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AuthCredentials } from '~shared/store/api/authApi';
import { signUpFormSchema } from '../model/SignUpSchema';
import { userActions } from '~shared/store/slices/user';
import { getMessageFromError } from '~shared/utils';
import { useSignUpMutation } from '~shared/store/api/authApi';

type SignUpFormProps = {
	focusEmail?: boolean;
	onSwitch?: () => void;
	onSuccess?: () => void;
};

export const SignUpForm: FC<SignUpFormProps> = ({
	focusEmail,
	onSwitch,
	onSuccess,
}) => {
	const dispatch = useDispatch();
	const isRequestInFlight = useRef(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	// navigate поможет сделать редирект в нужный момент
	const navigate = useNavigate();
	// Из хука useSignUpMutation (был получен путем автогенерации)
	// достаем функцию, которая будет (регистрировать пользователя) делать POST-запрос к нашем серверу)
	const [signUpRequestFn] = useSignUpMutation();
	// инициализируем react-hook-form
	const {
		// control понадобиться, чтобы подружить react-hook-form и компоненты из MUI
		control,
		handleSubmit,
		formState: { isValid, isSubmitting, isSubmitted },
		// с помощью generic подсказываем react-hook-form, какие поля содержит наша форма
	} = useForm<AuthCredentials>({
		defaultValues: {
			email: '',
			password: '',
		},
		// react-hook-form умеет работать со многими библиотеками
		// валидации, мы используем yup
		resolver: yupResolver(signUpFormSchema),
	});

	const submitHandler: SubmitHandler<AuthCredentials> = async (values) => {
		if (isRequestInFlight.current) return;

		isRequestInFlight.current = true;
		setSubmitError(null);
		try {
			// метод "unwrap" помогает убрать вспомогательные обертки
			// RTK, которые обрабатывают ошибки. Теперь ошибки обрабатываем мы
			// с помощью конструкции try...catch. В этом случае нам так удобней
			const response = await signUpRequestFn(values).unwrap();

			dispatch(userActions.setSession(response));
			saveUserSession(response);

			// Выводим уведомление, что пользователь успешно зарегался
			// Есть куча библиотек для отображения "Тостеров". Мы используем
			// react-toastify — https://github.com/fkhadra/react-toastify#readme
			toast.success('Вы успешно зарегистрированы!');
			if (onSuccess) {
				onSuccess();
				return;
			}

			navigate('/');
		} catch (error) {
			// Если произошла ошибка, то выводим уведомление
			console.log({ error });
			const message = getMessageFromError(
				error,
				'Не известная ошибка при регистрации пользователя'
			);
			if (onSuccess) {
				setSubmitError(message);
			} else {
				toast.error(message);
			}
		} finally {
			isRequestInFlight.current = false;
		}
	};

	return (
		<Container maxWidth='xs'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ my: 1 }}>
					<AuthFields control={control} focusEmail={focusEmail} />
					{submitError && <Alert severity='error'>{submitError}</Alert>}

					<Button
						type='submit'
						disabled={isSubmitting || (isSubmitted && !isValid)}
						aria-busy={isSubmitting}
						aria-label={isSubmitting ? 'Регистрация…' : undefined}
						fullWidth>
						{isSubmitting ? (
							<CircularProgress size={20} color='inherit' aria-hidden />
						) : (
							'SIGN UP'
						)}
					</Button>
					<Box display='flex' justifyContent='center' flexGrow={1}>
						{onSwitch ? (
							<Link
								component='button'
								type='button'
								disabled={isSubmitting}
								onClick={onSwitch}>
								SIGN IN
							</Link>
						) : (
							<Link component={RouterLink} to='/signin'>
								SIGN IN
							</Link>
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
