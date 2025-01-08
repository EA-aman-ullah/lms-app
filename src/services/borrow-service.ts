import APIClient from "./api-client";
import httpService from "./http-service";

export default new httpService(new APIClient("/api/borrows"));
