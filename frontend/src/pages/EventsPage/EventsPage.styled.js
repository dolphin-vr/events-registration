import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
`;

export const ScrollContainer = styled.div`
  overflow-y: auto;
`;


export const ErrMsg = styled.div`
  margin: ${({ theme }) => theme.spacing(12)} auto;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.colors.red};
`;
