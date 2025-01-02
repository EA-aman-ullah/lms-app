import APIClient from "./api-client";

const { getById } = new APIClient("/api/users/resend-otp");

export default getById;
