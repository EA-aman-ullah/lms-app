import { APIAuthClient } from "./api-client";

const { post } = new APIAuthClient("/api/users/forget-password");

export default post;
