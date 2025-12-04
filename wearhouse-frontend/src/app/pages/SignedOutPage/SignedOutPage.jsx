import { SignIn, SignInButton, SignUp } from "@clerk/nextjs";
import './SignedOutPage.css';
export default function SignedOutPage(){
    return (
        <div className="signed-out">
            <SignUp></SignUp>
        </div>
    )
}