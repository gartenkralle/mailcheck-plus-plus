import { MailcheckPlusPlus } from "../js/modules/mailcheck-plus-plus.js";

const emailInput = document.getElementById('email');
const suggestion = document.getElementById('suggestion');

emailInput.addEventListener('blur', () => {
    const email = emailInput.value;

    const mailcheckPlusPlus = new MailcheckPlusPlus();

    const result = mailcheckPlusPlus.run({
        email: email
    });

    suggestion.innerHTML = result ? 
        `Did you mean: <strong>${result.full}</strong>?` : 
        'No suggestions available.';
});
