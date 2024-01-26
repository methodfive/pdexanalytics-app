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

    function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        let byteString = atob(dataURI.split(',')[1]);

        // separate out the mime component
        let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

        // write the bytes of the string to an ArrayBuffer
        let ab = new ArrayBuffer(byteString.length);

        // create a view into the buffer
        let ia = new Uint8Array(ab);

        // set the bytes of the buffer to the correct values
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        let blob = new Blob([ab], {type: mimeString});
        return blob;

    }

    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const onShareClick = async function (e, interval) {
        if(shareClicked || typeof navigator === "undefined" || typeof window === "undefined")
        {
            return;
        }

        setShareClicked(true);
        setInterval(interval);

        const makeImagePromise = async () => {
            await sleep(100);
            const canvas = await html2canvas(sharedCardRef.current);
            return dataURItoBlob(canvas.toDataURL("image/png", 1));
        }

        await navigator.clipboard.write([
            new window.ClipboardItem({
                "image/png": makeImagePromise()
            })
        ]).then(function () { alert("Copied to clipboard! Paste on X to share!"); })
            .catch(function (error) { alert("Unable to copy to clipboard:" + error) });

        setShareClicked(false);
        setInterval(null);
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