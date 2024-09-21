import { invalidate } from '$app/navigation';
import { applyAction, deserialize } from '$app/forms';

const deleteAccount = async (targetElement) => {
    const data = new FormData(targetElement);

    const response = await fetch(targetElement.action, {
        method: 'POST',
        body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if (result.type === 'success') {
        invalidate('quantum:accounts');
    } else {
        console.error('NOT ok');
    }

    applyAction(result);
};

const deleteTransactionType = async (targetElement) => {
    const data = new FormData(targetElement);

    const response = await fetch(targetElement.action, {
        method: 'POST',
        body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if (result.type === 'success') {
        invalidate('quantum:transactiontypes');
    } else {
        console.error('NOT ok');
    }

    applyAction(result);
};

const deletePayee = async (targetElement) => {
    const data = new FormData(targetElement);

    const response = await fetch(targetElement.action, {
        method: 'POST',
        body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if (result.type === 'success') {
        invalidate('quantum:payees');
    } else {
        console.error('NOT ok');
    }

    applyAction(result);
};

const deleteCategory = async (targetElement) => {
    const data = new FormData(targetElement);

    const response = await fetch(targetElement.action, {
        method: 'POST',
        body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    if (result.type === 'success') {
        invalidate('quantum:categories');
    } else {
        console.error('NOT ok');
    }

    applyAction(result);
};

export { deleteAccount, deleteTransactionType, deletePayee, deleteCategory };
