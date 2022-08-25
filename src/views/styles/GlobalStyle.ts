import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        background: ${props=>props.theme.colors.body};
    }
`

export default GlobalStyle;