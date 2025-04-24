import { MailcheckPlusPlus } from "../js/modules/mailcheck-plus-plus.js";

const emailInput = document.getElementById('email');
const suggestion = document.getElementById('suggestion');

emailInput.addEventListener('blur', () => {
    const result = MailcheckPlusPlus.checkEmail(emailInput.value);

    suggestion.textContent = result ? 
        `Did you mean: ${result.full}?` : 
        'No suggestions available.';
});
