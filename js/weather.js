initWeather = function (d, s, id, dark) {

    let elem = document.getElementById('weather_widget');

    if (dark) {
      elem.setAttribute('data-theme', 'gray');
      elem.setAttribute('data-basecolor', '#212121');
    } else {
      elem.setAttribute('data-theme', 'pure'); 
    }

    var js, fjs = d.getElementsByTagName(s)[0];

    if (!d.getElementById(id)) {
      js = d.createElement(s); js.id = id;
      js.src = 'https://weatherwidget.io/js/widget.min.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }