"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, User } from "lucide-react";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <nav className="bg-slate-800 h-16 px-6">
                <div className="flex justify-between items-center h-full">
                    <Link href="/" className="text-white text-2xl font-lexend whitespace-nowrap">
                        MAN-DO
                    </Link>

                    {/* Large Screens */}
                    <div className="hidden md:flex w-full justify-center">
                        <div className="flex gap-40">
                            <Link className="text-white text-lg hover:text-gray-400" href="/activity">Activity</Link>
                            <Link className="text-white text-lg hover:text-gray-400" href="/training">Training</Link>
                        </div>
                    </div>

                    {/* User icon visible only on larger screens */}
                    <div className="hidden md:block">
                        <Link className="text-white text-xl hover:text-gray-400" href="/login">
                            <User size={28} />
                        </Link>
                    </div>

                    {/* Hamburger Button */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Small Screens */}
                {isOpen && (
                    <div className="md:hidden flex flex-col gap-4 bg-slate-800 p-4 rounded-lg mt-2">
                        <Link className="text-white text-lg" href="/activity" onClick={() => setIsOpen(false)}>
                            Activity
                        </Link>
                        <Link className="text-white text-lg" href="/training" onClick={() => setIsOpen(false)}>
                            Training
                        </Link>
                        <Link className="text-white text-lg" href="/login" onClick={() => setIsOpen(false)}>
                            Login
                        </Link>
                    </div>
                )}
            </nav>
        </>
    );
};
