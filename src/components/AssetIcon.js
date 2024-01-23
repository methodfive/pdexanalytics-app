import React from "react";
import {isEmpty} from "../util/Util";
import ASTR from './icons/ASTR.svg';
import DOT from './icons/DOT.svg';
import GLMR from './icons/GLMR.svg';
import IBTC from './icons/IBTC.svg';
import PDEX from './icons/PDEX.svg';
import PHA from './icons/PHA.svg';
import USDT from './icons/USDT.svg';
import UNKNOWN from './icons/UNKNOWN.svg';

export const AssetIcon = ({symbol, className=null}) => {
    if(isEmpty(symbol))
        return;

    return <div className={"asset-icon " + (className ? className : "")}>
        {(function(){
            if (symbol === "ASTR") {
                return <img src={ASTR} alt={symbol}/>
            } else if (symbol === "DOT") {
                return <img src={DOT} alt={symbol}/>
            } else if (symbol === "GLMR") {
                return <img src={GLMR} alt={symbol}/>
            } else if (symbol === "IBTC") {
                return <img src={IBTC} alt={symbol}/>
            } else if (symbol === "PDEX") {
                return <img src={PDEX} alt={symbol}/>
            } else if (symbol === "PHA") {
                return <img src={PHA} alt={symbol}/>
            } else if (symbol === "USDT") {
                return <img src={USDT} alt={symbol}/>
            } else {
                return <img src={UNKNOWN} alt={symbol}/>;
            }
        }).call(this)}
    </div>;
;}