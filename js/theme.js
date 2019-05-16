function applyTheme() {

    const DARCK_BACKGROUND_COLOR = 'rgb(44, 44, 44)'
    const LIGHT_BACKGROUND_COLOR = 'rgb(220, 220, 220)'
    const MIN_DAY_TIME = 7
    const MAX_DAY_TIME = 20

    let date = new Date();
    let lastColor = document.cookie

    let container = document.getElementsByName('container')
    let newsContainer = document.getElementsByName('news-container')
    let eventContainer = document.getElementsByName('event-container')
    let newsTitleTextToFormat = document.getElementsByClassName('news-title')
    let newsTimeTextToFormat = document.getElementsByClassName("news-time")
    let newsInfoTextToFormat = document.getElementsByClassName('news-info')
    let eventTitleTextToFormat = document.getElementsByClassName('event-title')
    let poolStatusText = document.getElementsByClassName('pool-status')

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    async function changecolorAnim(currentColor) {

        let i;
        let r = currentColor.substring(4, currentColor.length - 1).replace(/ /g, '').split(',')[0]
        let g = currentColor.substring(4, currentColor.length - 1).replace(/ /g, '').split(',')[1]
        let b = currentColor.substring(4, currentColor.length - 1).replace(/ /g, '').split(',')[2]

        if (currentColor == DARCK_BACKGROUND_COLOR) {
            for (i = 179; i >= 0; i--) {
                r++
                g++
                b++
                document.body.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'
                await sleep(3)
            }
        } else {
            for (i = 179; i >= 0; i--) {
                r--
                g--
                b--
                document.body.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')'
                await sleep(3)
            }
        }

        $(".row").show()
    }


    function generateTwitter(twitterTeme) {

        let twitterElement = document.createElement("a")
        let twitterScript = document.createElement("script")
        let inserPointDivId = document.getElementById("top")

        twitterElement.setAttribute("class", "twitter-timeline")
        twitterElement.setAttribute("href", "https://twitter.com/TorrescallaMI/lists/milano")
        twitterElement.setAttribute("data-chrome", "nofooter noheader noborders noscrollbar transparent")
        twitterElement.setAttribute("data-theme", twitterTeme)

        twitterScript.setAttribute("async", "")
        twitterScript.setAttribute("src", "https://platform.twitter.com/widgets.js")
        twitterScript.setAttribute("charset", "utf-8")

        inserPointDivId.parentNode.insertBefore(twitterElement, inserPointDivId.nextSibling)
        twitterElement.parentNode.insertBefore(twitterScript, twitterElement.nextSibling)
    }



    if (date.getHours() >= MIN_DAY_TIME && date.getHours() < MAX_DAY_TIME) {

        //LIGHT THEME

        if (lastColor == '') {
            document.body.style.backgroundColor = LIGHT_BACKGROUND_COLOR;
            document.cookie = 'theme=light';
        } else if (lastColor == 'theme=dark') {
            changecolorAnim(DARCK_BACKGROUND_COLOR);
            document.cookie = "theme=light";
        } else {
            document.body.style.backgroundColor = LIGHT_BACKGROUND_COLOR;
        }


        //CONTAINER: news, weather, events, twitter
        Array.from(container).forEach(element => {
            element.setAttribute('class', 'card grey lighten-5')
        })
        Array.from(newsContainer).forEach(element => {
            element.setAttribute('class', 'card horizontal grey lighten-5')
        })
        Array.from(eventContainer).forEach(element => {
            element.setAttribute('class', 'card horizontal grey lighten-5')
        })

        try {
            //TEXT: news titles, news info, news time, event titles, event description, event location, event tag
            Array.from(newsTitleTextToFormat).forEach(element => {
                element.setAttribute("style", "font-size: 16px; color: #000000")
            });
            Array.from(newsTimeTextToFormat).forEach(element => {
                element.setAttribute("style", "font-size: 13px; color: #616161")
            });
            Array.from(newsInfoTextToFormat).forEach(element => {
                element.setAttribute("style", "color: #424242")
            })
        } catch (err) {
            console.log(err)
        }

        try {
            Array.from(eventTitleTextToFormat).forEach(element => {
                element.setAttribute("style", "font-size: 18px; color: #000000")
            })
        } catch (err) {
            console.log(err)
        }

        try {
            //TEXT: pool status
            poolStatusText[0].setAttribute("style", "font-size: 18px; color: #000000")

        } catch (err) {
            console.log(err)
        }
        //WEATHER
        initWeather(document, 'script', 'weatherwidget-io-js', false)

        //TWITTER
        generateTwitter("light")

        if (lastColor != 'theme=dark') {
            $(".row").show()
        }



    } else {

        //DARK THEME

        if (lastColor == '') {
            document.body.style.backgroundColor = DARCK_BACKGROUND_COLOR;
            document.cookie = 'theme=dark';
        } else if (lastColor == 'theme=light') {
            changecolorAnim(LIGHT_BACKGROUND_COLOR);
            document.cookie = "theme=dark";
        } else {
            document.body.style.backgroundColor = DARCK_BACKGROUND_COLOR;
        }



        //CONTAINER: news, metro, events, twitter
        Array.from(container).forEach(element => {
            element.setAttribute('class', 'card grey darken-4')
        })
        Array.from(newsContainer).forEach(element => {
            element.setAttribute('class', 'card horizontal grey darken-4')
        })
        Array.from(eventContainer).forEach(element => {
            element.setAttribute('class', 'card horizontal grey darken-4')
        })

        try {
            //TEXT: news titles, news info, news time, event titles, event description, event location
            Array.from(newsTitleTextToFormat).forEach(element => {
                element.setAttribute("style", "font-size: 16px; color: #ffffff")
            })
            Array.from(newsTimeTextToFormat).forEach(element => {
                element.setAttribute("style", "font-size: 13px; color: #e0e0e0")
            })
            Array.from(newsInfoTextToFormat).forEach(element => {
                element.setAttribute("style", "color: #e0e0e0")
            })
        } catch (err) {
            console.log(err)
        }

        try {
            Array.from(eventTitleTextToFormat).forEach(element => {
                element.setAttribute("style", "font-size: 18px; color: #ffffff")
            })
        } catch (err) {
            console.log(err)
        }

        try {
            //TEXT: pool status
            poolStatusText[0].setAttribute("style", "font-size: 18px; color: #ffffff")
        } catch (err) {
            console.log(err)
        }

        //WEATHER CONTENT
        initWeather(document, 'script', 'weatherwidget-io-js', true)

        //TWITTER
        generateTwitter("dark")

        if (lastColor != 'theme=light') {
            $(".row").show()
        }


    }

}