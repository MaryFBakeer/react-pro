import { useAppDispatch, useAppSelector } from '~shared/store/utils';
import {
	productsActions,
	productsSelectors,
} from '~shared/store/slices/products';

interface SortParams {
	label: string;
	value: Sort;
}
export const useSort = () => {
	const dispatch = useAppDispatch();

	const sort = useAppSelector(productsSelectors.getSort);

	const setSort = (newSort: Sort) => {
		dispatch(productsActions.setSort(newSort));
	};

	const sortParams: SortParams[] = [
		{
			label: 'Дешевые',
			value: 'low-price',
		},
		{
			label: 'Дорогие',
			value: 'high-price',
		},
		{
			label: 'Новые',
			value: 'newest',
		},
		{
			label: 'Старые',
			value: 'oldest',
		},
	];
	return { sort, setSort, sortParams };
};
