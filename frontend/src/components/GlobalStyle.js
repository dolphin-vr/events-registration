import { createGlobalStyle } from "styled-components";
import "modern-normalize";

export const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap');

  *,
  *::before,
  *::after {
      box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: "Roboto", sans-serif, Helvetica, Arial, system-ui;
    font-size: 12px;
	  line-height: 1.2;
    letter-spacing: 0.8px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.background};
  }
  h1,
  h2,
  h3,
  h4 {
    margin: 0;
    font-family: "Inter", sans-serif;
  }

  p {
    margin: 0;
  }

  a:visited {
    color: inherit;
  }

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  }

  img {
    display: block;
    max-width: 100%;
    object-fit: cover;
  }

  button{
    cursor: pointer;
    padding: 4px 24px;
    font-family: "Inter", sans-serif;
    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.normalBtn};
    border: none;
    border-radius: ${({ theme }) => theme.radii.sm};
    transition: background-color ${({ theme }) => theme.effect.cubic}
      fill  ${({ theme }) => theme.effect.cubic};
  }
button:hover {
    background-color: ${({ theme }) => theme.colors.activeBtn};
  }
`;
