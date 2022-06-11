<template>
  <div>
    <span>better print</span>
    <button @click="print('BN0G-NUD-9NUD')">Print</button>
  </div>
</template>
<script>
export default {
  layout: 'test',
  data() {
    return {
      posFive: {
        selections: [],
        betslip: {
          combinations: [],
          type: 'SINGLE',
          gameType: 'n3',
          stake: 100,
          totalStake: 100,
          totalOdds: {
            min: 0,
            max: 0,
          },
          bonus: {
            min: 0,
            max: 0,
            percentage: 10,
          },
          winning: {
            min: 0,
            max: 0,
          },
          totalWinning: {
            min: 0,
            max: 0,
          },
        },
      },
    };
  },
  methods: {
    print(ticketId) {
      const previousFrame = document.querySelector('#print-bet');
      previousFrame?.parentNode.removeChild(previousFrame);

      const iframe = document.createElement('iframe');
      iframe.setAttribute('id', 'print-bet');
      iframe.setAttribute('style', 'height: 100%');
      iframe.setAttribute('frameborder', '0');
      iframe.src = `${this.$config.apiUrl}/api/v1/sportbook/pool/bas/bets/print?ticketId=${ticketId}&x-api-key=${this.$config.apiKey}`;
      document.body.appendChild(iframe);
    },
  },
};
</script>
<style scoped>
.cont {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100vh;
}
</style>
