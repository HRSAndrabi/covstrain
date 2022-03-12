import Link from "next/link";

const Footer = () => {
    const links = [
        {
            title: "Community",
            contents: [
                {
                    title: "Contribute",
                    href: "https://github.com/HRSAndrabi/covstrain/pulls",
                },
                {
                    title: "GitHub",
                    href: "https://github.com/HRSAndrabi/covstrain",
                },
            ],
        },
        {
            title: "Company",
            contents: [
                {
                    title: "Contact",
                    href: "mailto:hassan.andrabi@unimelb.edu.au",
                },
                { title: "About", href: "/about" },
            ],
        },
        {
            title: "Data",
            contents: [
                { title: "FAQ", href: "/faq" },
                { title: "Acknowledgements", href: "/acknowledgements" },
            ],
        },
        {
            title: "Legal",
            contents: [
                {
                    title: "GISAID terms of use",
                    href: "https://www.gisaid.org/registration/terms-of-use/",
                },
                { title: "Privacy Policy", href: "/privacy-policy" },
            ],
        },
    ];

    const timeStamp = require("../../data/gisaid/timeStamp.json").timeStamp;

    return (
        <div className="bg-slate-100 flex flex-col px-5 md:px-10 text-sm text-slate-600 border-t border-t-slate-100">
            <div className="max-w-screen-lg mx-auto w-full">
                <div className="sm:hidden flex flex-col gap-5 py-10">
                    {links.map((category, categoryIdx) => {
                        return (
                            <details key={categoryIdx}>
                                <summary className="list-none pb-2 border-b border-stone-200 text-slate-900 font-semibold cursor-pointer flex justify-between">
                                    {category.title} <span>+</span>
                                </summary>
                                <ul className="list-none flex flex-col gap-2 mt-2">
                                    {category.contents.map((link, linkIdx) => {
                                        return (
                                            <li key={linkIdx}>
                                                <Link href={link.href} passhref>
                                                    <a>{link.title}</a>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </details>
                        );
                    })}
                </div>
                <div className="hidden sm:flex justify-between flex-row gap-20 py-10">
                    {links.map((category, categoryIdx) => {
                        return (
                            <div key={categoryIdx}>
                                <ul className="list-none flex flex-col gap-2">
                                    <li className="text-slate-900 font-semibold pb-2">
                                        {category.title}
                                    </li>
                                    {category.contents.map((link, linkIdx) => {
                                        return (
                                            <li key={linkIdx}>
                                                <Link href={link.href} passhref>
                                                    <a>{link.title}</a>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-between pb-3 text-xs">
                    <div>Copyright © covstrain</div>
                    <div>Last updated: {timeStamp}</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
