import React, {useRef, useState} from "react";
import {
    copyToClipboard,
} from "../../util/Util";
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

    const onShareClick = async function (interval) {
        if(shareClicked)
            return;

        setShareClicked(true);
        setInterval(interval);

        setTimeout(async function () {
            if(typeof document !== "undefined") {
                const canvas = await html2canvas(sharedCardRef.current);

                //const data = canvas.toDataURL('image/png');
                canvas.toBlob(copyToClipboard, "image/png", 1);
/*
                let selectedDataUrl = document.createElement('textarea');
                document.body.appendChild(selectedDataUrl);
                selectedDataUrl.value = data;
                selectedDataUrl.select();
                try {
                    let successful = document.execCommand('copy');
                    let msg = successful ? 'successful' : 'unsuccessful';
                    alert('Copying to Clipboard was ' + msg);
                } catch (err) {
                    alert('Oops, unable to copy');
                }
                document.body.removeChild(selectedDataUrl);
*/
                /*const link = document.createElement('a');

                if (typeof link.download === 'string') {
                    link.href = data;
                    link.download = fileNamePrefix + '-' + getDateForExportFileName() + '.png';

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    window.open(data);
                }*/


                setShareClicked(false);
                setInterval(null);
            }
        }, 10)

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