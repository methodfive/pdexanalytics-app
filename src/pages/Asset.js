import React from "react";
import {Helmet} from "react-helmet-async";
import {useLocation, useParams} from "react-router-dom";
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import {AssetTable} from "../components/tables/AssetTable";
import {gql, useQuery} from "@apollo/client";
import {formatNumber, formatNumberRemoveZeros, percentIncrease, removeLeadingZeros} from "../util/Util";
import {NavigationLink} from "../components/NavigationLink";
import {AssetIcon} from "../components/AssetIcon";
import {ShareableChart} from "../components/charts/ShareableChart";

export const Asset = () => {
    const { slug } = useParams();

    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: assetStats, loading: assetLoading } = useQuery(gql`
       query Asset($assetId: String!) {
           asset(assetID: $assetId) {
             i n p pp pt s t tr v ptr pv b pb
           }
       }`, {
        variables: { assetId: slug },
    });

    let assetData = null;

    if(assetStats && assetStats.asset) {
        assetData = JSON.parse(JSON.stringify(assetStats));
        assetData.quickStats = assetStats.asset;
    }

    const { data: assetDailyStats, loading: assetDailyLoading } = useQuery(gql`
        query AssetDaily($assetId: String!) {
          assetDaily(assetID: $assetId) {
                d a { i p t tr v b }
          }
        }`, {
        variables: { assetId: slug },
    });

    let data = assetDailyStats;
    if(data && data.assetDaily) {
        data = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < data.assetDaily.length; i++) {
            data.assetDaily[i].i = i + 1;
            data.assetDaily[i].p = Number(data.assetDaily[i].a.p);
            data.assetDaily[i].b = Number(data.assetDaily[i].a.b);
            data.assetDaily[i].t = Number(data.assetDaily[i].a.t);
            data.assetDaily[i].tr = Number(data.assetDaily[i].a.tr);
            data.assetDaily[i].v = Number(data.assetDaily[i].a.v);
        }
        data.assetDaily = removeLeadingZeros(data.assetDaily, "b");
    }

    return (
        <>
            <Helmet>
                <title>{slug} | Polkadex Analytics</title>
                <link rel="canonical" href={"https://pdexanalytics.com/assets/" + slug} />
            </Helmet>

            {scrollNeeded && <AutomaticScrollToTop />}

            <div className="main-content">
                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">
                                    <div className="asset-label">
                                        <div className="asset-link">
                                            <span className="text-muted">
                                                <NavigationLink title="Polkadex Assets" to="/assets" state={{ scrollToTop: true }}>Asset</NavigationLink> -
                                            </span>
                                        </div>
                                        <AssetIcon symbol={slug}/>
                                        <div className="asset-name">
                                            {!assetData && slug}
                                            {assetData && (assetData.asset.n !== assetData.asset.s) && <>
                                                {assetData.asset.n} ({assetData.asset.s})
                                            </>}
                                            {assetData && (assetData.asset.n === assetData.asset.s) && <>
                                                {assetData.asset.s}
                                            </>}
                                        </div>
                                    </div>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="line"
                                        fileNamePrefix={"polkadex-"+slug+"-ob-price"}
                                        title={slug +" OrderBook Price"}
                                       data={data && data.assetDaily}
                                       dataKey="p"
                                       latestRecord={assetData && assetData.quickStats && {d: new Date().getTime(), value: assetData.quickStats.p, percentage: percentIncrease(assetData.quickStats.p, assetData.quickStats.pp)}}
                                       filterToday={false}
                                       allowGrouping={false}
                                       loading={assetDailyLoading && assetLoading}
                                       yTickFormatter = {(n) => {
                                           return formatNumber(n, 2, 6);
                                       }}
                                       labelFormatter = {(n) => {
                                           return formatNumber(n, 2, 6);
                                       }}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="line"
                                        fileNamePrefix={"polkadex-"+slug+"-ob-tvl"}
                                        title={slug + " OrderBook TVL"}
                                       data={data && data.assetDaily}
                                       dataKey="t"
                                       latestRecord={assetData && assetData.quickStats && {d: new Date().getTime(), value: assetData.quickStats.t, percentage: percentIncrease(assetData.quickStats.t, assetData.quickStats.pt)}}
                                       filterToday={false}
                                       allowGrouping={false}
                                       loading={assetDailyLoading && assetLoading}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix={"polkadex-"+slug+"-24h-trades"}
                                        title={slug + " 24H Trades"}
                                  data={data && data.assetDaily}
                                  dataKey="tr"
                                  isCurrency={false}
                                  latestRecord={assetData && assetData.quickStats && {d: new Date().getTime(), value: assetData.quickStats.tr, percentage: percentIncrease(assetData.quickStats.tr, assetData.quickStats.ptr)}}
                                  filterToday={false}
                                  allowGrouping={true}
                                  loading={assetDailyLoading && assetLoading}
                                  yTickFormatter = {(n) => {
                                    return formatNumber(n, 0);
                                  }}
                                  labelFormatter = {(n) => {
                                    return formatNumberRemoveZeros(n, 2);
                                  }}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="line"
                                        fileNamePrefix={"polkadex-"+slug+"-24h-volume"}
                                        title={slug + " 24H Volume"}
                                       data={data && data.assetDaily}
                                       dataKey="v"
                                       latestRecord={assetData && assetData.quickStats && {d: new Date().getTime(), value: assetData.quickStats.v, percentage: percentIncrease(assetData.quickStats.v, assetData.quickStats.pv)}}
                                       filterToday={false}
                                       allowGrouping={true}
                                       loading={assetDailyLoading && assetLoading}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix={"polkadex-"+slug+"-ob-balance"}
                                        title={slug + " OrderBook Balance"}
                                      data={data && data.assetDaily}
                                      dataKey="b"
                                      suffix={slug}
                                      isCurrency={false}
                                      latestRecord={assetData && assetData.quickStats && {d: new Date().getTime(), value: assetData.quickStats.b, percentage: percentIncrease(assetData.quickStats.b, assetData.quickStats.pb)}}
                                      filterToday={false}
                                      allowGrouping={false}
                                      loading={assetDailyLoading && assetLoading}
                        />
                    </div>
                </div>

                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Explore Polkadex Assets</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <AssetTable/>
            </div>
        </>
    );
};
