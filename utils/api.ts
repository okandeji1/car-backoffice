import axios from 'axios';
import { getQuery, notify } from '../utils/utils';

export const processPaymentApi = async () => {
  const windowUrl = getQuery(window.location.href);
  let url;
  if (windowUrl.hasOwnProperty('reference')) {
    // from paystack
    const reference = windowUrl['reference'];
    url = `/api/v1/finances/wallet/verify-with-paystack?reference=${reference}`;
  }

  try {
    // @ts-ignore
    const { data: responseData } = await axios({
      url: url,
      method: 'GET',
      meta: {
        success: {
          showNotification: true,
        },
        error: {
          showNotification: true,
        },
        // enableLoading: true,
      },
    });

    if (responseData.status) {
      notify({
        type: 'success',
        message: 'Success! Payment successful',
      });
    } else {
      return notify({
        type: 'error',
        message: 'Error! Payment Failed',
      });
    }
  } catch (error) {
    return notify({
      type: 'error',
      message: 'Error! Internal server error',
    });
  }
};

export const bookBetApi = async (payload) => {
  try {
    // @ts-ignore
    const responseData = await axios({
      //   url: `${this.$config.websiteUrl}/api/v1/sportbook/pool/bas/bets/bookings`,
      method: 'POST',
      data: payload,
      meta: {
        success: {
          showNotification: true,
        },
        error: {
          showNotification: true,
        },
      },
    });
    return responseData;
  } catch (error) {}
};
