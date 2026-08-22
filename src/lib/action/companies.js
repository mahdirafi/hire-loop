import { getUserSession } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getRecruiterId = async (recruiterId) => {
    const res = await fetch(`${baseUrl}/api/my/companies?recruiterId=${recruiterId}`);
    return res.json();
}