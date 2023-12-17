import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonInput,
  IonButton,
} from "@ionic/react";
import "./LoginForm.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/auth/AuthUserProvider";

const LoginForm: React.FC = () => {
  const auth = useAuth();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input field
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const result = await auth.logIn(email, password);

      if (result !== undefined) {
        const role = await auth.getRole(result.user.uid);

        console.log(result.user.uid);
        alert("Login successful!");

        // Reset state setelah login
        setEmail("");
        setPassword("");

        if (role === "1") {
          console.log("Admin login");
          history.push("/admin/service");
        } else if (role === "2") {
          history.push("/home");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <main className="LoginForm_Container">
      <IonCard className="LoginForm_Wrapper">
        <section className="LoginForm_LeftSideCard">
          <img
            src="./images/Logo-RS-Florest.png"
            alt="logo RS"
            width={120}
            className="LoginForm-LogoPhoto"
          />
          <IonCardTitle className="LoginForm_LeftSideCardTitle">
            RS Florest
          </IonCardTitle>
        </section>

        <section className="LoginForm_RightSideCard">
          <IonCardHeader>
            <IonCardTitle className="LoginForm_RightSideCardTitle">
              Login
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <form onSubmit={handleSubmit} className="LoginForm_InputForm">
              <section>
                <IonInput
                  type="email"
                  label="Email"
                  labelPlacement="floating"
                  fill="outline"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  required
                />
              </section>
              <section>
                <IonInput
                  type="password"
                  label="Password"
                  labelPlacement="floating"
                  fill="outline"
                  value={password}
                  clearOnEdit={false}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  required
                />
              </section>

              <div className="LoginForm_ForgotPwd">
                <a href="#" style={{ textDecoration: "none" }}>
                  Forgot Password?
                </a>
              </div>

              <IonButton
                expand="block"
                className="LoginForm_LoginBtn"
                type="submit"
              >
                Login
              </IonButton>
              <h2 className="LoginForm_Register">
                Don't have an account? <a href="/signUp">Sign Up</a>
              </h2>
            </form>
          </IonCardContent>
        </section>
      </IonCard>
    </main>
  );
};

export default LoginForm;
