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
	const [mode, setMode] = useState<'signIn' | 'signUp' | null>(null);
	const isSignUp = mode === 'signUp';
	const Form = isSignUp ? SignUpForm : SignInForm;

	return (
		<Modal
			title={isSignUp ? 'Регистрация' : 'Вход'}
			onClose={onClose}
			returnFocusTo={returnFocusTo}>
			<Form
				focusEmail={mode !== null}
				onSwitch={() => setMode(isSignUp ? 'signIn' : 'signUp')}
				onSuccess={onSuccess}
			/>
		</Modal>
	);
};
