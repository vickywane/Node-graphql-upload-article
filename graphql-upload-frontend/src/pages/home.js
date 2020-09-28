import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import CreateUser from "./create-user";

import "../App.css";
import { DELETE_ACCOUNT, GET_USER } from "../data";

function App() {
  const [deleteUser] = useMutation(DELETE_ACCOUNT);

  const [getUser, { data, error }] = useLazyQuery(GET_USER);

  // state used to switch between a Guest and a user
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isCreatingAccount, beginCreatingAccount] = useState(false);

  // user data stored in state and passed to GraphQL
  const [userName, setuserName] = useState("");
  const [imgUri, setImgUri] = useState(null);

  // deleteAccount function which deletes the user's account in our Backend Service
  const deleteAnAccount = () => {
    deleteUser()
      .then(() => {
        // resets all stored state
        setLoggedIn(false);
        setImgUri(null);
        setuserName("");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (isLoggedIn && data !== undefined) {
      setImgUri(data.getUser[0].imageuri);
    }
  }, [data]);

  return (
    <div className="App" style={{ height: window.innerHeight - 35 }}>
      <div
        onClick={() => {
          if (!isLoggedIn) {
            beginCreatingAccount(!isCreatingAccount);
          } else if (isLoggedIn) {
            deleteAnAccount();
          }
        }}
        className="auth"
      >
        <p className="auth-text">
          {!isLoggedIn ? (!isCreatingAccount ? "Sign In" : "Cancel") : "Logout"}
        </p>
      </div>

      <div className="content">
        {!isCreatingAccount ? (
          <div>
            <img
              className="user-img"
              src={imgUri ? imgUri : require("../assets/groot.jpg")}
              alt="default user and user"
            />
            <h1>
              Hi There, i am
              {userName.length > 3 ? ` ${userName}` : ` Groot`}.
            </h1>
            <p>
              {!isLoggedIn
                ? "You can sign-in to become you!"
                : "You sign-out to become Groot!"}
            </p>
          </div>
        ) : (
          <CreateUser
            updateProfile={(username) => {
              getUser();
              setLoggedIn(true);
              setuserName(username)
              beginCreatingAccount(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
