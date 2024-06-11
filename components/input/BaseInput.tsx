import { useController } from 'react-hook-form';

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
}

export default function BaseInput({ name, control, placeholder }: InputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: { value: true, message: '필수 입력 값입니다.' },
      pattern: {
        value: /^[A-Za-z가-힣\s]+$/,
        message: '문자열로 입력해주세요.',
      },
    },
  });

  return (
    <div>
      <input
        className="w-full text-nomad-black text-body1-regular border border-gray500 px-4 py-2 h-[56px] rounded"
        id="input"
        placeholder={placeholder}
        maxLength={100}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        type="text"
      />
      {error && (
        <div className="pl-1 text-body2-regular text-red-500">
          {error?.message}
        </div>
      )}
    </div>
  );
}
