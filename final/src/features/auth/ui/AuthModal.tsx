import { useState } from 'react';
import { Modal } from '~shared/ui/Modal';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

type AuthModalProps = {
	returnFocusTo: HTMLElement;
	onClose: () => void;
	onSuccess: () => void;
};

export const AuthModal = ({
	returnFocusTo,
	onClose,
	onSuccess,
}: AuthModalProps) => {
	const [isSignUp, setIsSignUp] = useState(false);
	const Form = isSignUp ? SignUpForm : SignInForm;

	return (
		<Modal
			title={isSignUp ? 'Регистрация' : 'Вход'}
			onClose={onClose}
			returnFocusTo={returnFocusTo}>
			<Form onSwitch={() => setIsSignUp(!isSignUp)} onSuccess={onSuccess} />
		</Modal>
	);
};
