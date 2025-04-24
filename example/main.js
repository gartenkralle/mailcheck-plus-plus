import { MailcheckPlusPlus } from "../js/modules/mailcheck-plus-plus.js";

const emailInput = document.getElementById('email');
const suggestion = document.getElementById('suggestion');

emailInput.addEventListener('blur', () => {
    const mailcheckPlusPlus = new MailcheckPlusPlus();

    const result = mailcheckPlusPlus.run(emailInput.value);

    suggestion.innerHTML = result ? 
        `Did you mean: <strong>${result.full}</strong>?` : 
        'No suggestions available.';
});
