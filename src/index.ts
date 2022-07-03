/**
 * Allows user to implement functionality for text that contains cloze-tested/deleted text, together with styles
 * contained within module.
 *
 * Example:
 * <p class="clozed-sentence-container">The pepper is very<span class="clozed-word" data-word="spicy">_____</span></p>
 */

const CLOZED_PLACEHOLDER = '_____';
const REVEALED_CLASS = 'revealed';
const CLOZED_NAMESPACE_CLASS = 'clozed';

/**
 * Sets up all clozed sentences on page
 */
export const initialize = () => {
    document.addEventListener('DOMContentLoaded', () => {
        clickListener();
    });
};

/**
 * Handles revealing a clozed word when a user clicks on the text
 */
const clickListener = () => {
    const tags = document.getElementsByClassName(`${CLOZED_NAMESPACE_CLASS}-sentence-container`);

    for (let tag of tags) {
        tag.addEventListener('click', (event: Event) => {
            const target = event.target as HTMLElement;

            if (target.classList.contains(`${CLOZED_NAMESPACE_CLASS}-word`)) {
                if (target.classList.contains(REVEALED_CLASS)) {
                    clozed(target);
                } else {
                    uncloze(target);
                }

            }
        });
    }
};

/**
 * Reveals clozed text
 * @param {HTMLElement} target Container for clozed text that was clicked on
 */
const uncloze = (target: HTMLElement) => {
    target.textContent = target.dataset.word || '';
    target.classList.add('revealed');
};

/**
 * Hides clozed text for another reveal
 * @param {HTMLElement} target Container for clozed text that was clicked on
 */
const clozed = (target: HTMLElement) => {
    target.textContent = CLOZED_PLACEHOLDER;
    target.classList.remove(REVEALED_CLASS);
};
