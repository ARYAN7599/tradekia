
export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flex: '1 0 auto',
        margin: theme.spacing(1),
    },
}));
export function valueLabelFormat(value) {
    const units = ['Minute', 'Hours', 'Days', 'Weeks', 'Month'];
    let unitIndex = 0;
    let scaledValue = value;
    let checkvalue = 60;
    while (scaledValue >= checkvalue && unitIndex < units.length - 1) {
        unitIndex += 1;
        console.log("hhhhhh", units[unitIndex]);
        if (units[unitIndex] === 'Minute') {
            checkvalue = 60;
        } else if (units[unitIndex] === 'Hours') {
            checkvalue = 24;
            scaledValue = scaledValue - 59;
        } else if (units[unitIndex] === 'Days') {
            checkvalue = 7;
            scaledValue = scaledValue - 23;
        } else if (units[unitIndex] === 'Weeks') {
            checkvalue = 3;
            scaledValue = scaledValue - 6;
        } else if (units[unitIndex] === 'Month') {
            checkvalue = 2;
            scaledValue = scaledValue - 2;
        }
    }
    return `${scaledValue} ${units[unitIndex]}`;
}

export function calculateValue(value) {
    return value;
}
export  function valueLabelFormatForPra(value) {
    let scaledValue = value;
    return scaledValue + ' (%)USDT';

}
export function calculateValueForPra(value) {
    return value;
}

export function valueLabelFormatForPraSail(value) {
    let scaledValue = value;
    return scaledValue + ' (%)USDT';

}
export function calculateValueForPraSail(value) {
    return value;
}
export function valueLabelFormatForLSaleTime(value) {
    const units = ['Minute', 'Hours', 'Days', 'Weeks', 'Month'];
    let unitIndex = 0;
    let scaledValue = value;
    let checkvalue = 60;
    while (scaledValue >= checkvalue && unitIndex < units.length - 1) {
        unitIndex += 1;
        if (units[unitIndex] === 'Minute') {
            checkvalue = 60;
        } else if (units[unitIndex] === 'Hours') {
            checkvalue = 24;
            scaledValue = scaledValue - 59;
        } else if (units[unitIndex] === 'Days') {
            checkvalue = 7;
            scaledValue = scaledValue - 23;
        } else if (units[unitIndex] === 'Weeks') {
            checkvalue = 3;
            scaledValue = scaledValue - 6;
        } else if (units[unitIndex] === 'Month') {
            checkvalue = 2;
            scaledValue = scaledValue - 2;
        }
    }
    return `${scaledValue} ${units[unitIndex]}`;
}

export function calculateValueForLSaleTime(value) {
    return value;
}


export function dateAdd(date, interval, units) {
    if(!(date instanceof Date))
      return undefined;
    var ret = new Date(date); //don't change original date
    var checkRollover = function() { if(ret.getDate() != date.getDate()) ret.setDate(0);};
    switch(String(interval).toLowerCase()) {
    //  case 'year'   :  ret.setFullYear(ret.getFullYear() + units); checkRollover();  break;
//case 'quarter':  ret.setMonth(ret.getMonth() + 3*units); checkRollover();  break;
      case 'month'  :  ret.setMonth(ret.getMonth() + units); checkRollover();  break;
      case 'weeks'   :  ret.setDate(ret.getDate() + 7*units);  break;
      case 'days'    :  ret.setDate(ret.getDate() + units);  break;
      case 'hours'   :  ret.setTime(ret.getTime() + units*3600000);  break;
      case 'minutes' :  ret.setTime(ret.getTime() + units*60000);  break;
      case 'second' :  ret.setTime(ret.getTime() + units*1000);  break;
      default       :  ret = undefined;  break;
    }
    return ret;
  }
///Market sections 
export function valueLabelFormatMar(value) {
    const units = ['Minutes', 'Hours', 'Days', 'Weeks', 'Month'];
    let unitIndex = 0;
    let scaledValue = value;
    let checkvalue = 60;
    while (scaledValue >= checkvalue && unitIndex < units.length - 1) {
        unitIndex += 1;
        if (units[unitIndex] === 'Minutes') {
            checkvalue = 60;
        } else if (units[unitIndex] === 'Hours') {
            checkvalue = 24;
            scaledValue = scaledValue - 59;
        } else if (units[unitIndex] === 'Days') {
            checkvalue = 7;
            scaledValue = scaledValue - 23;
        } else if (units[unitIndex] === 'Weeks') {
            checkvalue = 3;
            scaledValue = scaledValue - 6;
        } else if (units[unitIndex] === 'Month') {
            checkvalue = 2;
            scaledValue = scaledValue - 2;
        }
    }
    let d= new Date(); 
    let exdate=dateAdd(d,units[unitIndex],scaledValue);
    setMarbyexprytime(exdate.toLocaleString());

    return `${scaledValue} ${units[unitIndex]}`;
}

export function calculateValueMar(value) {
    return value;
}
export function valueLabelFormatForPraMar(value) {
    let scaledValue = value;
    return scaledValue + ' (%)USDT';

}
export function calculateValueForPraMar(value) {
    return value;
}

export function valueLabelFormatForPraSailMar(value) {
    let scaledValue = value;
    return scaledValue + ' (%)USDT';

}
export function calculateValueForPraSailMar(value) {
    return value;
}
 export function valueLabelFormatForMarSaleTime(value) {
    const units = ['Minute', 'Hours', 'Days', 'Weeks', 'Month'];
    let unitIndex = 0;
    let scaledValue = value;
    let checkvalue = 60;
    while (scaledValue >= checkvalue && unitIndex < units.length - 1) {
        unitIndex += 1;
        console.log("hhhhhh", units[unitIndex]);
        if (units[unitIndex] === 'Minute') {
            checkvalue = 60;
        } else if (units[unitIndex] === 'Hours') {
            checkvalue = 24;
            scaledValue = scaledValue - 59;
        } else if (units[unitIndex] === 'Days') {
            checkvalue = 7;
            scaledValue = scaledValue - 23;
        } else if (units[unitIndex] === 'Weeks') {
            checkvalue = 3;
            scaledValue = scaledValue - 6;
        } else if (units[unitIndex] === 'Month') {
            checkvalue = 2;
            scaledValue = scaledValue - 2;
        }
    }
    return `${scaledValue} ${units[unitIndex]}`;
}

export function calculateValueForMarSaleTime(value) {
    return value;
}