import { Button } from '~shared/ui/Button';
import { useActionState, useState } from 'react';
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
	const [error, submitReview] = useActionState<string | null>(() => {
		if (!text || rating === 0) {
			return 'Введите текст отзыва и выберите оценку.';
		}

		try {
			onSubmit({ text, rating });
		} catch {
			return 'Не удалось отправить отзыв. Попробуйте ещё раз.';
		}

		setReviewText('');
		setRating(0);
		toast.success('Отзыв отправлен');
		return null;
	}, null);

	return (
		<form className={s['form']} action={submitReview}>
			<Rating isEdit rating={rating} onChange={setRating} />
			<textarea
				className={classNames(s['input'], s['textarea'])}
				name='text'
				id='text'
				placeholder='Напишите текст отзыва'
				value={reviewText}
				onChange={(event) => setReviewText(event.target.value)}
			/>
			{error && <p role='alert'>{error}</p>}
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
