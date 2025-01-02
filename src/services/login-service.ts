import { APIAuthClient } from "./api-client";

const { post } = new APIAuthClient("/api/auth");

export default post;
