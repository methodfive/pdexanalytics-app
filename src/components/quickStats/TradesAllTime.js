import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const TradesAllTime = ({prefix = null,loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title={(prefix || "") + "ALL TIME TRADES"}
                       value={stats && stats.exchangeAllTime && stats.exchangeAllTime.t}
                       previous={stats && stats.exchangeAllTime && stats.exchangeAllTime.pt}
                       icon="fa-solid fa-shuffle"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
