$(document).ready(function () {

    let divToScroll = document.getElementById('d4')
    let startDiv = document.getElementById('top');
    let endPos = 5353

    let pos = 0 

    function timeout() {
        setTimeout(() => {

            if (pos < endPos) {

                pos += 800
                divToScroll.scroll(0,pos);

            } else {
                divToScroll.scrollIntoView(startDiv)
                pos = 0
            }

            timeout()
        }, 10000)
    }

    timeout()

})