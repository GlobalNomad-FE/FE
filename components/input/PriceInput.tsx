import { useController } from 'react-hook-form';

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
  labelName?: string;
}

export default function PriceInput({
  name,
  control,
  placeholder,
  labelName,
}: InputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: { value: true, message: '필수 입력 값입니다.' },
      pattern: {
        value: /^[0-9]*$/,
        message: '숫자로 입력해주세요.',
      },
    },
  });

  return (
    <div>
      <label htmlFor={name} className="text-h2 text-black200 ">
        {labelName}
      </label>
      <input
        className="w-full text-nomad-black text-body1-regular border border-gray500 px-4 py-2 h-[56px] rounded mt-4"
        id={name}
        placeholder={placeholder}
        maxLength={100}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        type="number"
      />
      {error && (
        <div className="pl-1 text-body2-regular text-red-500">
          {error?.message}
        </div>
      )}
    </div>
  );
}
