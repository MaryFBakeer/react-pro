import { useState } from 'react';
import { userSelectors } from '~shared/store/slices/user';
import { useAppSelector } from '~shared/store/utils';

type ReviewDraft = Pick<Review, 'text' | 'rating'>;

type LocalReview = ReviewDraft & {
	id: string;
	createdAt: string;
	user: { name: string };
};

export const useLocalReviews = () => {
	const user = useAppSelector(userSelectors.getUser);
	const [reviews, setReviews] = useState<LocalReview[]>([]);

	const addReview = ({ text, rating }: ReviewDraft) => {
		const review: LocalReview = {
			id: `local-${crypto.randomUUID()}`,
			text,
			rating,
			createdAt: new Date().toISOString(),
			user: { name: user?.name || 'Пользователь' },
		};
		setReviews((currentReviews) => [...currentReviews, review]);
	};

	return { reviews, addReview };
};
