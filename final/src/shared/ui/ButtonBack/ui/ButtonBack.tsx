import { ReactComponent as BackSvg } from '~shared/assets/icons/back.svg';
import { Button } from '~shared/ui/Button';

type ButtonBackProps = {
	onClick: () => void;
};

export const ButtonBack = ({ onClick }: ButtonBackProps) => (
	<Button type='button' variant='secondary' size='small' onClick={onClick}>
		<BackSvg aria-hidden='true' focusable='false' />
		Назад
	</Button>
);
