<template>
  <div class="flex items-center justify-between mx-2">
    <svg-icon name="excel" class="w-6 h-6 mr-4 fill-current cursor-pointer" @click="exportToExcel(csvData)"></svg-icon>
    <svg-icon name="csv" class="w-6 h-6 mr-4 fill-current cursor-pointer" @click="exportToCSV(csvData)"></svg-icon>
    <!-- <a-button class="mr-4 text-white bg-primary-m-success" :disabled="csvData.disabled" @click="exportToExcel(csvData)"> EXCEL </a-button>
    <a-button class="text-white bg-primary-m-danger" :disabled="csvData.disabled" @click="exportToCSV(csvData)"> CSV </a-button> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import * as FileSaver from 'file-saver';
import * as Excel from 'exceljs';
import { processingReportData } from '~/utils/utils';

export default Vue.extend({
  props: {
    csvData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    // Export to excel
    async exportToExcel(csvData: any) {
      const fileEXT = '.xlsx';
      const workbook = new Excel.Workbook(); // Create a workbook
      processingReportData(csvData, workbook);
      // Keep in mind that reading and writing is promise based.
      workbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'array' });
        FileSaver.saveAs(blob, csvData.fileName + fileEXT);
      });
    },

    // Export to csv
    async exportToCSV(csvData: any) {
      const fileEXT = '.csv';
      const workbook = new Excel.Workbook(); // Create a workbook
      processingReportData(csvData, workbook);
      // Keep in mind that reading and writing is promise based.
      workbook.csv.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'array' });
        FileSaver.saveAs(blob, csvData.fileName + fileEXT);
      });
    },
  },
});
</script>
