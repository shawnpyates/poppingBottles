var dollars = {neededForPop: 2};
var bottles = {neededForPop: 2}; // bottles.amount: 1
var caps = {neededForPop: 4};  // caps.amount: 1
var totalPopsConsumed = 0;
var popsAtMoment = 0;
var recursions = 0;
var resetToZero = false;
var returnString = "";

// After 1st Run
// bottles.amount: 1
// caps.amount: 1
// popsAtMoment = 3
// totalPopsConsumed = 5

// On 2nd Run
// bottles.amount: 4
// caps.amount: 4
// totalsPopsConsumer = 8
// popsAtMoment = 0
// popsAtMoment = 2
// bottles.amount:


function getTotalPopYield (dollarsSpent) {
  popsAtMoment += getPops(dollars, dollarsSpent);
  setAmount(bottles, popsAtMoment);
  setAmount(caps, popsAtMoment);
  totalPopsConsumed += popsAtMoment;
  popsAtMoment = 0;
  if (bottles.amount >= 2) {
    convertToPopAndReset(bottles);
  }
  if (caps.amount >= 4){
    convertToPopAndReset(caps);
  }
  if (popsAtMoment > 0) {
    recursions++;
    getTotalPopYield(0);
  }
  return totalPopsConsumed;
}


function getPops (paymentType, amount) {
  return Math.floor(amount / paymentType.neededForPop);
}

function getRemainder (paymentType, amount) {
  return amount % paymentType.neededForPop;
}

function setAmount (paymentType, amount) {
  if (recursions > 0 && !resetToZero) {
    paymentType.amount += amount;
  } else {
    paymentType.amount = amount;
  }
}

function convertToPopAndReset(paymentType) {
  resetToZero = true;
  popsAtMoment += getPops(paymentType, paymentType.amount);
  setAmount(paymentType, getRemainder(paymentType, paymentType.amount));
  resetToZero = false;
}


console.log(getTotalPopYield(10));


