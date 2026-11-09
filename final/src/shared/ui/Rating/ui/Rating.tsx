import { ReactComponent as Star } from '~shared/assets/icons/star.svg';

type TRating = {
	rating?: number;
	isEdit?: boolean;
	onChange?: (rating: number) => void;
};
export const Rating = ({ rating = 0, isEdit = false, onChange }: TRating) => {
	return (
		<div>
			{[1, 2, 3, 4, 5].map((value) => (
				<span key={value} style={{ cursor: isEdit ? 'pointer' : 'default' }}>
					<Star
						onClick={isEdit ? () => onChange?.(value) : undefined}
						fill={value <= rating ? 'gold' : 'gray'}
					/>
				</span>
			))}
		</div>
	);
};
