// nodes
const form = document.querySelector("form");
const tipValueSection = document.querySelector(".tip--wrapper");
const tipsOptions = tipValueSection.querySelectorAll(".btn");
const totalPepole = document.querySelector("#total--person");
const totalBill = document.querySelector("#total--bill");
const resetBtn = document.querySelector(".reset--btn");
const tipPerPerson = document.querySelector("#tip-amount");
const PricePerPerson = document.querySelector("#total--price");
const errorInputMsg = document.querySelector(".error--message");
const inputWrappers = document.querySelectorAll(".input--wrapper");

window.addEventListener("DOMContentLoaded", () => {
  startForm(form);
});

// functions
function startForm(form) {
  form.addEventListener("submit", handeler);
  tipsOptions.forEach((btn) => {
    btn.addEventListener("click", calcAmount);
  });
}

function handeler(e) {
  e.preventDefault();
  const totalPersonValue = +totalPepole.value;
  const totalBillValue = +totalBill.value;
  // validation
  const validation = {
    tipValue: !!String(totalPersonValue).indexOf(0) || NaN,
    billValue: !!String(totalBillValue).indexOf(0) || NaN,
  };

  if (!validation.billValue || !validation.tipValue) {
    inputWrappers.forEach((input) => {
      // check if both are fales
      if (!validation.billValue && !validation.tipValue) {
        input.classList.add("input--failed");
        errorInputMsg.style.display = "block";
        return;
      }

      if (!validation.billValue) {
        input.dataset.id === "people--section" &&
          input.classList.remove("input--failed");
        input.dataset.id === "bill" && input.classList.add("input--failed");
      }

      if (!validation.tipValue) {
        input.dataset.id === "bill" && input.classList.remove("input--failed");
        input.dataset.id === "people--section" &&
          input.classList.add("input--failed");

        errorInputMsg.style.display = "block";
      }
    });
    return;
  }
  inputWrappers.forEach((input) => {
    input.classList.remove("input--failed");
  });

  errorInputMsg.style.display = "none";

  isReset(resetBtn);
}

function calcAmount(e) {
  const totalPersonValue = +totalPepole.value;
  const totalBillValue = +totalBill.value;

  if (!totalPersonValue || !totalBillValue) return;

  const tipPercentage = e.target.value;
  const totalTipPerPerson = (totalBillValue * tipPercentage) / totalPersonValue;
  const totalPricePerPerson =
    totalTipPerPerson + totalBillValue / totalPersonValue;

  //adding total tip per person and total price per person
  tipPerPerson.textContent = `$${totalTipPerPerson.toFixed(2)}`;
  PricePerPerson.textContent = `$${totalPricePerPerson.toFixed(2)}`;
}

function isReset(resetBtn) {
  resetBtn.classList.add("btn--secondery");
  resetBtn.addEventListener("click", (e) => {
    tipPerPerson.textContent = "$0.00";
    PricePerPerson.textContent = "$0.00";
    resetBtn.classList.remove("btn--secondery");
    totalPepole.value = "0";
    totalBill.value = "0";
  });
}
