export function msieversion() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
        return true;
    }

    return false;
}

export function isSafari(){
    var ua = navigator.userAgent.toLowerCase(); 
    if (ua.indexOf('safari') != -1) { 
        if (ua.indexOf('chrome') > -1) {
            return false;
        } else {
            return true;
        }
    }

    return false;
}

export function isFirefox(){
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
        return true;
    }

    return false;
}