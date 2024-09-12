import { convertArrayToObject } from './util.js';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ depends, locals }) {
    depends('quantum:accounts');
    depends('quantum:payees');
    depends('quantum:transactiontypes');
    depends('quantum:categories');

    let portfolioId = await ensureUserHasPortfolio(locals);

    const accounts = await getUserAccounts(locals);
    const indexedAccounts = convertArrayToObject(accounts, 'account_id');

    const payees = await getUserPayees(locals);
    const indexedPayees = convertArrayToObject(payees, 'payee_id');

    const transactionTypes = await getUserTransactionTypes(locals);
    const indexedTransactionTypes = convertArrayToObject(transactionTypes, 'transaction_type_id');

    const categories = await getUserCategories(locals);
    const indexedCategories = convertArrayToObject(categories, 'category_id');

    const repeatOptions = await getRepeatOptions(locals);
    const indexedRepeatOptions = convertArrayToObject(repeatOptions, 'repeat_option_id');

    return {
        portfolioId,
        accounts,
        indexedAccounts,
        payees,
        indexedPayees,
        transactionTypes,
        indexedTransactionTypes,
        categories,
        indexedCategories,
        repeatOptions,
        indexedRepeatOptions
    };
}

const ensureUserHasPortfolio = async (locals) => {
    // Portfolios
    const portfoliosResponse = await fetch(`${locals.app.quantumApiBase}/portfolios`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!portfoliosResponse.ok) {
        console.error(portfoliosResponse.statusText);
        return;
    }

    const portfolios = await portfoliosResponse.json();

    if (portfolios.length === 0) {
        const newPortfolio = await createUserPortfolio(locals);
        return newPortfolio.portfolio_id;
    } else {
        return portfolios[0].portfolio_id;
    }
};

const createUserPortfolio = async (locals) => {
    const createPortfolioResponse = await fetch(`${locals.app.quantumApiBase}/portfolios`, {
        method: 'POST',
        headers: locals.auth.headers,
        body: '{}'
    });

    if (!createPortfolioResponse.ok) {
        console.error(createPortfolioResponse.statusText);
        return;
    }

    return await createPortfolioResponse.json();
};

const getUserAccounts = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/accounts`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    return data;
};

const getUserPayees = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/payees`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    return data;
};

const getUserTransactionTypes = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/transaction-types`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    return data;
};

const getUserCategories = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/categories`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    return data;
};

const getRepeatOptions = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/repeat-options`, {
        method: 'GET',
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    return data;
};
