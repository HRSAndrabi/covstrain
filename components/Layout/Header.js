import Link from "next/link";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { AiFillGithub } from "react-icons/ai";

const Header = () => {
    return (
        <div className="w-full px-5 py-3 fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
            <div className="max-w-screen-lg mx-auto flex justify-between items-center">
                <div className="flex gap-2 items-center">
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
                        <a className="text-slate-600 text-sm hover:text-blue-600">
                            About
                        </a>
                    </Link>
                    <Link href="/" passHref>
                        <a className="text-slate-600 text-xl hover:text-blue-600">
                            <AiFillGithub />
                        </a>
                    </Link>
                </div>
                <div className="flex sm:hidden">
                    <MdMenu className="text-2xl text-slate-800 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default Header;
