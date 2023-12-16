import {
  IonButton,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonCard,
} from "@ionic/react";
import { useState } from "react";
import { useAuth } from "../../firebase/auth/AuthUserProvider";
import { useIonRouter } from "@ionic/react";

import "./SignUpForm.css";

const SignUpForm: React.FC = () => {
  const auth = useAuth();
  const ionRouter = useIonRouter();
  const [createName, setCreateName] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await auth.signUp(createName, createEmail, createPassword);
      if (result !== undefined) {
        alert("Account created successfully!");
        ionRouter.push("/login");
      }
    } catch (error) {
      console.error("Sign up error:", error);
      alert(
        "Account creation failed. Please check your information and try again."
      );
    }
  };

  return (
    <main className="Signup-Container">
      <IonCard className="Signup-Wrapper">
        <IonCardHeader>
          <IonCardTitle className="Signup-Title">Sign Up</IonCardTitle>
        </IonCardHeader>

        <form className="Signup-Content" onSubmit={handleSubmit}>
          <IonInput
            type="text"
            label="Name"
            labelPlacement="floating"
            fill="outline"
            value={createName}
            onIonChange={(e) => setCreateName(e.detail.value!)}
          />

          <IonInput
            type="email"
            label="Email"
            labelPlacement="floating"
            fill="outline"
            value={createEmail}
            onIonChange={(e) => setCreateEmail(e.detail.value!)}
          />

          <IonInput
            type="password"
            clearOnEdit={false}
            label="Password"
            labelPlacement="floating"
            fill="outline"
            value={createPassword}
            onIonChange={(e) => setCreatePassword(e.detail.value!)}
          />

          <IonButton type="submit">Sign Up</IonButton>

          <h5 className="Signup-Login">
            Already have an account? <a href="/login">Login </a>
          </h5>
        </form>
      </IonCard>
    </main>
  );
};

export default SignUpForm;
