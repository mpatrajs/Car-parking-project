// Set starting value of counter to 0
if (!localStorage.getItem('counter'))
    localStorage.setItem('counter', 0);

// Load current value of  counter
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#counter').innerHTML = localStorage.getItem('counter');

    // Count every time button is clicked
    document.querySelector('button').onclick = () => {
        // Increment current counter
        let counter = localStorage.getItem('counter');
        counter++;
        if (counter > 4) {
            counter = 0;
        }

        // Update counter
        document.querySelector('#counter').innerHTML = counter;
        localStorage.setItem('counter', counter);
    }
});
var variable = 2;
