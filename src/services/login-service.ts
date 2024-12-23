import { Login } from "../entites/Login";
import { APIAuthClient } from "./api-client";

const { post } = new APIAuthClient<Login>("/api/auth");

export default post;
