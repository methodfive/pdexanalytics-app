import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const TVL = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="ORDERBOOK TVL"
                       prefix="$"
                       value={stats && stats.quickStats && stats.quickStats.o}
                       previous={stats && stats.quickStats && stats.quickStats.po}
                       icon="fa-solid fa-coins"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};
