let portfolioId = null;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ depends, locals }) {
    depends('quantum:accounts');
    depends('quantum:payees');
    depends('quantum:transactiontypes');
    depends('quantum:categories');

    await ensureUserHasPortfolio(locals);

    const accounts = await getUserAccounts(locals);
    const payees = await getUserPayees(locals);
    const transactionTypes = await getUserTransactionTypes(locals);
    const categories = await getUserCategories(locals);
    const repeatOptions = await getRepeatOptions(locals);

    return { portfolioId, accounts, payees, transactionTypes, categories, repeatOptions };
}

const ensureUserHasPortfolio = async (locals) => {
    // Portfolios
    const portfoliosResponse = await fetch(`${locals.app.quantumApiBase}/portfolios/`, {
        headers: locals.auth.headers
    });

    if (!portfoliosResponse.ok) {
        console.error(portfoliosResponse.statusText);
        return;
    }

    const portfolios = await portfoliosResponse.json();

    if (portfolios.length === 0) {
        const newPortfolio = await createUserPortfolio(locals);
        portfolioId = newPortfolio.portfolio_id;
    } else if (portfolios[0].portfolio_id !== portfolioId) {
        portfolioId = portfolios[0].portfolio_id;
    }
};

const createUserPortfolio = async (locals) => {
    const createPortfolioResponse = await fetch(`${locals.app.quantumApiBase}/portfolios/`, {
        headers: locals.auth.headers,
        method: 'POST',
        body: '{}'
    });

    if (!createPortfolioResponse.ok) {
        console.error(createPortfolioResponse.statusText);
        return;
    }

    return await createPortfolioResponse.json();
};

const getUserAccounts = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/accounts/`, {
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    const indexedData = convertArrayToObject(data, 'account_id');
    return indexedData;
};

const getUserPayees = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/payees/`, {
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    const indexedData = convertArrayToObject(data, 'payee_id');
    return indexedData;
};

const getUserTransactionTypes = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/transaction-types/`, {
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    const indexedData = convertArrayToObject(data, 'transaction_type_id');
    return indexedData;
};

const getUserCategories = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/categories/`, {
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    const indexedData = convertArrayToObject(data, 'category_id');
    return indexedData;
};

const getRepeatOptions = async (locals) => {
    const response = await fetch(`${locals.app.quantumApiBase}/repeat-options/`, {
        headers: locals.auth.headers
    });

    if (!response.ok) {
        console.error(response.statusText);
        return;
    }

    const data = await response.json();
    const indexedData = convertArrayToObject(data, 'repeat_option_id');
    return indexedData;
};

const convertArrayToObject = (array, key) => {
    let returnObject = {};

    array.forEach((item) => {
        returnObject[item[key]] = item;
    });

    return returnObject === {} ? null : returnObject;
};
