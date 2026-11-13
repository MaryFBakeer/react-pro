import { useMemo } from 'react';
import { useAppSelector } from '~shared/store/utils';
import { cartSelectors } from '~shared/store/slices/cart';
import { Card } from './Card/Card';
import s from './CardList.module.css';

type CardListProps = {
	title: string;
	products: Product[];
};
export const CardList = ({ title, products }: CardListProps) => {
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const cartProductIds = useMemo(
		() => new Set(cartProducts.map(({ id }) => id)),
		[cartProducts]
	);

	if (!products.length) {
		return <h1 className='header-title'>Товар не найден</h1>;
	}

	return (
		<div className={s['card-list']}>
			<div className={s['card-list__header']}>
				<h2 className={s['card-list__title']}>{title}</h2>
			</div>
			<div className={s['card-list__items']}>
				{products.map((product) => (
					<Card
						key={product.id}
						product={product}
						isProductInCart={cartProductIds.has(product.id)}
					/>
				))}
			</div>
		</div>
	);
};
