import gsap from "gsap";

function Login(props) {
  return (
    <div className="backbody">
      <div className="w-bg"></div>
      <div className="y-bg"></div>
      <div className="l-circle1" id="cc"></div>
      <div className="login-container">
        <span className="title">Log In</span>
        <div className="login-form">
          <div id="loginresponse"></div>
          <div className="login-input">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" />
          </div>
          <div className="login-input">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" />
          </div>
        </div>
        <div className="login-actions">
          <span className="forgot-password">Forgot Password?</span>
          <button
            className="button-default"
            onClick={() => {
              props
                .handleLogin(
                  document.querySelector("#username").value,
                  document.querySelector("#password").value
                )
                .then(() => {
                  let rp = document.querySelector("#loginresponse");
                  gsap.fromTo(
                    rp,
                    1,
                    { opacity: 0, height: 0, margin: 0, color: "black" },
                    {
                      opacity: 1,
                      height: "auto",
                      margin: ".5rem",
                      color: "rgb(184, 45, 110)",
                    }
                  );
                  if (props.loginResponse.error) {
                    rp.innerText = props.loginResponse.details;
                  }
                });
            }}
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
