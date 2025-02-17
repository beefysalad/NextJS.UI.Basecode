"use server";

import { API } from "../app/common/constants/api-url";
import { ISignUp } from "../app/common/interfaces/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const signUp = async (userData: ISignUp) => {
  try {
    const res = await fetch(`${API_URL}/${API.AUTH.SIGN_UP}`, {
      body: JSON.stringify(userData),
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
    });
    const data = await res.json();
    const status = res.status;

    return { data, status };
  } catch (error) {
    console.error(error);
  }
};
