import React from "react";
import config from "../config";
import { ActionIcon } from "@mantine/core";
import { FiX } from "react-icons/fi";
import _ from "lodash";

const Header = ({ toggleState }) => {
  return (
    <div className="app-title">
      <div className={"fcc gap-8"}>
        <div className="app-name" onClick={() => history.push("/home")}>
          {_.map(config.APP_NAME, (character, idx) => (
            <div className={"character"} key={idx}>
              {character}
            </div>
          ))}
        </div>
      </div>
      <div className="fcc gap-8">
        <ActionIcon variant="light" color="red" onClick={toggleState}>
          <FiX />
        </ActionIcon>
      </div>
    </div>
  );
};

export default Header;
