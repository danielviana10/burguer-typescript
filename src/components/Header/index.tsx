import { MdShoppingCart, MdLogout } from "react-icons/md";
import LogoBurguer from "../../assets/burguer-logo.png";

import { SearchForm } from "./SearchForm";
import { StyledHeader } from "./style";
import { StyledContainer } from "../../styles/grid";

import { UserContext } from "../../providers/UserContext";
import { useContext } from "react";
import { CartContext } from "../../providers/CartContext";

export const Header = () => {
  const { userLogout } = useContext(UserContext);
  const { setLoading, count } = useContext(CartContext);
  return (
    <StyledHeader>
      <StyledContainer containerWidth={1300}>
        <div className="flexGrid">
          <img
            src={LogoBurguer}
            alt="Kenzie Burguer Logo"
            className="logo"
          />
          <nav className="nav" role="navigation">
            <SearchForm />

            <div className="buttons">
              <button
                className="buttonAmount"
                type="button"
                onClick={() => setLoading(true)}
              >
                <MdShoppingCart size={28} />
                <span className="amount">{count.length}</span>
              </button>
              <button type="button" onClick={userLogout}>
                <MdLogout size={28} />
              </button>
            </div>
          </nav>
        </div>
      </StyledContainer>
    </StyledHeader>
  );
};
