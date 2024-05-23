import './Calender.css';
import NextIcon from '@/public/icons/next.svg';
import PrevIcon from '@/public/icons/prev.svg';

/**
 * 캘린더 커스텀 헤더 컴포넌트 입니다.
 * @param {Object} props.date 캘린더 날짜 값
 * @param {function} props.decreaseMonth 이전 달로 넘어가는 함수
 * @param {function} props.increaseMonth 다음 달로 넘어가는 함수
 */

interface CalendarHeaderProps {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

export default function CalendarHeader({
  date,
  decreaseMonth,
  increaseMonth,
}: CalendarHeaderProps) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthName = monthNames[month];
  return (
    <div className="customHeader">
      <button
        className="button"
        type="button"
        onClick={decreaseMonth}
        aria-label="이전 달"
      >
        <PrevIcon />
      </button>
      <p className="date-text">{`${monthName} ${year}`}</p>
      <button
        className="button"
        type="button"
        onClick={increaseMonth}
        aria-label="다음 달"
      >
        <NextIcon />
      </button>
    </div>
  );
}
