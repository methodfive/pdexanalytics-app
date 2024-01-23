import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const StakingTVL = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="STAKING TVL"
                       prefix="$"
                       value={stats && stats.quickStats && stats.quickStats.s}
                       previous={stats && stats.quickStats && stats.quickStats.ps}
                       icon="fa-solid fa-circle-dollar-to-slot"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};
