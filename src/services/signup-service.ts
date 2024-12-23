import { SingUp } from "../entites/Signup";
import { APIAuthClient } from "./api-client";

const { post } = new APIAuthClient<SingUp | FormData>("/api/users");

export default post;
