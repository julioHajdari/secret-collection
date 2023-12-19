import { useState, useContext } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserFirebase,
} from "../utils/firebase/firebase.component";
import FormInput from "../components/form-input/form-input.component";
import "./signUp.style.scss";
import Button from "../components/button/button-form.component";
import { UserContext } from "../contexts/user.context";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SingUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;

  const { setCurrentUser } = useContext(UserContext);

  //   console.log(formField);

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      await createUserFirebase(user, { displayName });
      resetFormField();
      //   console.log(response);
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
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
      <h2>Don't have an account?</h2>
      <span>Sign up to Secret Collection </span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Full Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
        />
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
        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SingUpForm;
