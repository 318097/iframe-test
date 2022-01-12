import { Card } from "@codedrops/react-ui";
import React from "react";
import "../App.scss";
import Header from "./Header";
import Home from "./Home";

const AppContent = () => {
  return (
    <Card className="quick-switch-container" hover={false}>
      <Header />

      <Home />
      {/* {(initLoading || appLoading) && (
        <Loading type="dot-loader" background="white" />
      )} */}
    </Card>
  );
};

export default AppContent;
