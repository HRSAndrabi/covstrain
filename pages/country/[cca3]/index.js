import Layout from "../../../components/Layout/Layout";
import Container from "../../../components/Layout/Container";
import AreaGraph from "../../../components/Graph/AreaGraph";
import LineGraph from "../../../components/Graph/LineGraph";

const CountryDetail = ({
    countryData,
    submissionsPerVariant,
    submissionsPerAaSubstitution,
    submissionsPerLineage,
    submissionsPerClade,
}) => {
    return (
        <Container>
            <article className="max-w-screen-prose mx-auto prose prose-slate prose-sm sm:prose-base mb-10">
                <div className="text-slate-800 text-2xl font-semibold">
                    {countryData.name.common} ({countryData.cca3}){" "}
                    {countryData.flag}
                </div>
                <div className="text-slate-400 mb-5">
                    {countryData.name.official} /{" "}
                    {countryData.translations.fra.official} /{" "}
                    {countryData.translations.jpn?.official
                        ? `${countryData.translations.jpn.official} /`
                        : ""}
                </div>
                {submissionsPerVariant.length > 0 && (
                    <>
                        <h4>
                            Distribution of submitted SARS-CoV-2 Variant
                            Sequences
                        </h4>
                        <p>
                            The graph below presents the distribution of
                            SARS-CoV-2 variant sequences over time,
                            disaggregated by variants of concern (VOC), and
                            variants of interest (VOI). Untracked variants are
                            classified under the &apos;Other&apos; category.
                        </p>
                        <figure>
                            <div className="text-sm font-medium">
                                Figure 1: Distribution of SARS-CoV-2 Variant
                                Sequences in {countryData.name.common}
                            </div>
                            <AreaGraph data={submissionsPerVariant} />
                        </figure>
                    </>
                )}
                {submissionsPerAaSubstitution.length > 0 && (
                    <>
                        <h4>
                            Distribution of submitted SARS-CoV-2 Amino Acid
                            Mutations
                        </h4>
                        <p>
                            As the pandemic progresses, prevalent strains of
                            SARS-CoV-2 are modified by natural nucleotide
                            mutations. Some of these result in amino acid
                            replacements in viral proteins, while others extend
                            or shorten amino acid sequence lengths. The graph
                            below presents changes in the observed mix of amino
                            acid sequences in samples of SARS-CoV-2 over time.
                            Tracking, and understanding these changes could help
                            improve antiviral drug and vaccine effectiveness.
                        </p>
                        <figure>
                            <div className="text-sm font-medium">
                                Figure 2: Distribution of SARS-CoV-2 Amino Acid
                                Mutations in {countryData.name.common}
                            </div>
                            <LineGraph data={submissionsPerAaSubstitution} />
                        </figure>
                        <p>
                            <span className="font-medium">Please note: </span>{" "}
                            samples may be subject to bias resulting from:
                            geographical clustering in submission of sequences;
                            demographic clustering in submission of sequences,
                            and/or mutation clustering, arising from prioritised
                            sequencing of samples with particular mutations
                        </p>
                    </>
                )}
                {submissionsPerVariant.length === 0 &&
                    submissionsPerAaSubstitution.length === 0 && (
                        <>
                            <h4>No data available</h4>
                            <p>
                                No sequences have been submitted from{" "}
                                {countryData.name.common}.
                            </p>
                        </>
                    )}
            </article>
        </Container>
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
