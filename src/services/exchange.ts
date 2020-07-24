import axios from 'axios';
const OPENEXCHANGERATES_API_KEY = process.env.OPENEXCHANGERATES_API_KEY;
const OPENEXCHANGERATES_API_BASE_URL = process.env.OPENEXCHANGERATES_API_BASE_URL;

export const getExchange = async (base: string, to: string): Promise<number> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const exchangeUrl = `${OPENEXCHANGERATES_API_BASE_URL}/latest.json?app_id=${OPENEXCHANGERATES_API_KEY}&base=${base}&symbols=${to}`;
    // const exchangeUrl = `https://openexchangerates.org/api/latest.json?app_id=4a96af2d932d4c7ea145259ed0c0c511&base=USD&symbols=ARS`;
    console.log(`exchangeUrl: ${exchangeUrl}`);
    const response = await axios.get(exchangeUrl);

    if (!response?.data?.rates || !response?.data?.rates[to]) {
      console.warn(
        `Exchanges not found with base: ${base} and to: ${to} - cause: ${
          JSON.stringify(response?.data) || `<Unknown>`
        } - response.data=${response?.data}`
      );

      return Number(0);
    }
    console.debug(`Exchange (${base}/${to}) succesfully retrieved: ${response?.data?.rates[to]}`);
    return Number(response?.data?.rates[to]);
  } catch (e) {
    console.error(`Error while retrieving exchange cause: `, JSON.stringify(e));
    return Number(0);
  }
};
