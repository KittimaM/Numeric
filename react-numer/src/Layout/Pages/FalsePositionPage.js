import React, {useState ,useRef ,useEffect} from 'react'
import { falsePosition } from '../Module/FalsePositionModule'
import axios from 'axios';

const FalsePositionPage = () => {

  const [result, setResult] = useState([]);
  const [isShow,setIsShow] = useState(false)
  const [fdata,setFdata] = useState([])

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/falseposition/get",{
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
  const inputXL = useRef();
  const inputXR = useRef();


  const submitdata = (event) => {
    event.preventDefault();
    let xLfloat = parseFloat(inputXL.current.value);
    let xRfloat = parseFloat(inputXR.current.value);
    let pbinput = inputPB.current.value;
    setResult(falsePosition(pbinput,xLfloat, xRfloat))
    setIsShow(true)
  };

  return (
    <div>
      <label>False Position</label>
      <form onSubmit={submitdata}>
      <label>Problem is</label>
        <select ref={inputPB}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.pb} value={f.pb}></option>;
          })}
        </select>

        <label>XL is</label>
        <select ref={inputXL}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.xL} value={f.xL}></option>;
          })}
        </select>
        <label>XR is</label>
        <select ref={inputXR}>
          {fdata.map((f, index) => {
            return <option key={index} label={f.xR} value={f.xR}></option>;
          })}
        </select>

        <button type="submit" >Submit</button>
      </form>

      {isShow && <p>result is {result[0]}</p>}
      {isShow && <div>{result[1]}</div>}
      {isShow && <div>{result[2]}</div>}

      
    </div>
  );
}

export default FalsePositionPage