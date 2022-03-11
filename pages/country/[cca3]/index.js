import Layout from "../../../components/Layout/Layout";
import Container from "../../../components/Layout/Container";
import LineGraph from "../../../components/Graph/LineGraph";
import { MdSearch } from "react-icons/md";
import LineageChip from "../../../components/UI/LineageChip";
import SubmissionsPerVariant from "../../../components/Country/SubmissionsPerVariant";
import SubmissionsPerAaSubstitution from "../../../components/Country/SubmissionsPerAaSubstitution";
import SubmissionsPerLineage from "../../../components/Country/SubmissionsPerLineage";

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
                    <SubmissionsPerVariant
                        plotData={submissionsPerVariant}
                        countryData={countryData}
                    />
                )}
                {submissionsPerAaSubstitution.length > 0 && (
                    <SubmissionsPerAaSubstitution
                        plotData={submissionsPerAaSubstitution}
                        countryData={countryData}
                    />
                )}
            </Container>
            {submissionsPerLineage.length > 0 && (
                <SubmissionsPerLineage
                    plotData={submissionsPerLineage}
                    countryData={countryData}
                />
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
