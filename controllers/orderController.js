const request = require("request-promise-cache");
const bitcoin = require("bitcoinjs-lib");
const bip32 = require("bip32");
const config = require("../config/config");
const Order = require("./../models/orderModel");
const xpub = config.XPUB;
const isTestnet = config.TESTNET === true;
const network = isTestnet ? bitcoin.networks.testnet : bitcoin.networks.bitcoin;
const root = bip32.fromBase58(xpub, network);

const getAmountForPrice = async (price) => {
  const url = "https://api.coindesk.com/v1/bpi/currentprice.json";
  const result = await request({
    url: url,
    cacheKey: url,
    cacheTTL: 15,
    cacheLimit: 24,
    resolveWithFullResponse: false,
  });
  const response = JSON.parse(result);
  const rate = response["bpi"]["USD"]["rate_float"];
  return price / rate;
};

const getAddress = async () => {
  const index = await Order.countDocuments();
  const node = root.derive(index);
  const { address } = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network,
  });
  console.log(address);
  return address;
};

const createOrder = async ({ id, price }) => {
  const amount = await getAmountForPrice(price);
  const address = await getAddress();
  return {
    paymentAddress: address,
    amount: amount,
    price: price,
    planId: id,
  };
};

module.exports = createOrder;
