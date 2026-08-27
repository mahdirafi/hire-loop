import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getJobs = async () =>{
    return serverFetch('/api/jobs');
}

export const getJobById = async (jobId) => {
    return serverFetch(`/api/jobs/${jobId}`);
}

export const getCompanyJobs = async (companyId, status = 'active') => {
    const res = await fetch(`${baseUrl}/api/jobs?companyId=${companyId}&status=${status}`);
    return res.json();
}
// lib/api/jobs.js
// export async function getCompanyJobs(companyId) {
//     try {
//         const response = await fetch(`/api/jobs?companyId=${companyId}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching company jobs:', error);
//         return [];
//     }
// }