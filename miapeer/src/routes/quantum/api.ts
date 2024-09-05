import { invalidate } from '$app/navigation';

const createAccount = async ({ portfolioId, accountName, unformattedStartingBalance }) => {
    if (!portfolioId || !accountName) {
        return;
    }

    const requestData = {
        portfolioId,
        accountName,
        startingBalance: unformattedStartingBalance || 0
    };
    const res = await fetch('/quantum/accounts/new', {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:accounts');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const updateAccount = async ({
    portfolioId,
    accountId,
    accountName,
    unformattedStartingBalance
}) => {
    if (!portfolioId || !accountId || !accountName) {
        return;
    }

    const requestData = {
        portfolioId,
        accountName,
        startingBalance: unformattedStartingBalance || 0
    };
    const res = await fetch(`/quantum/accounts/${accountId}`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:accounts');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createTransactionType = async ({ portfolioId, transactionTypeName }) => {
    if (!portfolioId || !transactionTypeName) {
        return;
    }

    const requestData = {
        portfolioId,
        transactionTypeName
    };
    const res = await fetch('/quantum/transactiontypes/new', {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:transactiontypes');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const updateTransactionType = async ({ portfolioId, transactionTypeId, transactionTypeName }) => {
    if (!portfolioId || !transactionTypeId || !transactionTypeName) {
        return;
    }

    const requestData = {
        portfolioId,
        transactionTypeName
    };
    const res = await fetch(`/quantum/transactiontypes/${transactionTypeId}`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:transactiontypes');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createPayee = async ({ portfolioId, payeeName }) => {
    if (!portfolioId || !payeeName) {
        return;
    }

    const requestData = {
        portfolioId,
        payeeName
    };
    const res = await fetch('/quantum/payees/new', {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:payees');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const updatePayee = async ({ portfolioId, payeeId, payeeName }) => {
    if (!portfolioId || !payeeId || !payeeName) {
        return;
    }

    const requestData = {
        portfolioId,
        payeeName
    };
    const res = await fetch(`/quantum/payees/${payeeId}`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:payees');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createCategory = async ({ portfolioId, categoryName }) => {
    if (!portfolioId || !categoryName) {
        return;
    }

    const requestData = {
        portfolioId,
        categoryName
    };

    const res = await fetch('/quantum/categories/new', {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:categories');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const updateCategory = async ({ portfolioId, categoryId, categoryName }) => {
    if (!portfolioId || !categoryId || !categoryName) {
        return;
    }

    const requestData = {
        portfolioId,
        categoryName
    };

    const res = await fetch(`/quantum/categories/${categoryId}`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        invalidate('quantum:categories');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createTransaction = async ({
    accountId,
    transactionTypeId,
    payeeId,
    categoryId,
    excludeFromForecast,
    amount,
    transactionDate,
    clearDate,
    checkNumber,
    notes
}) => {
    if (!accountId) {
        return;
    }

    const requestData = {
        transactionTypeId,
        payeeId,
        categoryId,
        excludeFromForecast,
        amount,
        transactionDate,
        clearDate,
        checkNumber,
        notes
    };

    const res = await fetch(`/quantum/accounts/${accountId}/transactions/new`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        console.error('NOT ok');
    }
};

const updateTransaction = async ({
    accountId,
    transactionId,
    transactionTypeId,
    payeeId,
    categoryId,
    excludeFromForecast,
    amount,
    transactionDate,
    clearDate,
    checkNumber,
    notes
}) => {
    if (!accountId || !transactionId) {
        return;
    }

    const requestData = {
        transactionTypeId,
        payeeId,
        categoryId,
        excludeFromForecast,
        amount,
        transactionDate,
        clearDate,
        checkNumber,
        notes
    };

    const res = await fetch(`/quantum/accounts/${accountId}/transactions/${transactionId}`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createScheduledTransaction = async ({
    accountId,
    transactionTypeId,
    payeeId,
    categoryId,
    fixedAmount,
    estimateOccurrences,
    promptDays,
    startDate,
    endDate,
    limitOccurrences,
    repeatOptionId,
    onAutopay,
    notes
}) => {
    if (!accountId) {
        return;
    }

    const requestData = {
        accountId,
        transactionTypeId,
        payeeId,
        categoryId,
        fixedAmount,
        estimateOccurrences,
        promptDays,
        startDate,
        endDate,
        limitOccurrences,
        repeatOptionId,
        onAutopay,
        notes
    };

    const res = await fetch(`/quantum/accounts/${accountId}/scheduledtransactions/new`, {
        method: 'POST',
        body: JSON.stringify(requestData)
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        console.error('NOT ok');
    }
};

const updateScheduledTransaction = async ({
    accountId,
    scheduledTransactionId,
    transactionTypeId,
    payeeId,
    categoryId,
    fixedAmount,
    estimateOccurrences,
    promptDays,
    startDate,
    endDate,
    limitOccurrences,
    repeatOptionId,
    onAutopay,
    notes
}) => {
    if (!accountId || !scheduledTransactionId) {
        return;
    }

    const requestData = {
        accountId,
        transactionTypeId,
        payeeId,
        categoryId,
        fixedAmount,
        estimateOccurrences,
        promptDays,
        startDate,
        endDate,
        limitOccurrences,
        repeatOptionId,
        onAutopay,
        notes
    };

    const res = await fetch(
        `/quantum/accounts/${accountId}/scheduledtransactions/${scheduledTransactionId}`,
        {
            method: 'POST',
            body: JSON.stringify(requestData)
        }
    );

    if (res.ok) {
        const data = await res.json();
        return data;
    } else {
        console.error('NOT ok');
    }
};

export {
    createAccount,
    updateAccount,
    createTransactionType,
    updateTransactionType,
    createPayee,
    updatePayee,
    createCategory,
    updateCategory,
    createTransaction,
    updateTransaction,
    createScheduledTransaction,
    updateScheduledTransaction
};
