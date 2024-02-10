import React,{useState}  from "react";
import {
    formatNumber, getViewport
} from "../../util/Util";
import {
    PieChart,
    Cell,
    Pie,
    ResponsiveContainer,
    Tooltip, Sector
} from "recharts";
import {ChartControls} from "./ChartControls";
import {ChartTitle} from "./ChartTitle";

export const PieChartCard = ({title, data, latestRecord,
                                 allowGrouping, loading = null, isCurrency,suffix = null,
                                 labelFormatter = null,
                                  isShared = false, onShareClick = null, defaultInterval = "D"}) => {
    // eslint-disable-next-line no-unused-vars
    const [interval, setInterval] = useState(defaultInterval);
    const [focusData, setFocusData] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const COLORS = ['#468abc', '#468abc', '#468abc'];

    const renderActiveShape = (props) => {
        const { cx, cy, innerRadius, outerRadius, startAngle, endAngle} = props;

        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={"#71b1df"}
                />
            </g>
        );
    };

    const renderLabel = (props) => {
        const { cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            value,
            index} = props;

        const RADIAN = Math.PI / 180;
        // eslint-disable-next-line
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        // eslint-disable-next-line
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        // eslint-disable-next-line
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        let newX = x > cx ? x + 15 : x - 10;
        if(getViewport() === "xs")
            newX = x > cx ? x + 15 : x;

        return (
            <g>
                <text
                    x={newX }
                    y={y}
                    fontSize={getViewport() === "sm" ? 12 : 14}
                    fill="#cfd4da"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                >
                    {data[index].name} ({`${(percent * 100).toFixed(0)}%`})
                </text>
                <text
                    x={newX}
                    y={y+20}
                    fill="#666666"
                    fontSize="12"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                >
                    {formatNumber(value,3)} PDEX
                </text>
            </g>
        );
    };

    return (
        <>
            <div className="card card-chart">
                <ChartControls isShared={isShared} data={data} title={title} interval={interval} allowGrouping={allowGrouping} onShareClick={onShareClick} setInterval={setInterval}/>
                <ChartTitle isCurrency={false} data={data} focusData={focusData} interval={"PIE"} latestRecord={latestRecord} labelFormatter={labelFormatter} suffix={"PDEX"} />

                <div className="card-body p-0 pb-2">
                    <div className="w-100 chart chart-pie">
                        <ResponsiveContainer height='100%' width='100%'>
                            {!data && <div className="loading-background" style={{width:"200px", height:"100px"}}><h4 className="mb-0">&nbsp;</h4></div>}
                            {data && <PieChart
                                layout="vertical"
                                data={data}
                                margin={{ left: 50, right: 50 }}
                                stackOffset="expand"
                                onMouseLeave={() => {
                                    setFocusData(null);
                                }}
                            >
                                <Pie
                                    stroke="none"
                                    data={data}
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    isAnimationActive={!isShared}
                                    animationDuration={750}
                                    animationBegin={0}
                                    cx={"50%"}
                                    cy={115}
                                    innerRadius={getViewport() === "xs" ? 25 : 50}
                                    outerRadius={getViewport() === "xs" ? 35 : 80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    onMouseEnter={(d, index) => {
                                        setActiveIndex(index);
                                        let fd = data[index];
                                        fd.d = fd.name;
                                        setFocusData(fd);
                                    }}
                                    onMouseLeave={(data, index) => {
                                        setActiveIndex(null);
                                        setFocusData(null);
                                    }}
                                    label={renderLabel}
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>}
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}