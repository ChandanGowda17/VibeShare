'use client';
import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc, getFirestore, serverTimestamp } from 'firebase/firestore';
import { toast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance).catch((error: any) => {
    toast({
      variant: "destructive",
      title: "Authentication Error",
      description: error.message || "Failed to sign in anonymously.",
    });
  });
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string, name: string): void {
  createUserWithEmailAndPassword(authInstance, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      
      // 1. Update the Auth profile with the display name
      await updateProfile(user, { displayName: name });

      // 2. Create the UserProfile document in Firestore
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const profileData = {
        id: user.uid,
        username: email.split('@')[0], // Default username from email
        email: email,
        displayName: name, // Added for UI convenience, matches backend.json structure logic
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        followerIds: [],
        followingIds: [],
        bio: "",
        profilePictureUrl: `https://picsum.photos/seed/${user.uid}/200/200`
      };

      setDoc(userRef, profileData, { merge: true }).catch((error) => {
        errorEmitter.emit(
          'permission-error',
          new FirestorePermissionError({
            path: userRef.path,
            operation: 'create',
            requestResourceData: profileData,
          })
        );
      });
    })
    .catch((error: any) => {
      toast({
        variant: "destructive",
        title: "Sign Up Error",
        description: error.message || "Failed to create account.",
      });
    });
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  signInWithEmailAndPassword(authInstance, email, password).catch((error: any) => {
    toast({
      variant: "destructive",
      title: "Sign In Error",
      description: error.message || "Invalid credentials.",
    });
  });
}
