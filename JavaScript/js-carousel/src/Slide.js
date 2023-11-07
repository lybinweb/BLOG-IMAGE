import './styles/reset.css';
import './styles/slide.scss';
import Carousel from ".";

export default class Slide extends Carousel {
    constructor (el, { defaultIndex , duration}) {
        super(el);

        this.$imgStage = this.$el.querySelector('.img-stage');

        this.duration = duration;
        this._index = defaultIndex;
        this.imgWidth = this.$imgWrappers[0].offsetWidth;

        this.init();
    }

    get currentIndex () {
        return this._index;
    }

    set currentIndex (newValue) {
        this.update(() => {
            this._index = newValue;
        });
    }

    init () {
        this.update(null, true);
        this.clone();
        this.bindEvent();
        this.play();
    }

    update (setIndex, isInitial) {
        let currentIndex;

        if (!isInitial) {
            currentIndex = this.currentIndex >= this.$imgWrappers.length - 1 ? 0 : this.currentIndex;
            this.$dots[currentIndex].classList.remove('active');
            setIndex();
        }

        currentIndex = this.currentIndex >= this.$imgWrappers.length - 1 ? 0 : this.currentIndex;
        this.$dots[currentIndex].classList.add('active');

    }

    play () {
        this.t = setInterval(() => {
            this.currentIndex ++;
            this.slide();

            if (this.currentIndex >= this.$imgWrappers.length - 1) {
                this.currentIndex = 0;
                this.reset();
            }
        }, this.duration);
    }

    slide () {
        this.$imgStage.style.transition = 'transform .3s';
        this.$imgStage.style.transform = `translate3d(${ - this.currentIndex * this.imgWidth }px, 0, 0)`;
    }

    reset () {
        setTimeout(() => {
            this.$imgStage.style.transition = 'none';
            this.$imgStage.style.transform = `translate3d(0, 0, 0)`;
        }, 500);
    }

    clone () {
        const clonedNode = this.$imgWrappers[0].cloneNode(true);
        this.$imgStage.appendChild(clonedNode);
    }

    handlerMouseEnter () {
        clearInterval(this.t);
    }

    handlerMouseLeave () {
        this.play();
    }

    handlerDotClick (e) {
        const tar = e.target;

        if (tar.className === 'dot') {
            this.currentIndex = [].indexOf.call(this.$dots, tar);
            this.slide();
        }
    }
}