import React, { forwardRef, useState } from 'react';
import { USER_INPUT_VALIDATION } from '@/utils/user';
import Image from 'next/image';

const { email, password } = USER_INPUT_VALIDATION;

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  type: 'email' | 'password' | 'text';
  isError?: boolean;
  errorMessage?: string;
}

const LoginInput = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, placeholder, name, type, isError, errorMessage, ...props },
    ref,
  ) => {
    const [visibility, setVisibility] = useState(type === 'password');

    const toggleVisibility = () => {
      setVisibility(!visibility);
    };

    return (
      <div className="w-full">
        <label className="block text-base font-normal" htmlFor={name}>
          {label}
        </label>
        <div className="relative">
          <input
            className={`mt-1 block h-14 w-full border px-3 py-2 ${
              isError ? 'border-red-500' : 'border-gray-300'
            } rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500`}
            placeholder={placeholder}
            type={visibility ? type : 'text'}
            name={name}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-3"
              onClick={toggleVisibility}
            >
              <Image
                alt={visibility ? 'Hide Password' : 'Show Password'}
                src={`/icons/btn_visibility_${visibility ? 'off' : 'on'}.svg`}
                width={24}
                height={24}
              />
            </button>
          )}
        </div>
        {isError && (
          <div className="mt-1 text-sm text-red-500">{errorMessage}</div>
        )}
      </div>
    );
  },
);

LoginInput.displayName = 'LoginInput';

export default LoginInput;
