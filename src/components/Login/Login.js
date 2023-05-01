import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import app from "../../Hook/firebaseConfig";
import Swal from 'sweetalert2'
import ResetPassword from "../ResetPassword/ResetPassword";
import useFirebase from "../../Hook/useFirebase"

const Login = ({users, setUsers}) => {
  const auth = getAuth(app);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [remaberme, setRemamberme] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const handleGoogleSingIn = useFirebase();

  const handaleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handalePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUsers(user);
        Swal.fire(
          'Good job!',
          'success fully login!',
          'success fully login'
        )
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMassage = error.massage;
        setError(errorMassage);
        console.log(errorCode, errorMassage)
      })
  }
  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/0hLvWvP/undraw-Login-re-4vu2.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <p>{error}</p>
          <div className="input-box">
            <input
              onBlur={handaleEmail}
              className="form-control p-3 m-2"
              type="email"
              placeholder="Email"
            />
            <input
              onBlur={handalePassword}
              className="form-control p-3 m-2"
              type="password"
              placeholder="password"
            />
            <p className="link ">
              <Link to="/registration" className="text-decoration-none">
                <small className="text-danger link">
                  are you new? please register
                </small>
              </Link>
              <span
              onClick={() => setModalShow(true)}
              role="button" className="ms-4 text-primary cursor-pointer">
                Forget Password?
              </span>
            </p>
            <input onClick={() => setRemamberme(!remaberme)} className="p-2" type="checkbox" />{" "}
            <span className="mb-3 ">remember me </span>
            <br />
            <button disabled={remaberme} onClick={handleLogin} className="btn btn-info p-3 w-50 mt-3 fw-bold text-white">
              Login
            </button>
          </div>
          <button onClick={handleGoogleSingIn} className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto">
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p className="fw-bold">Google SignIn</p>
          </button>
        </div>
        <ResetPassword
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </div>
  );
};

export default Login;
