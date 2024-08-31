import { Suspense } from "react";

const AuthLayOut = ({ children }: { children: React.ReactNode}) => {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                {children}
            </Suspense>
        </div>
     );
}
 
export default AuthLayOut;