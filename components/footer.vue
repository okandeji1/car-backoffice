<template>
  <div id="footer">
    <footer class="text-center border-t bg-primary-m-secondary">
      <div class="mx-auto px-6 md:flex md:items-center md:justify-between md:px-8">
        <div class="flex justify-center space-x-3 md:order-2">
          <a href="#" target="_blank" rel="noopener" class="footer-link"
            ><span class="sr-only">Twitter</span>
            <svg-icon class="w-6 h-6 fill-current" name="twitter"></svg-icon>
          </a>
          <a href="#" target="_blank" rel="noopener" class="footer-link"
            ><span class="sr-only">Facebook</span>
            <svg-icon class="w-6 h-6 fill-current" name="facebook"></svg-icon>
          </a>
          <a href="#" target="_blank" rel="noopener" class="footer-link"
            ><span class="sr-only">Google</span>
            <svg-icon class="w-6 h-6 fill-current" name="google-box"></svg-icon>
          </a>
        </div>
        <div class="mt-3 md:mt-0 md:order-1">
          <p class="text-base text-center">© 2022 Car Ltd all right reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    currentYear() {
      let today = new Date();
      return today.getFullYear();
    },
  },
};
</script>

<style lang="scss" scoped></style>
