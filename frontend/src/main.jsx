import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App.jsx'
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    background: "#f1f1f1",
    white: "#ffffff",
    black: "#111111",
    lightgray: "#c9c9c9",
    gray: "#a7a7a7",
    mediumgray: "#525252",
    darkgray: "#3f3f3f",
    normalBtn: "#f59255",
    activeBtn: "#f96d15",
    cancelBtn: "#ad9281",
    canceHoverlBtn: "#94705a",
    hoverBgr: "#fae2d3",
    orange: "#f96d15",
    red: "#c00000",
  },
  radii: {
    sm: "4px",
    lm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
  },
  spacing: value => `${value * 4}px`,
  effect: {
    cubic: "250ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);
