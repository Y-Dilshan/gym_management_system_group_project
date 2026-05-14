import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>POWER ZONE</div>

        <ul style={styles.navLinks}>
          <li>Home</li>
          <li>About</li>
          <li>Our Services</li>
          <li>Contacts</li>
        </ul>

        <div style={styles.navButtons}>
          <Link to="/signin">
            <button style={styles.signInBtn}>Sign In</button>
          </Link>

          <Link to="/signup">
            <button style={styles.signUpBtn}>Sign Up</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400&auto=format&fit=crop"
          alt="gym"
          style={styles.heroImage}
        />

        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Unleash Your Potential</h1>

          <p style={styles.heroText}>
            Join the ultimate fitness experience designed to build strength,
            improve endurance, and boost your confidence through expert guidance
            and modern training methods.
          </p>

          <button style={styles.getStartedBtn}>Get Started</button>
        </div>
      </section>

      {/* About Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>About Us</h2>

        <div style={styles.aboutContainer}>
          <div style={styles.aboutText}>
            <p>
              Welcome to our fitness gym, where we help people of all levels
              achieve their health and fitness goals with modern equipment,
              expert trainers, and personalized programs.
            </p>

            <br />

            <p>
              We believe fitness is more than just exercise. It’s about
              building confidence, discipline, and a healthier lifestyle.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop"
            alt="about"
            style={styles.aboutImage}
          />
        </div>
      </section>

      {/* Services */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>

        <div style={styles.servicesGrid}>
          <div style={styles.card}>
            <h3>Schedules</h3>
            <p>Flexible workout schedules designed for consistency.</p>
          </div>

          <div style={styles.card}>
            <h3>Trainers</h3>
            <p>Certified trainers who guide and motivate you.</p>
          </div>

          <div style={styles.card}>
            <h3>Supplements</h3>
            <p>High-quality supplements to support performance.</p>
          </div>

          <div style={styles.card}>
            <h3>Diet Plans</h3>
            <p>Customized meal plans for healthy living.</p>
          </div>

          <div style={styles.card}>
            <h3>Personal Training</h3>
            <p>One-on-one training tailored to your goals.</p>
          </div>

          <div style={styles.card}>
            <h3>Modern Equipment</h3>
            <p>State-of-the-art equipment for effective workouts.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Contact Us</h2>

        <div style={styles.contactForm}>
          <input type="text" placeholder="User Name" style={styles.input} />

          <input type="email" placeholder="Email" style={styles.input} />

          <textarea
            placeholder="Message"
            rows="6"
            style={styles.textarea}
          ></textarea>

          <button style={styles.submitBtn}>Submit</button>
        </div>
      </section>

      {/* BMI Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Calculate Your BMI</h2>

        <div style={styles.bmiContainer}>
          <img
            src="https://cdn.prod.website-files.com/5f6b7190899f41fb70882d08/63d2f8f3d8f1e14f2a0c9a65_BMI-chart.jpg"
            alt="BMI Chart"
            style={styles.bmiImage}
          />

          <div style={styles.bmiForm}>
            <h2 style={styles.bmiTitle}>BMI Calculator</h2>

            <div style={styles.bmiInputRow}>
              <label>Age :</label>
              <input type="number" style={styles.bmiInput} />
            </div>

            <div style={styles.bmiInputRow}>
              <label>Height :</label>
              <input type="number" style={styles.bmiInput} />
            </div>

            <div style={styles.bmiInputRow}>
              <label>Weight :</label>
              <input type="number" style={styles.bmiInput} />
            </div>

            <div style={styles.genderRow}>
              <label>
                <input type="radio" name="gender" /> Male
              </label>

              <label>
                <input type="radio" name="gender" /> Female
              </label>
            </div>

            <button style={styles.calculateBtn}>Calculate</button>

            <button style={styles.clearBtn}>Clear</button>

            <div style={styles.resultBox}>
              <h3>Result</h3>
              <p>BMI: --</p>
              <p>Healthy BMI range: 18.5 - 25</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    color: "white",
    fontFamily: "sans-serif",
    background:
      "radial-gradient(circle at top left, rgba(229,185,62,0.25), transparent 30%), radial-gradient(circle at bottom right, rgba(229,185,62,0.15), transparent 25%), #2f2f2f",
    paddingBottom: "100px",
  },

  navbar: {
    width: "90%",
    margin: "0 auto",
    padding: "25px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    color: "#E5B93E",
  },

  navLinks: {
    display: "flex",
    gap: "40px",
    listStyle: "none",
    fontSize: "18px",
  },

  navButtons: {
    display: "flex",
    gap: "15px",
  },

  signInBtn: {
    padding: "10px 25px",
    borderRadius: "10px",
    border: "2px solid #E5B93E",
    background: "transparent",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },

  signUpBtn: {
    padding: "10px 25px",
    borderRadius: "10px",
    border: "none",
    background: "#E5B93E",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  heroSection: {
    width: "90%",
    margin: "0 auto",
    position: "relative",
    borderRadius: "25px",
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "580px",
    objectFit: "cover",
    display: "block",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
  },

  heroContent: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    width: "70%",
  },

  heroTitle: {
    fontSize: "64px",
    color: "#E5B93E",
    marginBottom: "20px",
  },

  heroText: {
    fontSize: "20px",
    lineHeight: "1.8",
    marginBottom: "30px",
  },

  getStartedBtn: {
    padding: "16px 45px",
    borderRadius: "14px",
    border: "none",
    background: "#E5B93E",
    color: "black",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  section: {
    width: "90%",
    margin: "100px auto",
  },

  sectionTitle: {
    textAlign: "center",
    color: "#E5B93E",
    fontSize: "42px",
    marginBottom: "60px",
  },

  aboutContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "60px",
  },

  aboutText: {
    flex: 1,
    fontSize: "20px",
    lineHeight: "1.9",
  },

  aboutImage: {
    width: "500px",
    borderRadius: "20px",
  },

  servicesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
  },

  card: {
    background: "#f4e3ba",
    color: "black",
    padding: "35px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 0 20px rgba(0,0,0,0.25)",
  },

  contactForm: {
    width: "60%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  input: {
    padding: "18px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
  },

  textarea: {
    padding: "18px",
    borderRadius: "12px",
    border: "none",
    fontSize: "16px",
  },

  submitBtn: {
    padding: "16px",
    borderRadius: "12px",
    border: "2px solid #E5B93E",
    background: "transparent",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },

  bmiContainer: {
    width: "85%",
    margin: "0 auto",
    backgroundColor: "#1f1f1f",
    borderRadius: "24px",
    padding: "50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "80px",
    boxSizing: "border-box",
  },

  bmiImage: {
    width: "320px",
    borderRadius: "16px",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },

  bmiForm: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  bmiTitle: {
    color: "#E5B93E",
    fontSize: "38px",
    marginBottom: "10px",
  },

  bmiInputRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "15px",
    color: "white",
    fontSize: "18px",
  },

  bmiInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#ECECEC",
    fontSize: "16px",
  },

  genderRow: {
    display: "flex",
    gap: "40px",
    marginTop: "10px",
  },

  calculateBtn: {
    padding: "14px",
    borderRadius: "12px",
    border: "none",
    background: "#E5B93E",
    color: "#000",
    fontWeight: "700",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },

  clearBtn: {
    padding: "14px",
    borderRadius: "12px",
    border: "2px solid #E5B93E",
    background: "transparent",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
    transition: "0.3s",
  },

  resultBox: {
    marginTop: "20px",
    lineHeight: "1.8",
    fontSize: "18px",
  },
};

export default Home;