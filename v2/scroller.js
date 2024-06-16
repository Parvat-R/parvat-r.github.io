class ZoomScroller {
    constructor() {
        this.pages = document.querySelectorAll('.zoom-scroll');
        this.inView = 0;
        this.height = (this.pages.length*200);
    }

    setup() {
        var n = this.pages.length;
        document.body.style = 'position:realtive; height:'+ this.height +'vh; width: 100vh;'

        this.pages[this.inView].classList.add('show');
        for (var i = 0; i < n; i++) {
            if (this.inView == Math.floor(i/2)) {
                continue;
            }
            this.pages[Math.floor(i/2)].classList.add('hidden');
        }
        // document.addEventListener('scroll', this.scrollListener);
    }

    changeView(newIndex, oldIndex) {
        if (newIndex > oldIndex){

        }
        this.pages[newIndex].classList.add('show');
        this.pages[newIndex].classList.remove('hidden');
        this.pages[oldIndex].classList.add('hidden');
        this.pages[oldIndex].classList.remove('show');
    }

    scrollListener(event) {
        var scrollY = Math.abs(document.body.getBoundingClientRect().top);
        var pageNum = Math.floor((scrollY / (this.height)) / 2);
        console.log(pageNum)
        if (pageNum != this.inView) {
            this.changeView(pageNum, this.inView);
            this.inView = pageNum;
        }
    }
}


var zs = new ZoomScroller();
zs.setup();
document.addEventListener('scroll', (event)=>{
    zs.scrollListener(event);
});