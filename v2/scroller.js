class ZoomScroller {
    constructor() {
        this.pages = document.querySelectorAll('.zoom-scroll');
        this.inView = 0;
        this.height = (this.pages.length*200);
    }

    setup() {
        var n = this.pages.length;
        document.body.style = 'position:realtive; height:'+ this.height +'vh;';

        for (var i = 0; i < n; i++) {
            if (this.inView == i) {
                continue;
            }
            this.pages[i].classList.add('hidden');
            if (this.inView > i) {
                this.pages[i].classList.add('scrolled-out');
            } else {
                this.pages[i].classList.add('scrolled-in');
            }
        }
        this.pages[this.inView].classList.add('show');
        // document.addEventListener('scroll', this.scrollListener);
    }

    changeView(newIndex, oldIndex) {
        if (newIndex > oldIndex){
            this.pages[oldIndex].classList.remove('scrolled-in');
            this.pages[oldIndex].classList.add('scrolled-out');
        } else {
            this.pages[oldIndex].classList.remove('scrolled-out');
            this.pages[oldIndex].classList.add('scrolled-in');
        }
        this.pages[newIndex].classList.remove('hidden');
        this.pages[newIndex].classList.add('show');
        this.pages[oldIndex].classList.remove('show');
        this.pages[oldIndex].classList.add('hidden');
    }

    scrollListener(event) {
        var scrollY = Math.abs(document.body.getBoundingClientRect().top);
        var pageNum = Math.floor((scrollY / (this.height)) / 2);
        if (pageNum < this.pages.length) {
            if (pageNum != this.inView) {
                this.changeView(pageNum, this.inView);
                this.inView = pageNum;
            }
        }
    }
}


var zs = new ZoomScroller();
zs.setup();
document.addEventListener('scroll', (event)=>{
    zs.scrollListener(event);
});