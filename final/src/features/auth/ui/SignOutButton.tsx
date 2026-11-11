import { useState } from 'react';
import { clearUserSession } from '~shared/store/userSession';
import { useNavigate } from 'react-router-dom';
import { userActions } from '~shared/store/slices/user';
import { useAppDispatch } from '~shared/store/utils';
import { Button } from '~shared/ui/Button';
import { Modal } from '~shared/ui/Modal';

type SignOutButtonProps = {
	className?: string;
};

export const SignOutButton = ({ className }: SignOutButtonProps) => {
	const [trigger, setTrigger] = useState<HTMLButtonElement | null>(null);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const closeConfirmation = () => setTrigger(null);

	const handleSignOut = () => {
		closeConfirmation();
		dispatch(userActions.clearUser());
		clearUserSession();
		navigate('/', { replace: true });
	};

	return (
		<>
			<button
				type='button'
				className={className}
				aria-haspopup='dialog'
				onClick={(event) => setTrigger(event.currentTarget)}>
				Выйти
			</button>
			{trigger && (
				<Modal
					title='Вы уверены, что хотите выйти?'
					onClose={closeConfirmation}
					returnFocusTo={trigger}>
					<div style={{ display: 'flex', paddingTop: 30, gap: 30 }}>
						<Button
							type='button'
							variant='secondary'
							onClick={closeConfirmation}>
							Отмена
						</Button>
						<Button type='button' onClick={handleSignOut}>
							Выйти
						</Button>
					</div>
				</Modal>
			)}
		</>
	);
};
