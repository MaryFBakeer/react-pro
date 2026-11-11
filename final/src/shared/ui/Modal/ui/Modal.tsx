import { ReactNode, useId, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

type ModalProps = {
	title: string;
	children: ReactNode;
	onClose: () => void;
	returnFocusTo: HTMLElement;
};

export const Modal = ({
	title,
	children,
	onClose,
	returnFocusTo,
}: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const closeButtonRef = useRef<HTMLButtonElement>(null);
	const titleId = useId();
	const portalRoot = document.getElementById('modal-root');

	useLayoutEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		dialog.showModal();

		return () => {
			dialog.close();
			if (returnFocusTo.isConnected) {
				returnFocusTo.focus();
			}
		};
	}, [portalRoot, returnFocusTo]);

	useLayoutEffect(() => {
		closeButtonRef.current?.focus();
	}, [portalRoot, returnFocusTo, title]);

	if (!portalRoot) return null;

	return createPortal(
		<dialog
			ref={dialogRef}
			className={s.dialog}
			aria-labelledby={titleId}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}>
			<button
				type='button'
				className={s.backdrop}
				tabIndex={-1}
				aria-label='Закрыть окно'
				onClick={onClose}
			/>
			<div className={s.panel}>
				<button
					ref={closeButtonRef}
					type='button'
					className={s.close}
					aria-label='Закрыть окно'
					onClick={onClose}>
					×
				</button>
				<h2 id={titleId} className={s.title}>
					{title}
				</h2>
				{children}
			</div>
		</dialog>,
		portalRoot
	);
};
