import { invalidate } from '$app/navigation';

const createTransactionType = async (portfolioId, transactionTypeName) => {
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
        await invalidate('quantum:transactiontypes');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createPayee = async (portfolioId, payeeName) => {
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
        await invalidate('quantum:payees');
        return data;
    } else {
        console.error('NOT ok');
    }
};

const createCategory = async (portfolioId, categoryName) => {
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
        await invalidate('quantum:categories');
        return data;
    } else {
        console.error('NOT ok');
    }
};

export { createTransactionType, createPayee, createCategory };
