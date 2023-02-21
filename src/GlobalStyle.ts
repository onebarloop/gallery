import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

body {
    background-color: #2d2b2b;
    font-family: "Lucida Console", Courier, monospace;
    color: white;
    scrollbar-width: none;  
    -ms-overflow-style: none;
};

body::-webkit-scrollbar {
  display: none;
}
`;

export default GlobalStyle;
