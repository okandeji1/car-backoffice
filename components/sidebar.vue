<template>
  <aside id="asideleft  " class="overflow-y-scroll sideleft">
    <div class="aside-bar">
      <div class="aside-header">
        <lazy-car-user-header v-if="!collapseSidebar" icon="menu" title="USER AREA MENU">
          <template v-slot:close>
            <svg-icon name="arrow" style="transform: rotate(90deg)" @click="collapse" class="inline w-4 h-4 cursor-pointer fill-current"></svg-icon>
          </template>
        </lazy-car-user-header>

        <div v-else class="relative h-8 icon-main bg-primary-bg-ter text-primary-default-main">
          <div class="flex items-center icon-style" @click="collapse">
            <svg-icon name="arrow" style="transform: rotate(270deg)" class="inline-block w-4 h-4 mx-1 my-1 text-primary-default-main"> </svg-icon>
          </div>
        </div>

        <div class="aside-content">
          <div class="flex flex-col" v-for="link in userAreaLinks" :key="link.id">
            <a-tooltip>
              <template slot="title"> {{ link.title }} </template>
              <div
                class="flex flex-no-wrap items-center justify-start h-8 overflow-hidden text-sm font-medium text-white border-b cursor-pointer bg-primary-bg-sec border-primary-border bg-primary-sidebar"
                @click.prevent="link.isOpen = !link.isOpen"
              >
                <div class="mx-3" v-if="!collapseSidebar">
                  <svg-icon
                    :name="link.icon"
                    class="inline-block fill-current"
                    :class="link.isOpen ? 'rotate' : 'rotate-right'"
                    style="height: 10px; width: 10px"
                  ></svg-icon>
                  <span class="ml-2"> {{ link.title }} </span>
                </div>
                <div v-else class="mx-2" :class="link.isOpen ? 'rotate' : 'rotate-right'">
                  <svg-icon :name="link.collapseIcon" class="inline-block w-4 h-4 text-white fill-current"></svg-icon>
                </div>
              </div>
            </a-tooltip>

            <div v-for="sublink in link.subLinks" style="height: auto" v-if="link.isOpen">
              <nuxt-link
                :to="{ path: sublink.link }"
                class="flex flex-wrap items-center h-8 overflow-hidden text-sm font-medium whitespace-no-wrap border-b border-primary-border text-primary-default-main"
                :class="[collapseSidebar ? 'pl-2' : '']"
              >
                <svg-icon :name="sublink.icon" class="inline-block w-4 h-4 fill-current" :class="[!collapseSidebar ? 'ml-8 mr-3' : '']"></svg-icon>

                <span v-if="!collapseSidebar">{{ sublink.title }}</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
const tenantUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    collapseIcon: 'briefcase',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      {
        id: 3,
        title: 'Cash Desk',
        icon: 'cashier-desk',
        link: '/user/cashier-desk',
      },
      // {
      //   id: 9,
      //   title: 'Deposit',
      //   icon: 'transaction-list',
      //   link: '/user/payments/deposit',
      // },
      // {
      //   id: 10,
      //   title: 'Withdrawal',
      //   icon: 'transaction-list',
      //   link: '/user/payments/withdraw',
      // },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
      // {
      //   id: 7,
      //   title: 'Online ',
      //   icon: 'balance',
      //   to: '/user/new-user',
      // },
    ],
  },

  {
    id: 10,
    title: 'Requests',
    icon: 'arrow',
    collapseIcon: 'clipboard',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Pending Agent',
        icon: 'coin',
        link: '/user/requests/pending-agent',
      },
      {
        id: 2,
        title: 'Pending Withdrawals',
        icon: 'coin',
        link: '/user/requests/pending-withdrawals',
      },
    ],
  },

  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 's-print',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    icon: 'arrow',
    collapseIcon: 'menu',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
      {
        id: 3,
        title: 'View Sessions',
        icon: 'balance',
        link: '/user/profile/view-sessions',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Staff',
        icon: 'balance',
        link: '/user/network/staff',
      },
      {
        id: 2,
        title: 'Area Manager',
        icon: 'balance',
        link: '/user/network/area-managers',
      },
      {
        id: 3,
        title: 'Super Agent',
        icon: 'balance',
        link: '/user/network/super-agents',
      },
      {
        id: 4,
        title: 'Shop Agent',
        icon: 'balance',
        link: '/user/network/agents',
      },
      {
        id: 5,
        title: 'Cashiers',
        icon: 'cashier',
        link: '/user/network/cashiers',
      },
      {
        id: 6,
        title: 'Online Users',
        icon: 'customers',
        link: '/user/network/online-users',
      },
    ],
  },
  {
    id: 8,
    title: 'Payments',
    collapseIcon: 'income',

    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Paystack',
        icon: 'balance',
        link: '/user/payments/paystack',
      },
      {
        id: 2,
        title: 'Monnify',
        icon: 'balance',
        link: '/user/payments/monnify',
      },
      {
        id: 3,
        title: 'Flutterwave',
        icon: 'balance',
        link: '/user/payments/flutterwave',
      },
      {
        id: 3,
        title: 'Payout Requests',
        icon: 'balance',
        link: '/user/payments/payout-requests',
      },
    ],
  },
  {
    id: 9,
    title: 'Settings',
    collapseIcon: 'black-settings-button',
    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Configurations',
        icon: 'settings',
        link: '/user/settings/configurations',
      },
      {
        id: 2,
        title: 'Feeds',
        icon: 'balance',
        link: '/user/settings/feeds',
      },
      {
        id: 3,
        title: 'Roles',
        icon: 'balance',
        link: '/user/settings/roles',
      },
    ],
  },
  {
    id: 5,
    title: 'Reports',
    collapseIcon: 'profit-report',
    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Commissions',
        icon: 'chart',
        link: '/user/reports/commissions',
      },
      {
        id: 2,
        title: 'Sales',
        icon: 'chart',
        link: '/user/reports/sales',
      },
      {
        id: 3,
        title: 'Bonus',
        icon: 'chart',
        link: '/user/reports/bonuses',
      },
      {
        id: 4,
        title: 'Credit & Liability',
        icon: 'chart',
        link: '/user/reports/credit-and-liability',
      },
    ],
  },
  {
    id: 6,
    title: 'Marketing Materials',
    collapseIcon: 'megaphone',
    icon: 'arrow',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Marketing Assets',
        icon: 'paper',
        link: '/user/marketing/marketing-assets',
      },
      {
        id: 2,
        title: 'Tutorials',
        icon: 'paper',
        link: '/user/marketing/tutorials',
      },
    ],
  },
];

const staffUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    collapseIcon: 'briefcase',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      // {
      //   id: 3,
      //   title: 'Cash Desk',
      //   icon: 'cashier-desk',
      //   link: '/user/cashier-desk',
      // },
      // {
      //   id: 9,
      //   title: 'Deposit',
      //   icon: 'transaction-list',
      //   link: '/user/payments/deposit',
      // },
      // {
      //   id: 10,
      //   title: 'Withdrawal',
      //   icon: 'transaction-list',
      //   link: '/user/payments/withdraw',
      // },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
      // {
      //   id: 7,
      //   title: 'Online ',
      //   icon: 'balance',
      //   to: '/user/new-user',
      // },
    ],
  },

  {
    id: 10,
    title: 'Requests',
    icon: 'arrow',
    collapseIcon: 'clipboard',

    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Pending Agent',
        icon: 'coin',
        link: '/user/requests/pending-agent',
      },
      {
        id: 2,
        title: 'Pending Withdrawals',
        icon: 'coin',
        link: '/user/requests/pending-withdrawals',
      },
    ],
  },

  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    collapseIcon: 'menu',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
      {
        id: 3,
        title: 'View Sessions',
        icon: 'balance',
        link: '/user/profile/view-sessions',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      // {
      //   id: 1,
      //   title: 'Staff',
      //   icon: 'balance',
      //   link: '/user/network/staff',
      // },
      {
        id: 2,
        title: 'Area Manager',
        icon: 'balance',
        link: '/user/network/area-managers',
      },
      {
        id: 3,
        title: 'Super Agent',
        icon: 'balance',
        link: '/user/network/super-agents',
      },
      {
        id: 4,
        title: 'Shop Agent',
        icon: 'balance',
        link: '/user/network/agents',
      },
      {
        id: 5,
        title: 'Cashiers',
        icon: 'cashier',
        link: '/user/network/cashiers',
      },
      {
        id: 6,
        title: 'Online Users',
        icon: 'customers',
        link: '/user/network/online-users',
      },
    ],
  },
  {
    id: 8,
    title: 'Payments',
    collapseIcon: 'income',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Paystack',
        icon: 'balance',
        link: '/user/payments/paystack',
      },
      {
        id: 2,
        title: 'Monnify',
        icon: 'balance',
        link: '/user/payments/monnify',
      },
      {
        id: 3,
        title: 'Flutterwave',
        icon: 'balance',
        link: '/user/payments/flutterwave',
      },
      {
        id: 3,
        title: 'Payout Requests',
        icon: 'balance',
        link: '/user/payments/payout-requests',
      },
    ],
  },
  {
    id: 9,
    title: 'Settings',
    collapseIcon: 'black-settings-button',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Configurations',
        icon: 'settings',
        link: '/user/settings/configurations',
      },
      {
        id: 2,
        title: 'Feeds',
        icon: 'balance',
        link: '/user/settings/feeds',
      },
    ],
  },
  {
    id: 5,
    title: 'Reports',
    collapseIcon: 'profit-report',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Commissions',
        icon: 'chart',
        link: '/user/reports/commissions',
      },
      {
        id: 2,
        title: 'Sales',
        icon: 'chart',
        link: '/user/reports/sales',
      },
      {
        id: 3,
        title: 'Bonus',
        icon: 'chart',
        link: '/user/reports/bonuses',
      },
      {
        id: 4,
        title: 'Credit & Liability',
        icon: 'chart',
        link: '/user/reports/credit-and-liability',
      },
    ],
  },
  {
    id: 6,
    title: 'Marketing Materials',
    collapseIcon: 'megaphone',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Marketing Assets',
        icon: 'paper',
        link: '/user/marketing/marketing-assets',
      },
      {
        id: 2,
        title: 'Tutorials',
        icon: 'paper',
        link: '/user/marketing/tutorials',
      },
    ],
  },
];

const areaManagerUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      // {
      //   id: 3,
      //   title: 'Cash Desk',
      //   icon: 'cashier-desk',
      //   link: '/user/cashier-desk',
      // },
      // {
      //   id: 9,
      //   title: 'Deposit',
      //   icon: 'transaction-list',
      //   link: '/user/payments/deposit',
      // },
      {
        id: 10,
        title: 'Withdrawal',
        icon: 'transaction-list',
        link: '/user/payments/withdraw',
      },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
      // {
      //   id: 7,
      //   title: 'Online ',
      //   icon: 'balance',
      //   to: '/user/new-user',
      // },
    ],
  },

  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
      {
        id: 3,
        title: 'View Sessions',
        icon: 'balance',
        link: '/user/profile/view-sessions',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      // {
      //   id: 1,
      //   title: 'Staff',
      //   icon: 'balance',
      //   link: '/user/network/staff',
      // },
      // {
      //   id: 2,
      //   title: 'Area Manager',
      //   icon: 'balance',
      //   link: '/user/network/area-managers',
      // },
      {
        id: 3,
        title: 'Super Agent',
        icon: 'balance',
        link: '/user/network/super-agents',
      },
      {
        id: 4,
        title: 'Shop Agent',
        icon: 'balance',
        link: '/user/network/agents',
      },
      {
        id: 5,
        title: 'Cashiers',
        icon: 'cashier',
        link: '/user/network/cashiers',
      },
      {
        id: 6,
        title: 'Online Users',
        icon: 'customers',
        link: '/user/network/online-users',
      },
    ],
  },
  {
    id: 5,
    title: 'Reports',
    collapseIcon: 'profit-report',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Commissions',
        icon: 'chart',
        link: '/user/reports/commissions',
      },
      {
        id: 2,
        title: 'Sales',
        icon: 'chart',
        link: '/user/reports/sales',
      },
      {
        id: 3,
        title: 'Bonus',
        icon: 'chart',
        link: '/user/reports/bonuses',
      },
      {
        id: 4,
        title: 'Credit & Liability',
        icon: 'chart',
        link: '/user/reports/credit-and-liability',
      },
    ],
  },
  {
    id: 6,
    title: 'Marketing Materials',
    collapseIcon: 'megaphone',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Marketing Assets',
        icon: 'paper',
        link: '/user/marketing/marketing-assets',
      },
      {
        id: 2,
        title: 'Tutorials',
        icon: 'paper',
        link: '/user/marketing/tutorials',
      },
    ],
  },
];

const superAgentUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      // {
      //   id: 3,
      //   title: 'Cash Desk',
      //   icon: 'cashier-desk',
      //   link: '/user/cashier-desk',
      // },
      // {
      //   id: 9,
      //   title: 'Deposit',
      //   icon: 'transaction-list',
      //   link: '/user/payments/deposit',
      // },
      // {
      //   id: 10,
      //   title: 'Withdrawal',
      //   icon: 'transaction-list',
      //   link: '/user/payments/withdraw',
      // },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
      // {
      //   id: 7,
      //   title: 'Online ',
      //   icon: 'balance',
      //   to: '/user/new-user',
      // },
    ],
  },

  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'menu',
    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
      {
        id: 3,
        title: 'View Sessions',
        icon: 'balance',
        link: '/user/profile/view-sessions',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 4,
        title: 'Shop Agent',
        icon: 'balance',
        link: '/user/network/agents',
      },
      {
        id: 5,
        title: 'Cashiers',
        icon: 'cashier',
        link: '/user/network/cashiers',
      },
      {
        id: 6,
        title: 'Online Users',
        icon: 'customers',
        link: '/user/network/online-users',
      },
    ],
  },
  {
    id: 5,
    title: 'Reports',
    collapseIcon: 'profit-report',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Commissions',
        icon: 'chart',
        link: '/user/reports/commissions',
      },
      {
        id: 2,
        title: 'Sales',
        icon: 'chart',
        link: '/user/reports/sales',
      },
      {
        id: 3,
        title: 'Bonus',
        icon: 'chart',
        link: '/user/reports/bonuses',
      },
      {
        id: 4,
        title: 'Credit & Liability',
        icon: 'chart',
        link: '/user/reports/credit-and-liability',
      },
    ],
  },
  {
    id: 6,
    title: 'Marketing Materials',
    collapseIcon: 'megaphone',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Marketing Assets',
        icon: 'paper',
        link: '/user/marketing/marketing-assets',
      },
      {
        id: 2,
        title: 'Tutorials',
        icon: 'paper',
        link: '/user/marketing/tutorials',
      },
    ],
  },
];

const shopAgentUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      {
        id: 9,
        title: 'Deposit',
        icon: 'transaction-list',
        link: '/user/payments/deposit',
      },
      {
        id: 10,
        title: 'Withdrawal',
        icon: 'transaction-list',
        link: '/user/payments/withdraw',
      },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
      // {
      //   id: 7,
      //   title: 'Online ',
      //   icon: 'balance',
      //   to: '/user/new-user',
      // },
    ],
  },
  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,
    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'menu',
    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
      {
        id: 3,
        title: 'View Sessions',
        icon: 'balance',
        link: '/user/profile/view-sessions',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Cashiers',
        icon: 'cashier',
        link: '/user/network/cashiers',
      },
      {
        id: 2,
        title: 'Online Users',
        icon: 'customers',
        link: '/user/network/online-users',
      },
    ],
  },
  {
    id: 5,
    title: 'Reports',
    collapseIcon: 'profit-report',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Commissions',
        icon: 'chart',
        link: '/user/reports/commissions',
      },
      {
        id: 2,
        title: 'Sales',
        icon: 'chart',
        link: '/user/reports/sales',
      },
      {
        id: 3,
        title: 'Bonus',
        icon: 'chart',
        link: '/user/reports/bonuses',
      },
      {
        id: 4,
        title: 'Credit & Liability',
        icon: 'chart',
        link: '/user/reports/credit-and-liability',
      },
    ],
  },
  {
    id: 6,
    title: 'Marketing Materials',
    collapseIcon: 'megaphone',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Marketing Assets',
        icon: 'paper',
        link: '/user/marketing/marketing-assets',
      },
      {
        id: 2,
        title: 'Tutorials',
        icon: 'paper',
        link: '/user/marketing/tutorials',
      },
    ],
  },
];

const shopCashiersUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',

    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      {
        id: 3,
        title: 'Cash Desk',
        icon: 'cashier-desk',
        link: '/user/cashier-desk',
      },
      // {
      //   id: 9,
      //   title: 'Deposit',
      //   icon: 'transaction-list',
      //   link: '/user/payments/deposit',
      // },
      // {
      //   id: 10,
      //   title: 'Withdrawal',
      //   icon: 'transaction-list',
      //   link: '/user/payments/withdraw',
      // },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
      // {
      //   id: 7,
      //   title: 'Online ',
      //   icon: 'balance',
      //   to: '/user/new-user',
      // },
    ],
  },
  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
  {
    id: 3,
    title: 'Account Details',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'menu',
    subLinks: [
      {
        id: 1,
        title: 'Change Personal Data',
        icon: 'profile',
        link: '/user/profile/edit-profile',
      },
      {
        id: 2,
        title: 'Change Password',
        icon: 'password',
        link: '/user/profile/change-password',
      },
      {
        id: 3,
        title: 'View Sessions',
        icon: 'balance',
        link: '/user/profile/view-sessions',
      },
    ],
  },
  {
    id: 4,
    title: 'My Network',
    collapseIcon: 'hierarchical-structure',

    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 5,
        title: 'Cashiers',
        icon: 'cashier',
        link: '/user/network/cashiers',
      },
    ],
  },
  {
    id: 6,
    title: 'Marketing Materials',
    collapseIcon: 'megaphone',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Marketing Assets',
        icon: 'paper',
        link: '/user/marketing/marketing-assets',
      },
      {
        id: 2,
        title: 'Tutorials',
        icon: 'paper',
        link: '/user/marketing/tutorials',
      },
    ],
  },
];

const onlineUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 2,
        title: 'Bet List Sport',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-sport',
      },
      {
        id: 8,
        title: 'Bet List Virtual',
        icon: 'ticket-overview',
        link: '/user/bets/bet-list-virtual',
      },
      {
        id: 9,
        title: 'Deposit',
        icon: 'transaction-list',
        link: '/user/payments/deposit',
      },
      {
        id: 10,
        title: 'Withdrawal',
        icon: 'transaction-list',
        link: '/user/payments/withdraw',
      },
      {
        id: 4,
        title: 'Transaction List',
        icon: 'transaction-list',
        link: '/user/payments/transaction-list',
      },
      // {
      //   id: 5,
      //   title: 'Interaccount',
      //   icon: 'balance',
      //   link: '/user/payments/fund-transfer',
      // },
      {
        id: 6,
        title: 'Messages',
        icon: 'message',
        link: '/user/main/messages',
      },
    ],
  },
];

const unAuthhUserLinks = [
  {
    id: 1,
    title: 'My Account',
    icon: 'arrow',
    isOpen: true,
    collapseIcon: 'briefcase',
    subLinks: [
      {
        id: 1,
        title: 'Overview',
        icon: 'balance',
        link: '/user/overview',
      },
      {
        id: 3,
        title: 'Cash Desk',
        icon: 'cashier-desk',
        link: '/user/cashier-desk',
      },
    ],
  },
  {
    id: 2,
    title: 'Print Odds',
    collapseIcon: 'printer-2',
    icon: 'arrow',
    isOpen: true,

    subLinks: [
      {
        id: 1,
        title: 'Standard Print',
        icon: 'balance',
        to: 'user/print/standard-print',
      },
      {
        id: 2,
        title: 'Fast Print',
        icon: 'f-print',
        to: '/user/print/fast-print',
      },
    ],
  },
];
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      collapseSidebar: false,
      tenantUserLinks,
      staffUserLinks,
      areaManagerUserLinks,
      superAgentUserLinks,
      shopAgentUserLinks,
      shopCashiersUserLinks,
      onlineUserLinks,
      unAuthhUserLinks,
      windowHeight: 0,
      windowWidth: 0,
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
    },
    collapse() {
      this.collapseSidebar = !this.collapseSidebar;
    },
  },
  watch: {
    '$route.path'(path) {
      if (path.includes('cashier-desk')) {
        this.cashierMenu = true;
      } else {
        this.cashierMenu = false;
      }
    },
    windowWidth(newData, oldData) {
      if (newData <= 768) {
        this.collapseSidebar = true;
      } else {
        this.collapseSidebar = false;
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss" scoped></style>
