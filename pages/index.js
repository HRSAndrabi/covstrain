import Layout from "../components/Layout/Layout";
import Container from "../components/Layout/Container";
import { MdSearch } from "react-icons/md";
import CountryChip from "../components/Home/CountryChip";
import { useState, useEffect, useRef } from "react";

export default function Home() {
    const [filter, setFilter] = useState("");
    const searchInput = useRef(null);
    const countries = require("../data/countries.json");

    const searchChangeHandler = (event) => {
        const query = event.target.value;
        setFilter(query.trim().toLowerCase());
    };

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            if ((e.metaKey || e.ctrlKey) && e.code === "KeyK") {
                searchInput.current.focus();
            }
        });
    });

    return (
        <div className="w-full">
            <Container>
                <div className="max-w-3xl mx-auto w-full px-3">
                    <div className="text-slate-900 font-bold text-center text-3xl tracking-tight px-2">
                        An open-source tool to view and analyse{" "}
                        <br className="hidden sm:block" />
                        SARS-CoV-2 mutations of interest around the world
                    </div>
                    <p className="mt-6 text-lg text-slate-600 text-center mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl px-2">
                        <span className="text-sky-500 font-medium font-mono">
                            CoVStrain
                        </span>{" "}
                        uses global genomic sequencing data on{" "}
                        <span className="text-sky-500 font-medium font-mono">
                            SARS-CoV-2
                        </span>{" "}
                        mutations of interest to visualise mutation
                        distributions and life cycles over time, and around the
                        world.
                    </p>
                    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row justify-center gap-6 text-sm items-center">
                        <a
                            className="bg-slate-900 hover:bg-slate-700 focus:outline-none 
                            focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
                            focus:ring-offset-slate-50 text-white font-semibold h-12 
                            px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
                            href="https://www.gisaid.org/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Powered by GISAID
                        </a>
                        <div
                            className="flex items-center sm:max-w-[18rem] w-full text-left space-x-3 px-4 
                            mx-0 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 
                            focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 shadow-sm 
                            rounded-lg text-slate-400"
                        >
                            <MdSearch className="text-2xl text-slate-300 dark:text-slate-400" />
                            <input
                                type="text"
                                name="country"
                                ref={searchInput}
                                className="p-0 m-0 grow bg-white border-none placeholder-slate-400 focus:outline-none focus:border-none focus:ring-0 block sm:text-sm"
                                placeholder="Search a country..."
                                onChange={searchChangeHandler}
                            ></input>
                            <kbd className="font-sans font-semibold">
                                <abbr
                                    title="Command"
                                    className="no-underline text-slate-300"
                                >
                                    ⌘
                                </abbr>{" "}
                                K
                            </kbd>
                        </div>
                    </div>
                </div>
            </Container>
            <div className="w-full bg-slate-50">
                <Container>
                    <div className="w-full">
                        <div className="flex flex-wrap gap-2">
                            {countries
                                .filter((country) =>
                                    country.name.common
                                        .trim()
                                        .toLowerCase()
                                        .includes(filter)
                                )
                                .map((country) => {
                                    return (
                                        <CountryChip
                                            key={country.cca3}
                                            country={country}
                                            disabled={false}
                                        />
                                    );
                                })}
                            {countries
                                .filter(
                                    (country) =>
                                        !country.name.common
                                            .trim()
                                            .toLowerCase()
                                            .includes(filter)
                                )
                                .map((country) => {
                                    return (
                                        <CountryChip
                                            key={country.cca3}
                                            country={country}
                                            disabled={true}
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

Home.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};
