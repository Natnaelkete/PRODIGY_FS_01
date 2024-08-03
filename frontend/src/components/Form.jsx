import "./form.css";
import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function Form() {
  const [animation, setAnimation] = useState(false);

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <Login animation={animation} setAnimation={setAnimation} />
        <Signup animation={animation} setAnimation={setAnimation} />
        <div className={`img-container ${animation && "animate"}`}></div>
      </div>
    </div>
  );
}

export default Form;
