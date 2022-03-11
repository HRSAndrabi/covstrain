import LineageChip from "../UI/LineageChip";
import Container from "../Layout/Container";
import { MdSearch } from "react-icons/md";
import { useState } from "react";

function SubmissionsPerLineage({ plotData, countryData }) {
    const [selectedLineages, setSelectedLineages] = useState([]);
    const [filter, setFilter] = useState("");

    const selectLineageHandler = (event) => {
        setSelectedLineages([...selectedLineages, event.target.innerText]);
    };

    const removeLineageHandler = (event) => {
        setSelectedLineages(
            selectedLineages.filter(
                (element) => element !== event.target.innerText
            )
        );
    };

    const searchChangeHandler = (event) => {
        const query = event.target.value;
        setFilter(query.trim().toUpperCase());
    };

    return (
        <div className="bg-slate-50 w-full -mt-6">
            <Container prose={true}>
                <h3>SARS-CoV-2 Pango lineages</h3>
                <p>
                    Select one or more SARS-CoV-2 Pango lineages using the tool
                    below to view the prevalence of particular lineages over
                    time.
                </p>
                <div className="mt-4 mb-10 flex flex-col sm:flex-row justify-center gap-6 text-sm items-center">
                    <div
                        className="flex items-center w-full text-left space-x-3 px-4 
                            mx-0 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 
                            focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 shadow-sm 
                            rounded-lg text-slate-400"
                    >
                        <MdSearch className="text-2xl text-slate-300 dark:text-slate-400" />
                        <input
                            type="text"
                            name="country"
                            className="p-0 m-0 bg-white border-none grow placeholder-slate-400 focus:outline-none focus:border-none focus:ring-0 block sm:text-sm"
                            placeholder="Search a lineage..."
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
                    <a
                        className="bg-slate-900 hover:bg-slate-700 focus:outline-none 
                            focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 
                            focus:ring-offset-slate-50 text-white font-semibold h-12 
                            px-6 rounded-lg w-full flex items-center justify-center sm:w-auto no-underline"
                        href="https://cov-lineages.org/lineage_list.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <span className="flex sm:hidden">
                            Lineage reference
                        </span>
                        <span className="hidden sm:flex">Reference</span>
                    </a>
                </div>
                <div className="w-full flex flex-col gap-2 text-sm min-h-[3.2rem] mb-5">
                    <div className="min-w-[10.5rem] font-mono">
                        Selected lineages (max 8):
                    </div>
                    <div className="flex flex-wrap gap-2 overflow-x-scroll scroll p-1">
                        {selectedLineages.map((lineage) => {
                            return (
                                <LineageChip
                                    key={lineage}
                                    lineage={lineage}
                                    disabled={false}
                                    onClick={removeLineageHandler}
                                >
                                    {lineage}
                                </LineageChip>
                            );
                        })}
                    </div>
                </div>
                <div className="w-full flex flex-col items-start gap-2 text-sm min-h-[3.2rem]">
                    <div className="min-w-[10.5rem] font-mono">
                        Available lineages:
                    </div>
                    <div className="flex flex-wrap gap-2 overflow-x-scroll scroll p-1 max-h-52 overflow-y-scroll bg-scroll">
                        {Object.keys(plotData[0])
                            .filter(
                                (element) =>
                                    ![
                                        ...selectedLineages,
                                        "date",
                                        "date_range",
                                        "country",
                                        "submissions",
                                    ].includes(element) &&
                                    element.includes(filter)
                            )
                            .map((lineage) => {
                                return (
                                    <LineageChip
                                        key={lineage}
                                        lineage={lineage}
                                        disabled={false}
                                        onClick={selectLineageHandler}
                                    >
                                        {lineage}
                                    </LineageChip>
                                );
                            })}
                        {Object.keys(plotData[0])
                            .filter(
                                (element) =>
                                    ![
                                        ...selectedLineages,
                                        "date",
                                        "date_range",
                                        "country",
                                        "submissions",
                                    ].includes(element) &&
                                    !element.includes(filter)
                            )
                            .map((lineage) => {
                                return (
                                    <LineageChip
                                        key={lineage}
                                        lineage={lineage}
                                        disabled={true}
                                        onClick={selectLineageHandler}
                                    >
                                        {lineage}
                                    </LineageChip>
                                );
                            })}
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default SubmissionsPerLineage;
