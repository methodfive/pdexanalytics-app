import React,{useState}  from "react";
import {
    groupByDateFormat,
    formatChartDate,
    formatChartNumber,
    aggregateDataByGroup, formatNumber, formatChartDateLabel
} from "../../util/Util";
import {Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";
import {Percentage} from "../Percentage";
import {isMobile} from 'react-device-detect';

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
                <div className="card-header border-0 align-items-center d-flex">
                    <p className="text-uppercase fw-medium text-muted text-truncate mb-0 flex-grow-1">{title}</p>
                       {/* eslint-disable-next-line no-implied-eval */}
                       {!isShared && !isMobile && <button type="button" className={"btn btn-soft-secondary btn-share material-shadow-none btn-sm d-none d-sm-block " + (allowGrouping ? "" : "no-group")} onClick={() => { onShareClick(interval); }}>
                            Export
                        </button>}
                        {allowGrouping && <div>
                            {/* eslint-disable-next-line no-implied-eval */}
                            <button type="button" className={"btn btn-soft-secondary material-shadow-none btn-sm mr " + (interval === "D" ? "btn-soft-secondary-active":"")} onClick={() => { setInterval("D"); }}>
                                D
                            </button>
                            {/* eslint-disable-next-line no-implied-eval */}
                            <button type="button" className={"btn btn-soft-secondary material-shadow-none btn-sm mr " + (interval === "W" ? "btn-soft-secondary-active":"")} onClick={() => { setInterval("W"); }}>
                                W
                            </button>
                            {/* eslint-disable-next-line no-implied-eval */}
                            <button type="button" className={"btn btn-soft-secondary material-shadow-none btn-sm " + (interval === "M" ? "btn-soft-secondary-active":"")} onClick={() => { setInterval("M"); }}>
                                M
                            </button>
                        </div>}
                    }
                </div>

                <div className="card-header border-0 align-items-center d-flex pt-0">
                    <div className="d-flex justify-content-between mt-0 mb-0">
                        <div className="flex-grow-1 overflow-hidden">
                            {data && <><h4 className="fs-22 fw-semibold ff-secondary mb-1">
                                {isCurrency && <>$</>}<span className="counter-value" data-target="7585">
                                {focusData && focusData.value && (labelFormatter ? labelFormatter(focusData.value) : formatNumber(focusData.value, 2))}
                                {!focusData && latestRecord && latestRecord.d && (labelFormatter ? labelFormatter(latestRecord.value) : formatNumber(latestRecord.value, 2))} {suffix}</span>
                                </h4>
                                <p className="tooltip-date text-muted mb-0">
                                    {focusData && focusData.d && formatChartDateLabel(focusData.d, interval)}
                                    {!focusData && latestRecord && latestRecord.d && <>&nbsp;</>}</p>
                            </>}
                            {!data && <div className="loading-background" style={{width:"200px"}}><h4 className="mb-0">&nbsp;</h4></div>}
                        </div>
                        <div className="flex-shrink-0 chart-percentage">
                            {data && !focusData && latestRecord && <Percentage percentage={latestRecord.percentage} />}
                        </div>
                    </div>
                </div>

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