import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWindow = styled.div`
position: relative;
overflow: hidden;
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(245, 146, 85, 0.7);
`;

export const Title = styled.h2`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
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
  color: white;

  &:first-child {
    background: ${({ theme }) => theme.colors.cancelBtn};
    color: ${({ theme }) => theme.colors.darkgray};

    &:hover {
      background: ${({ theme }) => theme.colors.canceHoverlBtn};
    }
  }
`;

export const BtnClose = styled.button`
position: absolute;
top: 12px;
right: 12px;
padding: 4px 8px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid ${({ theme }) => theme.colors.activeBtn};
  border-radius: 4px;
`;

export const ParticipantList = styled.ul`
  max-height: 50vh;
  overflow-y: auto;
`;

export const ParticipantItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.activeBtn};
`;

export const FullName = styled.span`
font-weight: 500;
`

export const Email = styled.span`
  font-style: italic;
`;
