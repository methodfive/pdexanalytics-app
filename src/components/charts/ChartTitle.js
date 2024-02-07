import React  from "react";
import {formatChartDateLabel, formatNumber} from "../../util/Util";
import {Percentage} from "../Percentage";

export const ChartTitle = ({isCurrency, data, focusData, interval, latestRecord, labelFormatter, suffix}) => {
    return <>
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
    </>;
}
