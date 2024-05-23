import styled from "styled-components";

export const EventsGrid = styled.ul`
  height: calc(100vh - 160px);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow-y: auto;
`;
