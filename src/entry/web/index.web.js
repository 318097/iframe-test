import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";
import Frame from "react-frame-component";

const comp = true ? (
  <Frame
    style={{ height: "100%", width: "100%", border: "none" }}
    head={[
      <link
        key="styles"
        type="text/css"
        rel="stylesheet"
        href="./styles.css"
      />,
    ]}
  >
    <App />
  </Frame>
) : (
  <App />
);

ReactDOM.render(comp, document.getElementById("root"));
