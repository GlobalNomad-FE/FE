import create from 'zustand';

type Store = {
  openModal: string;
  setOpenModal: (value: string) => void;
}

const useModalStore = create<Store>((set) => ({
  openModal: "",
  setOpenModal: (value: string) => set({ openModal: value }),
}));

export default useModalStore;
