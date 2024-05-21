import styled from "styled-components";

export const Container = styled.li`
  position: relative;
  height: 280px;
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
  height: 44px;
  margin-bottom: 10px;
  font-size: 1.5em;
	text-align: center;
`;

export const Description = styled.p`
height: 58px;
  font-size: 1em;
  margin-bottom: 20px;
`;

export const EventDate = styled.p`
  margin: 0 0 12px;
  font-size: 14px;
	text-align: right;
`;

export const Organizer = styled.p`
  margin: 0 0 20px;
  font-size: 14px;
  text-align: right;
	font-weight: 600;
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