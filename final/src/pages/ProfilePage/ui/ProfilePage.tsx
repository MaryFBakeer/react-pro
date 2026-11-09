import { Input } from '~shared/ui/Input';
import { Button } from '~shared/ui/Button';
import s from './ProfilePage.module.css';
import classNames from 'classnames';
import { ButtonBack } from '~shared/ui/ButtonBack';
import { WithProtection } from '~shared/store/HOCs/WithProtection';

export const ProfilePage = WithProtection(() => {
	return (
		<>
			<ButtonBack />
			<h1 className={s['form__title']}>Мои данные</h1>
			<form className={classNames(s['form'], s['form'])}>
				<div className={s['form__row']}>
					<label className={s['form__label']} htmlFor='name'>
						<Input
							aria-label='Имя'
							className={s['input']}
							name='name'
							id='name'
							type='text'
							placeholder='Введите ваше имя'
						/>
					</label>
					<label className={s['form__label']} htmlFor='about'>
						<Input
							aria-label='Описание профессии'
							className={s['input']}
							name='about'
							id='about'
							type='text'
							placeholder='Описание профессии'
						/>
					</label>
				</div>
				<div className={s['form__row']}>
					<label className={s['form__label']} htmlFor='avatar'>
						<Input
							aria-label='Ссылка на аватарку'
							className={s['input']}
							name='avatar'
							id='avatar'
							type='url'
							placeholder='Введите ссылку на аватарку'
						/>
					</label>
					<label className={s['form__label']} htmlFor='email'>
						<Input
							aria-label='Электронная почта'
							className={s['input']}
							name='email'
							id='email'
							type='text'
							placeholder='email'
						/>
					</label>
				</div>

				<Button
					type='submit'
					variant='secondary'
					size='large'
					className={s['form__btn']}>
					Сохранить
				</Button>
			</form>
			<h2 className={s['form__title']}>Изменить пароль</h2>
			<form className={classNames(s['form'], s['form'])}>
				<div className={classNames(s['form__row'], s['form__row_min'])}>
					<label className={s['form__label']} htmlFor='password'>
						<Input
							aria-label='Пароль'
							className={s['input']}
							name='password'
							id='password'
							type='password'
							placeholder='Пароль'
						/>
					</label>
				</div>
				<Button
					type='submit'
					variant='secondary'
					size='large'
					className={s['form__btn']}>
					Сохранить
				</Button>
			</form>
		</>
	);
});
