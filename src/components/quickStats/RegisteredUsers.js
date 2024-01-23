import React from "react";
import {QuickStatCard} from "../QuickStatCard";
import {formatNumberRemoveZeros} from "../../util/Util";

export const RegisteredUsers = ({loading, stats = null, containerClass = null}) => {
    return (
        <QuickStatCard title="REG. USERS"
                       value={stats && stats.quickStats && stats.quickStats.u}
                       previous={stats && stats.quickStats && stats.quickStats.pu}
                       icon="fa-solid fa-users"
                       loading={loading}
                       containerClass={containerClass}
                       labelFormatter = {(n) => {
                           return formatNumberRemoveZeros(n, 2);
                       }}
        />
    );
};
