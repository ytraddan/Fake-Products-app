import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";
import { getProducts } from "@/services/api";

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
  favorites: number[];
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
  favorites: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await getProducts();
    return res;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const { id, ...updatedProduct } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, ...updatedProduct } : item,
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { toggleFavorite, addProduct, deleteProduct, updateProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
