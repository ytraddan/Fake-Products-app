import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { AppDispatch } from "@/state/store";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  deleteProduct,
  toggleFavorite,
  addProduct,
} from "@/state/productsSlice";

const truncate = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const useProductActions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleDelete = (product: Product) => {
    setTimeout(() => {
      dispatch(deleteProduct(product.id));
      toast("Deleted", {
        description: `"${truncate(product.title, isMobile ? 15 : 20)}" has been removed`,
        action: {
          label: "Undo",
          onClick: () => {
            dispatch(addProduct(product));
          },
        },
      });
    }, 100);
    navigate("/products");
  };

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return {
    handleDelete,
    handleToggleFavorite,
  };
};