import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import Frame from "react-frame-component";

const arr = [
  <link key="styles" type="text/css" rel="stylesheet" href="./styles.css" />,
];

// setTimeout(() => {
document.head.querySelectorAll("style").forEach((link) => {
  if (link.textContent) {
    const node = <style>{link.textContent}</style>;
    arr.push(node);
  }
});
// }, 3000);

console.log("s", arr);

const comp = true ? (
  <>
    <Frame
      style={{ height: "100%", width: "100%", border: "none" }}
      initialContent={`
    <!DOCTYPE html>
    <html>
    <head>
    ${document.head.innerHTML.toString()}
    </head>
    <body><div></div></body>
    </html>
    `}
      head={arr}
    >
      <App />
    </Frame>
    <App />
  </>
) : (
  <App />
);

ReactDOM.render(comp, document.getElementById("root"));
