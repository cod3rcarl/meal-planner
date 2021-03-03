import React, { useState, useEffect } from "react";

import { isAuth, signout } from "../helpers/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";
Modal.setAppElement("#root");

const Profile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({});
  const [newName, setNewName] = useState("");
  const [newEmail1, setNewEmail1] = useState("");
  const [newEmail2, setNewEmail2] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [emailModalIsOpen, setEmailModalOpen] = useState(false);
  const [passwordModalIsOpen, setPasswordModalOpen] = useState(false);

  /*------------------------------PASSWORD UPDATE--------------------------------*/

  const handlePasswordUpdate = (e) => {
    const id = isAuth()._id;
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_API_URL}/updatepassword`, {
        id,
        currentPassword: password,
        newPassword: newPassword,
      })
      .then((response) => {
        setPassword("");
        setNewPassword("");
        toast.success(`Password Updated`, { autoClose: 3000 });
        setTimeout(() => {
          setPasswordModalOpen(false);
        }, 3000);
      })
      .catch((err) => {
        setPassword("");
        setNewPassword("");
        toast.error(`There was a problem updating your password ${err.response}`, { autoClose: 3000 });
      });
  };

  /*------------------------------EMAIL UPDATE--------------------------------*/

  const updateDetails = (e) => {
    const id = isAuth()._id;
    e.preventDefault();
    if (newEmail1 === newEmail2) {
      axios
        .put(`${process.env.REACT_APP_API_URL}/updatedetails`, { id, newEmail: newEmail1, newName: newName })
        .then((response) => {
          setNewEmail1("");
          setNewEmail2("");
          setNewName("");
          toast.success(`Success, details will be updated when you next log-in`, { autoClose: 3000 });
          setProfile(isAuth());
          setTimeout(() => {
            setEmailModalOpen(false);
          }, 3000);
        })
        .catch((err) => {
          setNewEmail1("");
          setNewEmail2("");
          setNewName("");
          toast.error(`There was a problem updating your details ${err}`, { autoClose: 3000 });
        });
    } else {
      toast.error("Emails do not match", { autoClose: 3000 });
    }
  };

  /*------------------------------LOAD PROFILE--------------------------------*/

  useEffect(() => {
    isAuth() ? setProfile(isAuth()) : history.push("/login");
  }, [history]);

  /*------------------------------SIGN OUT--------------------------------*/

  const handleSignout = () => {
    signout();
    history.push("/");
  };

  return (
    <main>
      <ToastContainer />
      {isAuth() && (
        <section>
          <h1>{profile.name}</h1>
          <p>{profile.email}</p>
          <br />

          <button className="meal-button" onClick={() => setEmailModalOpen(true)}>
            Update Email
          </button>
          <button className="meal-button" onClick={() => setPasswordModalOpen(true)}>
            Update Password
          </button>
          <button className="meal-button" onClick={() => history.push("/")}>
            Recipe Search
          </button>
          <button className="meal-button" onClick={() => history.push("/mymeals")}>
            My Recipes
          </button>
          <button className="meal-button" onClick={handleSignout}>
            Sign Out
          </button>
          {/*EMAIL MODAL */}
          <Modal className="modal-forms" isOpen={emailModalIsOpen} onRequestClose={() => setEmailModalOpen(false)} contentLabel="Email Modal">
            <div className="button-group">
              {" "}
              <p>
                Update your details
                <span onClick={() => setEmailModalOpen(false)}>X</span>
              </p>
            </div>

            <form onSubmit={updateDetails}>
              <input className="modal-input" type="text" placeholder="Enter Email Address" onChange={(e) => setNewEmail1(e.target.value)} />
              <input className="modal-input" type="text" onChange={(e) => setNewEmail2(e.target.value)} placeholder={"Confirm Email Address"} />
              <input className="modal-input" type="text" placeholder="Enter Name (Optional)" onChange={(e) => setNewName(e.target.value)} />

              <button className="modal-input" type="submit">
                Update Details
              </button>
            </form>
          </Modal>
          {/*PASSWORD MODAL */}
          <Modal className="modal-forms" isOpen={passwordModalIsOpen} onRequestClose={() => setPasswordModalOpen(false)} contentLabel="Example Modal">
            <div className="button-group">
              {" "}
              <p>
                Update your details
                <span onClick={() => setPasswordModalOpen(false)}>X</span>
              </p>
            </div>
            <form onSubmit={handlePasswordUpdate}>
              <input className="modal-input" type="text" placeholder="Current password" onChange={(e) => setPassword(e.target.value)} />

              <input className="modal-input" type="text" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} />
              <button className="modal-input" type="submit">
                Update Password
              </button>
            </form>
          </Modal>
        </section>
      )}
    </main>
  );
};

export default Profile;
