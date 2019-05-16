const POOL_LOGO_CONTAINER = $('<div/>', {
    class: "pool-logo-container",
    style: "padding: 10px"
})

const POOL_LOGO = $('<i/>', {
    class: "fas fa-swimmer",
    id: "pool-logo"
})

const CARD_STACKED = $('<div/>', {
    class: "card-stacked"
})

const CARD_CONTENT = $('<div/>', {
    class: "card-content"
})

const POOL_STATUS = $('<p/>', {
    class: "pool-status",
})

const POOL_TORRE_LOGO = $('<img/>', {
    class: "pool-torre-logo"
})

const POOL_URL = 'JSON_SERVER_URL'
const MORNING_START_TIME = 7
const MORNING_END_TIME = 12
const EVENING_START_TIME = 14
const EVENING_END_TIME = 19

const poolRequest = async (callback) => {
    try {

        const response = await fetch(POOL_URL)
        const data = await response.json()

        let open = data[0].isOpen
        let date = new Date()

        $("#pool-card")
            .append(POOL_LOGO_CONTAINER
                .append(POOL_LOGO), CARD_STACKED
                    .append(CARD_CONTENT
                        .append(POOL_STATUS)))

        let poolLogo = document.getElementById("pool-logo")
        let text = document.getElementsByClassName("pool-status")
        let poolTimes = '<p style="font-size: 13px">• 7:00-12:00</br>• 14:00-19:00</p>'

        if (open) {

            if ((date.getHours() >= MORNING_START_TIME && date.getHours() < MORNING_END_TIME) | (date.getHours() >= EVENING_START_TIME && date.getHours() < EVENING_END_TIME)) {
                poolLogo.setAttribute("style", "font-size: 40px;color: green")
                text[0].innerHTML = '<b>' + 'Piscina aperta' + '</b>' + poolTimes
            } else {
                poolLogo.setAttribute("style", "font-size: 40px;color: #c62828")
                text[0].innerHTML = '<b>' + 'Piscina chiusa' + '</b>' + poolTimes
            }

        } else {
            poolLogo.setAttribute("style", "font-size: 40px;color: #c62828")
            text[0].innerHTML = '<b>' + 'Piscina in manutenzione' + '</b>'
        }

    } catch (err) {
        console.log(err)
        $("#pool-card")
            .append(POOL_TORRE_LOGO)

        let logo = document.getElementsByClassName("pool-torre-logo")
        logo[0].setAttribute("src", "/res/favicon.ico")
        logo[0].setAttribute("style", "margin: auto; display: block; width: 40px")

    }

    if(typeof(callback) !== "undefined"){
        callback()
    }
}

function pooltimeout(){
    setTimeout(() => {
        poolRequest()
        pooltimeout()
    }, 5000)
}

pooltimeout()