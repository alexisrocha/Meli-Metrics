import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useSelector } from "react-redux";

import "./Navbar.scss";

export default function navbar() {
  const [value, setValue] = React.useState(0);
  const [activeClassLeft, setActiveClassLeft] = React.useState(true);
  const [activeClassRight, setActiveClassRight] = React.useState(false);
  const title = useSelector((store) => store.chart.title);
  const metric = useSelector((store) => store.metric);
  const changeCSS = (position) => {
    if (position == "left") {
      setActiveClassLeft(true);
      setActiveClassRight(false);
    } else {
      setActiveClassLeft(false);
      setActiveClassRight(true);
    }
  };
  console.log("La metric es:", metric);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      {Object.keys(metric.metric).length == 0 ? (
        <div>
          <Navbar variant="light">
            <div className="titleFirst">
              <Navbar.Brand id="title">MeliMetrics</Navbar.Brand>
            </div>
            <div className="itemsFirst">
              {title == "" ? (
                <Nav.Link className="selected">Vista principal</Nav.Link>
              ) : (
                <Nav.Link className="selected">{title}</Nav.Link>
              )}
              <Nav.Link>Mi lista de kpis</Nav.Link>
              <Nav.Link>Mis alarmas</Nav.Link>
            </div>
          </Navbar>
        </div>
      ) : (
        <div className="navbar">
          <Navbar variant="light">
            <div className="container navcontainer">
              <div style={{ marginLeft: "15px" }}>
                <Navbar.Brand id="title">MeliMetrics</Navbar.Brand>
              </div>
              <div className="items">
                {title == "" ? (
                  <Nav.Link className="selected">Vista principal</Nav.Link>
                ) : (
                  <Nav.Link className="selected">{title}</Nav.Link>
                )}
                <Nav.Link>Mi lista de kpis</Nav.Link>
                <Nav.Link>Mis alarmas</Nav.Link>
              </div>
              <div className="divVisualizacion">
                <div>
                  <Nav.Item id="mode">Visualización</Nav.Item>
                </div>
                <div class="divMain">
                  <div
                    className={activeClassLeft ? "activeCSS" : "desactivated"}
                    onClick={() => {
                      changeCSS("left");
                    }}
                  >
                    <div> Simple</div>
                  </div>
                  <div
                    className={activeClassRight ? "activeCSS" : "desactivated"}
                    onClick={() => {
                      changeCSS("right");
                    }}
                  >
                    <div> Versus</div>
                  </div>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
      )}
    </div>
  );
}
