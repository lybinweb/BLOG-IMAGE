import Vue from './vue';

var vm = new Vue({
  data () {
    return {
      a: 1,
      b: [
        {
          id: 1,
          name: 'lyb'
        }
      ],
      c: {
        d: 2
      }
    }
  }
});

console.log(vm.a);
