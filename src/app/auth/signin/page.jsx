import { Suspense } from "react";
import { SignInContent } from "./SignContent";


export default function SigninPage() {
    return (
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
            <SignInContent />
        </Suspense>
    );
}