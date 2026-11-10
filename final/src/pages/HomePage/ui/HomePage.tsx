import { WithProtection } from '~shared/store/HOCs/WithProtection';
import { WithQuery } from '~shared/store/HOCs/WithQuery';
import { LoadMore } from '~features/load-more-products';
import { Sort } from '~features/sort-products';
import { CardList } from '~widgets/CardList';
import { useProducts } from '~shared/store/hooks/useProducts';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<div className='content__sort'>
				<Sort />
			</div>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
