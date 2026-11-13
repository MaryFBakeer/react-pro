import { ComponentType, FC } from 'react';
import { useAppSelector } from '../utils';
import { userSelectors } from '../slices/user';

export const WithProtection = <P extends object>(
	WrappedComponent: ComponentType<P>
) => {
	const ReturnedComponent: FC<P> = (props) => {
		const accessToken = useAppSelector(userSelectors.getAccessToken);

		if (!accessToken) {
			return <p>Чтобы открыть эту страницу, нажмите «Войти» в шапке сайта.</p>;
		}

		return <WrappedComponent {...props} />;
	};

	// У каждого компонента должно быть имя. Это поможет нам, когда будем использовать
	// dev tools'ы реакта
	ReturnedComponent.displayName = `withProtection${WrappedComponent.displayName}`;

	return ReturnedComponent;
};
