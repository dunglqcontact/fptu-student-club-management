import { authActions } from "../Slicer/AuthSlicer";
import { errorActions } from "../Slicer/ErrorSlicer";

// firebase
import { auth } from "../../Constants/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const signUp = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.toggleLoading());
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(authActions.toggleLoading());
      dispatch(
        authActions.signInHandler({
          token: userCredential.user.accessToken,
        })
      );
    } catch (err) {
      console.log(err.code);
      console.log(err.message);
      dispatch(authActions.toggleLoading());
    }
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(authActions.toggleLoading());
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(authActions.toggleLoading());
      dispatch(errorActions.turnOffError());

      dispatch(
        authActions.signInHandler({
          token: userCredential.user.accessToken,
        })
      );
    } catch (err) {
      console.log(err.code);
      dispatch(errorActions.turnOffError());

      if (err.code === "auth/wrong-password") {
        const message = "Wrong password!";
        dispatch(errorActions.passwordErrorHandler(message));
      }
      if (err.code === "auth/user-not-found") {
        const message = "This account does not exist, please sign up!";
        dispatch(errorActions.emailErrorHandler(message));
      }
      dispatch(authActions.toggleLoading());
    }
  };
};

export const signInWithGoogle = () => {
  return async (dispatch) => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(errorActions.turnOffError());

      const firebaseToken = result.user.accessToken;
      //console.log(result.user.accessToken);

      //const credential = GoogleAuthProvider.credentialFromResult(result);
      const backendResponse = await getTokenFromBackend(firebaseToken);

      // when user not existed in the system then register
      if (backendResponse === null) {
        dispatch(authActions.registerHandler({ firebaseToken }));
      } else {
        const userData = await getUserInfo(
          backendResponse.jwtToken,
          backendResponse.id
        );
        const clubId = await getManagerClubID(
          backendResponse.jwtToken,
          backendResponse.id
        );
        console.log(backendResponse.jwtToken);
        dispatch(
          authActions.signInHandler({
            token: backendResponse.jwtToken,
            userData: userData.data[0],
          })
        );

        dispatch(authActions.clubIdHandler({ clubId: clubId }));

        dispatch(
          authActions.isAdminHandler({ isAdmin: userData.data[0].isAdmin })
        );
      }
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };
};

export const signOutWeb = () => {
  return async (dispatch) => {
    try {
      const response = await signOut(auth);
      console.log(response);
      dispatch(authActions.signOutHandler());
    } catch (error) {
      console.log(error);
    }
  };
};

export const registerToBackend = (firebaseToken, userData) => {
  return async (dispatch) => {
    try {
      //------------------  REGISTER TO BACKEND  ------------------//
      let url = new URL(
        "https://club-management-service.azurewebsites.net/api/v1/auths/sign-up"
      );
      url.search = new URLSearchParams({
        IdToken: firebaseToken,
        username: userData.name,
        universityId: userData.universityId,
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //-----------------------------------------------------------//

      if (response.ok) {
        const responseData = await response.json();
        const userId = responseData.id;
        const email = responseData.email;
        const jwtToken = responseData.jwtToken;

        const updateResult = await updateUserInfo(jwtToken, {
          id: userId,
          email: email,
          password: "",
          status: 1,
          ...userData,
        });

        if (updateResult) {
          const userDataResponse = await getUserInfo(jwtToken, userId);
          dispatch(
            authActions.signInHandler({
              token: jwtToken,
              userData: userDataResponse.data[0],
            })
          );
        }
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };
};

const getTokenFromBackend = async (firebaseToken) => {
  try {
    const response = await fetch(
      "https://club-management-service.azurewebsites.net/api/v1/auths/sign-in?IdToken=" +
        firebaseToken,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      return response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (token, userId) => {
  try {
    const response = await fetch(
      "https://club-management-service.azurewebsites.net/api/v1/users?id=" +
        userId,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

const updateUserInfo = async (token, userData) => {
  try {
    const response = await fetch(
      "https://club-management-service.azurewebsites.net/api/v1/users",
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getManagerClubID = async (token, userId) => {
  try {
    const response = await fetch(
      `https://club-management-service.azurewebsites.net/api/v1/members?userId=${userId}&roleId=1`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data.data[0].clubId;
    }
  } catch (error) {
    console.log(error.message);
  }
};
