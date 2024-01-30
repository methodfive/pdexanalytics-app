import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const TotalStakers = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="PDEX STAKERS"
                       value={stats && stats.quickStats && stats.quickStats.str}
                       previous={stats && stats.quickStats && stats.quickStats.pstr}
                       icon="fa-solid fa-users-gear"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
