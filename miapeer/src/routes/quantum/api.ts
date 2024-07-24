import { invalidate } from '$app/navigation';

const createTransactionType = async (portfolioId, transactionTypeName) => {
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
    } else {
        console.error('NOT ok');
    }
};

const createPayee = async (portfolioId, payeeName) => {
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
    } else {
        console.error('NOT ok');
    }
};

const createCategory = async (portfolioId, categoryName) => {
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
    } else {
        console.error('NOT ok');
    }
};

export { createTransactionType, createPayee, createCategory };
