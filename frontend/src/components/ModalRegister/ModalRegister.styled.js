import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWindow = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin-bottom: 20px;
`;

export const EventTitle = styled.h3`
  height: 44px;
  margin-bottom: 10px;
  font-size: 1.5em;
  text-align: center;
`;
export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

export const RadioGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
`;

export const RadioInput = styled.input`
  margin-right: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  /* background: #007bff; */
  color: white;

  /* &:hover {
    background: #0056b3;
  } */

  &:first-child {
    background: ${({ theme }) => theme.colors.cancelBtn};
    color: ${({ theme }) => theme.colors.darkgray};

    &:hover {
      background: ${({ theme }) => theme.colors.canceHoverlBtn};
    }
  }
`;
