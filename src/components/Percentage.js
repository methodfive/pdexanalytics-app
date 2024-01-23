import React from "react";

export const Percentage = ({percentage}) => {
    return (
        <>
            {percentage != null && percentage > 0 && <h5 className="text-success fs-14 mb-0"><i className="fa-solid fa-arrow-trend-up"></i> +{percentage} %</h5>}
            {percentage != null && percentage === 0 && <h5 className="text-muted fs-14 mb-0"><i className="fa-solid fa-arrow-trend-up"></i> +{percentage} %</h5>}
            {percentage != null  && percentage < 0 && <h5 className="text-danger fs-14 mb-0"><i className="fa-solid fa-arrow-trend-down"></i> {percentage} %</h5>}
        </>
    );
}