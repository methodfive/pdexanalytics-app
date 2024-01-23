import React, {useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import {
    formatCurrency,
    formatNumber,
    getPriceDecimalPointsForScreen,
    utcToLocalDate
} from "../../util/Util";
import {Table} from "./Table";
import {AssetIcon} from "../AssetIcon";

export const TradeTable = () => {
    const { data: tradeStats, loading: tradesLoading, startPolling, stopPolling } = useQuery(gql`
        {
          trades {
              i p qu t b { i s } q { i s }
          }
        }`, { fetchPolicy: 'network-only' });

    useEffect(() => {
        startPolling(5000) //5 sec

        let timer = setTimeout(
            function() {
                stopPolling()
            },
            1000 * 5 * 60 //5 min
        );
        return () => {
            stopPolling()
            if(timer != null)
                clearTimeout(timer);
        }
    }, [startPolling, stopPolling])

    let data = tradeStats;
    if(data && data.trades) {
        data = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < data.trades.length; i++)
        {
            data.trades[i].t = Number(data.trades[i].t);
            data.trades[i].i = Number(data.trades[i].i);
            data.trades[i].pair = data.trades[i].b.s + "/" + data.trades[i].q.s;
            data.trades[i].base = data.trades[i].b.s;
            data.trades[i].quote = data.trades[i].q.s;
        }
    }

    let maxDecimalPlaces = getPriceDecimalPointsForScreen();

    const nameContent = (value, row) => {
        return <><div className="asset"><AssetIcon symbol={row.base}/><AssetIcon symbol={row.quote} className="quote-asset"/><div className="asset-name">{row.pair}</div></div></>;
    }

    const columns = [
        { accessor: 'i', label: '#', bodyClass: 'text-center d-none d-md-table-cell', headerClass: 'text-center d-none d-md-table-cell', headerStyle: {width: "60px"} },

        { accessor: 'pair', bodyClass: 'table-main-column', label: 'Market', content: nameContent, isSortable: false},
        { accessor: 'p', label: 'Price', bodyClass: 'text-right', headerClass: 'text-right sm150', headerStyle: {width: "150px"},
            content:  (value, row) => (<>{row.p && formatCurrency(value,2, maxDecimalPlaces)}</>), isSortable: false},
        { accessor: 'qu', label: 'Quantity', bodyClass: 'text-right d-none d-md-table-cell', headerClass: 'text-right d-none d-md-table-cell', headerStyle: {width: "150px"},
            content:  (value, row) => (<>{row.p && formatNumber(value,2, maxDecimalPlaces)}</>), isSortable: false},
        { accessor: 't', label: 'Time', bodyClass: 'text-right', headerClass: 'text-right sm150', headerStyle: {width: "150px"},
            content:  (value, row) => (<>{utcToLocalDate(row.t)}</>), isSortable: false},
    ]
    const defaultSort = { order: 'desc', orderBy: 't' };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card card-table">
                        <div className="card-header align-items-center d-flex">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0 flex-grow-1">Recent Trades</p>
                        </div>

                        <div className="card-body">
                            <div className="table-container">
                                <Table rows={data && data.trades} columns={columns} defaultSort={defaultSort} loading={tradesLoading}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
