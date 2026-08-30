// lib/core/session.js
import { auth } from "@/lib/auth"; 
import { headers } from "next/headers";
import { redirect } from "next/navigation";



export const getUserToken = async() =>{
    const session = await auth.api.getSession({
        headers: await headers()
    });

    return session?.session?.token || null;
}

export const getUserSession = async () => {
    try {
        
        const session = await auth.api.getSession({
            headers: await headers()
        });

        console.log("session", session);

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

export const requireRole = async(role) =>{
    const user = await getUserSession()
    if(!user){
        redirect('/auth/signin')
    }
    if(user?.role !== role){
        redirect('/unauthorized')
    }
    return user;
}


// import { auth } from "../auth";
// import { headers } from "next/headers";

// export const getUserSession = async () => {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   return session?.user || null;
// };