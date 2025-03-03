import {Logo} from "@/app/components/logo";
import Link from "next/link";
import {TitleScreenButton} from "@/app/components/titlescreenbutton";
import React from "react";


export const LoginAccessPage = ({page}) => {


    return(
        <>
            <Logo/>
            <h3 className="text-3xl sm:text-2xl md:text-3xl lg:text-3xl font-sans flex justify-center m-16 px-8 sm:px-16 md:px-24 drop-shadow-xl text-center">
                Log in to MAN-DO to access {page} page
            </h3>
            <Link href={"/login"}>
                <TitleScreenButton text={"Click to Login"}/>
            </Link>
        </>
    )
}