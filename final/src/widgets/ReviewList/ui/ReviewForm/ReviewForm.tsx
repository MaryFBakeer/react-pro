import { Button } from '~shared/ui/Button';
import { useState, ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames';
import s from './ReviewForm.module.css';
import { Rating } from '~shared/ui/Rating';
import { toast } from 'react-toastify';

type ReviewFormProps = {
	onSubmit: (review: Pick<Review, 'text' | 'rating'>) => void;
};

export const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
	const [reviewText, setReviewText] = useState('');
	const [rating, setRating] = useState(0);
	const text = reviewText.trim();

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setReviewText(e.target.value);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!text || rating === 0) {
			return;
		}

		try {
			onSubmit({ text, rating });
			setReviewText('');
			setRating(0);
			toast.success('Отзыв отправлен');
		} catch {
			toast.error('Не удалось отправить отзыв. Попробуйте ещё раз.');
		}
	};

	return (
		<form className={s['form']} onSubmit={handleSubmit}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={handleChange}></textarea>
			<Button
				type='submit'
				size='large'
				className={s['form__btn']}
				disabled={!text || rating === 0}>
				Отправить отзыв
			</Button>
		</form>
	);
};
