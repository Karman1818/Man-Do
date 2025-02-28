import Link from "next/link";
import {LogoutButton} from "@/app/components/logoutbutton";
import {TitleScreenButton} from "@/app/components/titlescreenbutton";

export const LogoutScreen = () => {
    return (
        <>
            <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-sans flex justify-center m-16 px-8 sm:px-16 md:px-24 drop-shadow-xl text-center">
                You are already logged in, what do you want to do?
            </h3>
            <div className="flex space-x-4 justify-center">
                <LogoutButton/>
                <Link href="/">
                    <TitleScreenButton text="Go to home page"/>
                </Link>
            </div>
        </>
    )
        ;
};
