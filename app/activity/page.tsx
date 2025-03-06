"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/app/components/navbar";
import {Activity} from "@/app/components/activity";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from "../../firebase.config";
import {LoginAccessPage} from "@/app/components/loginaccesspage";


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
            <Activity/>
            :
            <LoginAccessPage page={"activity"}/>
            }
        </>
    );
}

