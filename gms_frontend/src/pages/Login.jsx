import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <Link to="/" style={styles.back}>
          ← Back
        </Link>

        <h1 style={styles.title}>Sign in</h1>

        <input
          type="text"
          placeholder="username"
          autoComplete="off"
          style={styles.input}
        />

        <input
          type="password"
          placeholder="password"
          autoComplete="new-password"
          style={styles.input}
        />

        <button style={styles.button}>
          Login
        </button>

        <p style={styles.text}>
          You already haven’t an account?
          <Link to="/register" style={styles.link}>
            {" "}Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100%",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.75)",
    backdropFilter: "blur(4px)",
  },

  card: {
    position: "relative",
    width: "520px",
    backgroundColor: "#2f2f2f",
    borderRadius: "20px",
    padding: "40px 50px",
    zIndex: 2,
    boxShadow: "0 0 40px rgba(0,0,0,0.6)",
  },

  back: {
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: "500",
  },

  title: {
    color: "#E5B93E",
    textAlign: "center",
    fontSize: "64px",
    marginTop: "10px",
    marginBottom: "35px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    padding: "18px 22px",
    marginBottom: "22px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "#ECECEC",
    fontSize: "32px",
    fontWeight: "500",
    outline: "none",
    color: "#555",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "16px",
    marginTop: "8px",
    backgroundColor: "transparent",
    border: "3px solid #D4A017",
    borderRadius: "14px",
    color: "white",
    fontSize: "42px",
    fontWeight: "700",
    cursor: "pointer",
  },

  text: {
    marginTop: "18px",
    textAlign: "left",
    color: "white",
    fontSize: "18px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
    marginLeft: "6px",
  },
};

export default Login;