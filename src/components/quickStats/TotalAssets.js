import React from "react";
import {QuickStatCard} from "../QuickStatCard";

export const TotalAssets = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="UNIQUE ASSETS"
                       value={stats && stats.value}
                       previous={null}
                       icon="fa-solid fa-circle-dollar-to-slot"
                       loading={loading}
                       containerClass={containerClass}
        />
    );
};
