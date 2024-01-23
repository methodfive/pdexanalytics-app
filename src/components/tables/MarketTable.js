import React from "react";
import {gql, useQuery} from "@apollo/client";
import {formatCurrency, formatNumber, percentIncrease} from "../../util/Util";
import {Percentage} from "../Percentage";
import {Table} from "./Table";
import { useNavigate } from 'react-router-dom';
import {AssetIcon} from "../AssetIcon";

export const MarketTable = () => {
    const navigate = useNavigate();

    const { data: marketStats, loading: marketsLoading } = useQuery(gql`
        {
          markets {
              pv t v pt b { i s } q { i s }
          }
        }`);

    let data = marketStats;
    if(data && data.markets) {
        data = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < data.markets.length; i++)
        {
            data.markets[i].i = i + 1;
            data.markets[i].v = Number(data.markets[i].v);
            data.markets[i].t = Number(data.markets[i].t);

            data.markets[i].pair = data.markets[i].b.s + "/" + data.markets[i].q.s;
            data.markets[i].pairid = data.markets[i].b.s + "-" + data.markets[i].q.s;
            data.markets[i].base = data.markets[i].b.s;
            data.markets[i].quote = data.markets[i].q.s;
            data.markets[i].tp = percentIncrease(data.markets[i].t, data.markets[i].pt);
            data.markets[i].vp = percentIncrease(data.markets[i].v, data.markets[i].pv);
        }
    }

    const nameContent = (value, row) => {
        return <><div className="asset"><AssetIcon symbol={row.base}/><AssetIcon symbol={row.quote} className="quote-asset"/><div className="asset-name">{row.pair}</div></div></>;
    }

    const columns = [
        { accessor: 'i', label: '#', bodyClass: 'text-center d-none d-md-table-cell', headerClass: 'text-center d-none d-md-table-cell', headerStyle: {width: "60px"}, isSortable: false },
        { accessor: 'pair', bodyClass: 'table-link table-main-column',label: 'Market', content: nameContent},
        { accessor: 'v', labelFunc: () =>{return <>24H Vol<span className="d-none d-md-inline">ume</span></>}, bodyClass: 'text-right', headerClass: 'text-right sm150', headerStyle: {width: "150px"},
            content:  (value, row) => (<>{formatCurrency(value,2, 2)}</>)},
        { accessor: 'vp', label: 'Volume Change', bodyClass: 'text-right d-none d-md-table-cell', headerClass: 'text-right d-none d-md-table-cell', headerStyle: {width: "170px"},
            content:  (value, row) => (<>{<Percentage percentage={value}/>}</>)},
        { accessor: 't', labelFunc: () =>{return <><span className="d-none d-md-inline">24H </span>Trades</>},
            bodyClass: 'text-right', headerClass: 'text-right sm150', headerStyle: {width: "150px"},
            content: (value, row) => (formatNumber(value,0))},
        { accessor: 'tp', label: 'Trades Change', bodyClass: 'text-right d-none d-md-table-cell', headerClass: 'text-right d-none d-md-table-cell', headerStyle: {width: "170px"},
            content: (value, row) => (<Percentage percentage={value}/>)}
    ]
    const defaultSort = { order: 'desc', orderBy: 'v' };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card card-table">
                        <div className="card-header align-items-center d-flex">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0 flex-grow-1">Markets</p>
                        </div>

                        <div className="card-body">
                            <div className="table-container">
                                <Table rows={data && data.markets}
                                       columns={columns}
                                       defaultSort={defaultSort}
                                       loading={marketsLoading}
                                       onRowClick={(e, row) => {
                                           navigate('/markets/' + row.pairid, { state: { scrollToTop: true } });
                                       }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
