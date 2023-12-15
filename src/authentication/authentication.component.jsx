import SingUpForm from "../sign-up-form/signUp.component";
import SingInForm from "../sign-in-form/signIn.component";
import "./authentication.style.scss";

const Authentication = () => {
  // const logUsersWithGoogle = async () => {
  //   const response = await singInWithGooglePopup();
  // };

  return (
    <div className="authentication-container">
      <SingInForm />
      <SingUpForm />
    </div>
  );
};

export default Authentication;
