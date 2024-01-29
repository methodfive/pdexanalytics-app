import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const TreasuryTVL = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="TREASURY TVL"
                       prefix="$"
                       value={stats && stats.quickStats && stats.quickStats.tt}
                       previous={stats && stats.quickStats && stats.quickStats.ptt}
                       icon="fa-solid fa-circle-dollar-to-slot"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};
