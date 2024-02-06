import React from "react";
import {Helmet} from "react-helmet-async";
import {useLocation} from "react-router-dom";
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import {gql, useQuery} from "@apollo/client";
import {formatNumber, formatNumberRemoveZeros, percentIncrease} from "../util/Util";
import {ShareableChart} from "../components/charts/ShareableChart";

export const Ecosystem = () => {
    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: quickStats, loading: quickLoading } = useQuery(gql`
        {
          quickStats {
            st pst s ps str pstr h ph ti pti tb ptb tt ptt
          }
        }`);

    const { data: exchangeDaily } = useQuery(gql`
    {
      exchangeDaily {
        d s sv t tv u v h str tb tt
      }
    }`);

    let data = exchangeDaily;
    if(data && data.exchangeDaily) {
        data = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < data.exchangeDaily.length; i++) {
            if(data.exchangeDaily[i].h != null)
                data.exchangeDaily[i].h = Number(data.exchangeDaily[i].h);

            if(data.exchangeDaily[i].str != null)
                data.exchangeDaily[i].str = Number(data.exchangeDaily[i].str);

            if(data.exchangeDaily[i].s != null)
                data.exchangeDaily[i].s = Number(data.exchangeDaily[i].s);

            if(data.exchangeDaily[i].sv != null)
                data.exchangeDaily[i].sv = Number(data.exchangeDaily[i].sv);

            if(data.exchangeDaily[i].ti != null)
                data.exchangeDaily[i].ti = Number(data.exchangeDaily[i].ti);
        }
    }

    console.log(quickStats);

    return (
        <>
            <Helmet>
                <title>Ecosystem | Polkadex Analytics</title>
                <meta name="description" content=""/>
                <link rel="canonical" href="https://pdexanalytics.com/staking" />
            </Helmet>

            {scrollNeeded && <AutomaticScrollToTop />}

            <div className="main-content">
                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Ecosystem</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="pie"
                                        fileNamePrefix="polkadex-holders"
                                        title="PDEX ISSUANCE"
                                        suffix={" PDEX"}
                                        data={quickStats && quickStats.quickStats && [
                                            { name: 'Treasury', value: Number(quickStats.quickStats.tb) },
                                            { name: 'Staking', value: Number(quickStats.quickStats.st) },
                                            { name: 'Other', value: Number(quickStats.quickStats.ti) - Number(quickStats.quickStats.tb) - Number(quickStats.quickStats.st) }
                                        ]}
                                        dataKey="ti"
                                        isCurrency={false}
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.ti, percentage: percentIncrease(quickStats.quickStats.ti, quickStats.quickStats.pti)}}
                                        filterToday={false}
                                        allowGrouping={false}
                                        loading={quickLoading}
                                        labelFormatter = {(n) => {
                                            return formatNumber(n, 3);
                                        }}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix="polkadex-holders"
                                        title="PDEX HOLDERS"
                                      data={data && data.exchangeDaily}
                                      dataKey="h"
                                      isCurrency={false}
                                      latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.h, percentage: percentIncrease(quickStats.quickStats.h, quickStats.quickStats.ph)}}
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
                        <ShareableChart type="bar"
                                      fileNamePrefix="polkadex-stakers"
                                      title="PDEX STAKERS"
                                      data={data && data.exchangeDaily}
                                      dataKey="str"
                                      isCurrency={false}
                                      latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.str, percentage: percentIncrease(quickStats.quickStats.str, quickStats.quickStats.pstr)}}
                                      filterToday={false}
                                      allowGrouping={false}
                                      loading={quickLoading}
                                      yAxisDomain={[2681, 'auto']}
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
                                      fileNamePrefix="polkadex-total-staked"
                                      title="Total Staked"
                                      data={data && data.exchangeDaily}
                                      dataKey="s"
                                      suffix="PDEX"
                                      isCurrency={false}
                                      latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.st, percentage: percentIncrease(quickStats.quickStats.st, quickStats.quickStats.pst)}}
                                      filterToday={false}
                                      allowGrouping={false}
                                      loading={quickLoading}
                                      yTickFormatter = {(n) => {
                                          return formatNumber(n, 3);
                                      }}
                                      labelFormatter = {(n) => {
                                          return formatNumber(n, 3);
                                      }}
                        />
                    </div>

                    <div className="col-lg-4 col-md-12">

                        <ShareableChart type="line"
                                       fileNamePrefix="polkadex-staking-tvl"
                                       title="STAKING TVL"
                                       data={data && data.exchangeDaily}
                                       dataKey="sv"
                                       latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.s, percentage: percentIncrease(quickStats.quickStats.s, quickStats.quickStats.ps)}}
                                       filterToday={false}
                                       allowGrouping={false}
                                       loading={quickLoading}
                                       yTickFormatter = {(n) => {
                                           return formatNumber(n, 3);
                                       }}
                                       labelFormatter = {(n) => {
                                           return formatNumber(n, 3);
                                       }}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix="polkadex-total-staked"
                                        title="Treasury"
                                        data={data && data.exchangeDaily}
                                        dataKey="tb"
                                        suffix="PDEX"
                                        isCurrency={false}
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.tb, percentage: percentIncrease(quickStats.quickStats.tb, quickStats.quickStats.ptb)}}
                                        filterToday={false}
                                        allowGrouping={false}
                                        loading={quickLoading}
                                        yTickFormatter = {(n) => {
                                            return formatNumber(n, 3);
                                        }}
                                        labelFormatter = {(n) => {
                                            return formatNumber(n, 3);
                                        }}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">

                        <ShareableChart type="line"
                                        fileNamePrefix="polkadex-staking-tvl"
                                        title="TREASURY TVL"
                                        data={data && data.exchangeDaily}
                                        dataKey="tt"
                                        latestRecord={quickStats && quickStats.quickStats && {d: new Date().getTime(), value: quickStats.quickStats.tt, percentage: percentIncrease(quickStats.quickStats.tt, quickStats.quickStats.ptt)}}
                                        filterToday={false}
                                        allowGrouping={false}
                                        loading={quickLoading}
                                        yTickFormatter = {(n) => {
                                            return formatNumber(n, 3);
                                        }}
                                        labelFormatter = {(n) => {
                                            return formatNumber(n, 3);
                                        }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
