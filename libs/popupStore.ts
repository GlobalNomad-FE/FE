import create from 'zustand';

type Store = {
  openPopup: string;
  setOpenPopup: (value: string) => void;
};

const usePopupStore = create<Store>((set) => ({
  openPopup: '',
  setOpenPopup: (value: string) => set({ openPopup: value }),
}));

export default usePopupStore;
