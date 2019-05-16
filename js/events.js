const EVENT_MAIN_CONTAINER = $('<div/>', {
    class: "z-depth-2",
    id: "event-shadow-id",
})

const EVENT_CARD_HORIZONTAL_CONTAINER = $('<div/>', {
    class: "card horizontal",
    name: "event-container",
})

const EVENT_CARD_DATE_CONTAINER = $('<div/>', {
    class: "event-date-container",
    id: "event-date-id"
})

const EVENT_DATE_BLUE_CONTAINER = $('<div/>', {
    class: "event-data-blue-container",
})

const EVENT_DATE_TEXT = $('<p/>', {
    class: "event-date",
    style: "font-size: 18px; color: #ffffff"
})

const EVENT_CARD_STACKED_CONTAINER = $('<div/>', {
    class: "card-stacked"
})

const EVENT_CARD_CONTENT_CONTAINER = $('<div/>', {
    class: "card-content",
    id: "event-card-content-id"
})

const EVENT_TITLE_TEXT = $('<p/>', {
    class: "event-title",
})

const EVENT_TORRE_LOGO = $('<img/>', {
    class: "event-torre-logo"
})


//Number of news card to show
const EVENT_CARD_NUMBER = 4

const EVENT_URL = 'GOOLE_CALENDARE_JSON_FILE_URL'


const eventRequest = async (poolCallback, themeCallback) => {
    try {
        const response = await fetch(EVENT_URL)
        const data = await response.json()

        let eventDateList = new Array()
        let eventTitleList = new Array()
        let eventDescriptionList = new Array()
        let eventLocationList = new Array()

        data.forEach(element => {
            eventTitleList.push(element.summary)
            eventDescriptionList.push(element.description)
            eventLocationList.push(element.location)
            var d = new Date(0);
            d.setUTCSeconds(element.start)
            eventDateList.push(d)
        })

        let i = 0

        while (i < EVENT_CARD_NUMBER) {

            $("#event-container-id")
                .append(EVENT_MAIN_CONTAINER
                    .append(EVENT_CARD_HORIZONTAL_CONTAINER
                        .append(EVENT_CARD_DATE_CONTAINER
                            .append(EVENT_DATE_BLUE_CONTAINER
                                .append(EVENT_DATE_TEXT)), EVENT_CARD_STACKED_CONTAINER
                                    .append(EVENT_CARD_CONTENT_CONTAINER
                                        .append(EVENT_TITLE_TEXT))))
                    .clone());

            i++

        }

        let eventDateTextList = document.getElementsByClassName('event-date')
        let eventTitletextList = document.getElementsByClassName('event-title')


        for (i = 0; i < EVENT_CARD_NUMBER; i++) {

            let eventDateToForm = eventDateList[i].toString().split(' ')
            eventDateToForm = "<b>" + eventDateToForm[2] + "<br/>" + eventDateToForm[1] + "</b>"
            let eventTimeToForm = eventDateList[i].toString().split(' ')[4].split(':')
            eventTimeToForm = '<p style="font-size: 14px">Time: ' + eventTimeToForm[0] + ":" + eventTimeToForm[1] + "</p>"

            let eventTitleToForm = "<b>" + eventTitleList[i] + "</b>" + eventTimeToForm

            eventDateTextList[i].innerHTML = eventDateToForm
            eventTitletextList[i].innerHTML = eventTitleToForm
        }

    } catch (err) {
        $("#event-container-id")
            .append(EVENT_MAIN_CONTAINER
                .append(EVENT_CARD_HORIZONTAL_CONTAINER
                    .append(EVENT_TORRE_LOGO)))

        let logo = document.getElementsByClassName("event-torre-logo")
        let newsContainer = document.getElementsByName("event-container")
        newsContainer[0].setAttribute("style", "height: 340px;")
        logo[0].setAttribute("src", "res/favicon.ico")
        logo[0].setAttribute("style", "margin: auto; display: block;")
    }

    poolCallback(themeCallback)
}
