import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useCallback, useEffect } from "react";

const Header = (props) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const setUser = useCallback(
    (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );
    },
    [dispatch]
  );
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });

    return () => unsubscribe();
  }, [userName, setUser, navigate]); // Include setUser and navigate in the dependency array

  const handleAuth = () => {
    if (!userName) {
      // Attempt to sign in
      signInWithPopup(auth, provider)
        .then((result) => {
          setUser(result.user);
        })
        .catch((error) => {
          // Consider using a more user-friendly way to display errors in production
          alert(error.message);
        });
    } else {
      // Attempt to sign out
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/");
        })
        .catch((error) => {
          // Consider using a more user-friendly way to display errors in production
          alert(error.message);
        });
    }
  };

  // console.log(userPhoto);
  return (
    <Nav>
      <Logo>
        <img src="images/logo.svg" alt="Disney+" />
      </Logo>
      {!userName && <ToGetIn onClick={() => navigate("/home")}>Guest</ToGetIn>}

      {
        // If the user is logged in, display the user's photo and name
        !userName ? (
          <Login onClick={handleAuth}>Login</Login>
        ) : (
          <>
            <NavMenu>
              <a href="/home">
                <img src="/images/home-icon.svg" alt="HOME" />
                <span>HOME</span>
              </a>
              <a href="/search">
                <img src="/images/search-icon.svg" alt="SEARCH" />
                <span>SEARCH</span>
              </a>
              <a href="/watchlist">
                <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
                <span>WATCHLIST</span>
              </a>
              <a href="/original">
                <img src="/images/original-icon.svg" alt="ORIGINALS" />
                <span>ORIGINALS</span>
              </a>
              <a href="/movie">
                <img src="/images/movie-icon.svg" alt="MOVIES" />
                <span>MOVIES</span>
              </a>
              <a href="/series">
                <img src="/images/series-icon.svg" alt="SERIES" />
                <span>SERIES</span>
              </a>
            </NavMenu>

            <SignOut>
              <Userimg src={userPhoto} alt={userName} />
              <DropDown>
                <span onClick={handleAuth}>Sign Out</span>
              </DropDown>
            </SignOut>
          </>
        )
      }
    </Nav>
  );
};
const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  //   width: 70px;

  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  @media (max-width: 700px) {
    // display: none;
    white-space: nowrap; /* Prevent content from wrapping to the next line */
    overflow: auto; /* Enable horizontal scrollbar if content overflows */
//   // }
// `;
const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
  position: relative;
  margin-right: auto;
  margin-left: 25px;
  @media (max-width: 700px) {
    display: none;
    white-space: nowrap; /* Prevent content from wrapping to the next line */
    overflow: auto; /* Enable horizontal scrollbar if content overflows */
  }
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
`;
const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;
const Userimg = styled.img`
  height: 100%;
`;
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 2px;
  width: 100px;
  opacity: 0;
`;
const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${Userimg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const ToGetIn = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
`;

export default Header;
