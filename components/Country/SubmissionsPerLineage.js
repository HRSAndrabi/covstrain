import LineageChip from "../UI/LineageChip";
import Container from "../Layout/Container";
import { MdSearch } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import AreaGraph from "../Graph/AreaGraph";

export default function SubmissionsPerLineage({ plotData, countryData }) {
    const [selectedLineages, setSelectedLineages] = useState(
        Object.keys(plotData[0]).includes("BA.5", "BA.1", "BA.2")
            ? ["BA.5", "BA.1", "BA.2"]
            : Object.keys(plotData[0])[0]
    );
    const [filter, setFilter] = useState("");
    const [selectedPlotData, setSelectedPlotData] = useState([{}]);
    const [tooManyLineages, setTooManyLineages] = useState(false);
    const searchTopRef = useRef(null);
    const colors = require("../Graph/colors.json");

    const selectLineageHandler = (event) => {
        if (selectedLineages.length < 10) {
            setTooManyLineages(false);
            const newSelectedLineages = selectedLineages.slice();
            newSelectedLineages.unshift(event.target.innerText);
            setSelectedLineages(newSelectedLineages);
        } else {
            setTooManyLineages(true);
        }
    };

    const removeLineageHandler = (event) => {
        setSelectedLineages(
            selectedLineages.filter(
                (element) => element !== event.target.innerText
            )
        );
        setTooManyLineages(false);
    };

    const searchChangeHandler = (event) => {
        const query = event.target.value;
        setFilter(query.trim().toUpperCase());
        searchTopRef.current.scrollIntoView({
            behaviour: "smooth",
            block: "center",
        });
    };

    useEffect(() => {
        const newPlotData = plotData
            .map((element) => {
                return Object.keys(element)
                    .filter((key) =>
                        [
                            ...selectedLineages,
                            "date",
                            "date_range",
                            "country",
                            "submissions",
                        ].includes(key)
                    )
                    .reduce((obj, key) => {
                        obj[key] = element[key];
                        return obj;
                    }, {});
            })
            .map((element) => {
                const sumProp = Object.keys(element)
                    .filter((key) => [...selectedLineages].includes(key))
                    .reduce(
                        (sum, key) => sum + parseFloat(element[key] || 0),
                        0
                    );
                return {
                    Other: 1 - sumProp,
                    ...element,
                };
            });
        setSelectedPlotData(newPlotData);
    }, [selectedLineages]);

    return (
        <div className="bg-slate-50 w-full -mt-6">
            <Container prose={true}>
                <h3>SARS-CoV-2 lineages</h3>
                <p>
                    Select one or more SARS-CoV-2{" "}
                    <a
                        href="https://en.wikipedia.org/wiki/Phylogenetic_Assignment_of_Named_Global_Outbreak_Lineages"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Pango
                    </a>{" "}
                    lineages using the tool below to view their prevalence over
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
                            placeholder="Search a Pango lineage..."
                            onChange={searchChangeHandler}
                        ></input>
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
                <div className="w-full flex flex-col items-start gap-2 text-sm min-h-[3.2rem] mb-5">
                    <div className="min-w-[10.5rem] font-mono">
                        Available lineages (scroll to view more):
                    </div>
                    <div className="flex flex-wrap gap-2 overflow-x-scroll scroll p-1 max-h-56 overflow-y-scroll bg-scroll relative">
                        <div ref={searchTopRef} className="absolute"></div>
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
                <div className="w-full flex flex-col gap-2 text-sm min-h-[3.2rem] mb-5">
                    <div className="min-w-[10.5rem] font-mono">
                        Selected lineages:
                    </div>
                    {tooManyLineages && (
                        <div className="text-red-600 text-xs">
                            Maximum of 10 lineages can be selected at a time.
                            Remove a lineage before selecting another.
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2 overflow-x-scroll scroll p-1">
                        {Object.keys(selectedPlotData[0])
                            .reverse()
                            .filter(
                                (element) =>
                                    ![
                                        "date",
                                        "date_range",
                                        "country",
                                        "submissions",
                                        "Other",
                                    ].includes(element)
                            )
                            .map((lineage, idx) => {
                                return (
                                    <LineageChip
                                        key={lineage}
                                        lineage={lineage}
                                        disabled={false}
                                        onClick={removeLineageHandler}
                                        bgColor={colors[idx].hex}
                                    >
                                        {lineage}
                                    </LineageChip>
                                );
                            })}
                    </div>
                </div>

                <div className="mb-10">
                    <AreaGraph
                        data={selectedPlotData}
                        disableAnimation={true}
                    />
                </div>
            </Container>
        </div>
    );
}
