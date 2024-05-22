/**
 * @param {number} wage 시급을 나타내는 숫자
 * @returns {string} "₩ 1,000" 형식으로 반환
 */
export function formatWage(wage: number): string {
  // 숫자를 세 자리마다 쉼표로 구분하여 문자열로 변환
  const formattedWage = wage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // 변환된 문자열에 "₩"을 추가하여 반환
  return `₩ ${formattedWage}`;
}
