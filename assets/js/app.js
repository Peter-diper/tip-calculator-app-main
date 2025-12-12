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
const activeBtn = document.querySelector(".active");

const inputs = [totalPepole, totalBill];
console.log(inputs);

window.addEventListener("DOMContentLoaded", () => {
  startForm(form);
  calculateTotal();
  resetBtn.addEventListener("click", (e) => {
    tipPerPerson.textContent = "$0.00";
    PricePerPerson.textContent = "$0.00";
    resetBtn.classList.remove("btn--secondery");
    totalPepole.value = "0";
    totalBill.value = "0";
  });
});

// functions
function startForm(form) {
  form.addEventListener("submit", handeler);
  tipsOptions.forEach((btn) => {
    btn.addEventListener("click", calcAmount);
  });
}

function calculateTotal() {
  totalBill.addEventListener("input", (e) => {
    let totalPersonValue = +totalPepole.value === 0 ? 1 : +totalPepole.value;

    const totalBillValue = +e.target.value;
    // validation

    tipsOptions.forEach((btn) => {
      btn.classList.remove("active");
    });

    errorInputMsg.style.display = "none";

    const totalPricePerPerson = totalBillValue / totalPersonValue;
    //adding total tip per person and total price per person
    tipPerPerson.textContent = `$0.00`;
    PricePerPerson.textContent = `$${totalPricePerPerson.toFixed(2)}`;

    isReset(resetBtn);
  });
  totalPepole.addEventListener("input", (e) => {
    console.log(e.target.value);
    const totalPersonValue = +totalPepole.value;
    const totalBillValue = +totalBill.value;
    // validation
    const validation = {
      tipValue:
        (typeof totalPersonValue === "number" && totalPersonValue > 0) || NaN,
      billValue:
        (typeof totalBillValue === "number" && totalBillValue > 0) || NaN,
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
          input.dataset.id === "bill" &&
            input.classList.remove("input--failed");
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

    tipsOptions.forEach((btn) => {
      btn.classList.remove("active");
    });

    errorInputMsg.style.display = "none";

    const totalPricePerPerson = totalBillValue / totalPersonValue;
    //adding total tip per person and total price per person
    tipPerPerson.textContent = `$0.00`;
    PricePerPerson.textContent = `$${totalPricePerPerson.toFixed(2)}`;

    isReset(resetBtn);
  });
}

function handeler(e) {
  e.preventDefault();
}

function calcAmount(e) {
  tipsOptions.forEach((btn) => {
    btn.value !== e.target.value && btn.classList.remove("active");
  });
  e.target.classList.add("active");

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
}
