import Layout from "../../../components/Layout/Layout";
import Container from "../../../components/Layout/Container";

const CountryDetail = ({ countryData }) => {
    return (
        <Container>
            <div className="text-slate-800 text-2xl text-medium">
                {countryData.name.common} ({countryData.cca3}){" "}
                {countryData.flag}
            </div>
            <div className="text-sm text-slate-400">
                {countryData.name.official} /{" "}
                {countryData.translations.fra.official} /{" "}
                {countryData.translations.jpn.official} /{" "}
            </div>
        </Container>
    );
};

export default CountryDetail;

CountryDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
    // const strainData = await getCovidStrain(context.params.cca3);
    const countryData = require("../../countries.json").filter(
        (country) => country.cca3.toLowerCase() === context.params.cca3
    )[0];

    return {
        props: { countryData: countryData },
        revalidate: 43200, // re-render this page with new props every 12 hours.
    };
}

export async function getStaticPaths() {
    const paths = await require("../../countries.json").map((country) => {
        return { params: { cca3: country.cca3.toLowerCase() } };
    });

    return { paths, fallback: false };
}
