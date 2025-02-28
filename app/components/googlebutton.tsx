// GoogleButton.tsx
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../../firebase.config";
import {Chrome} from "lucide-react";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const GoogleButton = () => {
    const loginWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, provider);
            console.log("Zalogowany użytkownik:", res.user);
        } catch (error) {
            console.error("Błąd logowania:", error);
        }
    };

    return (
        <div className="flex items-center justify-center gap-8">
            <button
                onClick={loginWithGoogle}
                className="bg-slate-800 text-white text-lg px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transform hover:scale-105 hover:bg-slate-700 transition-all duration-300 ease-in-out">
                Login with Google <Chrome size={20} />
            </button>
        </div>
    );

};
