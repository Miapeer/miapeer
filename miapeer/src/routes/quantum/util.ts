const formatMoney = (amount) => {
    return (amount / 100).toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

const unformatMoney = (amountString) => {
    if (!amountString) {
        return null;
    }

    return Number(amountString.replace(/[^0-9\.-]+/g, '')).toFixed(2) * 100;
};

export { formatMoney, unformatMoney };
