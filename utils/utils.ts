import { notification } from 'ant-design-vue';
import statesLGA from '../utils/states-lga.json';
import dayjs from 'dayjs';

export const slugify = (str) => {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
  var to = 'aaaaeeeeiiiioooouuuunc------';
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};

export const getQuery = (url) => {
  const params = {};
  let parser = document.createElement('a');
  parser.href = url;
  const query = parser.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};
export const notify = ({ type, message }) => {
  notification[type]({
    message: message,
  });
};

export const copyToClipboard = (data: any) => {
  navigator.clipboard.writeText(data).then(
    function () {
      /* clipboard successfully set */
      notify({
        type: 'success',
        message: 'Success! Copied to clipboard',
      });
    },
    function () {
      /* clipboard write failed */
      notify({
        type: 'error',
        message: 'Error! Failed to copy to clipboard',
      });
    },
  );
};

export const states = () => {
  statesLGA.map((item) => item);
};

export const getDateOfPreviousDayOfWeek = (date, dayIndex) => {
  const currentDay = date.getDay();
  const distance = (dayIndex - 7 - currentDay) % 7;
  return new Date(date.setDate(date.getDate() + distance));
};

export const expandReportData = (data, result: any = [], register = {}) => {
  if (data.length > 0) {
    for (const item of data) {
      const obj: any = {
        ...item,
      };
      delete obj.children;

      result.push(obj);
      register[item.id] = expandReportData(item.children, result, register);
      delete register[item.id];
    }
  }

  if (Object.keys(register).length < 1) {
    return result;
  }

  return;
};
export const calculateTrust = (balance, trust) => {
  const result = balance - trust;
  return result;
};

export const cleanEmptyObj = (obj) => {
  for (var propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
      delete obj[propName];
    }
  }
  return obj;
};

export const capitalize = (value) => {
  if (typeof value !== 'string') return '';
  const a = value.toLowerCase();
  return a.charAt(0).toUpperCase() + a.slice(1);
};

export const processingReportData = (csvData: any, workbook: any) => {
  if (csvData.source === 'SALES') {
    const records = expandReportData(csvData.records);
    const worksheet = workbook.addWorksheet('Sales Report'); // Create a worksheet
    // Add column to worksheet
    worksheet.columns = [
      { header: 'Product', key: 'product' },
      { header: 'Total Stake', key: 'totalStake' },
      { header: 'Actual Stake', key: 'actualStake' },
      { header: 'Cancelled Bets Stake', key: 'totalCancelledBetsStake' },
      { header: 'Conf.Winning', key: 'confirmedWinning' },
      { header: 'Gross Profit', key: 'grossProfit' },
      { header: 'Commission', key: 'commission' },
      { header: 'Remittable Amount', key: 'remittableAmount' },
      { header: 'GGR %', key: 'ggrMargin' },
      { header: 'Total Bets', key: 'totalBets' },
      { header: 'Ttal Actual Bets', key: 'totalActualBets' },
      { header: 'Won Bets', key: 'totalWonBets' },
      { header: 'Lost Bets', key: 'totalLostBets' },
      { header: 'Cancelled Bets', key: 'totalCancelledBets' },
    ];
    // force the columns to be at least as long as their header row.
    // Have to take this approach because ExcelJS doesn't have an autofit property.
    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });

    // Make the header bold.
    // Note: in Excel the rows are 1 based, meaning the first row is 1 instead of 0.
    worksheet.getRow(1).font = { bold: true };
    // Dump all the data into Excel
    records.forEach((e) => {
      // row 1 is the header.
      // By using destructuring we can easily dump all of the data into the row without doing much
      // We can also add formulas pretty easily by providing the formula property.
      worksheet
        .addRow({
          ...e,
          product: 'SPORT',
        })
        .commit();
    });
  }

  if (csvData.source === 'BETLIST') {
    const betWorkSheet = workbook.addWorksheet('Bet List');
    betWorkSheet.columns = [
      { header: 'Ticket ID', key: 'ticketId' },
      { header: 'Username', key: 'bettor' },
      { header: 'Status', key: 'status' },
      { header: 'Parent', key: 'bettorParent' },
      { header: 'Game Type', key: 'gameType' },
      { header: 'Selections', key: 'selections' },
      { header: 'odds', key: 'odds' },
      { header: 'Total Stake (₦)', key: 'totalStake' },
      { header: 'Pot. Payout (₦)', key: 'totalWinning' },
      { header: 'Conf. Winning (₦)', key: 'confirmedWinning' },
      { header: 'Date', key: 'createdAt' },
    ];
    betWorkSheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });
    betWorkSheet.getRow(1).font = { bold: true };
    csvData.records.forEach((e) => {
      let ids = []; // Selection ids
      let odds = []; // Selection odds
      for (const i of e.selections) {
        ids.push(i.id);
        odds.push(i.oddValue);
      }
      // row 1 is the header.
      // By using destructuring we can easily dump all of the data into the row without doing much
      // We can also add formulas pretty easily by providing the formula property.
      betWorkSheet
        .addRow({
          ...e,
          totalStake: e.betslip.totalStake,
          confirmedWinning: e.betslip.confirmedWinning.totalWinning ? e.betslip.confirmedWinning.totalWinning : 0,
          totalWinning: e.betslip.totalWinning.max,
          gameType:
            e.betslip.gameType.substring(0, 1) === 'n'
              ? 'NAP ' + e.betslip.gameType.substring(1)
              : 'PERM ' + e.betslip.combinations.filter((item) => item.enabled)[0].type + ' / ' + e.selections.length,
          selections: ids,
          odds: odds,
          createdAt: dayjs(e.createdAt).format('MMM D, YYYY h:mm A'),
        })
        .commit();
    });
  }

  if (csvData.source === 'USERS') {
    const worksheet = workbook.addWorksheet('Users'); // Create a worksheet
    // Add column to worksheet
    worksheet.columns = [
      { header: 'User ID', key: 'userId' },
      { header: 'Username', key: 'username' },
      { header: 'Name', key: 'name' },
      { header: 'Phone Number', key: 'phone' },
      { header: 'Email', key: 'email' },
      { header: 'Parent', key: 'parent' },
      { header: 'State', key: 'state' },
      { header: 'LGA', key: 'lga' },
      { header: 'Current Balance (N)', key: 'wallet' },
      { header: 'Total Sports Sales (N)', key: 'sportSales' },
      { header: 'Total Sports Paid Out (N)	', key: 'sportPaidOut' },
      { header: 'Product One sales (N)', key: 'productOneSales' },
      { header: 'Product One Winnings (N)', key: 'productOneWinnings' },
      { header: 'To Collect (N)', key: 'toCollect' },
      { header: 'Date', key: 'createdAt' },
    ];

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });

    worksheet.getRow(1).font = { bold: true };
    // Dump all the data into Excel
    csvData.records.forEach((e) => {
      worksheet
        .addRow({
          ...e,
          name: `${e.firstName} ${e.lastName}`,
          phone: e?.phone?.code + e?.phone?.number,
          wallet: e.wallet.balance,
          sportSales: e.role === 'staff' ? 'N/A' : Math.floor(Math.random() * 99999),
          sportPaidOut: e.role === 'staff' ? 'N/A' : Math.floor(Math.random() * 99999),
          productOneSales: 'N/A',
          productOneWinnings: 'N/A',
          toCollect: e.role === 'staff' ? 'N/A' : Math.floor(Math.random() * 99999),
          createdAt: dayjs(e.createdAt).format('MMM D, YYYY h:mm A'),
        })
        .commit();
    });
  }

  if (csvData.source === 'PENDING') {
    const worksheet = workbook.addWorksheet('Users'); // Create a worksheet
    // Add column to worksheet
    worksheet.columns = [
      { header: 'User ID', key: 'userId' },
      { header: 'Username', key: 'username' },
      { header: 'First Name', key: 'firstName' },
      { header: 'Last Name', key: 'lastName' },
      { header: 'Email', key: 'email' },
      { header: 'Phone Number', key: 'phone' },
      { header: 'Parent', key: 'parent' },
      { header: 'State', key: 'state' },
      { header: 'LGA', key: 'lga' },
      { header: 'Address', key: 'address' },
      { header: 'Date', key: 'createdAt' },
    ];

    worksheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
    });

    worksheet.getRow(1).font = { bold: true };
    // Dump all the data into Excel
    csvData.records.forEach((e) => {
      worksheet
        .addRow({
          ...e,
          phone: e.phone.code + e.phone.number,
          createdAt: dayjs(e.createdAt).format('MMM D, YYYY h:mm A'),
        })
        .commit();
    });
  }
};
