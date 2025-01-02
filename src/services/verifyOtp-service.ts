import APIClient from "./api-client";

const { post } = new APIClient("/api/users/verify-otp");

export default post;
