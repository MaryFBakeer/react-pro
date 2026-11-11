import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	products: CartProduct[];
}

const createInitState = (): CartState => ({
	products: [],
});

export const cartSlice = createSlice({
	name: 'cart',
	initialState: createInitState(),
	reducers: {
		addCartProduct(state, action: PayloadAction<CartProduct>) {
			state.products = [...state.products, action.payload];
		},
		deleteCartProduct(state, action: PayloadAction<CartProduct['id']>) {
			state.products = state.products.filter((p) => p.id !== action.payload);
		},
		setCartProductCount(
			state,
			action: PayloadAction<Pick<CartProduct, 'id' | 'count'>>
		) {
			for (const product of state.products) {
				if (product.id === action.payload.id) {
					product.count = action.payload.count;
				}
			}
		},
	},
	selectors: {
		getCartProducts: (state: CartState) => state.products,
	},
});

export const cartActions = { ...cartSlice.actions };
export const cartSelectors = cartSlice.selectors;
