import Link from "next/link";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";

const Header = () => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setMobileNavOpen(!mobileNavOpen);
    };

    const closeMobileNav = () => {
        setMobileNavOpen(false);
    };

    return (
        <>
            <div
                className={`w-full px-5 py-3 fixed top-0 left-0 right-0 backdrop-blur-md z-50
                transition ease-in-out duration-150 ${
                    mobileNavOpen ? "bg-white" : "bg-white/80 "
                }`}
            >
                <div className="max-w-screen-lg mx-auto flex justify-between items-center">
                    <div
                        className="flex gap-2 items-center"
                        onClick={closeMobileNav}
                    >
                        <Link href="/" passHref>
                            <div className="flex gap-2 items-center cursor-pointer">
                                <Image
                                    src="/logo.svg"
                                    alt="logo"
                                    layout="fixed"
                                    height="30"
                                    width="30"
                                />
                                <div className="text-slate-800 text-xl font-medium">
                                    covstrain
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden sm:flex gap-6 items-center">
                        <Link href="/about" passHref>
                            <a className="text-slate-600 text-sm hover:text-sky-500">
                                About
                            </a>
                        </Link>
                        <a
                            href="https://github.com/HRSAndrabi/covstrain"
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-600 text-xl hover:text-sky-500"
                        >
                            <AiFillGithub />
                        </a>
                    </div>
                    <div className="flex sm:hidden">
                        <MdMenu
                            className="text-2xl text-slate-800 cursor-pointer"
                            onClick={toggleMobileNav}
                        />
                    </div>
                    <div
                        className={`absolute top-full left-0 right-0 bg-white px-5 overflow-hidden 
                    transition-all ease-in-out duration-150 sm:hidden ${
                        mobileNavOpen ? "max-h-max py-2 pb-5" : "max-h-0"
                    }`}
                    >
                        <div className="max-w-screen-lg w-full mx-auto flex flex-col justify-between items-center">
                            <Link href="/about" passHref>
                                <a
                                    className="text-slate-600 hover:text-sky-500 py-1"
                                    onClick={closeMobileNav}
                                >
                                    About
                                </a>
                            </Link>
                            <a
                                href="https://github.com/HRSAndrabi/covstrain"
                                target="_blank"
                                rel="noreferrer"
                                className="text-slate-600 hover:text-sky-500 py-1"
                                onClick={closeMobileNav}
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className={`fixed bg-black/50 h-screen overflow-hidden sm:hidden
            w-screen z-40 ${mobileNavOpen ? "" : "hidden"}`}
                onClick={closeMobileNav}
            ></div>
        </>
    );
};

export default Header;
