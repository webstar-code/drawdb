import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { setDoc, doc, serverTimestamp, collection, getDoc, where, query, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db, dbCollections } from '../firebase';
import { IUser, IUserProfile } from '../intefaces';
import { IFAILURE_RESPONSE, ISUCCESS_RESPONSE } from '../intefaces/Apiresponse';
import { FAILURE_RESPONSE, SUCCESS_RESPONSE } from './response';

const createNewUser = async (user: IUser) => {
  await setDoc(doc(db, dbCollections.users, user.id), {
    ...user
  }).catch((err) => {
    console.log(err);
  });
  return user;
};

const getUserByEmail = async (email: string) => {
  const docRef = collection(db, dbCollections.users);
  const q = query(docRef, where('email', '==', email.toLowerCase()));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length > 0) {
    return SUCCESS_RESPONSE(querySnapshot.docs[0].data());
  } else {
    return null;
  }
};

const signInWithGoogle = async (): Promise<ISUCCESS_RESPONSE | IFAILURE_RESPONSE> => {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider).catch((error) => {
    return FAILURE_RESPONSE(error.message);
  });
  return SUCCESS_RESPONSE();
};

const addUserProfile = async (id: string, profile: IUserProfile) => {
  const docRef = doc(collection(db, dbCollections.users), id);
  return await updateDoc(docRef, {
    profile,
    updatedAt: new Date()
  })
    .then(() => SUCCESS_RESPONSE(profile))
    .catch((err) => FAILURE_RESPONSE(err));
};

export const userApi = {
  signInWithGoogle,
  createNewUser,
  getUserByEmail,
  addUserProfile
};
