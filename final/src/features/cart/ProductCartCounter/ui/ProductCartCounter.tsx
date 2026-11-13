import { Button } from '~shared/ui/Button';
import { Counter } from '~shared/ui/Counter';
import classNames from 'classnames';
import { useCount } from '../hooks/useCount';
import { useAddToCart } from '../../model/useAddToCart';

type ProductCartCounterProps = {
	product: Product;
};
export const ProductCartCounter = ({ product }: ProductCartCounterProps) => {
	const { count, handleCount, handleCountMinus, handleCountPlus } = useCount();
	const { addProductToCart } = useAddToCart();

	return (
		<div className={classNames('product__btn-wrap')}>
			<Counter
				value={count}
				onChange={handleCount}
				onIncrement={handleCountPlus}
				onDecrement={handleCountMinus}
			/>
			<Button onClick={() => addProductToCart({ ...product, count })}>
				В корзину
			</Button>
		</div>
	);
};
