import { Select } from '~shared/ui/Select';
import { useSort } from '../hooks/useSort';

export const Sort = () => {
	const { sort, setSort, sortParams } = useSort();
	return (
		<Select
			aria-label='Сортировка товаров'
			options={sortParams}
			value={sort}
			onChange={setSort}
		/>
	);
};
