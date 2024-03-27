
const styles = `
export default '@charset "UTF-8";
:root {
}
* {
  padding: 0;
  margin: 0;
  border: 0;

}

*, *:before, *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

:focus, :active {
  outline: none;
}

a:focus, a:active {
  outline: none;
}

nav, footer, header, aside {
  display: block;
}

html, body {
  height: 100%;
  width: 100%;
  font-size: 100%;
  line-height: 1;
  -ms-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;

}
body {
}
input, button, textarea {
  color: inherit;
  font-family: Inter, sans-serif;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
}

input::-ms-clear {
  display: none;
}

button {
  cursor: pointer;
  background: transparent;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

a, a:visited {
  text-decoration: none;
}

a {
  color: inherit;
  font-family: Inter, sans-serif;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  line-height: inherit;
}

a:hover {
  text-decoration: none;
}

ul {
  list-style-type: inherit;
}

li {
  list-style-type: inherit;
}

img {
  vertical-align: top;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: 400;
}

/*--------------------*/
*,
*::before,
*::after {
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}
html {
  --width__nav-item: 0px;
}
body {
  color: #000;
  font-family: 'Roboto';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 151.3%; /* 24.208px */
  position: relative;
}
.generated {
    max-width: 1380px;
    margin: 0 auto;
    padding: 15px;
}
`
export default styles