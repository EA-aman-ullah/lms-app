import { APIAuthClient } from "./api-client";

const { post } = new APIAuthClient("/api/users/save-password");

export default post;
