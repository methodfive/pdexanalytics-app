import React from "react";
import {isEmpty} from "../util/Util";
import ASTR from './icons/ASTR.svg';
import DOT from './icons/DOT.svg';
import GLMR from './icons/GLMR.svg';
import IBTC from './icons/IBTC.svg';
import PDEX from './icons/PDEX.svg';
import PHA from './icons/PHA.svg';
import USDT from './icons/USDT.svg';
import USDC from './icons/USDC.svg';
import VDOT from './icons/VDOT.svg';
import BNC from './icons/BNC.svg';
import PINK from './icons/PINK.svg';
import DED from './icons/DED.svg';
import UNQ from './icons/UNQ.svg';
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
            } else if (symbol === "PINK") {
                return <img src={PINK} alt={symbol}/>
            } else if (symbol === "DED") {
                return <img src={DED} alt={symbol}/>
            } else if (symbol === "USDC") {
                return <img src={USDC} alt={symbol}/>
            } else if (symbol === "vDOT") {
                return <img src={VDOT} alt={symbol}/>
            } else if (symbol === "UNQ") {
                return <img src={UNQ} alt={symbol}/>
            } else if (symbol === "BNC") {
                return <img src={BNC} alt={symbol}/>
            } else {
                return <img src={UNKNOWN} alt={symbol}/>;
            }
        }).call(this)}
    </div>;
;}