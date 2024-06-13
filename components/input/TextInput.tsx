import { useController } from 'react-hook-form';

interface InputProps {
  error?: string;
  name: string;
  control: any;
  placeholder: string;
}

export default function TextInput({ name, control, placeholder }: InputProps) {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: { value: true, message: '필수 입력 값입니다.' },
    },
  });

  return (
    <div>
      <textarea
        className="w-full text-nomad-black text-body1-regular border border-gray500 px-4 py-2 h-[345px] rounded scrollbar-hide resize-none"
        id="textarea"
        placeholder={placeholder}
        onBlur={field.onBlur}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        maxLength={1000}
      />
      {error && (
        <div className="pl-1 text-body2-regular text-red-500">
          {error?.message}
        </div>
      )}
    </div>
  );
}
