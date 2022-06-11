<template>
  <button :class="[colorVariants, btnClass, loaderClass]" :display="display" :size="size" :disable="disabledButton" v-on="$listeners">
    <slot></slot>
    <div></div>
    <!-- <slot name="title"> </slot> -->
    <!-- <slot name="loader" :class="[loading ? loaderClass : null]"> </slot> -->
  </button>
</template>

<script>
export default {
  name: 'ButtonBlock',
  props: {
    tag: {
      type: String,
      default: 'button',
    },
    // color: {
    //   default: 'yellow',
    // },
    disable: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: 'small',
    },
    display: {
      type: String,
      default: 'block',
    },
    size: {
      type: String,
      default: 'small',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    variantType: {
      type: String,
      default: 'normal',
    },
  },
  data() {
    return {
      loading: false,
      disabledButton: this.disable,
    };
  },
  methods: {
    startLoading() {
      this.loading = true;
      this.disabledButton = true;
    },
    stopLoading() {
      this.loading = false;
      this.disabledButton = false;
    },
  },
  computed: {
    // colorBg() {
    //   return `bg-${this.color}-600`;
    // },
    btnClass() {
      return {
        'cursor-not-allowed opacity-50': this.disable == true,
        'text-sm': true,
        'rounded-lg': this.rounded === 'medium',
        rounded: this.rounded === 'small',
        'rounded-full': this.rounded === 'large',
        'px-6 py-3': this.size == 'normal',
        'px-4 py-2': this.size == 'small',
        'block w-full': this.display == 'block',
        'inline-block': this.display == 'in-block',
        inline: this.display == 'in',
      };
    },

    loaderClass() {
      return {
        'base-spinner': this.loading == true,
      };
    },
    colorVariants() {
      switch (this.variant) {
        case 'primary':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-primary opacity-25 disabled';
                  break;
                default:
                  break;
              }
              return `text-white bg-primary-m-primary hover:bg-primary-h-primary`;
              break;
            case 'outline':
              return `border border-primary-m-primary text-primary-m-primary bg-transparent  hover:hover:bg-primary-m-primary outline`;
              break;
            default:
              break;
          }
          break;
        case 'danger':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-danger opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-danger hover:bg-primary-h-m-danger';
              break;
            case 'outline':
              return 'border border-primary-m-danger text-primary-m-danger bg-transparent  hover:text-white hover:bg-primary-m-danger';
              break;
            default:
              break;
          }
          break;
        case 'warning':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-warrning opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-warning hover:bg-primary-h-warning';
              break;
            case 'outline':
              return 'border border-primary-m-warning text-primary-warning bg-transparent  hover:text-white hover:bg-primary-m-warning';
              break;
            default:
              break;
          }
          break;

        case 'info':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-info opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-info hover:bg-primary-h-info';
              break;
            case 'outline':
              return 'border border-primary-m-info text-primary-m-info bg-transparent  hover:text-white hover:bg-primary-m-info';
              break;
            default:
              break;
          }
          break;

        case 'success':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-success opacity-25 disabled';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-success hover:bg-primary-h-success normal';
              break;
            case 'outline':
              return 'border border-primary-m-success text-primary-m-success bg-transparent  hover:text-white hover:bg-primary-m-success outline';
              break;
            default:
              break;
          }
          break;

        case 'tertiary':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-tertiary opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-tertiary hover:bg-primary-h-tertiary';
              break;
            case 'outline':
              return 'border border-primary-m-tertiary text-primary-m-tertiary bg-transparent  hover:text-white hover:bg-primary-m-tertiary';
              break;
            default:
              break;
          }
          break;

        case 'secondary':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-secondary opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-secondary hover:bg-primary-h-secondary';
              break;
            case 'outline':
              return 'border border-primary-m-secondary text-white bg-transparent  hover:text-white hover:bg-primary-m-secondary';
              break;
            default:
              break;
          }
          break;

        case 'light':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-light opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-black bg-primary-m-light hover:bg-primary-h-light';
              break;
            case 'outline':
              return 'border border-primary-m-light text-primary-m-light bg-transparent  hover:text-black hover:bg-primary-m-light';
              break;
            default:
              break;
          }
          break;
        case 'dark':
          switch (this.variantType) {
            case 'normal':
              switch (this.disableButton) {
                case true:
                  return 'text-white bg-primary-m-dark opacity-25';
                  break;
                default:
                  break;
              }
              return 'text-white bg-primary-m-dark hover:bg-primary-h-dark';
              break;
            case 'outline':
              return 'border border-primary-m-dark text-primary-m-dark bg-transparent  hover:text-white hover:bg-primary-m-dark';
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.bg-yellow {
  background: var(--primary-yellow);
}

.bg-red {
  background: red;
}

@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
}

.base-spinner:before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: '';
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}

/* .loader {
  height: 2rem;
  width: 2rem;
  animation: loader-5-1 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

.loader:before {
  left: 0;
  right: auto;
  animation: loader-5-2 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

.loader:after,
.loader:before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: var(--loader-color, #1a2633);
  border-radius: 50%;
}

.loader:after {
  left: auto;
  right: 0;
  -webkit-animation: loader-5-3 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
  animation: loader-5-3 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

.loader span {
  height: 2rem;
  width: 2rem;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}

.loader span:before {
  top: 0;
  bottom: auto;
  animation: loader-5-4 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

.loader span:after,
.loader span:before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background-color: var(--loader-color, #1a2633);
  border-radius: 50%;
}

.loader span:after {
  top: auto;
  bottom: 0;
  animation: loader-5-5 2s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

@keyframes loader-5-1 {
  0% {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(1turn);
  }
}

@keyframes loader-5-2 {
  0% {
    transform: translateZ(0) scale(1);
  }

  50% {
    transform: translate3d(24px, 0, 0) scale(0.5);
  }

  to {
    transform: translateZ(0) scale(1);
  }
}

@keyframes loader-5-3 {
  0% {
    transform: translateZ(0) scale(1);
  }

  50% {
    transform: translate3d(-24px, 0, 0) scale(0.5);
  }

  to {
    transform: translateZ(0) scale(1);
  }
}

@keyframes loader-5-4 {
  0% {
    transform: translateZ(0) scale(1);
  }

  50% {
    transform: translate3d(0, 24px, 0) scale(0.5);
  }

  to {
    transform: translateZ(0) scale(1);
  }
}

@keyframes loader-5-5 {
  0% {
    transform: translateZ(0) scale(1);
  }

  50% {
    transform: translate3d(0, -24px, 0) scale(0.5);
  }

  to {
    transform: translateZ(0) scale(1);
  }
} */
</style>
