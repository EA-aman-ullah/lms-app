import { useState } from "react";

const useInputsData = <T>() => {
  const [data, setdata] = useState<T>({} as T);
  const [isValid, setValid] = useState(true);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };

  return { data, handleData, isValid, setValid };
};

export default useInputsData;
