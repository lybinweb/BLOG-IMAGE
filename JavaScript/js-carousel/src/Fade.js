import './styles/reset.css';
import './styles/fade.scss';
import 'animate.css';
import Carousel from ".";

export default class Fade extends Carousel {
    constructor (el, { defaultIndex, duration}) {
        super(el);

        this.duration = duration;
        this._index = defaultIndex;

        this.init();
    }

    init () {
        this.show();
        this.bindEvent();
        this.play();
    }

    get currentIndex () {
        return this._index;
    }

    set currentIndex (newValue) {
        this.update(() => {
            this._index = newValue;
        });
    }

    bindEvent () {
        this.$el.addEventListener('mouseenter', this.handlerMouseEnter.bind(this), false);
        this.$el.addEventListener('mouseleave', this.handlerMouseLeave.bind(this), false);
        this.$dotWrapper.addEventListener('click', this.handlerDotClick.bind(this), false);
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
        }
    }

    show () {
        this.$imgWrappers[this.currentIndex].classList.remove('animate__fadeOut');
        this.$imgWrappers[this.currentIndex].classList.add('animate__fadeIn');
        this.$dots[this.currentIndex].classList.add('active');
    }

    hide () {
        this.$imgWrappers[this.currentIndex].classList.remove('animate__fadeIn');
        this.$imgWrappers[this.currentIndex].classList.add('animate__fadeOut');
        this.$dots[this.currentIndex].classList.remove('active');
    }

    play () {
        this.t = setInterval(() => {
            this.currentIndex >= this.$imgWrappers.length - 1
                              ? this.currentIndex =  0
                              : this.currentIndex ++;
        }, this.duration);
    }

    update (setIndex) {
        this.hide();
        setIndex();
        this.show();
    }
}