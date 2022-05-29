MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

const ENDPOINT = 'https://lit-dusk-60294.herokuapp.com/api/v1/change-shift'

// const changeTitleToUncertain = () => {
//     const eventTitleElement = document.getElementById('rAECCd');
//     const eventTitle = eventTitleElement.innerText
//     const parts = eventTitle.split(',')
//     parts[1] = parts[1] + ' (?)';
//     const newTitle = parts.join(',');
//     eventTitleElement.innerText = newTitle;
//
//     const eventTitleBaseElement = document.getElementsByClassName('FAxxKc');
//     for (let item of eventTitleBaseElement) {
//         if (item.innerText === localStorage.getItem('fintualOriginalShiftInfo')) {
//             item.innerText = newTitle;
//         }
//     }
//
//     localStorage.setItem('fintualChangeShiftState', '2');
// }
//
// const changeTitleToNewPerson = () => {
//
//     const oldTitle = localStorage.getItem('fintualOriginalShiftInfo');
//     console.log(oldTitle);
//     const parts = oldTitle.split(',');
//     parts[1] = ' marcelo (reemplazando a ' + parts[1] + ')';
//     const newTitle = parts.join(',');
//
//     const eventTitleBaseElement = document.getElementsByClassName('FAxxKc');
//     for (let item of eventTitleBaseElement) {
//         console.log(item.innerText);
//         if (item.innerText === oldTitle) {
//             console.log('going to change')
//             item.innerText = newTitle;
//         }
//     }
//
//     localStorage.setItem('fintualChangeShiftState', '3');
//
// }

const makeChangeShiftRequest = (originalShiftInfo) => {
    const dateElement = document.getElementsByClassName('amqcKf')[0]

    const spinner = document.getElementById("spinner");
    spinner.removeAttribute('hidden');

    fetch(ENDPOINT, {
        method: "post", headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json'
        }, body: JSON.stringify({
            user: originalShiftInfo.split(',')[1].trim(),
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
        eventTitleElement.parentNode.insertBefore(spinner, eventTitleElement.nextSibling);
    }
    if (eventTitleElement) {
        const eventTitle = eventTitleElement.innerText
        if (eventTitle.startsWith('chat:')) {
            const responseOptions = document.getElementsByClassName('YWILgc NAFvr')[0];

            let changeOption = document.getElementById('changeOption');
            if (changeOption == null) {
                // changeOption = document.createElement('div')
                // changeOption.innerHTML = '<div id="changeOption" role="button" class="U26fgb O0WRkf oG5Srb C0oVfc ZGVUP Ztzsdd KKjvXb M9Bg4d" jslog="122571; track:JIbuQc" jscontroller="VXdfxd"  jsname="lezaG" aria-label="Se ha seleccionado Responder &quot;Sí&quot;" aria-disabled="false" tabindex="0" ><div class="Vwe4Vb MbhUzd" jsname="ksKsZd"></div><div class="ZFr60d CeoRYc"></div><span jsslot="" class="CwaK9"><span class="RveJvd snByac"><span class="AclISc">Cambiar turno</span></span></span></div>';
                changeOption = $('<div id="changeOption" role="button" class="U26fgb O0WRkf oG5Srb C0oVfc ZGVUP Ztzsdd KKjvXb M9Bg4d" jslog="122571; track:JIbuQc" jscontroller="VXdfxd"  jsname="lezaG" aria-label="Se ha seleccionado Responder &quot;Sí&quot;" aria-disabled="false" tabindex="0" ><div class="Vwe4Vb MbhUzd" jsname="ksKsZd"></div><div class="ZFr60d CeoRYc"></div><span jsslot="" class="CwaK9"><span class="RveJvd snByac"><span class="AclISc">Cambiar turno</span></span></span></div>');
                changeOption.insertAfter(responseOptions);

                changeOption.click(function () {
                    makeChangeShiftRequest(eventTitle)
                });
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




