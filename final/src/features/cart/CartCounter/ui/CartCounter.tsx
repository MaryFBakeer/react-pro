import { useCount } from '../hooks/useCount';
import { Counter } from '~shared/ui/Counter';

type TCartCounter = {
	productId: string;
};
export const CartCounter = ({ productId }: TCartCounter) => {
	const { count, stock, handleSetCount, handleIncrement, handleDecrement } =
		useCount(productId);

	return (
		<Counter
			value={count}
			onChange={handleSetCount}
			onIncrement={handleIncrement}
			onDecrement={handleDecrement}
			incrementDisabled={count >= stock}
		/>
	);
};
