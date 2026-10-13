document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Fire TV Explorer initialized.');

    // Enable smooth remote navigation across file cards
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        cards[0].focus(); // Focus the first item automatically
    }

    // Handle TV Remote D-Pad / Keyboard Events
    document.addEventListener('keydown', function (e) {
        const active = document.activeElement;
        
        if (e.key === 'Enter' || e.keyCode === 13) {
            if (active && active.classList.contains('card')) {
                const name = active.querySelector('.name').innerText;
                alert('Opened: ' + name);
            }
        }
    });
}
