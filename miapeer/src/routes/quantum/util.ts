const findItemInObjectById = (objectCollection, searchField, searchValue) => {
    for (let key in objectCollection) {
        let item = objectCollection[key];
        if (item[searchField] === searchValue) {
            return item;
        }
    }

    return null;
};

const convertArrayToObject = (array, key) => {
    let returnObject = {};

    array.forEach((item) => {
        returnObject[item[key]] = item;
    });

    return returnObject;
};

const formatMoney = (amount) => {
    return (amount / 100).toLocaleString(navigator.language, { minimumFractionDigits: 2 });
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

    return parseInt(amountNumber.toFixed(2) * 100);
};

const unformatDate = (dateString) => {
    if (!dateString) {
        return null;
    }

    let returnValue = new Date(dateString);
    return returnValue.toISOString().split('T')[0];
};

export { findItemInObjectById, convertArrayToObject, formatMoney, unformatMoney, unformatDate };
