import React,{useState}  from "react";
import {
    groupByDateFormat,
    formatChartDate,
    formatChartNumber,
    aggregateDataByGroup
} from "../../util/Util";
import {Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";
import {ChartControls} from "./ChartControls";
import {ChartTitle} from "./ChartTitle";

export const BarChartCard = ({title, data, dataKey, latestRecord, filterToday,
                                 allowGrouping, loading = null, isCurrency,suffix = null,
                                 yTickFormatter = null, labelFormatter = null, yAxisDomain = null,
                                  isShared = false, onShareClick = null, defaultInterval = "D"}) => {
    const [interval, setInterval] = useState(defaultInterval);
    const [focusBar, setFocusBar] = useState(null);
    const [focusData, setFocusData] = useState(null);

    if (filterToday && data)
    {
        data = data.filter((record) => {
            return !moment.utc(new Date(Number(record.d))).isSame(moment.utc(new Date()), "date");
        })
    }

    data = data && data.filter((record) => {
        return record[dataKey] != null;
    });

    if(data) {
        data = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < data.length; i++)
        {
            data[i][dataKey] = Number(data[i][dataKey]);
        }
    }

    if(allowGrouping) {
        if (interval === "W") {
            let dataGroups = groupByDateFormat(data, 'YYYY-W');
            data = aggregateDataByGroup(dataGroups, dataKey, (keyParts) => {
                return moment().year(Number(keyParts[0])).week(Number(keyParts[1])).day('monday').toDate().getTime();
            });
        } else if (interval === "M") {
            let dataGroups = groupByDateFormat(data, 'YYYY-M');
            data = aggregateDataByGroup(dataGroups, dataKey, (keyParts) => {
                return moment().year(Number(keyParts[0])).month(Number(keyParts[1]) - 1).date(1).toDate().getTime();
            });
        }
    }

    function formatAxisDate(value) {
        return formatChartDate(value, interval);
    }

    return (
        <>
            <div className="card card-chart">
                <ChartControls isShared={isShared} data={data} title={title} interval={interval} allowGrouping={allowGrouping} onShareClick={onShareClick} setInterval={setInterval}/>
                <ChartTitle isCurrency={isCurrency} data={data} focusData={focusData} interval={interval} latestRecord={latestRecord} labelFormatter={labelFormatter} suffix={suffix} />

                <div className="card-body p-0 pb-2">
                    <div className="w-100 chart">
                        <ResponsiveContainer height='100%' width='100%'>
                            {!data && <div className="loading-background" style={{width:"200px", height:"100px"}}><h4 className="mb-0">&nbsp;</h4></div>}
                            {data && <BarChart data={data}
                                onMouseMove={(state) => {
                                    if (state.isTooltipActive && state.activePayload && state.activePayload[0]) {
                                        setFocusBar(state.activeTooltipIndex);
                                        setFocusData({d: state.activeLabel, value: state.activePayload[0].value});
                                    } else {
                                        setFocusBar(null);
                                        setFocusData(null);
                                    }
                                }}
                                onMouseLeave={() => {
                                    setFocusBar(null);
                                    setFocusData(null);
                                }
                            }>
                                <Bar isAnimationActive={!isShared} dataKey={dataKey} fill="#468abc" radius={[5, 5, 0, 0]}>
                                    {data && data.map((entry, index) => (
                                        <Cell key={"cellKey"+index}
                                            fill={focusBar === index ? "#71b1df" : "#468abc"}
                                        />
                                    ))}
                                </Bar>
                                <Tooltip cursor={{fill: "transparent" }}/>
                                <XAxis dataKey="d" axisLine={false} dy={10} tickLine={false} tickFormatter={formatAxisDate} />
                                <YAxis orientation='right' type="number" dx={15} axisLine={false} tickLine={false} tickFormatter={yTickFormatter ? yTickFormatter : formatChartNumber} domain={yAxisDomain ? yAxisDomain : ['auto', 'auto']}/>
                            </BarChart>}
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
}