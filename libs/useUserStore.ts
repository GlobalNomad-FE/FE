// src/store/useUserStore.ts
import create from 'zustand';
import { Dispatch, SetStateAction } from 'react';

interface UserState {
  uploadedImage: string | null;
  setUploadedImage: Dispatch<SetStateAction<string | null>>;
}

const useUserStore = create<UserState>((set) => ({
  uploadedImage: null,
  setUploadedImage: (image) =>
    set({
      uploadedImage:
        typeof image === 'function'
          ? (image as (prev: string | null) => string | null)(null)
          : image,
    }),
}));

export default useUserStore;
