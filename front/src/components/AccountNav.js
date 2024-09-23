// IMPORTS
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";

import accountLogo from "../assets/account.svg";
import userLogo from "../assets/userLogo.svg";

function AccountNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.name.username);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/v1/user/profile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();

            dispatch({
              // Setting the store with the values from the API call
              type: "SET_USER",
              payload: {
                username: data.body.userName,
                firstname: data.body.firstName,
                lastname: data.body.lastName,
              },
            });
          } else {
            console.log("Could not get the data");
          }
        } catch (error) {
          console.log("Could not get the data");
        }
      };

      fetchData();
    }
  }, [dispatch, token]);

  return (
    <>
      {username ? (
        <div className="cont-user container-user">
          <NavLink className="btn-user " to="/user">
            <div className="user-account-container">
              <img
                src={accountLogo}
                alt="account logo"
                className="account-logo"
              />
              <p>{username}</p>
            </div>
          </NavLink>
          <button className="btn-user log-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="cont-user">
          <NavLink className="btn-user " to="/sign-in">
            <div className="user-account-container">
              <img src={userLogo} alt="account logo" className="account-logo" />
              <p>Sign In</p>
            </div>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default AccountNav;
