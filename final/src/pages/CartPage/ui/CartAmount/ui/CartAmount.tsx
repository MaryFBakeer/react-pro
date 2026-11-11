import { useState } from 'react';
import { Button } from '~shared/ui/Button';
import { Modal } from '~shared/ui/Modal';
import s from '../../CartPage.module.css';
import classNames from 'classnames';

type CartAmountProps = {
	products: CartProduct[];
};
export const CartAmount = ({ products }: CartAmountProps) => {
	const [checkoutTrigger, setCheckoutTrigger] =
		useState<HTMLButtonElement | null>(null);
	const allPrice = products.reduce((acc, p) => p.price * p.count + acc, 0);
	const allDiscount = products.reduce(
		(acc, p) => p.discount * p.count + acc,
		0
	);

	const closeCheckout = () => setCheckoutTrigger(null);

	const handleSubmitCart = () => {
		const order = products.map((p) => ({ id: p.id, count: p.count }));
		console.log('Отправка заказа на сервер: ', JSON.stringify(order, null, 2));
		closeCheckout();
	};

	return (
		<div className={classNames(s['cart-amount'])}>
			<h1 className={classNames(s['cart-amount__title'])}>Ваша корзина</h1>
			<div className={classNames(s['cart-amount__table'])}>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						{`Товары (${products.length})`}
					</span>
					<span className={classNames(s['cart-amount__table-value'])}>
						{`${allPrice} ₽`}
					</span>
				</div>
				<div className={classNames(s['cart-amount__table-row'])}>
					<span className={classNames(s['cart-amount__table-title'])}>
						Скидка
					</span>
					<span
						className={classNames(
							s['cart-amount__table-value'],
							s['cart-amount__table-value-discount']
						)}>
						{`${allDiscount} ₽`}
					</span>
				</div>
			</div>
			<div className={classNames(s['cart-amount__total-cost'])}>
				<h2 className={classNames(s['cart-amount__total-cost-title'])}>
					Общая стоимость
				</h2>
				<span className={classNames(s['cart-amount__total-cost-value'])}>
					{`${allPrice - allDiscount} ₽`}
				</span>
			</div>
			<Button
				type='button'
				aria-haspopup='dialog'
				onClick={(event) => setCheckoutTrigger(event.currentTarget)}
				fullWidth>
				Оформить заказ
			</Button>
			{checkoutTrigger && (
				<Modal
					title='Подтвердить заказ'
					onClose={closeCheckout}
					returnFocusTo={checkoutTrigger}>
					<p>К оплате {allPrice - allDiscount} ₽</p>
					<Button type='button' onClick={handleSubmitCart} fullWidth>
						Подтвердить
					</Button>
				</Modal>
			)}
		</div>
	);
};
