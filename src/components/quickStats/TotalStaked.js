import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const TotalStaked = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="TOTAL STAKED"
                       suffix=" PDEX"
                       value={stats && stats.quickStats && stats.quickStats.st}
                       previous={stats && stats.quickStats && stats.quickStats.pst}
                       icon="fa-solid fa-chart-column"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};
