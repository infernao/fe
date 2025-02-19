import React from "react";
import "../Background.css";

const Background = ({ children }) => {
  return <div className="global-background">{children}</div>;
};

export default Background;
