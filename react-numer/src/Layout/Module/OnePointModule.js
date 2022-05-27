import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
  } from "react-vis";
  
  export const oP = (pb, oldx) => {
    const { parser } = require("mathjs");
    const ps = parser();
  
    let i = 1;
    let resultdata = [];
    let x;
    let abcilon;
    let graph = [];
  
    const problem = (pb, xi) => {
      ps.set("x", xi);
      const eq = ps.evaluate(pb);
      return eq;
    };
  
    const onePoint = (oldx) => {
      x = problem(pb, oldx);
      abcilon = Math.abs((x - oldx) / x);
  
      let dataonepoint = { i: i, x: x, err: abcilon };
      dataonepoint.i = i;
      dataonepoint.x = x;
      dataonepoint.err = abcilon.toFixed(10);
      resultdata.push(dataonepoint);
  
      let graphonepoint = { x: i, y: abcilon };
      graphonepoint.x = i;
      graphonepoint.y = abcilon.toFixed(10);
      graph.push(graphonepoint);
  
      if (abcilon < 0.000001) {
        console.log("result : ", x);
      } else {
        i++;
        onePoint(x);
      }
    };
    onePoint(oldx);
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
  