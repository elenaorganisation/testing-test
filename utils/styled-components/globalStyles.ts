import { createGlobalStyle } from "styled-components"

type GlobalTheme = {
  theme: { colors: { [key: string]: string } }
}

const GlobalStyle = createGlobalStyle<GlobalTheme>`

/* CSS RESET START */

/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
}

img, picture, video, canvas {
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

/* CSS RESET END */


/* CUSTOM GLOBAL STYLES */

body {
  font-family: 'Mulish', sans-serif;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.body};
}

input, textarea, select {
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
}

a {
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
}

table, tr, td{
  border-collapse: collapse;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Mulish', sans-serif;
}

`

export default GlobalStyle
