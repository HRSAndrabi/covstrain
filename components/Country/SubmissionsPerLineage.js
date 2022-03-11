import LineageChip from "../UI/LineageChip";
import Container from "../Layout/Container";
import { MdSearch } from "react-icons/md";

function SubmissionsPerLineage({ plotData, countryData }) {
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
                <div className="w-full flex items-center gap-2 text-sm">
                    <div className="min-w-max font-mono">
                        Selected lineages:
                    </div>
                    <div className="flex gap-2 overflow-x-scroll scroll"></div>
                </div>
                <div className="w-full flex items-center gap-2 text-sm">
                    <div className="min-w-max font-mono">
                        Available lineages:
                    </div>
                    <div className="flex gap-2 overflow-x-scroll scroll">
                        {Object.keys(plotData[0])
                            .filter(
                                (element) =>
                                    ![
                                        "date",
                                        "date_range",
                                        "country",
                                        "submissions",
                                    ].includes(element)
                            )
                            .map((lineage) => {
                                return (
                                    <LineageChip
                                        key={lineage}
                                        lineage={lineage}
                                        disabled={false}
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
