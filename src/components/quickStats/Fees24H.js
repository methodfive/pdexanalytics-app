import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const Fees24H = ({prefix = null,loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title={(prefix || "") + "24H FEES"}
                       prefix="$"
                       value={stats && stats.quickStats && stats.quickStats.f}
                       previous={stats && stats.quickStats && stats.quickStats.pf}
                       icon="fa-solid fa-circle-dollar-to-slot"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
