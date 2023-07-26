import React from "react";
import {Elk} from "elkjs/lib/elk-api.js";

// import "./styles.scss";

// Charting styles
import "@carbon/charts/styles.css";

const size = 48;

const nodeData = [
  { id: "a", height: size, width: size },
  { id: "b", height: size, width: size },
  { id: "c", height: size, width: size },
  { id: "d", height: size, width: size },
  { id: "e", height: size, width: size },
  { id: "f", height: size, width: size },
  { id: "g", height: size, width: size },
  { id: "h", height: size, width: size }
];

const linkData = [
  { id: "1", source: "a", target: "b" },
  { id: "2", source: "c", target: "b" },
  { id: "3", source: "d", target: "e" },
  { id: "4", source: "d", target: "b" },
  { id: "5", source: "b", target: "f" },
  { id: "6", source: "g", target: "h" },
  { id: "7", source: "h", target: "f" }
];

export default () => {
  return (
    <div className="example">
      <div className="cp-message">
        <h3>This is a desktop-only example</h3>
        <p>
          Because experiences can vary between different applications, we've
          only focused on the integration of <b>elkjs</b> with the Carbon Charts
          diagram components. Mobile responsivity can be added by individual
          teams based on their specific needs.
        </p>
      </div>

      {/* <Elk nodes={nodeData} links={linkData} layout="layered" /> */}
      <Elk nodes={nodeData} links={linkData} layout={elk} />

      {/*
       * "layout" can be:
       *    - force
       *    - layered
       *    - mrtree
       *    - stress
       */}
    </div>
  );
};
