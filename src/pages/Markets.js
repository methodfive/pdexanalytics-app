import React from "react";
import {Helmet} from "react-helmet-async";
import {useLocation} from "react-router-dom";
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import {MarketTable} from "../components/tables/MarketTable";
import {gql, useQuery} from "@apollo/client";
import {Volume24H} from "../components/quickStats/Volume24H";
import {Trades24H} from "../components/quickStats/Trades24H";

export const Markets = () => {
    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: quickStats, loading: quickLoading } = useQuery(gql`
        {
          quickStats {
            v pv t pt
          }
        }`);

    return (
        <>
            <Helmet>
                <title>Markets | Polkadex Analytics</title>
                <meta name="description" content=""/>
                <link rel="canonical" href="https://pdexanalytics.com/markets" />
            </Helmet>

            {scrollNeeded && <AutomaticScrollToTop />}

            <div className="main-content">
                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Polkadex Markets</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <Volume24H loading={quickLoading} stats={quickStats} containerClass="col-xl-6 col-md-6" />
                    <Trades24H loading={quickLoading} stats={quickStats} containerClass="col-xl-6 col-md-6" />
                </div>

                <MarketTable/>
            </div>
        </>
    );
};
