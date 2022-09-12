import React from "react";
import { Routes, Route } from "react-router-dom";

interface Props {
  title?: string;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: {
    route: string,
    element: React.ReactNode,
  }[];
}
export default function PanelWrapper(props: Props) {

  React.useEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  return (
    <div className="wrapper">
      {props.sidebar}
      <main>
        {props.header}
        <Routes>
          {props.children.map((item, index) => (
            <Route key={index} path={item.route} element={item.element} />
          ))}
        </Routes>
        {props.footer}
      </main>
    </div>
  )
}
