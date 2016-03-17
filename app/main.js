import LineElement from './scripts/LineElement';
class Main{
    init(){
        this.loadCss();
    }

    loadCss(){
        require('bootstrap-loader');
    }
}

var main = new Main();
main.init();