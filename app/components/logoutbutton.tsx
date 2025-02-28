
import {getAuth , signOut} from "firebase/auth";
import {app} from "@/firebase.config";
const auth = getAuth(app);

export const LogoutButton = () => {
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log("Użytkownik został wylogowany.");
            })
            .catch((error) => {
                console.error("Błąd podczas wylogowywania:", error);
            });
    };
    return (
        <div className="flex items-center justify-center gap-8">
            <button
                onClick={handleLogout}
                className="bg-slate-800 text-white text-lg px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 hover:bg-slate-700 transition-all duration-300 ease-in-out">
                Logout
            </button>
        </div>
    );
};
