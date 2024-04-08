import React from "react";
import { Helmet } from 'react-helmet-async';
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import { useLocation } from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {formatNumber, formatNumberRemoveZeros, percentIncrease} from "../util/Util";
import {MarketTable} from "../components/tables/MarketTable";
import {AssetTable} from "../components/tables/AssetTable";
import {TotalStakers} from "../components/quickStats/TotalStakers";
import {TotalHolders} from "../components/quickStats/TotalHolders";
import {ShareableChart} from "../components/charts/ShareableChart";
import {RegisteredUsers} from "../components/quickStats/RegisteredUsers";
import {VolumeAllTime} from "../components/quickStats/VolumeAllTime";
import {TradesAllTime} from "../components/quickStats/TradesAllTime";
import {FeesAllTime} from "../components/quickStats/FeesAllTime";

export const Overview = () => {
    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: quickStats, loading: quickLoading } = useQuery(gql`
        {
          quickStats {
            o po ps pst pt pu pv st t u v s h ph str pstr nu pnu f pf
          }
        }`);

    const { data: exchangeDaily } = useQuery(gql`
    {
      exchangeDaily {
        d s sv t tv u v nu f
      }
    }`);

    const { data: exchangeDailyAllTime } = useQuery(gql`
    {
      exchangeAllTime {
        t f v
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
                                        filterToday={false}
                                        allowGrouping={true}
                                        loading={quickLoading}
                        />
                    </div>
                </div>

                <div className="row">
                    <RegisteredUsers loading={quickLoading} stats={quickStats} containerClass="col-md-4 col-sm-12" />
                    <TotalHolders loading={quickLoading} stats={quickStats} containerClass="col-md-4 col-sm-12" />
                    <TotalStakers loading={quickLoading} stats={quickStats} containerClass="col-md-4 col-sm-12" />
                </div>

                <div className="row">
                    <div className="col-lg-4 col-md-12">
                        <ShareableChart type="bar"
                                      fileNamePrefix="polkadex-24h-trades"
                                      title="24H Trades"
                                      data={exchangeDaily && exchangeDaily.exchangeDaily}
                                      dataKey="t"
                                      isCurrency={false}
                                      latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.t, percentage: percentIncrease(quickStats.quickStats.t, quickStats.quickStats.pt)}}
                                      filterToday={false}
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

                    <div className="col-lg-4 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix="polkadex-ob-users"
                                        title="24H New Users"
                                        data={exchangeDaily && exchangeDaily.exchangeDaily}
                                        dataKey="nu"
                                        isCurrency={false}
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.nu, percentage: percentIncrease(quickStats.quickStats.nu, quickStats.quickStats.pnu)}}
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

                    <div className="col-lg-4 col-md-12">
                        <ShareableChart type="line"
                                        fileNamePrefix="polkadex-ob-tvl"
                                        title="24H FEES"
                                        data={exchangeDaily && exchangeDaily.exchangeDaily}
                                        dataKey="f"
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.f, percentage: percentIncrease(quickStats.quickStats.f, quickStats.quickStats.pf)}}
                                        filterToday={false}
                                        allowGrouping={false}
                                        loading={quickLoading}
                        />
                    </div>
                </div>

                <div className="row">
                    <VolumeAllTime loading={exchangeDailyAllTime} stats={exchangeDailyAllTime} containerClass="col-md-4 col-sm-12" />
                    <TradesAllTime loading={exchangeDailyAllTime} stats={exchangeDailyAllTime} containerClass="col-md-4 col-sm-12" />
                    <FeesAllTime loading={exchangeDailyAllTime} stats={exchangeDailyAllTime} containerClass="col-md-4 col-sm-12" />
                </div>

                <MarketTable/>

                <AssetTable/>
            </div>
        </>
    );
};
