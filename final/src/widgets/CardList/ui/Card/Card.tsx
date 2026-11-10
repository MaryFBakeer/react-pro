import { Button } from '~shared/ui/Button';
import classNames from 'classnames';
import s from './Card.module.css';
import { Price } from './Price';
import { Link, useLocation } from 'react-router-dom';
import { ToggleFavoriteButton } from '~features/toggle-favorite';
import { useAppSelector } from '~shared/store/utils';
import { cartSelectors } from '~shared/store/slices/cart';
import { CartCounter, useAddToCart } from '~features/cart';

type CardProps = {
	product: Product;
};
export const Card = ({ product }: CardProps) => {
	const { pathname, search, hash } = useLocation();
	const { discount, price, name, tags, id, images } = product;
	const cartProducts = useAppSelector(cartSelectors.getCartProducts);
	const isProductInCart = cartProducts.some((p) => p.id === id);
	const { addProductToCart } = useAddToCart();

	return (
		<article className={s['card']}>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-left']
				)}>
				<span className={s['card__discount']}>{discount}</span>
				{tags.length > 0 &&
					tags.map((t) => (
						<span key={t} className={classNames(s['tag'], s['tag_type_new'])}>
							{t}
						</span>
					))}
			</div>
			<div
				className={classNames(
					s['card__sticky'],
					s['card__sticky_type_top-right']
				)}>
				<ToggleFavoriteButton product={product} />
			</div>
			<Link
				className={s['card__link']}
				to={`/products/${id}`}
				state={pathname + search + hash}>
				<img
					src={images}
					alt={name}
					className={s['card__image']}
					loading='lazy'
				/>
				<div className={s['card__desc']}>
					<Price price={price} discountPrice={discount} />
					<h3 className={s['card__name']}>{name}</h3>
				</div>
			</Link>
			{isProductInCart ? (
				<CartCounter productId={id} />
			) : (
				<Button
					size='small'
					onClick={() => addProductToCart({ ...product, count: 1 })}
					disabled={isProductInCart}
					className={s['card__cart']}>
					В корзину
				</Button>
			)}
		</article>
	);
};
