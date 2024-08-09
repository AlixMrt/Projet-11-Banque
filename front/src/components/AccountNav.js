// IMPORTS
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";

function AccountNav() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.name.username);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
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
        <div className="cont-user">
          <button className="btn-user" onClick={handleLogout}>
            Logout
          </button>
          <NavLink className="btn-user" to="/user">
            <i className="fas fa-user-circle"></i>
            <p>{username}</p>
          </NavLink>
        </div>
      ) : (
        <div className="cont-user">
          <NavLink className="btn-user" to="/sign-in">
            <p>Sign In</p>
          </NavLink>
        </div>
      )}
    </>
  );
}

export default AccountNav;
