import { useNavigate } from 'react-router-dom';
import { WithProtection } from '~shared/store/HOCs/WithProtection';
import { WithQuery } from '~shared/store/HOCs/WithQuery';
import { useProducts } from '~shared/store/hooks/useProducts';
import { ButtonBack } from '~shared/ui/ButtonBack';
import { CardList } from '~widgets/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const navigate = useNavigate();
	const { isLoading, isError, products, error } = useProducts();

	return (
		<>
			<br />
			<ButtonBack onClick={() => navigate(-1)} />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
});
