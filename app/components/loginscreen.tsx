import {GoogleButton} from "@/app/components/googlebutton";
import {GithubButton} from "@/app/components/githubbutton";


export const LoginScreen = () => {

    return(
        <>
            <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-sans flex justify-center m-16 px-8 sm:px-16 md:px-24 drop-shadow-xl text-center">
                Log in to MAN-DO
            </h3>
            <div className="flex space-x-4 justify-center">
                <GoogleButton/>
                <GithubButton/>
            </div>
        </>
    )
}