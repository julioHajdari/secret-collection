import { useState, useEffect } from "react";
import {
  auth,
  createUserFirebase,
  singInWithGoogleRedirect,
  signInAuthUserWithEmailAndPassword,
} from "../utils/firebase/firebase.component";
import { getRedirectResult } from "firebase/auth";
import FormInput from "../components/form-input/form-input.component";
import "./signIn.style.scss";
import Button from "../components/button/button-form.component";

const defaultFormField = {
  email: "",
  password: "",
};

const SingInForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { email, password } = formField;

  //   console.log(formField);

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  useEffect(() => {
    const singInWithGoogle = async () => {
      const response = await getRedirectResult(auth);

      if (response) {
        const userDocRef = await createUserFirebase(response.user);
      }
    };
    singInWithGoogle().catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormField();
      //   console.log(response);
    } catch (e) {
      switch (e.code) {
        case "auth/invalid-credential":
          alert("Password or Email Incorrect");
          break;
        default:
          console.log(e);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormField({ ...formField, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in to Secret Collection </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType="google"
            onClick={singInWithGoogleRedirect}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SingInForm;
