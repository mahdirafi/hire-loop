// lib/core/session.js
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";

export const getUserSession = async () => {
    try {
        
        const session = await auth.api.getSession({
            headers: await headers()
        });

        if (!session?.user) return null;

     
        return {
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            emailVerified: session.user.emailVerified,
            role: session.user.role || 'seeker',
            plan: session.user.plan || 'seeker_free',
            createdAt: session.user.createdAt,
            updatedAt: session.user.updatedAt,
        };
    } catch (error) {
        console.error('Session fetch error:', error);
        return null;
    }
};


// import { auth } from "../auth";
// import { headers } from "next/headers";

// export const getUserSession = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   return session?.user || null;
// };