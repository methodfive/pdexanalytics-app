import React from "react";
import {Helmet} from "react-helmet-async";
import {useLocation} from "react-router-dom";
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import {AssetTable} from "../components/tables/AssetTable";
import {gql, useQuery} from "@apollo/client";
import {TVL} from "../components/quickStats/TVL";
import {StakingTVL} from "../components/quickStats/StakingTVL";

export const Assets = () => {
    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: quickStats, loading: quickLoading } = useQuery(gql`
        {
          quickStats {
            o po s ps
          }
        }`);

    return (
        <>
            <Helmet>
                <title>Assets | Polkadex Analytics</title>
                <meta name="description" content=""/>
                <link rel="canonical" href="https://pdexanalytics.com/assets" />
            </Helmet>

            {scrollNeeded && <AutomaticScrollToTop />}

            <div className="main-content">
                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Polkadex Assets</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <TVL loading={quickLoading} stats={quickStats} containerClass="col-xl-6 col-md-6" />
                    <StakingTVL loading={quickLoading} stats={quickStats} containerClass="col-xl-6 col-md-6" />
                </div>

                <AssetTable/>
            </div>
        </>
    );
};
