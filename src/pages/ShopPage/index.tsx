import { StyledShopPage } from "./style";
import { StyledContainer } from "../../styles/grid";

import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";

import { useContext } from "react";
import { CartContext } from "../../providers/CartContext";

export const ShopPage = () => {
  const { loading } = useContext(CartContext);
  return (
    <StyledShopPage>

      {loading ? <CartModal /> : null}
      
      <Header />
        <main>
          <StyledContainer containerWidth={1300}>
            <ProductList />
          </StyledContainer>
        </main>
    </StyledShopPage>
  );
};
