import React from "react";
import {formatNumber, percentIncrease} from "../util/Util";
import {Percentage} from "./Percentage";

export const QuickStatCard = ({title, prefix= null, suffix = null,
                                  value = null, previous = null, icon = null, loading,
                              containerClass, labelFormatter = null}) => {
    const percentage = percentIncrease(value, previous);
    return (
        <>
            <div className={containerClass}>
                <div className="card card-quickstat card-animate">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> {title}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <Percentage percentage={percentage} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between mt-4 mb-2">
                            <div>
                                {value && <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                                    {prefix && <>{prefix}</>}<span className="counter-value">
                                    {(labelFormatter ? labelFormatter(value) : formatNumber(value, 2))}
                                    {suffix && <>{suffix}</>}&nbsp;</span>
                                </h4>}
                                {!value && <div className="loading-background" style={{width:"200px"}}><h4 className="mb-0">&nbsp;</h4></div>}
                            </div>
                            {icon && <div className="avatar-sm flex-shrink-0">
                                <span className="avatar-title rounded-circle fs-3">
                                    <i className={icon}></i>
                                </span>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}