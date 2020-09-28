import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useDropzone } from "react-dropzone";

import "../App.css";
import { CREATE_USER, GET_USER } from "../data";

const CreateUser = (props) => {
  const { updateProfile } = props;
  const [createAccount, { loading }] = useMutation(CREATE_USER);

  // user data stored in state and passed to GraphQL
  const [userName, setuserName] = useState("");

  // user's uploaded image kept in sexitate and padded to GraphQL
  const [userImage, setUserImage] = useState(null);

  // create user mutation function fired at the click of `createAccount` button
  const createAUser = () => {
    createAccount({
      variables: {
        username: userName,
        image: userImage,
      },
    })
      .then(() => {
        updateProfile(userName);
      })
      .catch((e) => console.log(e));
  };

  const onDrop = useCallback(([file]) => {
    setUserImage(file);
  }, []);

  const {
    getRootProps,
    isDragActive,
    isDragAccept,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg , image/jpg, image/png",
  });

  return (
    <div className="CreateUser" style={{ height: window.innerHeight - 35 }}>
      <div className="content">
        <div>
          <h1> {!loading ? "Create An Account" : "Creating Account ..."}</h1>
          <hr />
          <br />
          <form className="form">
            <div className="input-body">
              <label style={{ color: loading && "grey" }}> Username </label>
              <input
                disabled={loading}
                style={{ color: loading && "grey" }}
                onChange={(e) => setuserName(e.target.value)}
                placeholder="some nifty name"
                required={true}
                type="text"
              />

              <br />
              <br />

              {!userImage ? (
                <div
                  className="circle-ctn"
                  {...getRootProps({
                    isDragActive,
                    isDragAccept,
                    isDragReject,
                  })}
                >
                  <input {...getInputProps()} />
                  <div
                    className="box"
                    style={{
                      background: isDragActive && "#1b2733",
                    }}
                  >
                    <p
                      style={{ color: isDragReject && "red" }}
                      className="circle-text"
                    >
                      {!isDragActive
                        ? `Tap or Drag 'n' Drop Image  to Add Profile Picture`
                        : isDragReject
                        ? "Ooops upload images only"
                        : "Drop your image here to upload"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="img-illustration">
                  <img
                    style={{ filter: loading && "grayscale(80%)" }}
                    className="img-icon"
                    src={require("../assets/image-icon.png")}
                    alt="image illustration"
                  />

                  <p style={{ color: loading && "grey" }} className="file-name">
                    {userImage.path}
                  </p>
                </div>
              )}

              <br />
              <br />

              <button
                style={{
                  background: userName.length < 3 && "transparent",
                  color: userName.length < 3 && "silver",
                }}
                className="create-acct-btn"
                onClick={(e) => {
                  e.preventDefault();
                  createAUser();
                }}
                disabled={userName.length < 3 || loading}
              >
                {!loading ? "Create Account" : "Creating Account"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
