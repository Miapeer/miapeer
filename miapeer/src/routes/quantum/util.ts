const formatMoney = (amount) => {
    return (amount / 100).toLocaleString(navigator.language, { minimumFractionDigits: 2 });
};

const unformatMoney = (amount) => {
    if (!amount) {
        return null;
    }

    let amountNumber;
    if (amount instanceof String) {
        amountNumber = Number(amount.replace(/[^0-9\.-]+/g, ''));
    } else {
        amountNumber = amount;
    }

    return amountNumber.toFixed(2) * 100;
};

export { formatMoney, unformatMoney };
