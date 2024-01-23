import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const TotalHolders = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="PDEX HOLDERS"
                       value={stats && stats.quickStats && stats.quickStats.h}
                       previous={stats && stats.quickStats && stats.quickStats.ph}
                       icon="fa-solid fa-users"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
