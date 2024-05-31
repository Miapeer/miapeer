let portfolioId = null;

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ depends, locals }) {
    depends('quantum:accounts');
    depends('quantum:payees');
    depends('quantum:transactiontypes');

    await ensureUserHasPortfolio(locals);

    const accounts = await getUserAccounts(locals);
    const payees = await getUserPayees(locals);
    const transactionTypes = await getUserTransactionTypes(locals);

    return { portfolioId, accounts, payees, transactionTypes };
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
    const accountsResponse = await fetch(`${locals.app.quantumApiBase}/accounts/`, {
        headers: locals.auth.headers
    });

    if (!accountsResponse.ok) {
        console.error(accountsResponse.statusText);
        return;
    }

    return accountsResponse.json();
};

const getUserPayees = async (locals) => {
    const accountsResponse = await fetch(`${locals.app.quantumApiBase}/payees/`, {
        headers: locals.auth.headers
    });

    if (!accountsResponse.ok) {
        console.error(accountsResponse.statusText);
        return;
    }

    return accountsResponse.json();
};

const getUserTransactionTypes = async (locals) => {
    const accountsResponse = await fetch(`${locals.app.quantumApiBase}/transaction-types/`, {
        headers: locals.auth.headers
    });

    if (!accountsResponse.ok) {
        console.error(accountsResponse.statusText);
        return;
    }

    return accountsResponse.json();
};
