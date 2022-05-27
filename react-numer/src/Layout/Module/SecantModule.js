import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
  } from "react-vis";
  
  export const sC = (pb, x0, x1) => {
    const { parser } = require("mathjs");
    const ps = parser();
    let i = 1;
    let x;
    let abcilon;
    let fx0;
    let fx1;
  
    let resultdata = [];
    let graph = [];
  
    const problem = (pb, xi) => {
      ps.set("x", xi);
      const eq = ps.evaluate(pb);
      return eq;
    };
  
    fx0 = problem(pb, x0);
    fx1 = problem(pb, x1);
    x = x0 - (fx0 * (x0 - x1)) / (fx0 - fx1);
  
    x1 = x + 1;
  
    const secant = (x0, x1, oldx) => {
      fx0 = problem(pb, x0);
      fx1 = problem(pb, x1);
      x = x0 - (fx0 * (x0 - x1)) / (fx0 - fx1);
      abcilon = Math.abs((x - oldx) / x);
  
      let datasecant = { i: i, x0: x0, x1: x1, err: abcilon, x: x };
      datasecant.i = i;
      datasecant.x0 = x0;
      datasecant.x1 = x1;
      datasecant.err = abcilon.toFixed(10);
      datasecant.x = x;
      resultdata.push(datasecant);
  
      let graphsecant = { x: i, y: abcilon };
      graphsecant.x = i;
      graphsecant.y = abcilon.toFixed(10);
      graph.push(graphsecant);
      i++;
  
      if (abcilon < 0.000001) {
        console.log("result is ", x);
      } else {
        x1 = x + 1;
        secant(x, x1, x);
      }
    };
  
    secant(x, x1, x);
  
    return [
      x,
      <table>
        <tbody>
          <tr>
            <th>Iteration</th>
            <th>x0</th>
            <th>x1</th>
            <th>Error</th>
            <th>x</th>
          </tr>
          {resultdata.map((data, index) => {
            return (
              <tr key={index}>
                <td>{data.i}</td>
                <td>{data.x0}</td>
                <td>{data.x1}</td>
                <td>{data.err}</td>
                <td>{data.x}</td>
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
  