import {
    XYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    LineSeries,
  } from "react-vis";
export const falsePosition = (pb,xL, xR) => {
  const { parser } = require('mathjs');
  const ps = parser()
  let i = 1;
  let resultdata = [];
  let xM;
  let fxL;
  let fxR;
  let abcilon;
  let fxM;

  let graph = [];

  const problem = (pb , xi ) => {
    ps.set('x',xi)
    const eq = ps.evaluate(pb)
    return eq
  };

 fxL = problem(pb,xL);
  fxR = problem(pb,xR);


  const false_position = (xL, xR, oldxM) => {
    xM = (xL * fxR - xR * fxL) / (fxR - fxL);
    fxR = problem(pb, xR);
    fxM = problem(pb,xM);
    abcilon = Math.abs((xM - oldxM) / xM);

    let datafalsePosition = { i: i, xL: xL, xR: xR, err: abcilon, xM: xM };
    datafalsePosition.i = i;
    datafalsePosition.xL = xL;
    datafalsePosition.xR = xR;
    datafalsePosition.xM = xM;
    datafalsePosition.err = abcilon.toFixed(10);
    resultdata.push(datafalsePosition);

    let graphfalsePosition = {x:i ,y:abcilon}
    graphfalsePosition.x = i
    graphfalsePosition.y = abcilon.toFixed(10)
    graph.push(graphfalsePosition)
    i++
    if (abcilon < 0.000001) {
      console.log("abcilon : ", abcilon);
      console.log("result : ", xM);
    } else {
      if (fxM * fxR > 0) {
        false_position(xL, xM, xM);
      } else {
        false_position(xM, xR, xM);
      }
    }
  }

  if ((fxL > 0 && fxR < 0) || (fxL < 0 && fxR > 0)) {
    xM = (xL * fxR - xR * fxL) / (fxR - fxL);
    fxM = problem(pb,xM);
    if (fxM * fxR > 0) {
      false_position(xL, xM, xM);
    } else {
      false_position(xM, xR, xM);
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
    </XYPlot>
  ];
};
