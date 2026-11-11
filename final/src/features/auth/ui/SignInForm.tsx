import { saveUserSession } from '~shared/store/userSession';
import { AuthFields } from './AuthFields';
import { FC, useRef, useState } from 'react';
import { Alert, Avatar, Box, Container, Link, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '~shared/ui/Button';
import { toast } from 'react-toastify';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import type { AuthCredentials } from '~shared/store/api/authApi';
import { signInFormSchema } from '../model/SignInSchema';
import { useSignInMutation } from '~shared/store/api/authApi';
import { userActions } from '~shared/store/slices/user';
import { getMessageFromError } from '~shared/utils';

type SignInFormProps = {
	focusEmail?: boolean;
	onSwitch?: () => void;
	onSuccess?: () => void;
};

export const SignInForm: FC<SignInFormProps> = ({
	focusEmail,
	onSwitch,
	onSuccess,
}) => {
	const dispatch = useDispatch();
	const isRequestInFlight = useRef(false);
	const [showPendingNotice, setShowPendingNotice] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const location = useLocation();
	// navigate поможет сделать редирект в нужный момент
	const navigate = useNavigate();
	// Из хука useSignUpMutation (был получен путем автогенерации)
	// достаем функцию, которая будет (регистрировать пользователя) делать POST-запрос к нашем серверу)
	const [signInRequestFn] = useSignInMutation();
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
		resolver: yupResolver(signInFormSchema),
	});

	const submitHandler: SubmitHandler<AuthCredentials> = async (values) => {
		if (isRequestInFlight.current) {
			setShowPendingNotice(true);
			return;
		}

		isRequestInFlight.current = true;
		setSubmitError(null);
		try {
			// метод "unwrap" помогает убрать вспомогательные обертки
			// RTK, которые обрабатывают ошибки. Теперь ошибки обрабатываем мы
			// с помощью конструкции try...catch. В этом случае нам так удобней
			const response = await signInRequestFn(values).unwrap();

			dispatch(userActions.setSession(response));
			saveUserSession(response);

			// Выводим уведомление, что пользователь успешно зарегался
			// Есть куча библиотек для отображения "Тостеров". Мы используем
			// react-toastify — https://github.com/fkhadra/react-toastify#readme
			toast.success('Вы успешно авторизованы!');

			if (onSuccess) {
				onSuccess();
				return;
			}

			if (location.state?.from) {
				return navigate(location.state.from);
			}

			navigate('/');
		} catch (error) {
			// Если произошла ошибка, то выводим уведомление
			const message = getMessageFromError(
				error,
				'Не известная ошибка при авторизации пользователя'
			);
			if (onSuccess) {
				setSubmitError(message);
			} else {
				toast.error(message);
			}
		} finally {
			isRequestInFlight.current = false;
			setShowPendingNotice(false);
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
					Sign In
				</Typography>
				<Box
					component='form'
					onSubmit={handleSubmit(submitHandler)}
					noValidate
					sx={{ my: 1 }}>
					<AuthFields control={control} focusEmail={focusEmail} />
					{submitError && <Alert severity='error'>{submitError}</Alert>}

					<Button type='submit' disabled={isSubmitted && !isValid} fullWidth>
						SIGN IN
					</Button>
					{showPendingNotice && (
						<Alert severity='info' sx={{ mt: 1 }}>
							Запрос на вход уже отправлен. Дождитесь ответа.
						</Alert>
					)}
					<Box display='flex' justifyContent='center' flexGrow={1}>
						{onSwitch ? (
							<Link
								component='button'
								type='button'
								disabled={isSubmitting}
								onClick={onSwitch}>
								SIGN UP
							</Link>
						) : (
							<Link component={RouterLink} to='/signup'>
								SIGN UP
							</Link>
						)}
					</Box>
				</Box>
			</Box>
		</Container>
	);
};
