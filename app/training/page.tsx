"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/app/components/navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "../../firebase.config";
import {LoginAccessPage} from "@/app/components/loginaccesspage";
import {Training} from "@/app/components/training";


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
            {user?
            <Training/>
            :
            <LoginAccessPage page="training"/>
            }
        </>
    );
}

