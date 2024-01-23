import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const Volume24H = ({prefix = null, loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title={(prefix || "") + "24H VOLUME"}
                       prefix="$"
                       value={stats && stats.quickStats && stats.quickStats.v}
                       previous={stats && stats.quickStats && stats.quickStats.pv}
                       icon="fa-solid fa-chart-line"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};