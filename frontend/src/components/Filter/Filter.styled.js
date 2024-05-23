import styled from "styled-components";

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  gap: 4px;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid ${({ theme }) => theme.colors.activeBtn};
  border-radius: 4px;
`;

export const FilterLabel = styled.label`
  margin-right: 10px;
`;

export const FilterInput = styled.input`
  padding: 5px;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.colors.activeBtn};
  border-radius: 4px;
`;

export const BtnSort = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
`;

export const BtnReset = styled.button`
  padding: 4px 8px;
`;
