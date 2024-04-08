import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const VolumeAllTime = ({prefix = null, loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title={(prefix || "") + "ALL TIME VOLUME"}
                       prefix="$"
                       value={stats && stats.exchangeAllTime && stats.exchangeAllTime.v}
                       previous={stats && stats.exchangeAllTime && stats.exchangeAllTime.pv}
                       icon="fa-solid fa-chart-line"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};