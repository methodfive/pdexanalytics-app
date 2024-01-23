import moment from "moment";

export function isEmpty(e) {
    return e == null || e.length === 0;
}

export function isString(value) {
    return typeof value === 'string' || value instanceof String
}

export function isNumber(value) {
    return typeof value == 'number' && !isNaN(value)
}

export function isBoolean(value) {
    return value === true || value === false
}

export function isNil(value) {
    return typeof value === 'undefined' || value === null
}

export function isDateString(value) {
    if (!isString(value)) return false

    return value.match(/^\d{2}-\d{2}-\d{4}$/)
}

export function removeLeadingZeros(array, fieldName)
{
    if(isEmpty(array))
        return;

    for(let i = 0; i < array.length; i++)
    {
        if(array[i][fieldName] !== 0)
            return array;
        else if(array[i][fieldName] === 0)
            array[i][fieldName] = null;
    }
    return array;
}

export function formatCurrency(number, decimalPlaces, decimalPlacesMax) {
    let newNumber = formatNumber(number, decimalPlaces, decimalPlacesMax);
    if(newNumber != null)
        return "$" + newNumber;
}

export function formatNumberRemoveZeros(number, decimalPlaces, decimalPlacesMax) {
    let result = formatNumber(number, decimalPlaces, decimalPlacesMax);
    result = result.replace('.00','');
    return result;
}

export function formatNumber(number, decimalPlaces, decimalPlacesMax) {
    if(isEmpty(number))
        return;

    number = Number(number);

    if(number < 10000)
    {
        let options = {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlacesMax || decimalPlaces
        };

        const formatter = Intl.NumberFormat("en-US", options);
        return formatter.format(number);
    }

    let options = {
        notation: "compact",
        compactDisplay: "short",
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
    };

    const formatter = Intl.NumberFormat("en-US", options);
    return formatter.format(number);
}


export function percentIncrease(a, b) {
    if(isEmpty(a) || isEmpty(b))
        return null;

    if(a === 0 && b === 0)
        return 0;

    if(b === 0)
        return 100;

    let percent = (a - b) / b * 100.0;
    return Math.trunc(percent*100)/100;
}

export const formatChartDateLabel = (d, interval) => {
    if(isEmpty(d))
        return;

    let date = new Date(Number(d));

    if(interval === "W")
    {
        return <>{formatChartDate(d)} - {moment.utc(new Date(Number(d) + (86400000 * 6)), "YYYY-MM-DD HH:mm:ss").format("MMM D YYYY")}</>
        //return <>{formatChartDate(d)} - {moment(new Date(Number(d) + (86400000 * 6)), "YYYY-MM-DD HH:mm:ss").format("MMM D YYYY")}</>
    } else if(interval === "M")
    {
        return moment.utc(date).format("MMM YYYY");
        //return moment(date, "YYYY-MM-DD HH:mm:ss").format("MMM YYYY")
    }

    return moment.utc(date).format("MMM D YYYY");
    //return moment(date, "YYYY-MM-DD HH:mm:ss").format("MMM D YYYY")
}


export const formatChartDate = (d, interval = "D") => {
    let format = interval === "M" ? "MMM" : "MMM D";

    //let date = new Date(Number(d));
    //return moment(date, "YYYY-MM-DD HH:mm:ss").format(format)
    return moment.utc(Number(d)).format(format);
}

export const formatChartNumber = (amount) => {
    return formatNumber(amount, 2);
}

export const groupByDateFormat = (data, format) => {
    return data.reduce(function(val, obj) {
        let comp = moment(new Date(Number(obj['d'])), 'MM/DD/YYYY').format(format);
        (val[comp] = val[comp] || []).push(obj);
        return val;
    }, {});
}

export const aggregateDataByGroup = (data, groupBy, dateFormatter) => {
    if(isEmpty(data))
        return;

    let results = [];
    for (const key in data) {
        let keyData = data[key];
        let keyParts = key.split("-");
        let r = {};
        r.d = dateFormatter(keyParts);
        r[groupBy] = 0;
        for(let i = 0; i < keyData.length; i++)
        {
            r[groupBy] += Number(keyData[i][groupBy]);
        }
        results.push(r);
    }
    return results;
}

export const fetchNewestRecord = (data, attribute) => {
    if(isEmpty(data))
        return;

    for (let i = data.length - 1; i >= 0; i--) {
        if(data[i][attribute] != null)
        {
            return {d: data[i].d, value: data[i][attribute]};
        }
    }
    return null;
}

export function utcToLocalDate(t) {
    if(t == null)
        return;

    let m = moment(Number(t));
    moment.updateLocale('en', {
        relativeTime : {
            future: 'in %s',
            past: '%s ago',
            s:  '1s',
            ss: '%ss',
            m:  '1m',
            mm: '%dm',
            h:  '1h',
            hh: '%dh',
            d:  '1d',
            dd: '%dd',
            M:  '1M',
            MM: '%dM',
            y:  '1Y',
            yy: '%dY'
        }
    });

    let fromNow = m.local().fromNow();
    if(fromNow.indexOf("s") !== -1)
        fromNow = "recently";
    return fromNow;
}

export function getViewport() {
    if(typeof window === "undefined" || typeof document === "undefined" ||
        document == null || document.documentElement == null)
        return;

    // https://stackoverflow.com/a/8876069
    const width = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    )
    if (width <= 576) return 'xs'
    if (width <= 768) return 'sm'
    if (width <= 992) return 'md'
    if (width <= 1200) return 'lg'
    if (width <= 1400) return 'xl'
    return 'xxl'
}

export function getPriceDecimalPointsForScreen()
{
    let maxDecimalPlaces = 6;
    let viewPortSize = getViewport();
    if(viewPortSize === "sm")
    {
        maxDecimalPlaces = 4;
    }
    else if(viewPortSize === "xs")
    {
        maxDecimalPlaces = 2;
    }
    return maxDecimalPlaces;
}