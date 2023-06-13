const primeFormEl = document.querySelector('#primeForm');
const containerEl = document.querySelector('#container');

loadWebassembly('build/release.wasm')
    .then(module => {
        /**
         * @param {string} value
         * @return {number}
         */
        const isPrimenumber = module.instance.exports.isPrimenumber;

        primeFormEl.addEventListener('submit', (event) => {
            const isPrime = pipe(
                preventDefault,
                getFormValue,
                isPrimenumber
            )(event);

            updateContainerEl(isPrime ? 'This is a prime' : 'This is not a prime');
        });
    });

/**
 * @param {string} text
 */
function updateContainerEl(text) {
    containerEl.innerHTML = text;
}

/**
 * @param {any}
 * @return {any}
 */
function pipe(...functions) {
    return args => functions.reduce((arg, fn) => fn(arg), args);
}

/**
 * @param {Event} formEvent
 * @return {string}
 */
function getFormValue(formEvent) {
    return formEvent.target['prime'].value;
}

/**
 * @param {Event} event
 * @return {Event}
 */
function preventDefault(event) {
    event.preventDefault();
    return event;
}

/**
 * @param {string} filename
 * @return {Promise<WebAssembly.WebAssemblyInstantiatedSource>}
 */
async function loadWebassembly(filename) {
    const response = await fetch(filename);
    const buffer = await response.arrayBuffer();
    return await WebAssembly.instantiate(buffer, {
        env: {
            abort: () => { }
        }
    });
}