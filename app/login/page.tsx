"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/app/components/navbar";
import { Logo } from  "@/app/components/logo"
import {LoginScreen} from "@/app/components/loginscreen";
import {LogoutScreen} from "@/app/components/logoutscreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "../../firebase.config";



const auth = getAuth(app);

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log(currentUser)
        });
        return () => unsubscribe();
    }, []);


    return (
        <>
            <Navbar/>
            <Logo/>
            {user ?
                <LogoutScreen/>
                :
                <LoginScreen/>
            }

        </>
    );
}

