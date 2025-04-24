import { MailcheckPlusPlus } from "../js/modules/mailcheck-plus-plus.js";

const emailInput = document.getElementById('email');
const suggestion = document.getElementById('suggestion');

emailInput.addEventListener('blur', () => {
    const email = emailInput.value;

    const mailcheckPlusPlus = new MailcheckPlusPlus();

    mailcheckPlusPlus.run({
        email: email,

        suggested: function (suggestionObj) {
            suggestion.textContent = `Did you mean: ${suggestionObj.full}?`;
        },

        empty: function () {
            suggestion.textContent = '';
        }
    });
});
