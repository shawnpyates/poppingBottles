// NOTE TO CLARIFY DEFINITIONS FOR MY COMMENTS:
// (1) "POPS" REFERS TO FULL BOTTLES OF POP.
// (2) "BOTTLES" REFERS TO EMPTY POP BOTTLES

var dollars = {neededForPop: 2};
var bottles = {neededForPop: 2, extraPopsYielded: 0, amount: 0};
var caps = {neededForPop: 4, extraPopsYielded: 0, amount: 0};
var totalPopsConsumed = 0;
var popsAtMoment = 0;
var reset = false;
var arg = process.argv[2];

function getTotalPopYield (dollarsSpent) {
  // get initial set of pops by buying them with dollars
  popsAtMoment += getPops(dollars, dollarsSpent);
  // extract bottles and caps from the pops
  setAmount(bottles, popsAtMoment);
  setAmount(caps, popsAtMoment);
  // track the total pop consumed, store in variable that stays in the 'background'
  totalPopsConsumed += popsAtMoment;
  // reset the number of pops in the 'foreground'
  popsAtMoment = 0;
  // if we have enough bottles or caps to buy more pop, we spend them and reset their values
  if (bottles.amount >= bottles.neededForPop) {
    exchangeForPopAndReset(bottles);
  }
  if (caps.amount >= caps.neededForPop){
    exchangeForPopAndReset(caps);
  }
  // if we still have more pop left in the 'foreground', run through this function again
  if (popsAtMoment > 0) {
    getTotalPopYield(0);
  }
  // after all pops have been consumed and we don't have enough bottles/caps to buy more...
  // return easy-to-read string that shows key data points
  var returnString = "*************************************************" + "\n";
  returnString += "Total pops consumed: " + totalPopsConsumed + "\n";
  returnString += "Total pops obtained through bottle exchange: " + bottles.extraPopsYielded + "\n";
  returnString += "Total pops obtained through bottle cap exchange: " + caps.extraPopsYielded + "\n";
  returnString += "Bottles remaining: " + bottles.amount + "\n";
  returnString += "Caps remaining: " + caps.amount + "\n";
  returnString += "*************************************************";
  return returnString;
}

// buy pop (initially with dollars, and then later with bottles/caps)
function getPops (paymentType, amount) {
  return Math.floor(amount / paymentType.neededForPop);
}

// get remaining bottles/caps after the maximum amount has been exchanged for pop
function getRemainder (paymentType, amount) {
  return amount % paymentType.neededForPop;
}

function setAmount (paymentType, amount) {
  // (1) when we are exchanging bottles/caps for pop, we are giving them up, which means...
  // we have to reset their respective values to the number that remains after the exchange
  // (2) when we are extracting bottles/caps from pop, we are adding them to the...
  // current amount
  if (reset) {
    paymentType.amount = amount;
  } else {
    paymentType.amount += amount;
  }
}

// exchange bottles/caps for pop and recalculate their values
function exchangeForPopAndReset(paymentType) {
  // set 'reset' to true to account for bottles/caps given up upon exchange
  reset = true;
  // exchange bottles/caps for pop
  popsAtMoment += getPops(paymentType, paymentType.amount);
  // keep track of how many total bottles/caps we exchanged for pop
  paymentType.extraPopsYielded += getPops(paymentType, paymentType.amount);
  // reset amount of bottles/caps
  setAmount(paymentType, getRemainder(paymentType, paymentType.amount));
  // reset 'reset' to false because "setAmount" is later going to be used to add values...
  // rather than reset them
  reset = false;
}

console.log(getTotalPopYield(arg));


