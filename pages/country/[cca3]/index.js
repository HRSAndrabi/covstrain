import Layout from "../../../components/Layout/Layout";
import Container from "../../../components/Layout/Container";
import AreaGraph from "../../../components/Graph/AreaGraph";
import LineGraph from "../../../components/Graph/LineGraph";
import { MdSearch } from "react-icons/md";
import LineageChip from "../../../components/UI/LineageChip";

const CountryDetail = ({
    countryData,
    submissionsPerVariant,
    submissionsPerAaSubstitution,
    submissionsPerLineage,
    submissionsPerClade,
}) => {
    return (
        <>
            <Container prose={true}>
                <div className="text-slate-800 text-2xl font-semibold">
                    {countryData.name.common} ({countryData.cca3}){" "}
                    {countryData.flag}
                </div>
                <div className="text-slate-400">
                    {countryData.name.official} /{" "}
                    {countryData.translations.fra.official} /{" "}
                    {countryData.translations.jpn?.official
                        ? `${countryData.translations.jpn.official} /`
                        : ""}
                </div>
                {submissionsPerVariant.length > 0 && (
                    <>
                        <h3>SARS-CoV-2 variant sequences</h3>
                        <p>
                            The graph below presents the distribution of
                            SARS-CoV-2 variant sequences over time,
                            disaggregated by variants of concern (VOC), and
                            variants of interest (VOI). Untracked variants are
                            classified under the &apos;Other&apos; category.
                        </p>
                        <div className="mt-3 mb-8">
                            <div className="text-sm font-medium">
                                Figure 1: Distribution of SARS-CoV-2 Variant
                                Sequences in {countryData.name.common}
                            </div>
                            <AreaGraph data={submissionsPerVariant} />
                        </div>
                    </>
                )}
                {submissionsPerAaSubstitution.length > 0 && (
                    <>
                        <h3>SARS-CoV-2 amino acid mutations</h3>
                        <p>
                            As the pandemic progresses, existing strains of
                            SARS-CoV-2 are periodically modified by nucleotide
                            mutations. Some of these result in amino acid
                            replacements in viral proteins, while others extend
                            or shorten amino acid sequence lengths. The graph
                            below presents changes in the observed mix of amino
                            acid sequences in samples of SARS-CoV-2 over time.
                            Tracking, and understanding these changes could help
                            improve antiviral drug and vaccine effectiveness.
                        </p>
                        <div className="mt-3 mb-8">
                            <div className="text-sm font-medium">
                                Figure 2: Distribution of SARS-CoV-2 Amino Acid
                                Mutations in {countryData.name.common}
                            </div>
                            <LineGraph data={submissionsPerAaSubstitution} />
                        </div>
                    </>
                )}
            </Container>
            {submissionsPerLineage.length > 0 && (
                <div className="bg-slate-50 w-full -mt-6">
                    <Container prose={true}>
                        <h3>SARS-CoV-2 Pango lineages</h3>
                        <p>
                            Select one or more SARS-CoV-2 Pango lineages using
                            the tool below to view the prevalence of particular
                            lineages over time.
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
                                <span className="hidden sm:flex">
                                    Reference
                                </span>
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
                                {Object.keys(submissionsPerLineage[0])
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
            )}
            <Container prose={true}>
                {submissionsPerVariant.length === 0 &&
                submissionsPerAaSubstitution.length === 0 ? (
                    <>
                        <h4>No data available</h4>
                        <p>
                            No sequences have been submitted from{" "}
                            {countryData.name.common}.
                        </p>
                    </>
                ) : (
                    <div>
                        <p>
                            <span className="font-medium">Please note: </span>{" "}
                            samples may be subject to bias resulting from:
                            geographical clustering in submission of sequences;
                            demographic clustering in submission of sequences,
                            and/or mutation clustering, arising from prioritised
                            sequencing of samples with particular mutations
                        </p>
                        <h4>Recommended citation</h4>
                        <div className="not-prose bg-slate-100 font-mono text-sm px-3 py-2">
                            Hassan R. S. Andrabi. 2022. &quot;CoVstrain:
                            Sequencing Distributions of SARS-CoV-2 Mutations of
                            Interest.&quot; https://covstrain.com/
                        </div>
                    </div>
                )}
            </Container>
        </>
    );
};

export default CountryDetail;

CountryDetail.getLayout = function getLayout(page) {
    return <Layout title={page.props.countryData.name.common}>{page}</Layout>;
};

export async function getStaticProps(context) {
    const submissionsPerVariant =
        await require(`../../../data/gisaid/${context.params.cca3.toLowerCase()}/submissions_per_variant.json`);
    const submissionsPerAaSubstitution =
        await require(`../../../data/gisaid/${context.params.cca3.toLowerCase()}/submissions_per_aa_substitution.json`);
    const submissionsPerLineage =
        await require(`../../../data/gisaid/${context.params.cca3.toLowerCase()}/submissions_per_lineage.json`);
    const submissionsPerClade =
        await require(`../../../data/gisaid/${context.params.cca3.toLowerCase()}/submissions_per_clade.json`);
    const countryData = await require("../../../data/countries.json").filter(
        (country) => country.cca3.toLowerCase() === context.params.cca3
    )[0];

    return {
        props: {
            countryData: countryData,
            submissionsPerVariant: submissionsPerVariant,
            submissionsPerAaSubstitution: submissionsPerAaSubstitution,
            submissionsPerLineage: submissionsPerLineage,
            submissionsPerClade: submissionsPerClade,
        },
        revalidate: 43200, // re-render this page with new props every 12 hours.
    };
}

export async function getStaticPaths() {
    const paths = await require("../../../data/countries.json").map(
        (country) => {
            return { params: { cca3: country.cca3.toLowerCase() } };
        }
    );

    return { paths, fallback: false };
}
