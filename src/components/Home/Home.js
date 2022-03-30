import React from "react";
import { Button } from "@codedrops/react-ui";
import "./Home.scss";

const shortcuts = [
  {
    _id: 1,
    name: "Google",
    url: "www.google.com",
    hotkey: "G",
  },
];

const Home = () => {
  return (
    <section>
      <div>
        <Button>Codedrops</Button>
      </div>
      {shortcuts.length ? (
        <div className="shortcut-list-container">
          {shortcuts.map((item) => {
            const { name, url, hotkey, _id } = item || {};
            return (
              <div className="shortcut-container" key={_id}>
                <div className="shortcut-key">{hotkey}</div>
                <div className="column">
                  <div className="shortcut-name">{name}</div>
                  <div className="shortcut-url">{url}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-message">Empty</div>
      )}
    </section>
  );
};

export default Home;
