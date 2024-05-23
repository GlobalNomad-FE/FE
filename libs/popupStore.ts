import create from 'zustand';

type Store = {
  openModalIfTextExists: string;
  setOpenModalIfTextExists: (value: string) => void;
};

const usePopupStore = create<Store>((set) => ({
  openModalIfTextExists: '',
  setOpenModalIfTextExists: (value: string) => set({ openModalIfTextExists: value }),
}));

export default usePopupStore;
