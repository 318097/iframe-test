import React from "react";
import ReactDOM from "react-dom";
import App from "../../App";

const app = document.createElement("span");
app.id = "extension-root";

document.body.appendChild(app);

ReactDOM.render(<App />, app);
