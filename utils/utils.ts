import { notification } from 'ant-design-vue';
import statesLGA from '../utils/states-lga.json';
import dayjs from 'dayjs';

export const groupData = (array: Array<any>, label: string, data: string) => {
  let result: any = {
    labels: [],
    data: [],
  };
  if (Array.isArray(array) && array.length > 0) {
    for (const item of array) {
      result.labels.push(item[label]);
      result.data.push(item[data]);
    }
    return result;
  }
  return {};

  //  array.map((item: any) => {
  //     result.labels.push(item[label]);
  //     result.data.push(item[data]);
  //   });
};

export const formatOdds = (odds) => {
  if (odds === 'N/A') {
    return odds;
  }
  return Number(odds).toFixed(2);
};

export const getSelection = ({ event, oddsCollection, matchOdd, selection }) => {
  const a =
    event.OddsCollection[oddsCollection].MatchOdds[matchOdd] &&
    event.OddsCollection[oddsCollection].MatchOdds[matchOdd].OddAttribute.OddName === selection &&
    event.OddsCollection[oddsCollection].MatchOdds[matchOdd].Outcome.OddOutcome
      ? Number.parseFloat(event.OddsCollection[oddsCollection].MatchOdds[matchOdd].Outcome.OddOutcome).toFixed(2)
      : '--';

  return a;
};

export const gameTypeOptions = [
  { type: 'NAP', value: 'n3', name: 'NAP 3' },
  { type: 'NAP', value: 'n4', name: 'NAP 4' },
  { type: 'NAP', value: 'n5', name: 'NAP 5' },
  { type: 'NAP', value: 'n6', name: 'NAP 6' },
  { type: 'NAP', value: 'n7', name: 'NAP 7' },
  { type: 'NAP', value: 'n8', name: 'NAP 8' },
  { type: 'NAP', value: 'n9', name: 'NAP 9' },
  { type: 'NAP', value: 'n10', name: 'NAP 10' },
  { type: 'PERM', value: 'p3', name: 'PERM 3' },
  { type: 'PERM', value: 'p4', name: 'PERM 4' },
  { type: 'PERM', value: 'p5', name: 'PERM 5' },
  { type: 'PERM', value: 'p6', name: 'PERM 6' },
  { type: 'PERM', value: 'p7', name: 'PERM 7' },
  { type: 'PERM', value: 'p8', name: 'PERM 8' },
  { type: 'PERM', value: 'p9', name: 'PERM 9' },
  { type: 'PERM', value: 'p1O', name: 'PERM 10' },
];

export const getGameType = (data: { name?: String; value?: String; returns: String }) => {
  if (Object.keys(data).length < 1) {
    return '';
  }
  if (data.name) {
    const option = gameTypeOptions.find((item) => item.name === data.name);
    return data.returns == 'TYPE' ? option.type : option.value;
  }
  if (data.value) {
    const option = gameTypeOptions.find((item) => item.value === data.value);
    return data.returns === 'TYPE' ? option.type : option.name;
  }
};
export const validate = (payload) => {
  if (payload.action === 'ADD_EVENT') {
    const { state } = payload;
    if (state.coupon.betslip.gameType.substring(0, 1) === 'n') {
      // NAP
      return state.coupon.selections.length + 1 <= Number(state.coupon.betslip.gameType.substring(1));
    }
    if (state.coupon.betslip.gameType.substring(0, 1) === 'p') {
      return true;
    }
  }

  // if (payload.action === 'PLACE_BET') {

  //   return false;
  // }

  return false;
};

const getCombinations = (array) => {
  const result: any = [];
  const f = function (prefix: any = [], array: any) {
    for (let i = 0; i < array.length; i++) {
      result.push([...prefix, array[i]]);
      f([...prefix, array[i]], array.slice(i + 1));
    }
  };
  f('', array);
  return result;
};

export const getGroups = (selections) => {
  const combinations = getCombinations(selections);

  let groupings: any = [];
  for (const item of combinations) {
    let group: any = groupings.find((i: any) => i.type === item.length);

    if (!group) {
      group = {
        type: item.length,
        combinations: 1,
        groups: [item],
      };
    } else {
      group = {
        ...group,
        combinations: group.combinations + 1,
        groups: [...group.groups, item],
      };

      group.groups.push(item);
    }
    groupings = groupings.filter((i) => i.type !== group.type);

    groupings.push(group);
  }

  return groupings.reverse();
};

export const calculateCombo = (groupings, bankers) => {
  return groupings.map((group) => {
    group.groups = [...new Set(group.groups)];

    let winning = {
      min: 0,
      max: 0,
    };

    if (group.enabled) {
      const data: any = [];

      const totalBankersOdd = bankers.reduce((acc, i) => {
        return acc * Number(i.oddValue);
      }, 1);

      for (const odds of group.groups) {
        const a = odds.reduce((acc, i) => {
          return acc * Number(i.oddValue);
        }, 1);

        data.push(a * totalBankersOdd * group.stake);
      }
      data.sort();
      winning = {
        min: data[0],
        max: data.reduce((acc, i) => acc + i, 0),
      };
      group.bonus = {
        min: winning.min * (group.bonus.percentage / 100),
        max: winning.max * (group.bonus.percentage / 100),
      };
      group.odds = {
        min: winning.min / group.stake,
        max: winning.max / group.stake,
      };
      group.winning = winning;
    }
    delete group.groups;
    return group;
  });
};

export const calculateBet = (coupon, enabledBets?, bonuses?) => {
  const store = JSON.parse(localStorage.getItem('vuex'));

  if (coupon.betslip.gameType.substring(0, 1) === 'n') {
    if (coupon.betslip.totalStake < store.pool.couponSettings.totalStake.min) {
      throw new Error(`pool.minTotalStake|${coupon.betslip.stake}`);
    } else if (coupon.betslip.totalStake > store.pool.couponSettings.totalStake.max) {
      throw new Error(`pool.maxTotalStake|${coupon.betslip.stake}`);
    }

    coupon.betslip.totalOdds.max = coupon.selections.reduce((acc, odd) => acc * Number(odd.oddValue), 1);

    coupon.betslip.winning.max = Number(coupon.betslip.totalOdds.max) * coupon.betslip.totalStake;

    const bonus = bonuses.find((item) => item.type === 'n');
    if (bonus) {
      coupon.betslip.bonus.max = coupon.betslip.winning.max * (bonus.percentage / 100);
    }

    coupon.betslip.totalWinning.max = coupon.betslip.winning.max + coupon.betslip.bonus.max;
  } else {
    const bankers = coupon.selections.filter((item) => item.isBanker);
    const notBankers = coupon.selections.filter((item) => !item.isBanker);

    enabledBets = enabledBets.map((item) => {
      item.type = item.type - bankers.length;
      return item;
    });

    const groups = getGroups(notBankers);
    let groupings = [];

    for (const group of groups) {
      for (const bet of enabledBets) {
        if (group.type === bet.type) {
          groupings.push({
            ...group,
            ...bet,
          });
        }
        groupings.push(group);
      }
    }

    if (coupon.betslip.forceTotalStake) {
      const totalCombo = groupings.reduce((acc, item) => {
        if (item.enabled) {
          return acc + item.combinations;
        }
        return acc + 0;
      }, 0);

      coupon.betslip.stake = coupon.betslip.totalStake / totalCombo;

      if (coupon.betslip.stake < store.pool.couponSettings.stakePerLine.min) {
        throw new Error(`pool.minStakePerLine|${coupon.betslip.stake}`);
      } else if (coupon.betslip.stake > store.pool.couponSettings.stakePerLine.max) {
        throw new Error(`pool.maxStakePerLine|${coupon.betslip.stake}`);
      }
      // FIXME: implement minimum stake per line here

      groupings = groupings.map((item) => {
        if (item.enabled) {
          return {
            ...item,
            stake: coupon.betslip.stake,
          };
        }
        return item;
      });
    } else {
      // FIXME: implement minimum stake per line here

      coupon.betslip.totalStake = 0;
      groupings.forEach((item) => {
        if (item.enabled) {
          if (coupon.betslip.stake < store.pool.couponSettings.stakePerLine.min) {
            throw new Error(`pool.minStakePerLine|${coupon.betslip.stake}`);
          } else if (coupon.betslip.stake > store.pool.couponSettings.stakePerLine.max) {
            throw new Error(`pool.maxStakePerLine|${coupon.betslip.stake}`);
          }
          coupon.betslip.totalStake += item.stake * item.combinations;
        }
      });
    }

    coupon.betslip.combinations = calculateCombo(groupings, bankers);

    let selections = coupon.betslip.combinations.filter((item) => item.enabled);
    selections = selections.sort((a, b) => a.winning?.min - b.winning?.min);

    coupon.betslip = {
      ...coupon.betslip,
      totalOdds: {
        min: selections[0].odds.min,
        max: selections.reduce((acc, item) => acc + item.odds.max, 0),
      },
      winning: {
        min: selections[0].winning.min,
        max: selections.reduce((acc, item) => acc + item.winning.max, 0),
      },
      bonus: {
        min: selections[0].bonus.min,
        max: selections.reduce((acc, item) => acc + item.bonus.max, 0),
      },
      totalWinning: {
        min: selections[0].winning.min + selections[0].bonus.min,
        max: coupon.betslip.winning.max + coupon.betslip.bonus.max,
      },
    };
  }

  if (coupon.betslip.totalWinning.max > store.pool.couponSettings.winning.potentialWinning.max) {
    coupon.betslip.totalWinning.max = store.pool.couponSettings.winning.potentialWinning.max;
  }

  return coupon;
};

export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    value: [String, Number],
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value);
    },
  },
};

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
