import { jsx as _jsx } from "react/jsx-runtime";
const Tab = ({ children, className = "" }) =>
  _jsx("div", {
    className: `${className} flex-1 bg-gray-100`,
    children: children,
  });
export default Tab;
