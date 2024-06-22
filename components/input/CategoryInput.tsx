import SelectBox from '../commons/SelectBox';
import { KeyActivitiesData } from '@/app/activities/register/page';
interface CategoryInputProps {
  value: string;
  handleValue: (id: KeyActivitiesData, value: any) => void;
}

export default function CategoryInput({
  handleValue,
  value,
}: CategoryInputProps) {
  const selectList = [
    { value: '문화 · 예술', label: '문화 · 예술' },
    { value: '식음료', label: '식음료' },
    { value: '스포츠', label: '스포츠' },
    { value: '투어', label: '투어' },
    { value: '관광', label: '관광' },
    { value: '웰빙', label: '웰빙' },
  ];
  const handleOnSelect = (value: any) => {
    handleValue('category', value);
  };

  return (
    <div>
      <SelectBox
        defaultValue={value ? { value: value, label: value } : undefined}
        onSelect={(value) => {
          handleOnSelect(value);
        }}
        options={selectList}
        placeholder="카테고리"
      />
    </div>
  );
}
