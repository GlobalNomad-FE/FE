import { create, SetState } from 'zustand';

// Zustand 스토어의 타입 정의
interface DateStore {
  date: Date;
  setDate: (newDate: Date) => void;
}

// Zustand 스토어 생성
const useDateStore = create<DateStore>((set: SetState<DateStore>) => ({
  date: new Date(), // 초기값 설정
  setDate: (newDate: Date) => set({ date: newDate }), // date 값을 설정하는 함수
}));

export default useDateStore;
