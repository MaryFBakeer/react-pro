import { ChangeEvent } from 'react';
import { cartActions, cartSelectors } from '~shared/store/slices/cart';
import { shallowEqual, useDispatch } from 'react-redux';
import { useAppSelector } from '~shared/store/utils';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
	const dispatch = useDispatch();
	const { count, stock } = useAppSelector((state) => {
		const product = cartSelectors
			.getCartProducts(state)
			.find((item) => item.id === productId);

		return {
			count: product?.count ?? MIN_COUNT,
			stock: product?.stock ?? 0,
		};
	}, shallowEqual);
	const handleIncrement = () => {
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(
			cartActions.setCartProductCount({ id: productId, count: validCount })
		);
	};
	const handleDecrement = () => {
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(
			cartActions.setCartProductCount({ id: productId, count: validCount })
		);
	};
	const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		dispatch(
			cartActions.setCartProductCount({ id: productId, count: validCount })
		);
	};
	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
