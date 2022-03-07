import Link from "next/link";
import { MdMenu } from "react-icons/md";
import Image from "next/image";

const Header = () => {
    return (
        <div className="w-full px-5 py-3 absolute top-0 left-0 right-0 backdrop-blur-lg z-50">
            <div className="max-w-screen-lg mx-auto flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Link href="/" passHref>
                        <div className="flex gap-2 items-center cursor-pointer">
                            {/* <Image
                                src="/logo.svg"
                                alt="logo"
                                layout="fixed"
                                height="30"
                                width="30"
                            /> */}
                            <div className="text-slate-900 text-2xl">
                                covstrain
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="hidden sm:flex gap-6 items-center">
                    <Link href="/get-started" passHref>
                        <a className="text-slate-600 text-sm hover:text-blue-600">
                            Get started
                        </a>
                    </Link>
                    <Link href="/blog" passHref>
                        <a className="text-slate-600 text-sm hover:text-blue-600">
                            Blog
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
