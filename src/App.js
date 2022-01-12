import React from "react";
import { Card } from "@codedrops/react-ui";
import "./App.scss";
import Header from "./components/Header";
import Home from "./components/Home";

const App = () => (
  <Card className="quick-switch-container" hover={false}>
    <Header />
    <Home />
    {/* {(initLoading || appLoading) && (
        <Loading type="dot-loader" background="white" />
      )} */}
  </Card>
);

export default App;
