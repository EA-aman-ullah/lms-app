import { useState } from "react";

const useInputsData = <T>() => {
  const [inputData, setdata] = useState<T>({} as T);
  const [isValid, setValid] = useState(true);

  const handleInputData = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setdata({ ...inputData, [name]: value });
  };

  return { inputData, handleInputData, isValid, setValid };
};

export default useInputsData;
