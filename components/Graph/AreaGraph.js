import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import CustomTooltip from "./CustomTooltip";

const AreaGraph = ({ data }) => {
    const colors = require("./colors.json");

    if (!data.length) {
        return <div>No data available.</div>;
    }
    return (
        <div className="w-full h-[12rem] sm:h-[24rem]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
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
                        domain={[0, 1]}
                        ticks={[0, 0.25, 0.5, 0.75, 1.0]}
                    />
                    <Tooltip
                        content={<CustomTooltip />}
                        itemSorter={(item) => item.value}
                    />
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
                            return (
                                <Area
                                    type="monotone"
                                    dataKey={element}
                                    stackId="1"
                                    stroke={null}
                                    fill={
                                        colors[colors.length - 1].name ===
                                        element
                                            ? colors[colors.length - 1].hex
                                            : colors[idx].hex
                                    }
                                    name={data[0][element]}
                                    key={idx}
                                />
                            );
                        })}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AreaGraph;
