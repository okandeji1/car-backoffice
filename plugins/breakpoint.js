const DEFAULT_BREAKPOINT = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

const mediaQueryMixin = {
  install(Vue, { breakpoints = DEFAULT_BREAKPOINT } = {}) {
    Vue.mixin({
      data: function () {
        return {
          screens: {
            xs: false,
            sm: false,
            md: false,
            lg: false,
            xl: false,
          },
          $windowWidth: 0,
          $windowHeight: 0,
        };
      },
      mounted() {
        this.$nextTick(function () {
          window.addEventListener('resize', this.getWindowSize);
          this.getWindowSize();
        });
      },
      methods: {
        getWindowSize(event) {
          let w = document.documentElement.clientWidth;
          this.$windowWidth = w;
          let h = document.documentElement.clientHeight;
          this.$windowHeight = h;

          this.screens.xs = w < breakpoints.sm;
          this.screens.sm = w >= breakpoints.sm;
          this.screens.md = w >= breakpoints.md;
          this.screens.lg = w >= breakpoints.lg;
          this.screens.xl = w >= breakpoints.xl;
        },
      },
      beforeDestroy() {
        if (!this.$isServer) {
          window.removeEventListener('resize', this.getWindowSize);
        }
      },
    });
  },
};

export default mediaQueryMixin;
