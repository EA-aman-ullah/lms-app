import { APIAuthClient } from "./api-client";

const { post } = new APIAuthClient("/api/users/register");

export default post;
