import React, { useState, useEffect, useRef } from "react";
import { sC } from "../Module/SecantModule";
import axios from "axios";

const Secant = () => {
  const [result, setResult] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const [fdata, setFdata] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/secant/get",{
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
  const inputX0 = useRef();
  const inputX1 = useRef();
  
  const submitdata = (event) => {
    event.preventDefault();
    let x0float = parseFloat(inputX0.current.value);
    let x1float = parseFloat(inputX1.current.value);
    let pbinput = inputPB.current.value;
    setResult(sC(pbinput, x0float, x1float));
    setIsShow(true);
  };

  return (
    <div>
      <label>Secant</label>
      <form onSubmit={submitdata}>
      <label>Problem is</label>
        <select ref={inputPB}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.pb} value={f.pb}></option>;
          })}
        </select>

        <label>XL is</label>
        <select ref={inputX0}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.x0} value={f.x0}></option>;
          })}
        </select>
        <label>XR is</label>
        <select ref={inputX1}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.x1} value={f.x1}></option>;
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

export default Secant;
