import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { isAuth, signout } from "./helpers/auth";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

Modal.setAppElement("#root");

const Profile = () => {
  const history = useHistory();
  const [profile, setProfile] = useState({ name: "test", role: "test", email: "test" });
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
    if (isAuth()) {
      setProfile(isAuth());
      // const id = isAuth()._id;

      // axios
      //   .get(`${process.env.REACT_APP_USER_URL}/${id}`, { headers: id })
      //   .then((res) => {
      //     console.log(res.data);
      //     res.data && setProfile(res.data.user);
      //   })
      //   .catch((err) => {
      //     toast.error(err);
      //   });
    }
  }, []);

  /*------------------------------SIGN OUT--------------------------------*/

  const handleSignout = () => {
    signout();
    toast.success("Signing out please wait!");
    setTimeout(() => {
      history.push("/");
    }, 5000);
  };

  return (
    <div className="profileContainer">
      <ToastContainer />
      {isAuth() && (
        <div className="App">
          Welcome back {profile.name}
          <p>{profile.email}</p>
          <h2>Role: {profile.role}</h2>
          <div className="button-group">
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
          </div>
          {/*EMAIL MODAL */}
          <Modal isOpen={emailModalIsOpen} onRequestClose={() => setEmailModalOpen(false)} contentLabel="Example Modal">
            <h2>Update your details</h2>
            <button onClick={() => setEmailModalOpen(false)}>close</button>
            <form onSubmit={updateDetails}>
              <div className="update-input-field">
                <input type="text" placeholder="Enter Email Address" onChange={(e) => setNewEmail1(e.target.value)} />
              </div>
              <div className="update-input-field">
                <input type="text" onChange={(e) => setNewEmail2(e.target.value)} placeholder={"Confirm Email Address"} />
              </div>
              <div className="update-input-field">
                <input type="text" placeholder="Enter Name" onChange={(e) => setNewName(e.target.value)} />
              </div>

              <input type="submit" className="update-btn" value="Update Details" />
            </form>
          </Modal>
          {/*PASSWORD MODAL */}
          <Modal isOpen={passwordModalIsOpen} onRequestClose={() => setPasswordModalOpen(false)} contentLabel="Example Modal">
            <h2>Update your details</h2>
            <button onClick={() => setPasswordModalOpen(false)}>close</button>
            <form onSubmit={handlePasswordUpdate}>
              <div className="update-input-field">
                <input type="text" placeholder="Current password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="update-input-field">
                <input type="text" placeholder="Enter new password" onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              <input type="submit" className="update-btn" value="Update Password" />
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Profile;
