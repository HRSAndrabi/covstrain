import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const LineGraph = ({ data }) => {
    const colors = require("./colors.json");

    if (!data.length) {
        return <div>No data available.</div>;
    }

    return (
        <div className="w-full h-[12rem] sm:h-[24rem]">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={400}
                    data={data}
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
                        dataKey={"date"}
                    />
                    <YAxis
                        style={{ fontSize: 12 }}
                        width={35}
                        domain={[
                            (min) => {
                                if (isFinite(min)) {
                                    return min - Math.abs(0.1 * min);
                                } else {
                                    return 0;
                                }
                            },
                            (max) => {
                                if (isFinite(max)) {
                                    return max + Math.abs(0.1 * max);
                                } else {
                                    return 1;
                                }
                            },
                        ]}
                        ticks={[0, 0.25, 0.5, 0.75, 1.0]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    {Object.keys(data[0])
                        .reverse()
                        .filter(
                            (element) =>
                                element !== "submissions" &&
                                element !== "date" &&
                                element !== "country" &&
                                element !== "fortnight"
                        )
                        .map((element, idx) => {
                            const color =
                                idx > colors.length - 1
                                    ? colors[idx % (colors.length - 1)].hex
                                    : element === "Other"
                                    ? colors[colors.length - 1].hex
                                    : colors[idx].hex;
                            return (
                                <Line
                                    type="monotone"
                                    dataKey={element}
                                    stroke={color}
                                    name={data[0][element]}
                                    key={idx}
                                />
                            );
                        })}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default LineGraph;
