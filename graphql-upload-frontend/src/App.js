import React, { useState, useEffect } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/react-hooks";

const GET_USER = gql`
  query Get_user {
    getUser {
      username
      email
      img_uri
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_USER, {});

  const [isLoggedIn, setLoggedIn] = useState(false);

  const handLogin = () => {};

  if (error) {
    return <p> * Sigh * An error has occured </p>;
  }

  if (loading) {
    return <p> loading data ... </p>;
  }

  if (data) {
    return (
      <div className="App" style={{ height: window.innerHeight - 35 }}>
        <div className="auth">
          <p>{!isLoggedIn ? "Sign In" : "Logout"}</p>
        </div>

        <div className="content">
          <div>
            <img
              className="user-img"
              src={require("./assets/groot.jpg")}
              alt="default user and user"
            />
            <h1> Hi There, i am Groot. </h1>
            <p> You can sign-in to become you. </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
