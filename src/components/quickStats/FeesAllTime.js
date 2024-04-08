import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const FeesAllTime = ({prefix = null,loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title={(prefix || "") + "ALL TIME FEES"}
                       prefix="$"
                       value={stats && stats.exchangeAllTime && stats.exchangeAllTime.f}
                       previous={stats && stats.exchangeAllTime && stats.exchangeAllTime.pf}
                       icon="fa-solid fa-circle-dollar-to-slot"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
