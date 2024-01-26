import React, {useRef, useState} from "react";
import {LineChartCard} from "./LineChartCard";
import html2canvas from "html2canvas";
import {BarChartCard} from "./BarChartCard";

export const ShareableChart = ({type, fileNamePrefix, title, data,
                                   dataKey, latestRecord, filterToday, allowGrouping,
                                   isCurrency = false,
                                   loading = null,
                                   yAxisDomain = null,
                                   suffix = null,
                                   yTickFormatter = null,
                                   labelFormatter = null}) => {
    const [shareClicked, setShareClicked] = useState(false);
    const [interval, setInterval] = useState(null);
    const sharedCardRef = useRef();

    const copyToClipboard = async function(pngBlob) {
        if(typeof navigator === "undefined" || typeof window === "undefined")
        {
            return;
        }

        try {
            await navigator.clipboard.write([
                new window.ClipboardItem({
                    [pngBlob.type]: pngBlob
                })
            ]);
            alert("Copied to clipboard. Paste on X to share.")
        } catch (error) {
            alert("Unable to copy to clipboard: " + error)
        }
    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const onShareClick = async function (e, interval) {
        if(shareClicked)
            return;

        setShareClicked(true);
        setInterval(interval);

        await sleep(100);

        if(typeof document !== "undefined") {
            const canvas = await html2canvas(sharedCardRef.current);
            canvas.toBlob(copyToClipboard, "image/png", 1);

            setShareClicked(false);
            setInterval(null);
        }
    };

    return <>
        {shareClicked &&
            <>
            <div ref={sharedCardRef} className="shared-card">
                <div className="shared-card-header">
                    <div className="row">
                        <div className="col-4">
                            <img src="/images/polkadex.png" alt="Polkadex Analytics" style={{width:"123px", height: "50px"}}/>
                        </div>
                        <div className="col-8 text-right url">
                            polkadex.trade&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;pdexanalytics.com
                        </div>
                    </div>
                </div>
                {type === "line" && <LineChartCard title={title}
                                          data={data}
                                          dataKey={dataKey}
                                          latestRecord={latestRecord}
                                          filterToday={filterToday}
                                          allowGrouping={allowGrouping}
                                          yTickFormatter={yTickFormatter}
                                          labelFormatter={labelFormatter}
                                          loading={loading}
                                          isShared={true}
                                          onShareClick={null}
                                          defaultInterval={interval}
                />}
                {type === "bar" && <BarChartCard title={title}
                                                   data={data}
                                                   dataKey={dataKey}
                                                   isCurrency={isCurrency}
                                                   latestRecord={latestRecord}
                                                   filterToday={filterToday}
                                                   allowGrouping={allowGrouping}
                                                   yTickFormatter={yTickFormatter}
                                                   labelFormatter={labelFormatter}
                                                   loading={loading}
                                                   yAxisDomain={yAxisDomain}
                                                   suffix={suffix}
                                                   isShared={true}
                                                   onShareClick={null}
                                                   defaultInterval={interval}
                />}
            </div>
                </>
        }

        {type === "line" && <LineChartCard title={title}
                       data={data}
                       dataKey={dataKey}
                       latestRecord={latestRecord}
                       filterToday={filterToday}
                       allowGrouping={allowGrouping}
                       yTickFormatter={yTickFormatter}
                       labelFormatter={labelFormatter}
                       loading={loading}
                       onShareClick={onShareClick}
        />}
        {type === "bar" && <BarChartCard title={title}
                                          data={data}
                                          dataKey={dataKey}
                                          isCurrency={isCurrency}
                                          latestRecord={latestRecord}
                                          filterToday={filterToday}
                                          allowGrouping={allowGrouping}
                                          yTickFormatter={yTickFormatter}
                                          labelFormatter={labelFormatter}
                                          loading={loading}
                                          yAxisDomain={yAxisDomain}
                                          suffix={suffix}
                                          onShareClick={onShareClick}
        />}
    </>;
}