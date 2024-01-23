import React from "react";
import {Helmet} from "react-helmet-async";
import {useLocation} from "react-router-dom";
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import {TradeTable} from "../components/tables/TradeTable";

export const Trades = () => {
    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    return (
        <>
            <Helmet>
                <title>Trades | Polkadex Analytics</title>
                <meta name="description" content=""/>
                <link rel="canonical" href="https://pdexanalytics.com/trades" />
            </Helmet>

            {scrollNeeded && <AutomaticScrollToTop />}

            <div className="main-content">
                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Recent Trades</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <TradeTable/>
            </div>
        </>
    );
};
