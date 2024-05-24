import { create, SetState, StoreApi } from 'zustand';

// Zustand 스토어의 타입 정의
interface DateStore {
  date: Date;
  setDate: (newDate: Date) => void;
}

interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

interface SelectTimeStoreProps {
  selectTime: Schedule | null;
  setSelectTime: (selectTime: Schedule | null) => void;
}

// Zustand 스토어 생성
const useDateStore = create<DateStore>((set: SetState<DateStore>) => ({
  date: new Date(), // 초기값 설정
  setDate: (newDate: Date) => set({ date: newDate }), // date 값을 설정하는 함수
}));

export const useSelectTimeStore = create<SelectTimeStoreProps>(
  (set: StoreApi<SelectTimeStoreProps>['setState']) => ({
    selectTime: null, // 초기값 설정
    setSelectTime: (selectTime: Schedule | null) =>
      set({ selectTime: selectTime }), // 선택한 스케줄시간 데이터값을 설정하는 함수
  }),
);

export default useDateStore;
