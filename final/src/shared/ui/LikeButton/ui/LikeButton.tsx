import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '~shared/assets/icons/like.svg';
import classNames from 'classnames';

type LikeButtonProps = {
	pressed: boolean;
	onClick: () => void;
};

export const LikeButton = ({ pressed, onClick }: LikeButtonProps) => (
	<button
		type='button'
		aria-label='Избранное'
		aria-pressed={pressed}
		className={classNames(s['card__favorite'], {
			[s['card__favorite_is-active']]: pressed,
		})}
		onClick={onClick}>
		<LikeSvg />
	</button>
);
