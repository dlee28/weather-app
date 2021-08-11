const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');


messageOne.textContent = 'Please Make a Search ... ';


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    console.log(location);

    const fetchUrl = '/weather?address=' + encodeURIComponent(location);
    fetch(fetchUrl).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
                messageThree.textContent = data.precip;
                messageFour.textContent = data.windSpeed;
            };
        });
    });
});