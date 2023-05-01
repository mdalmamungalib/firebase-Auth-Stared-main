import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import app from "../../Hook/firebaseConfig";
import Swal from "sweetalert2";

const ResetPassword = (props) => {
  const [email, setEmail] = useState("");
  const auth = getAuth(app);

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        props.onHide();
        Swal.fire({
          title:
            "Forget password link send to your email, please cake your email and set your new password. Thank You.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Forget your password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-danger">Reset your password</h5>
          <input
            onBlur={(event) => setEmail(event.target.value)}
            className="form-control p-2 m-2 mt-3"
            type="email"
            name="email"
            placeholder="email"
            id=""
          />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleResetPassword}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ResetPassword;
