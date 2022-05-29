MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const ENDPOINT = 'https://lit-dusk-60294.herokuapp.com/api/v1/change-shift'

const showLoading = () => {
    const spinner = document.getElementById("spinner");
    spinner.removeAttribute('hidden');
}

const hideLoading = () => {
    const spinner = document.getElementById("spinner");
    spinner.setAttribute('hidden', '')
}

const makeChangeShiftRequest = () => {
    // Extract date and time of the event
    const dateElement = document.getElementsByClassName('amqcKf')[0]

    showLoading();

    fetch(ENDPOINT, {
        method: "post", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({
            user: document.getElementById('xUserEmail').innerText.split('@')[0],
            date: dateElement.previousSibling.textContent,
            time: dateElement.nextElementSibling.textContent,
        })
    }).then(response => response.json())
        .then(() => {
            hideLoading();
            alert('Se envió el solicitud de cambio de turno')

            // Reload the page on successful change!
            location.reload();
        }).catch(() => {
        hideLoading();
        alert('Algo salió mal con la solicitud. Por favor, inténtelo de nuevo más tarde.')
    })

}

const insertSpinner = prevNode => {
    let spinner = document.getElementById('spinner')

    // Spinner already exists in the document
    if (spinner != null) {
        return;
    }

    spinner = document.createElement('div')
    spinner.innerHTML = '<div hidden id="spinner">';
    prevNode.parentNode.insertBefore(spinner, prevNode.nextSibling);
}

const insertChangeShiftButton = prevNode => {
    let changeOption = document.getElementById('changeOption');

    // Change option button already exists in the document
    if (changeOption != null) {
        return;
    }

    changeOption = document.createElement('div')
    // classes taken from gCal
    changeOption.innerHTML = '<div class="Vwe4Vb MbhUzd" ></div><div class="ZFr60d CeoRYc"></div><span class="CwaK9"><span class="RveJvd snByac"><span class="AclISc">Cambiar turno</span></span></span>';
    changeOption.setAttribute('id', 'changeOption')
    changeOption.setAttribute('role', 'button')
    changeOption.setAttribute('class', 'U26fgb O0WRkf oG5Srb C0oVfc ZGVUP Ztzsdd KKjvXb M9Bg4d')
    changeOption.setAttribute('tabindex', '0');
    changeOption.onclick = makeChangeShiftRequest;

    prevNode.parentNode.insertBefore(changeOption, prevNode.nextSibling);
}

const execute = () => {
    const eventTitleElement = document.getElementById('rAECCd')

    // Event details modal is closed or the event is not a support chat event
    if (eventTitleElement == null || !eventTitleElement.innerText.startsWith('chat:')) {
        return;
    }

    insertSpinner(eventTitleElement);

    const responseOptions = document.getElementsByClassName('YWILgc NAFvr')[0];
    insertChangeShiftButton(responseOptions);
};

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        execute(mutation.target);
    });
});

observer.observe(document, {
    subtree: true, childList: true,
});
