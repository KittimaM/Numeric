import * as React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/bisection">Bisection</Link></li>
        <li><Link to="/falseposition">FalsePosition</Link></li>
        <li><Link to="/onepoint">OnePoint</Link></li>
        <li><Link to="/newton">Newton</Link></li>
        <li><Link to="/secant">Secant</Link></li>
      </ul>
    </div>
  );
}
