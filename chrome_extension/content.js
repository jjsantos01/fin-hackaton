MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const ENDPOINT = 'https://lit-dusk-60294.herokuapp.com/api/v1/change-shift'

const makeChangeShiftRequest = () => {
    const dateElement = document.getElementsByClassName('amqcKf')[0]

    const spinner = document.getElementById("spinner");
    spinner.removeAttribute('hidden');

    fetch(ENDPOINT, {
        method: "post", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({
            user: document.getElementById('xUserEmail').innerText.split('@')[0],
            date: dateElement.previousSibling.textContent,
            time: dateElement.nextElementSibling.textContent,
        })
    }).then(response => response.json())
        .then(data => {
            localStorage.setItem('replacement', data.name)
            spinner.setAttribute('hidden', '')
            alert('Se envió el solicitud de cambio de turno')
            location.reload();
        }).catch(() => {
        spinner.setAttribute('hidden', '')
        alert('Algo salió mal con la solicitud. Por favor, inténtelo de nuevo más tarde.')
    })


}


const insertChangeShiftOption = () => {
    const eventTitleElement = document.getElementById('rAECCd')
    let spinner = document.getElementById('spinner')
    if (spinner == null) {
        spinner = document.createElement('div')
        spinner.innerHTML = '<div hidden id="spinner">';
        if (eventTitleElement) {
            eventTitleElement.parentNode.insertBefore(spinner, eventTitleElement.nextSibling);
        }
    }
    if (eventTitleElement) {
        const eventTitle = eventTitleElement.innerText
        if (eventTitle.startsWith('chat:')) {
            const responseOptions = document.getElementsByClassName('YWILgc NAFvr')[0];

            let changeOption = document.getElementById('changeOption');
            if (changeOption == null) {
                changeOption = document.createElement('div')
                changeOption.innerHTML = '<div class="Vwe4Vb MbhUzd" jsname="ksKsZd"></div><div class="ZFr60d CeoRYc"></div><span jsslot="" class="CwaK9"><span class="RveJvd snByac"><span class="AclISc">Cambiar turno</span></span></span>';
                changeOption.setAttribute('id', 'changeOption')
                changeOption.setAttribute('role', 'button')
                changeOption.setAttribute('class', 'U26fgb O0WRkf oG5Srb C0oVfc ZGVUP Ztzsdd KKjvXb M9Bg4d')
                changeOption.setAttribute('tabindex', '0');
                responseOptions.parentNode.insertBefore(changeOption, responseOptions.nextSibling);
                changeOption.onclick = makeChangeShiftRequest;
            }

        }
    }

};

const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        insertChangeShiftOption(mutation.target);
    });
});

observer.observe(document, {
    subtree: true, childList: true,
});




