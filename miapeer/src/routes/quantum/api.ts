import { invalidate } from '$app/navigation';

const createTransactionType = async ({ portfolioId, transactionTypeName }) => {
    if (!transactionTypeName) {
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
    if (!transactionTypeName) {
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
    if (!payeeName) {
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
    if (!payeeName) {
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
    if (!categoryName) {
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
    if (!categoryName) {
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
    scheduledTransactionId,
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

    const res = await fetch(
        `/quantum/accounts/${accountId}/transactions/${scheduledTransactionId}`,
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
    createTransactionType,
    updateTransactionType,
    createPayee,
    updatePayee,
    createCategory,
    updateCategory,
    createTransaction,
    updateTransaction
};
