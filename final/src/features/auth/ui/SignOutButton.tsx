import { clearUserSession } from '~shared/store/userSession';
import { useNavigate } from 'react-router-dom';
import { userActions } from '~shared/store/slices/user';
import { useAppDispatch } from '~shared/store/utils';

type SignOutButtonProps = {
	className?: string;
};

export const SignOutButton = ({ className }: SignOutButtonProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSignOut = () => {
		dispatch(userActions.clearUser());
		clearUserSession();
		navigate('/signin', { replace: true });
	};

	return (
		<button type='button' className={className} onClick={handleSignOut}>
			Выйти
		</button>
	);
};
