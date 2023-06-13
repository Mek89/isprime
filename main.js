const primeFormEl = document.querySelector('#primeForm');
const containerEl = document.querySelector('#container');

loadWebassembly('build/release.wasm')
    .then(module => {
        const isPrimenumber = module.instance.exports.isPrimenumber;

        primeFormEl.addEventListener('submit', (event) => {
            const isPrime = pipe(
                preventDefault,
                getFormValue,
                isPrimenumber
            )(event);

            containerEl.innerHTML = isPrime ? 'This is a prime' : 'This is not a prime'
        });
    });

function pipe(...functions) {
    return args => functions.reduce((arg, fn) => fn(arg), args);
}

function getFormValue(formEvent) {
    return formEvent.target['prime'].value;
}

function preventDefault(event) {
    event.preventDefault();
    return event;
}

function loadWebassembly(filename) {
    return fetch(filename)
        .then(response => response.arrayBuffer())
        .then(buffer => WebAssembly.instantiate(buffer, {
            env: {
                abort: () => { }
            }
        }));
}