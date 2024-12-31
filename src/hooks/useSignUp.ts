import axios from "axios";
import post from "../services/signup-service";
import useInputsData from "../hooks/useInputsData";
import { useNavigate } from "react-router-dom";

interface Person {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone: string;
}
interface Data extends Omit<Person, "confirmPassword"> {}

const useSignUp = () => {
  const { inputData, isValid, handleInputData, setValid } =
    useInputsData<Person>();
  let navigate = useNavigate();
  //   const [selectedImage, setSelectedImage] = useState<File | null>();

  //   const formData = new FormData();

  //   formData.append("image", selectedImage as Blob);
  //   formData.append("email", inputData.email);
  //   formData.append("password", inputData.password);
  //   formData.append("phone", inputData.phone);
  //   formData.append("name", inputData.name);

  const getToken = async () => {
    try {
      let data: Data = {
        name: inputData.name,
        email: inputData.email,
        phone: inputData.phone,
        password: inputData.password,
      };

      const user = await post(data);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        navigate("/dashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { response } = error;
        console.log("Axios Error Response:", response);
      } else {
        console.log("Non-Axios Error:", error);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      /^[a-zA-Z ]{3,}$/.test(inputData.name) &&
      inputData.phone?.length > 9 &&
      /^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)(?=.*[@#$%^&*]+).{8,16}$/.test(
        inputData.password
      ) &&
      inputData.confirmPassword === inputData.password &&
      /^([^@\s]+)[@]((?:[-a-z0-9]+\.)+[a-z]{2,})$/i.test(inputData.email)
    ) {
      getToken();
      setValid(true);
    } else {
      setValid(false);
    }
  };
  return {
    inputData,
    isValid,
    // selectedImage,
    handleInputData,
    handleSubmit,
    // setSelectedImage,
  };
};

export default useSignUp;
