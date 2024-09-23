import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function EditUser() {
  const dispatch = useDispatch();

  //   Getting the values from the store
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.name.username);
  const firstname = useSelector((state) => state.name.firstname);
  const lastname = useSelector((state) => state.name.lastname);

  const [showForm, setShowForm] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  //   On Change Events
  const handleInputChange = (event) => {
    setNewUsername(event.target.value);
  };

  //   When Submitting the Form
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: newUsername }),
        }
      );

      if (response.ok) {
        dispatch({
          type: "SET_USER",
          payload: {
            username: newUsername,
            firstname: firstname,
            lastname: lastname,
          },
        });
      } else {
        console.log("Could not send the new name");
      }
    } catch (error) {
      console.log("Error:", error);
    }
    setNewUsername("");
    setShowForm(false);
  };

  useEffect(() => {
    setNewUsername(user);
  }, [user]);

  return (
    <>
      <section className="account-header">
        <h1 className="account-header-heading">
          Welcome back <br /> {firstname} {lastname}!
        </h1>

        {!showForm && (
          <button className="transaction-button button" onClick={toggleForm}>
            Edit name
          </button>
        )}
      </section>

      {showForm && (
        <form className="account-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label>First Name:</label>
            <input type="text" value={firstname} disabled />
          </div>
          <div className="input-container">
            <label>Last Name:</label>
            <input type="text" value={lastname} disabled />
          </div>
          <div className="input-container">
            <label>Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" className="transaction-button button">
              Confirm
            </button>
            <button className="transaction-button button" onClick={toggleForm}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default EditUser;
