import Layout from "../../../components/Layout/Layout";
import Container from "../../../components/Layout/Container";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const CountryDetail = ({ countryData, strainData }) => {
    const vocs = [
        {
            variant: "VOC Alpha GRY (B.1.1.7+Q.*) first detected in the UK",
            color: "#f43f5e",
            bgClass: "rose-500",
            name: "VOC Alpha",
        },
        {
            variant:
                "VOC Beta GH/501Y.V2 (B.1.351+B.1.351.2+B.1.351.3) first detected in South Africa",
            color: "#ec4899",
            bgClass: "pink-500",
            name: "VOC Beta",
        },
        {
            variant: "VOC Delta GK (B.1.617.2+AY.*) first detected in India",
            color: "#d946ef",
            bgClass: "fuchsia-500",
            name: "VOC Delta",
        },
        {
            variant:
                "VOC Gamma GR/501Y.V3 (P.1+P.1.*) first detected in Brazil/Japan",
            color: "#a855f7",
            bgClass: "purple-500",
            name: "VOC Gamma",
        },
        {
            variant:
                "VOC Omicron GRA (B.1.1.529+BA.*) first detected in Botswana/Hong Kong/South Africa",
            color: "#8b5cf6",
            bgClass: "violet-500",
            name: "VOC Omicron",
        },
        {
            variant:
                "VOI Epsilon GH/452R.V1 (B.1.429+B.1.427) first detected in USA/California",
            color: "#6366f1",
            bgClass: "indigo-500",
            name: "VOI Epsilon",
        },
        {
            variant: "VOI Eta G/484K.V3 (B.1.525) first detected in UK/Nigeria",
            color: "#3b82f6",
            bgClass: "blue-500",
            name: "VOI Eta",
        },
        {
            variant:
                "VOI Iota GH/253G.V1 (B.1.526) first detected in USA/New York",
            color: "#0ea5e9",
            bgClass: "light-blue-500",
            name: "VOI Iota",
        },
        {
            variant: "VOI Kappa G/452R.V3 (B.1.617.1) first detected in India",
            color: "#14b8a6",
            bgClass: "teal-500",
            name: "VOI Kappa",
        },
        {
            variant:
                "VOI Lambda GR/452Q.V1 (C.37+C.37.1) first detected in Peru",
            color: "#10b981",
            bgClass: "emerald-500",
            name: "VOI Lambda",
        },
        {
            variant:
                "VOI Theta GR/1092K.V1 (P.3) first detected in the Philippines",
            color: "#eab308",
            bgClass: "yellow-500",
            name: "VOI Theta",
        },
        {
            variant: "VOI Zeta GR/484K.V2 (P.2) first detected in Brazil",
            color: "#ef4444",
            bgClass: "red-500",
            name: "VOI Zeta",
        },
        {
            variant: "Other",
            name: "Other",
            bgClass: "slate-100",
            color: "#e2e8f0",
        },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white px-2 text-xs text-slate-600 rounded-sm font-mono">
                    <table>
                        <thead>
                            <tr>
                                <td>Variant</td>
                                <td className="text-right">Proportion</td>
                            </tr>
                        </thead>
                        <tbody>
                            {payload.map((element, idx) => {
                                return (
                                    <tr
                                        key={idx}
                                        className="odd:bg-white even:bg-slate-100"
                                    >
                                        <td className="flex gap-2">
                                            <div
                                                className="w-3 h-3 rounded-sm self-center ml-2"
                                                style={{
                                                    backgroundColor:
                                                        element.color,
                                                }}
                                            ></div>
                                            <div className="flex-grow">
                                                {element.name}
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            <div className="mr-2">
                                                {Math.round(
                                                    element.value * 100
                                                ) / 100}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }

        return null;
    };

    return (
        <Container>
            <article className="max-w-screen-prose mx-auto prose prose-slate prose-sm sm:prose-base">
                <div className="text-slate-800 text-2xl font-semibold">
                    {countryData.name.common} ({countryData.cca3}){" "}
                    {countryData.flag}
                </div>
                <div className="text-slate-400 mb-5">
                    {countryData.name.official} /{" "}
                    {countryData.translations.fra.official} /{" "}
                    {countryData.translations.jpn.official} /{" "}
                </div>
                <h4>Distribution of submitted SARS-CoV-2 Variant Sequences</h4>
                <p>
                    The graph below presents the distribution of SARS-CoV-2
                    variant sequences over time, disaggregated by variants of
                    concern (VOC), and variants of interest (VOI). 'Other'
                    category comprises untracked variants.
                </p>
                <figure>
                    <div className="text-sm font-medium">
                        Figure 1: Distribution of SARS-CoV-2 Variant Sequences
                        in {countryData.name.common}
                    </div>
                    <div className="w-full h-[12rem] sm:h-[24rem]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={500}
                                height={400}
                                data={strainData["variant_series"]}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    style={{ fontSize: 12 }}
                                    minTickGap={10}
                                />
                                <YAxis
                                    style={{ fontSize: 12 }}
                                    width={35}
                                    domain={[0, 1]}
                                    ticks={[0, 0.25, 0.5, 0.75, 1.0]}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                {vocs.map((element, idx) => {
                                    return (
                                        <Area
                                            type="monotone"
                                            dataKey={element.variant}
                                            stackId="1"
                                            stroke={element.color}
                                            fill={element.color}
                                            name={element.name}
                                            key={idx}
                                        />
                                    );
                                })}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </figure>

                <p>
                    <span className="font-medium">Please note: </span> samples
                    may be subject to bias resulting from: geographical
                    clustering in submission of sequences; demographic
                    clustering in submission of sequences, and/or mutation
                    clustering, arising from prioritised sequencing of samples
                    with particular mutations
                </p>
            </article>
        </Container>
    );
};

export default CountryDetail;

CountryDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export async function getStaticProps(context) {
    const strainData =
        await require(`../../../data/gisaid/${context.params.cca3.toLowerCase()}.json`);
    const countryData = await require("../../../data/countries.json").filter(
        (country) => country.cca3.toLowerCase() === context.params.cca3
    )[0];

    return {
        props: { countryData: countryData, strainData: strainData },
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
