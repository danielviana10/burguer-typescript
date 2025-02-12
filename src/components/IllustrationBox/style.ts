import styled from "styled-components";

export const StyledIllustrationBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  .styledBox {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: ${({ theme }) => theme.colors.white};
    border: 1px solid #e0e0e0;
  }

  img{
    max-width: 80%;
    height: auto;
    object-fit: contain;
  }
`;
