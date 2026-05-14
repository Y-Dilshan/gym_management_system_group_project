import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

function Register() {
  return (
    <div style={styles.container}>
      {/* LEFT SIDE */}
      <div style={styles.leftSection}>
        <div style={styles.overlay}></div>

        <Link to="/" style={styles.back}>
          ← Back
        </Link>

        <div style={styles.leftContent}>
          {/* Logo */}
          <div style={styles.logoRow}>
            <div style={styles.logoBox}>POWER ZONE</div>
            <h1 style={styles.logoText}>Power Zone</h1>
          </div>

          {/* Text Content */}
          <div style={styles.textContent}>
            <p style={styles.smallText}>Start your journey</p>

            <h2 style={styles.mainHeading}>
              Build the body <br />
              you deserve.
            </h2>

            <p style={styles.description}>
              Join thousands of members who've transformed
              their lives with expert coaching, premium
              equipment, and a community that pushes you further.
            </p>

            {/* Features */}
            <div style={styles.features}>
              <p>• 24/7 access to all facilities</p>
              <p>• Personal training session on signup</p>
              <p>• 100+ weekly group classes</p>
              <p>• Cancel anytime — no lock-in</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightSection}>
        <div style={styles.formContainer}>
          <h1 style={styles.title}>Create your account</h1>

          <p style={styles.signinText}>
            You already have an account?
            <Link to="/login" style={styles.link}>
              {" "}Sign in
            </Link>
          </p>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enter your first name</label>
            <input
              type="text"
              placeholder="Enter your first name"
              autoComplete="off"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enter your last name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              autoComplete="off"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enter your email</label>
            <input
              type="email"
              placeholder="Enter your email"
              autoComplete="off"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enter your mobile number</label>
            <input
              type="text"
              placeholder="Enter your mobile number"
              autoComplete="off"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Enter your password</label>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="new-password"
              style={styles.input}
            />
          </div>

          <button style={styles.button}>
            Start my membership
          </button>

          <p style={styles.orText}>or sign up with</p>

          <button style={styles.googleButton}>
            <FcGoogle size={32} />
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#2f2f2f",
    padding: "35px",
    gap: "20px",
    boxSizing: "border-box",
  },

  /* LEFT SIDE */
  leftSection: {
    flex: 1,
    position: "relative",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1974&auto=format&fit=crop')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "22px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "50px",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  back: {
    position: "absolute",
    top: "28px",
    left: "28px",
    zIndex: 3,
    color: "white",
    textDecoration: "none",
    fontSize: "22px",
    fontWeight: "600",
  },

  leftContent: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "520px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  logoRow: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "50px",
  },

  logoBox: {
    backgroundColor: "#111",
    color: "#E5B93E",
    padding: "14px 12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "14px",
    lineHeight: "1.2",
    textAlign: "center",
  },

  logoText: {
    color: "white",
    fontSize: "56px",
    margin: 0,
    fontWeight: "700",
  },

  textContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  smallText: {
    color: "white",
    fontSize: "34px",
    margin: 0,
    fontWeight: "500",
  },

  mainHeading: {
    color: "#E5B93E",
    fontSize: "68px",
    lineHeight: "1.1",
    margin: 0,
    fontWeight: "700",
  },

  description: {
    color: "white",
    fontSize: "24px",
    lineHeight: "1.6",
    marginTop: "10px",
    maxWidth: "500px",
  },

  features: {
    color: "white",
    fontSize: "22px",
    lineHeight: "2",
    marginTop: "10px",
  },

  /* RIGHT SIDE */
  rightSection: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },

  formContainer: {
    width: "100%",
    maxWidth: "500px",
  },

  title: {
    color: "#E5B93E",
    fontSize: "52px",
    marginBottom: "10px",
    textAlign: "center",
  },

  signinText: {
    color: "white",
    textAlign: "center",
    marginBottom: "40px",
    fontSize: "18px",
  },

  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "600",
  },

  inputGroup: {
    marginBottom: "24px",
  },

  label: {
    display: "block",
    color: "white",
    marginBottom: "10px",
    fontSize: "22px",
    fontWeight: "500",
  },

  input: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "none",
    fontSize: "22px",
    backgroundColor: "#ECECEC",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    width: "100%",
    padding: "18px",
    marginTop: "10px",
    borderRadius: "14px",
    border: "3px solid #D4A017",
    backgroundColor: "#333",
    color: "white",
    fontSize: "28px",
    fontWeight: "700",
    cursor: "pointer",
  },

  orText: {
    color: "white",
    textAlign: "center",
    margin: "30px 0",
    fontSize: "18px",
  },

  googleButton: {
    width: "100%",
    padding: "18px",
    borderRadius: "14px",
    border: "3px solid #D4A017",
    backgroundColor: "#333",
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  },
};

export default Register;
