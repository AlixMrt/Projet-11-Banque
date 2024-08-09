import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();

  //  Checks if Token already exists
  const token = useSelector((state) => state.auth.token);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // OnChange Events set new states
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // When submitting the form
  const handleSignIn = (event) => {
    event.preventDefault();
    const userData = {
      email: username,
      password: password,
    };

    fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.status !== 200) {
          setError(true);
          return;
        } else {
          // Stores the token
          dispatch({
            type: "LOGIN",
            payload: {
              token: data.body.token,
            },
          });
          navigate("/user");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);

  return (
    <main>
      <section className="sign-in">
        <i className="fa fa-user-circle sign-in-icon"></i>

        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Email</label>
            <input
              className={error ? "error-border" : ""}
              type="email"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>

          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              className={error ? "error-border" : ""}
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          {error && (
            <p className="error-message">Wrong user name or password</p>
          )}

          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in__button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;
