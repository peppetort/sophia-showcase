const NEWS_MAIN_CONTAINER = $('<div/>', {
    class: "z-depth-2",
    id: "news-shadow-id"
})

const NEWS_CARD_HORIZONTAL_CONTAINER = $('<div/>', {
    class: "card horizontal",
    name: "news-container"
})

const NEWS_CARD_IMAGE_CONTAINER = $('<div/>', {
    class: "card-image"
})

const NEWS_IMAGE_OBJ = $('<img/>', {
    class: "news-image",
    style: "height: 100px; width: 100px; border-radius: 10px 10px 10px 10px; object-fit: cover; margin: 5px;"
})

const NEWS_QRCODE_OBJ = $('<div/>', {
    class: "news-qrcode",
    style: "margin-top: 10px; margin-left: 5px; margin-bottom: 10px"
})

const NEWS_CARD_STACKED_CONTAINER = $('<div/>', {
    class: "card-stacked"
})

const NEWS_CARD_CONTENT_CONTAINER = $('<div/>', {
    class: "card-content",
    id: "news-card-content-id",
})

const NEWS_TITLE_TEXT = $('<p/>', {
    class: "news-title",
})

const NEWS_SOURCE_LOGO_CONTAINER = $('<div/>', {
    class: "news-souce-logo-container",
})

const NEWS_SOURCE_LOGO_OBJ = $('<img/>', {
    src: "res/ansa.png",
    style: "height: 20px;width: auto;border-radius:5px"
})

const NEWS_INFO_CONTAINER = $('<div/>', {
    class: "news-info-container",
})

const NEWS_INFO_TEXT = $('<p/>', {
    class: "news-info",
})

const NEWS_TORRE_LOGO = $('<img/>', {
    class: "torre-logo"
})

//Number of news card to show
const NEWS_CARD_NUMBER = 6

//Api Key
const NEWS_API_KEY = 'NEWSAPI.ORG_API_KEY'

const NEWS_URL = 'https://newsapi.org/v2/top-headlines?' + 'sources=SOURCES (EX. ansa&)' + NEWS_API_KEY

const newsRequest = async (eventsCallback, poolCallback, themeCallback) => {
    try {
        const response = await fetch(NEWS_URL)
        const data = await response.json()

        for (i = 0; i < NEWS_CARD_NUMBER; i++) {

            $("#news-column")
                .append(NEWS_MAIN_CONTAINER
                    .append(NEWS_CARD_HORIZONTAL_CONTAINER
                        .append(NEWS_CARD_IMAGE_CONTAINER
                            .append(NEWS_IMAGE_OBJ, NEWS_QRCODE_OBJ), NEWS_CARD_STACKED_CONTAINER
                                .append(NEWS_SOURCE_LOGO_CONTAINER
                                    .append(NEWS_SOURCE_LOGO_OBJ), NEWS_CARD_CONTENT_CONTAINER
                                        .append(NEWS_TITLE_TEXT), NEWS_INFO_CONTAINER
                                            .append(NEWS_INFO_TEXT))))
                    .clone())

        }

        let news = data.articles

        let newsImgList = document.getElementsByClassName("news-image")
        let newsTitleList = document.getElementsByClassName("news-title")
        let newsInfoList = document.getElementsByClassName("news-info")
        let newsQrcodeList = document.getElementsByClassName("news-qrcode")
        let newsInfoContainerList = document.getElementsByClassName("news-info-container")

        let newsInfoSrc
        let newsQrcodeUrl
        let newsTitleSrc
        let newsImageUrl
        let newsPublishTime
        let newsFormattedPublishTime
        let newsFormattedTitle


        for (i = 0; i < NEWS_CARD_NUMBER; i++) {

            newsTitleSrc = news[i].title
            newsImageUrl = news[i].urlToImage
            newsInfoSrc = news[i].content
            newsQrcodeUrl = news[i].url
            newsPublishTime = news[i].publishedAt

            let newsPublishTimeMinutes = new Date(newsPublishTime).getMinutes()

            if (Number(newsPublishTimeMinutes) >= 0 && Number(newsPublishTimeMinutes) < 10) {
                newsPublishTimeMinutes = 0 + newsPublishTimeMinutes.toString()
            }


            newsFormattedPublishTime = new Date(newsPublishTime).getHours() + ':' + newsPublishTimeMinutes
            newsFormattedTitle = "<b>" + newsTitleSrc + "</b>" + '<b class="news-time"> • ' + newsFormattedPublishTime + '</b>'

            newsImgList[i].setAttribute("src", newsImageUrl)
            newsTitleList[i].innerHTML = newsFormattedTitle.toString().replace(' - Ultima Ora', '')
            newsInfoList[i].innerHTML = newsInfoSrc.toString().replace(/\[(.*)\]/, '')

            new QRCode(newsQrcodeList[i], {
                text: newsQrcodeUrl,
                width: 100,
                height: 100,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.L
            });

        }


        Array.from(newsQrcodeList).forEach(element => {
            element.style.display = 'none'
        })

        Array.from(newsInfoContainerList).forEach(element => {
            element.style.display = 'none'
        })

        let curIndex = 0

        newsQrcodeList[0].style.display = 'block'
        newsInfoContainerList[0].style.display = 'block'

        function timeout() {
            setTimeout(() => {

                curIndex = (curIndex + 1) % NEWS_CARD_NUMBER

                // Show new 
                newsQrcodeList[curIndex].style.display = 'block'
                newsInfoContainerList[curIndex].style.display = 'block'

                // Hide old
                if (curIndex === 0) {
                    newsQrcodeList[NEWS_CARD_NUMBER - 1].style.display = 'none'
                    newsInfoContainerList[NEWS_CARD_NUMBER - 1].style.display = 'none'
                } else {
                    newsQrcodeList[curIndex - 1].style.display = 'none'
                    newsInfoContainerList[curIndex - 1].style.display = 'none'
                }

                timeout()
            }, 8000)
        }

        timeout()

    } catch (err) {
        $("#news-column")
            .append(NEWS_MAIN_CONTAINER
                .append(NEWS_CARD_HORIZONTAL_CONTAINER
                    .append(NEWS_TORRE_LOGO)))

        let logo = document.getElementsByClassName("torre-logo")
        let newsContainer = document.getElementsByName("news-container")
        newsContainer[0].setAttribute("style", "height: 850px;")
        logo[0].setAttribute("src", "res/favicon.ico")
        logo[0].setAttribute("style", "margin: auto; display: block;")

    }

    eventsCallback(poolCallback, themeCallback)

}
