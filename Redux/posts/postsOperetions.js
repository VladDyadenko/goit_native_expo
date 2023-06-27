import {
  addDoc,
  collection,
  getDocs,
  query,
  getCountFromServer,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { toastError } from "../../toastInfo/error";
import { postsAction } from "./postsSlice";
import { format } from "date-fns";

export const getAllPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;

    const posts = await getDocs(collection(db, "posts"));
    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updatePosts(payload));
  } catch (error) {
    toastError(error);
  }
};

export const getOwnPosts = () => async (dispatch, getState) => {
  try {
    const { userId } = getState().auth;
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const posts = await getDocs(q);

    const newPosts = posts.docs.map(async (doc) => {
      const snapshotComments = await getCountFromServer(
        collection(doc.ref, "comments")
      );
      const countComments = snapshotComments.data().count;

      const snapshotLikes = await getCountFromServer(
        collection(doc.ref, "likes")
      );
      const countLikes = snapshotLikes.data().count;

      const q = query(
        collection(doc.ref, "likes"),
        where("authorId", "==", userId)
      );
      const likes = await getDocs(q);

      return {
        ...doc.data(),
        id: doc.id,
        countComments,
        countLikes,
        isLiked: !likes.empty,
      };
    });

    const payload = await Promise.all(newPosts);

    dispatch(postsAction.updateOwnPosts(payload));
  } catch (error) {
    toastError(error);
  }
};

export const uploadPostToServer = (post) => async (dispatch, getState) => {
  const { userId } = getState().auth;

  try {
    await addDoc(collection(db, "posts"), {
      ...post,
      userId,
    });

    dispatch(getAllPosts());
    dispatch(getOwnPosts());
  } catch (error) {
    toastError(error);
    console.log(error);
  }
};

export const addCommentByPostID =
  (postId, commentData) => async (dispatch, getState) => {
    try {
      const { nickname, userId, userAvatar } = getState().auth;
      const data = format(new Date(), "dd MMMM yyyy | HH : mm");
      const comment = {
        comment: commentData,
        autorName: nickname,
        authorId: userId,
        date: data,
        postId: postId,
        userAvatar: userAvatar,
      };

      const docRef = doc(db, "posts", postId);

      await addDoc(collection(docRef, "comments"), { ...comment });

      dispatch(getAllCommentsByPostId(postId));
    } catch (error) {
      toastError(error);
    }
  };

export const getAllCommentsByPostId = (postId) => async (dispatch) => {
  try {
    const docRef = doc(db, "posts", postId);

    const comments = await getDocs(collection(docRef, "comments"));

    const payload = comments.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      dateForSort: doc.data().date,
    }));

    dispatch(postsAction.updateCommentsToPost(payload));
  } catch (error) {
    toastError(error);
  }
};
