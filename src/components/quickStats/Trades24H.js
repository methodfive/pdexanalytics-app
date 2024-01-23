import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const Trades24H = ({prefix = null,loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title={(prefix || "") + "24H TRADES"}
                       value={stats && stats.quickStats && stats.quickStats.t}
                       previous={stats && stats.quickStats && stats.quickStats.pt}
                       icon="fa-solid fa-shuffle"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
