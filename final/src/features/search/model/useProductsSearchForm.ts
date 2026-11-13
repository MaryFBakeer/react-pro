import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useDebounce } from '~shared/hooks/useDebounce';
import { useAppDispatch } from '~shared/store/utils';
import { productsActions } from '~shared/store/slices/products';

const QUERY_SEARCH_PHRASE = 'q';

export const useProductsSearchForm = () => {
	const dispatch = useAppDispatch();

	const [searchParams, setSearchParams] = useSearchParams();
	const searchValue = searchParams.get(QUERY_SEARCH_PHRASE) ?? '';
	const { state } = useLocation();

	const optimizedValue = useDebounce(searchValue, 500);

	useEffect(() => {
		dispatch(productsActions.setSearchText(optimizedValue));
	}, [optimizedValue, dispatch]);

	const setSearchValue = (value: string) => {
		const nextParams = new URLSearchParams(searchParams);
		if (value) {
			nextParams.set(QUERY_SEARCH_PHRASE, value);
		} else {
			nextParams.delete(QUERY_SEARCH_PHRASE);
		}

		setSearchParams(nextParams, { state });
	};

	return {
		searchValue,
		setSearchValue,
	};
};
