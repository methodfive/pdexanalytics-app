import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const TreasuryBalance = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="TREASURY"
                       suffix=" PDEX"
                       value={stats && stats.quickStats && stats.quickStats.tb}
                       previous={stats && stats.quickStats && stats.quickStats.ptb}
                       icon="fa-solid fa-chart-column"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};
