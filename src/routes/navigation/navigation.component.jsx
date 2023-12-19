import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as FingerprintLogo } from "../../assets/fingerprint.svg";
import "./navigation.style.scss";
import { UserContext } from "../../contexts/user.context";
import { singOutUser } from "../../utils/firebase/firebase.component";

const Navigation = () => {
  // console.log("render");
  const { currentUser, setCurrentUser } = useContext(UserContext);
  // console.log(currentUser);
  const signOutHandler = async () => {
    await singOutUser();
    setCurrentUser(null);
  };

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <FingerprintLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            shop
          </Link>
          {currentUser ? (
            <span className="nav-link" onClick={signOutHandler}>
              Sign Out
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
