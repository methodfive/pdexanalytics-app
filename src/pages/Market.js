import React from "react";
import {Helmet} from "react-helmet-async";
import {useLocation, useParams} from "react-router-dom";
import AutomaticScrollToTop from "../components/AutomaticScrollToTop";
import {MarketTable} from "../components/tables/MarketTable";
import {gql, useQuery} from "@apollo/client";
import {formatNumber, formatNumberRemoveZeros, percentIncrease} from "../util/Util";
import {NavigationLink} from "../components/NavigationLink";
import {AssetIcon} from "../components/AssetIcon";
import {ShareableChart} from "../components/charts/ShareableChart";

export const Market = () => {
    const { slug } = useParams();
    let marketPairs = slug.split("-");

    const location = useLocation();
    const scrollNeeded = location.state?.scrollToTop;

    const { data: marketStats, loading: marketLoading } = useQuery(gql`
       query Market($baseAssetId: String!, $quoteAssetId: String!) {
           market(baseAssetID: $baseAssetId, quoteAssetID: $quoteAssetId) {
             pt pv t v b { i } q { i }
           }
       }`, {
        variables: { baseAssetId: marketPairs[0], quoteAssetId: marketPairs[1] },
    });

    const { data: marketDailyStats, loading: marketDailyLoading } = useQuery(gql`
        query MarketDaily($baseAssetId: String!, $quoteAssetId: String!) {
          marketDaily(baseAssetID: $baseAssetId, quoteAssetID: $quoteAssetId) {
            d m { t v b { i } q { i } }
          }
        }`, {
        variables: { baseAssetId: marketPairs[0], quoteAssetId: marketPairs[1] },
    });

    let data = marketDailyStats;
    if(data && data.marketDaily) {
        data = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < data.marketDaily.length; i++) {
            data.marketDaily[i].i = i + 1;
            data.marketDaily[i].v = Number(data.marketDaily[i].m.v);
            data.marketDaily[i].t = Number(data.marketDaily[i].m.t);
        }
    }

    return (
        <>
            <Helmet>
                <title>{slug.replaceAll("-","/")} | Polkadex Analytics</title>
                <link rel="canonical" href={"https://pdexanalytics.com/markets/" + slug} />
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
                                                <NavigationLink title="Polkadex Markets" to="/markets" state={{ scrollToTop: true }}>Market</NavigationLink> -
                                            </span>
                                        </div>
                                        <AssetIcon symbol={marketPairs[0]}/>
                                        <AssetIcon symbol={marketPairs[1]} className="quote-asset"/>
                                        <div className="asset-name">
                                            {slug.replaceAll("-","/")}
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
                                        fileNamePrefix={"polkadex-"+slug+"-24h-volume"}
                                        title={slug.replaceAll("-","/") + " 24H Volume"}
                                        data={data && data.marketDaily}
                                        dataKey="v"
                                        latestRecord={marketStats && marketStats.market && {d: new Date().getTime(), value: marketStats.market.v, percentage: percentIncrease(marketStats.market.v, marketStats.market.pv)}}
                                        filterToday={false}
                                        allowGrouping={true}
                                        loading={marketDailyLoading && marketLoading}
                        />
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <ShareableChart type="bar"
                                        fileNamePrefix={"polkadex-"+slug+"-24h-trades"}
                                        title={slug.replaceAll("-","/") + " 24H Trades"}
                                        data={data && data.marketDaily}
                                        dataKey="t"
                                        isCurrency={false}
                                        latestRecord={marketStats && marketStats.market && {d: new Date().getTime(), value: marketStats.market.t, percentage: percentIncrease(marketStats.market.t, marketStats.market.pt)}}
                                        filterToday={false}
                                        allowGrouping={true}
                                        loading={marketDailyLoading && marketLoading}
                                        yTickFormatter = {(n) => {
                                            return formatNumber(n, 0);
                                        }}
                                        labelFormatter = {(n) => {
                                            return formatNumberRemoveZeros(n, 2);
                                        }}/>
                    </div>
                </div>

                <div className="row mb-3 pb-1">
                    <div className="col-12">
                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                            <div className="flex-grow-1">
                                <h4 className="fs-16 mb-1">Explore Polkadex Markets</h4>
                            </div>
                        </div>
                    </div>
                </div>

                <MarketTable/>
            </div>
        </>
    );
};
