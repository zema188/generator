
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

.form__field {
  margin-bottom: 10px;
  & label {
    font-weight: bold;
    display: block;
  }
}

input, textarea {
  width: 100%;
  display: block;
  border: 1px solid #969696;
  border-radius: 8px;
  padding: 5px 10px;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;
  padding: 10px;
  background: #7886a0;
  color: #fff;
  border-radius: 12px;
  font-weight: bold;
}
.btn:hover {
  background: #606d85;
}
.btn:active {
  background: #505663;
}
.btn_small {
  width: fit-content;
  font-size: 14px;
}
.btn_blue {
  background: #7fa9f9;
  color: #fff;
}
.btn_blue:hover {
  background: #6b94e0;
}
.btn_blue:active {
  background: #4e73b9;
}
.btn_green {
  background: #4fb3b3;
  color: #fff;
}
.btn_green:hover {
  background: #3b8b8b;
}
.btn_green:active {
  background: #2c7070;
}
.btn_red {
  background: #e22626;
  color: #fff;
}
.btn_red:hover {
  background: #b41a1a;
}
.btn_red:active {
  background: #a00c0c;
}

`
export default styles