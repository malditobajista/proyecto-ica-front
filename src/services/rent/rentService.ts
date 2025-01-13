import { Rent } from "../../utils/types";
import { logoutUser } from "../users/userService";

const BASE_URL = "http://localhost:3000";

export const createRent = async (rentData: Rent) => {
    try {
        const res = await fetch(`${BASE_URL}/rent/create`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rentData),
        });
        if (res.status === 401) {
            await logoutUser();
            window.location.href = "/login";
        }
        return res.json();
    } catch  {
        throw new Error("Error creating rent");
    }
    }
