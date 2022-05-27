import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
  } from "react-vis";
  
  export const nT = (pb, x_newton) => {
    const { derivative, parser } = require("mathjs");
    const ps = parser();
  
    let i = 1;
    let abcilon;
    let x;
    let fxi;
    let f2xi;
  
    let resultdata = [];
    let graph = [];
    const problem = (pb, xi) => {
      ps.set("x", xi);
      const eq = ps.evaluate(pb);
      return eq;
    };
  
    const pbdiff = (pb, xi) => {
      ps.set("x", xi);
      const eq = derivative(pb, "x").evaluate({ x: xi });
      return eq;
    };
  
    const newton = (x_newton) => {
      fxi = problem(pb, x_newton);
      f2xi = pbdiff(pb, x_newton);
      x = x_newton - fxi / f2xi;
      abcilon = Math.abs((x - x_newton) / x);
      let datanewton = { i: i, x: x, err: abcilon };
      datanewton.i = i;
      datanewton.x = x;
      datanewton.err = abcilon.toFixed(10);
      resultdata.push(datanewton);
  
      let graphnewton = { x: i, y: abcilon };
      graphnewton.x = i;
      graphnewton.y = abcilon;
      graph.push(graphnewton);
  
      if (abcilon < 0.000001) {
        console.log("result is ", x);
      } else {
        i++;
        newton(x);
      }
    };
  
    newton(x_newton);
    return [
      x,
      <table>
        <tbody>
          <tr>
            <th>Iteration</th>
            <th>xM</th>
            <th>Error</th>
          </tr>
          {resultdata.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.i}</td>
                <td>{data.x}</td>
                <td>{data.err}</td>
              </tr>
            );
          })}
        </tbody>
      </table>,
      <XYPlot width={400} height={400}>
        <HorizontalGridLines />
        <LineSeries data={graph} />
        <XAxis />
        <YAxis />
      </XYPlot>,
    ];
  };
  