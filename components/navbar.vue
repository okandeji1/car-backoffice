<template>
  <div class="navbar shadow-md bg-primary-m-secondary">
    <div class="flex items-center h-full px-4 py-4 mx-auto max-w-7xl md:px-6">
      <nav class="items-center hidden h-full gap-4 cursor-pointer md:flex">
        <div
        class="flex items-center justify-center flex-1 text-2xl text-white logo md:justify-start"
      >
        <nuxt-link to="/" class="text-white"> Car </nuxt-link>
      </div>
        <lazy-car-navbar-item v-for="(item, index) in navItem" :key="item + index" :title="item" class="text-white" :click="cli" />
      </nav>
      <div class="flex relative">
        <svg-icon name="close" v-if="getToggleMenu" class="text-white md:hidden w-4 h-4 cursor-pointer fill-current" @click="() => setToggleMenu()" />
        <svg-icon name="menu" v-else class="text-white md:hidden cursor-pointer w-4 h-4 fill-current" @click="() => setToggleMenu()" />
        <ul
          class="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          v-if="getToggleMenu"
        >
          <li class="text-xl w-full my-2 text-white">
            <svg-icon name="close" @click="() => setToggleMenu()" />
          </li>
          <lazy-car-navbar-item v-for="(item, index) in navItem" :key="item + index" :title="item" classProps="my-2 text-lg text-white" :click="cli" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
const navItem = ['car for sale', 'new cars', 'used cars', 'news & reviews', 'car comparisons'];

export default {
  computed: {
    ...mapGetters({
      getToggleMenu: 'settings/getToggleMenu',
    }),
  },

  data() {
    return {
      darkMode: false,
      scrolled: false,
      navItem,
      current: '#home',
      links: [
        {
          id: 1,
          name: 'Home',
          target: '#home',
        },
        {
          id: 6,
          name: 'About Us',
          target: '#aboutus',
        },
        {
          id: 4,
          name: 'Car',
          target: '#whoweare',
        },
        {
          id: 2,
          name: 'Our Services',
          target: '#services',
        },
        {
          id: 3,
          name: 'The Team',
          target: '#team',
        },

        {
          id: 5,
          name: 'Contact Us',
          target: '#contact',
        },
      ],
      menuDropdownIsOpen: false,
    };
  },

  methods: {
    cli(){
      alert('very good')
    },

    closeDropDownMenu() {
      this.menuDropdownIsOpen = false;
    },

    ...mapMutations({
      setToggleMenu: 'settings/setToggleMenu',
    }),
  },

  created() {},
};
</script>

<style lang="scss">
.navbar {
  min-height: 3.5rem;
  z-index: 50;
  border-style: none;
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 999;
  @apply text-white;
}

.active {
  color: '#dd4f46';
  /* @apply text-secondary; */
}

.slide-in-from-y {
  // transform: translateY(-100px);
  transition: slidenow 2s ease-in;
}

@keyframes slidenow {
  0% {
    transform: translateY(-20px);
    opacity: 0.1;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
