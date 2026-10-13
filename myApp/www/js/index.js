document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log("Device is ready!");
    requestStoragePermissions();
    setupNavigation();
}

function requestStoragePermissions() {
    if (window.cordova && cordova.plugins && cordova.plugins.permissions) {
        const permissions = cordova.plugins.permissions;
        permissions.requestPermissions(
            [permissions.READ_EXTERNAL_STORAGE, permissions.WRITE_EXTERNAL_STORAGE],
            function(status) {
                if (status.hasPermission) {
                    console.log("Storage permission granted!");
                } else {
                    console.warn("Storage permission denied!");
                }
            },
            function(error) {
                console.error("Permission error: ", error);
            }
        );
    }
}

function setupNavigation() {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
        cards[0].focus();
    }

    cards.forEach(card => {
        card.addEventListener('click', function() {
            const name = this.querySelector('.name').innerText;
            alert('Selected: ' + name);
        });
    });

    document.addEventListener('keydown', function (e) {
        const focusable = Array.from(document.querySelectorAll('.card'));
        const index = focusable.indexOf(document.activeElement);

        if (index === -1 && focusable.length > 0) {
            focusable[0].focus();
            return;
        }

        switch (e.key) {
            case 'ArrowRight':
                if (index < focusable.length - 1) focusable[index + 1].focus();
                break;
            case 'ArrowLeft':
                if (index > 0) focusable[index - 1].focus();
                break;
            case 'ArrowDown':
                if (index + 2 < focusable.length) focusable[index + 2].focus();
                break;
            case 'ArrowUp':
                if (index - 2 >= 0) focusable[index - 2].focus();
                break;
            case 'Enter':
            case 'Select':
                if (document.activeElement) document.activeElement.click();
                break;
        }
    });
}
