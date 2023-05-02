import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { toastError } from "../../toastInfo/error";
import { authSlice } from "./authSlice";

export const authUpdateAvatar = (photoURL) => async (dispatch) => {
  try {
    await updateProfile(auth.currentUser, {
      photoURL,
    });
    const userSuccess = auth.currentUser;
    dispatch(
      authSlice.actions.updateUserAvatar({
        userAvatar: userSuccess.photoURL,
      })
    );
  } catch (error) {
    toastError(error);
  }
};

export const authRegister =
  ({ email, password, nickname }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });
      const user = auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          nickname: user.displayName,
          userEmail: user.email,
        })
      );
      dispatch(authSlice.actions.authCurrentUser(true));
    } catch (error) {
      toastError(error);
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.user.uid,
          nickname: user.user.displayName,
          userEmail: user?.user?.email,
          userAvatar: user?.user?.photoURL,
        })
      );
      dispatch(authSlice.actions.authCurrentUser(true));
    } catch (error) {
      toastError(error);
    }
  };

export const authLogOut = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogOut());
  } catch (error) {
    toastError(error);
  }
};
export const authCurrentUser = () => async (dispatch) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickname: user.displayName,
            userEmail: user?.email,
          })
        );
        dispatch(authSlice.actions.authCurrentUser(true));
      }
    });
  } catch (error) {
    toastError(error);
  }
};
