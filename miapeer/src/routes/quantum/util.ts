function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const convertArrayToObject = (array, key) => {
    let returnObject = {};

    for (let index = 0; index < array.length; ++index) {
        const item = array[index];
        returnObject[item[key]] = item;
    }

    return returnObject;
};

const formatMoney = (amount) => {
    return ((amount || 0) / 100).toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

const unformatMoney = (amount) => {
    if (!amount) {
        return null;
    }

    let amountNumber;
    if (typeof amount === 'string') {
        amountNumber = Number(amount.replace(/[^0-9\.-]+/g, ''));
    } else {
        amountNumber = amount;
    }

    return Math.round(amountNumber.toFixed(2) * 100);
};

const formatDate = (dateString, formatOptions = {}) => {
    if (!dateString) {
        return null;
    }

    return new Date(dateString).toLocaleDateString(navigator.language, {
        timeZone: 'UTC',
        ...formatOptions
    });
};

const unformatDate = (dateString) => {
    if (!dateString) {
        return null;
    }

    let returnValue = new Date(dateString);
    return returnValue.toISOString().split('T')[0];
};

export { sleep, convertArrayToObject, formatMoney, unformatMoney, formatDate, unformatDate };
