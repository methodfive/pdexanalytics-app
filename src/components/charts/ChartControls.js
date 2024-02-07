import React  from "react";

export const ChartControls = ({isShared, data, title, interval, allowGrouping, onShareClick}) => {
    return <>
        <div className="card-header border-0 align-items-center d-flex">
            <p className="text-uppercase fw-medium text-muted text-truncate mb-0 flex-grow-1">{title}</p>
            {/* eslint-disable-next-line no-implied-eval */}
            {!isShared && data && <button type="button" className={"btn btn-soft-secondary btn-share material-shadow-none btn-sm d-none d-sm-block " + (allowGrouping ? "" : "no-group")} onClick={(e) => { onShareClick(e, interval); }}>
                Share
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
    </>;
}
