import create, { SetState } from 'zustand';

type Store = {
  openPopup: boolean;
  setOpenPopup: () => void;
};

const usePopupStore = create<Store>((set: SetState<Store>) => ({
  openPopup: false,
  setOpenPopup: () => set((state: Store) => ({ openPopup: !state.openPopup })),
}));

export default usePopupStore;