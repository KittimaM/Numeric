import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from "react-vis";

export const bisec = (pb, xL, xR) => {
  const { parser } = require("mathjs");
  const ps = parser();

  let i = 1;
  let resultdata = [];
  let xM;
  let fxL;
  let fxR;
  let abcilon;
  let fxM;

  let graph = [];

  const problem = (pb, xi) => {
    ps.set("x", xi);
    const eq = ps.evaluate(pb);
    return eq;
  };

  fxL = problem(pb, xL);
  fxR = problem(pb, xR);


  const BisectionMethod = (xL, xR, oldxM) => {
    xM = (xL + xR) / 2;
    fxM = problem(pb, xM);
    fxR = problem(pb, xR);
    abcilon = Math.abs((xM - oldxM) / xM);
    let databisec = { i: i, xL: xL, xR: xR, err: abcilon, xM: xM };
    databisec.i = i;
    databisec.xL = xL;
    databisec.xR = xR;
    databisec.xM = xM;
    databisec.err = abcilon.toFixed(10);
    resultdata.push(databisec);

    let graphbisec = { x: i, y: abcilon };
    graphbisec.x = i;
    graphbisec.y = abcilon.toFixed(10);
    graph.push(graphbisec);
    i++;
    if (abcilon < 0.000001) {
      console.log("resultdata is ", resultdata);
      console.log("result: ", xM);
    } else {
      if (fxR * fxM > 0) {
        BisectionMethod(xL, xM, xM);
      } else {
        BisectionMethod(xM, xR, xM);
      }
    }
  };

  if ((fxL > 0 && fxR < 0) || (fxL < 0 && fxR > 0)) {
    xM = (xL + xR) / 2;
    fxM = problem(pb, xM);
    if (fxM * fxR > 0) {
      BisectionMethod(xL, xM, xM);
    } else {
      BisectionMethod(xM, xR, xM);
    }
  }else{
    console.log("pb have error");
  }

  return [
    xM,
    <table>
      <tbody>
        <tr>
          <th>Iteration</th>
          <th>xL</th>
          <th>xR</th>
          <th>xM</th>
          <th>Error</th>
        </tr>
        {resultdata.map((data, index) => {
          return (
            <tr key={index}>
              <td>{data.i}</td>
              <td>{data.xL}</td>
              <td>{data.xR}</td>
              <td>{data.xM}</td>
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
