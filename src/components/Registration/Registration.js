import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { Link } from "react-router-dom";
import app from "../../Hook/firebaseConfig";
import Swal from "sweetalert2";
import useFirebase from "../../Hook/useFirebase";

const Registration = ({ users, setUsers }) => {
  const auth = getAuth(app);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isDesabiled, setIsDesabiled] = useState(true);

  const handleGoogleSingIn = useFirebase();

  const handleName = (event) => {
    console.log(event.target.value);
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    const test = /^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(event.target.value);
    console.log(test);
    if (!test) {
      setError("Please provide a valid email");
      return;
    }
    setEmail(event.target.value);
    setError("");
  };

  const handlePassword = (event) => {
    if (!/(?=.*[!#$%&? "])/.test(event.target.value)) {
      setError("Please giv att spchel character");
      return;
    }

    if (!/(?=.*[a-zA-Z])/.test(event.target.value)) {
      setError("Password should have upper later");
      return;
    }
    if (!/(?=.{8,})/.test(event.target.value)) {
      setError("Password must be 8 character");
      return;
    }
    setError("");
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    if ((name, email, password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUsers(user);
          updateName();
          veryFaiEmail();
          Swal.fire(
            "Good job!",
            "You clicked the button!",
            "success fully Register"
          );
          setError("");

          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          console.log(errorCode, errorMessage);
        });
    }
  };

  const updateName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {})
      .catch((error) => {});
  };

  const veryFaiEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Please very fay your email",
      });
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUsers(user)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  });
  return (
    <div className="mt-5">
      <div className="main-container d-flex container justify-content-between align-items-center">
        <div className="register-image image-fluid w-100  ">
          <img
            className="w-100 img-fluid image-fluid"
            src="https://i.ibb.co/hYJTmVX/undraw-Mobile-login-re-9ntv-1.png"
            alt=""
          />
        </div>
        <div className="register-form  w-100">
          <div className="input-box">
            <p className="text-danger">{error}</p>
            <form action="">
              <input
                onBlur={handleName}
                className="form-control p-3 m-2"
                type="text"
                placeholder="Enter your name"
                required
              />
              <input
                onBlur={handleEmail}
                className="form-control p-3 m-2"
                type="email"
                placeholder="Email"
                required
              />
              <input
                onBlur={handlePassword}
                className="form-control p-3 m-2"
                type="password"
                placeholder="password"
                required
              />
              <p className="link ">
                <Link to="/login" className="text-decoration-none">
                  <small className="text-danger link">
                    already have an account? please login
                  </small>
                </Link>
              </p>
              <input
                onClick={() => setIsDesabiled(!isDesabiled)}
                className="p-2"
                type="checkbox"
              />{" "}
              <span className="mb-3">accept term & condition</span>
              <br />
              <button
                disabled={isDesabiled}
                onClick={handleRegister}
                type="submit"
                className="btn btn-info p-3 w-50 mt-3 fw-bold text-white"
              >
                Register
              </button>
            </form>
          </div>
          <button
            onClick={handleGoogleSingIn}
            className="btn mt-3 border d-flex align-items-center justify-content-evenly p-2 m-auto"
          >
            <img
              className="w-25 image-fluid btn-image"
              src="https://img.icons8.com/color/344/google-logo.png"
              alt=""
            />
            <p className="fw-bold">Google SignIn</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registration;
