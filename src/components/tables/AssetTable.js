import React from "react";
import {gql, useQuery} from "@apollo/client";
import {formatCurrency, formatNumber, getPriceDecimalPointsForScreen, percentIncrease} from "../../util/Util";
import {Percentage} from "../Percentage";
import {Table} from "./Table";
import { useNavigate } from 'react-router-dom';
import {AssetIcon} from "../AssetIcon";

export const AssetTable = () => {
    const navigate = useNavigate();

    const { data: assetStats, loading: assetsLoading } = useQuery(gql`
        {
          assets {
              i n p s t pp pt b pb
          }
        }`);

    let data = assetStats;
    if(data && data.assets) {
        data = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < data.assets.length; i++)
        {
            data.assets[i].t = Number(data.assets[i].t);
            data.assets[i].p = Number(data.assets[i].p);
            data.assets[i].b = Number(data.assets[i].b);

            data.assets[i].i = i + 1;
            if(data.assets[i].pp !== null)
                data.assets[i].p_percent = percentIncrease(data.assets[i].p, data.assets[i].pp);
            if(data.assets[i].pt !== null)
                data.assets[i].t_percent = percentIncrease(data.assets[i].t, data.assets[i].pt);
            if(data.assets[i].pb !== null)
                data.assets[i].b_percent = percentIncrease(data.assets[i].b, data.assets[i].pb);
        }
    }

    let maxDecimalPlaces = getPriceDecimalPointsForScreen();

    const nameContent = (value, row) => {

        return <><div className="asset"><AssetIcon symbol={row.s}/><div className="asset-name"><span className="d-none d-lg-block">{row.n} ({row.s})</span><span className="d-lg-none">{row.s}</span></div></div></>;
    }

    const priceContent = (value, row) => {
        return <>{formatCurrency(value,2,maxDecimalPlaces)}</>;
    }

    const pricePercentContent = (value, row) => {
        return <><Percentage percentage={value}/></>;
    }

    const columns = [
        { accessor: 'i', label: '#', bodyClass: 'text-center d-none d-md-table-cell', headerClass: 'text-center d-none d-md-table-cell', headerStyle: {width: "60px"}, isSortable: false },
        { accessor: 'n', bodyClass: 'table-link table-main-column', label: 'Asset',
            content: nameContent},
        { accessor: 'p', label: 'Price', bodyClass: 'text-right', headerClass: 'text-right sm150', headerStyle: {width: "150px"},
            content: priceContent},
        { accessor: 'p_percent', label: 'Price Change', bodyClass: 'text-right d-none d-md-table-cell', headerClass: 'text-right d-none d-md-table-cell', headerStyle: {width: "150px"},
            content: pricePercentContent},
        { accessor: 't', label: 'TVL', bodyClass: 'text-right', headerClass: 'text-right sm150', headerStyle: {width: "150px"},
            content: (value, row) => (formatCurrency(value,2))},
        { accessor: 't_percent', label: 'TVL Change', bodyClass: 'text-right d-none d-md-table-cell', headerClass: 'text-right d-none d-md-table-cell', headerStyle: {width: "150px"},
            content: pricePercentContent},
        { accessor: 'b', label: 'Balance', bodyClass: 'text-right d-none d-xl-table-cell', headerClass: 'text-right d-none d-xl-table-cell', headerStyle: {width: "150px"},
            content: (value, row) => (formatNumber(value,2) + " " + row.s)},
    ]
    const defaultSort = { order: 'desc', orderBy: 't' };

    return (
        <>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card card-table">
                        <div className="card-header align-items-center d-flex">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-0 flex-grow-1">Assets</p>
                        </div>

                        <div className="card-body">
                            <div className="table-container">
                                <Table rows={data && data.assets}
                                       columns={columns}
                                       defaultSort={defaultSort}
                                       loading={assetsLoading}
                                       onRowClick={(e, row) => {
                                           navigate('/assets/' + row.s, { state: { scrollToTop: true } });
                                       }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
