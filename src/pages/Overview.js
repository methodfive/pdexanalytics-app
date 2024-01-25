import React from "react";
import { Helmet } from 'react-helmet-async';
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import { useLocation } from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {formatNumber, formatNumberRemoveZeros, percentIncrease} from "../util/Util";
import {MarketTable} from "../components/tables/MarketTable";
import {AssetTable} from "../components/tables/AssetTable";
import {StakingTVL} from "../components/quickStats/StakingTVL";
import {TotalStaked} from "../components/quickStats/TotalStaked";
import {TotalStakers} from "../components/quickStats/TotalStakers";
import {TotalHolders} from "../components/quickStats/TotalHolders";
import {ShareableChart} from "../components/charts/ShareableChart";

export const Overview = () => {
    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: quickStats, loading: quickLoading } = useQuery(gql`
        {
          quickStats {
            o po ps pst pt pu pv st t u v s h ph str pstr
          }
        }`);

    const { data: exchangeDaily } = useQuery(gql`
    {
      exchangeDaily {
        d s sv t tv u v
      }
    }`);

    return (
        <>
            <Helmet>
                <title>Polkadex Analytics</title>
                <meta name="description" content=""/>
                <link rel="canonical" href="https://pdexanalytics.com/" />
            </Helmet>

            {scrollNeeded && <AutomaticScrollToTop />}

            <div className="main-content">
                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Polkadex Overview</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="line"
                                        fileNamePrefix="polkadex-ob-tvl"
                                        title="OrderBook TVL"
                                        data={exchangeDaily && exchangeDaily.exchangeDaily}
                                        dataKey="tv"
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.o, percentage: percentIncrease(quickStats.quickStats.o, quickStats.quickStats.po)}}
                                        filterToday={false}
                                        allowGrouping={false}
                                        loading={quickLoading}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix="polkadex-24h-volume"
                                        title="24H Volume"
                                        data={exchangeDaily && exchangeDaily.exchangeDaily}
                                        dataKey="v"
                                        isCurrency={true}
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.v, percentage: percentIncrease(quickStats.quickStats.v, quickStats.quickStats.pv)}}
                                        filterToday={true}
                                        allowGrouping={true}
                                        loading={quickLoading}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                      fileNamePrefix="polkadex-24h-trades"
                                      title="24H Trades"
                                      data={exchangeDaily && exchangeDaily.exchangeDaily}
                                      dataKey="t"
                                      isCurrency={false}
                                      latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.t, percentage: percentIncrease(quickStats.quickStats.t, quickStats.quickStats.pt)}}
                                      filterToday={true}
                                      allowGrouping={true}
                                      loading={quickLoading}
                                      yTickFormatter = {(n) => {
                                          return formatNumber(n, 0);
                                      }}
                                      labelFormatter = {(n) => {
                                          return formatNumberRemoveZeros(n, 2);
                                      }}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix="polkadex-ob-users"
                                        title="Registered Users"
                                        data={exchangeDaily && exchangeDaily.exchangeDaily}
                                        dataKey="u"
                                        isCurrency={false}
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.u, percentage: percentIncrease(quickStats.quickStats.u, quickStats.quickStats.pu)}}
                                        filterToday={false}
                                        allowGrouping={false}
                                        loading={quickLoading}
                                        yTickFormatter = {(n) => {
                                            return formatNumber(n, 0);
                                        }}
                                        labelFormatter = {(n) => {
                                            return formatNumberRemoveZeros(n, 2);
                                        }}
                        />
                    </div>
                </div>

                <div className="row">
                    <StakingTVL loading={quickLoading} stats={quickStats} containerClass="col-xl-3 col-md-6" />
                    <TotalStaked Staked loading={quickLoading} stats={quickStats} containerClass="col-xl-3 col-md-6" />
                    <TotalHolders Staked loading={quickLoading} stats={quickStats} containerClass="col-xl-3 col-md-6" />
                    <TotalStakers loading={quickLoading} stats={quickStats} containerClass="col-xl-3 col-md-6" />
                </div>

                <MarketTable/>

                <AssetTable/>
            </div>
        </>
    );
};
