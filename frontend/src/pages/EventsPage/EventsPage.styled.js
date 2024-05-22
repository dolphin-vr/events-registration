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
export const EventsGrid = styled.ul`
  height: calc(100vh - 112px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  /* overflow-y: auto; */
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

export const PageLink = styled.span`
  margin: 0 10px;
  cursor: pointer;
  font-size: 1.2em;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;
