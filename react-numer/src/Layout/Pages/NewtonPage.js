import React, { useState, useRef, useEffect } from "react";
import { nT } from "../Module/NewtonModule";
import axios from "axios";

const Newton = () => {
  const [result, setResult] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [fdata, setFdata] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/newton/get",{
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpdXR5amt1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiQjExMDE4MDExMjc5NDUiLCJpYXQiOjE2NTM2MzI1OTksImV4cCI6MTY4NTE2ODU5OX0.2EL6mUeMSFhfFfqMBBp_ErS0mY8F9phalCT1mE-ahDo`
      }
    });

    setFdata(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const inputPB = useRef();
  const inputX = useRef();

  const submitdata = (event) => {
    event.preventDefault();
    let xfloat = parseFloat(inputX.current.value);
    let pbinput = inputPB.current.value;
    setResult(nT(pbinput, xfloat));
    setIsShow(true);
  };

  return (
    <div>
      <label>Newton</label>
      <form onSubmit={submitdata}>
        <label>Problem is</label>
        <select ref={inputPB}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.pb} value={f.pb}></option>;
          })}
        </select>

        <label>XL is</label>
        <select ref={inputX}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.x} value={f.x}></option>;
          })}
        </select>
        <button type="submit">Submit</button>
      </form>

      {isShow && <p>result is {result[0]}</p>}
      {isShow && <div>{result[1]}</div>}
      {isShow && <div>{result[2]}</div>}
    </div>
  );
};

export default Newton;
