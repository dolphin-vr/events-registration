import styled from "styled-components";

export const Container = styled.li`
  position: relative;
  height: 200px;
  border: 1px solid #f59255;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(245, 146, 85, 0.7);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(245, 146, 85, 0.9);
  }
`;

export const Title = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 1em;
  margin-bottom: 20px;
`;

export const BtnRegister = styled.button`
position: absolute;
left: 20px;
bottom: 20px;
`;

export const BtnView = styled.button`
  position: absolute;
	right: 20px;
  bottom: 20px;
`;