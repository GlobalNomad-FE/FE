import create from 'zustand';

interface modalStore {
  openModal: string;
  setOpenModal: (value: string) => void;
}

const modalStore = create<modalStore>((set) => ({
  openModal: "",
  setOpenModal: (value: string) => set({ openModal: value }),
}));

export default modalStore;
