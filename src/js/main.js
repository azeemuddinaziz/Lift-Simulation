const params = new URLSearchParams(window.location.search);
const numberOfFloors = params.get("number_of_floors");
const numberOfLifts = params.get("number_of_lifts");

const floorContainer = document.querySelector(".container");
const liftContainer = document.querySelector(".lift-container");
const wrapperContainer = document.querySelector(".wrapper");

window.addEventListener("load", () => {
  floorContainer.style.width = `${liftContainer.scrollWidth}px`;
});

if (numberOfFloors < 2 || numberOfLifts === null) {
  window.location.href = "index.html";
}

for (let i = numberOfFloors; i > 0; i--) {
  floorContainer.innerHTML += `<div class="floor ${i}" id="floor_${i}">
          <div>Floor ${i}</div>
          <div class="button-grp">
            <button type="button" name="up" class="up" onClick="getLiftToFloor(${i}, true)">
              UP
            </button>
            <button type="button" name="down" class="down" onClick=getLiftToFloor(${i})>
              DOWN
            </button>
          </div>
          <hr />
        </div>`;
}

for (let i = 1; i <= numberOfLifts; i++) {
  liftContainer.innerHTML += `<div class="lift" isIdle="true">
        <span></span>
        <span></span>
      </div>`;
}

async function getLiftToFloor(floor_number, isUp) {
  const lift = document.querySelector(`.lift[isIdle="true"]`);
  lift.setAttribute("isIdle", false);

  lift.style.transform = `translateY(-${floor_number * 152}px)`;
  lift.style.transition = ` ${floor_number * 2}s transform linear`;

  await wait(2000 * floor_number);
  openLiftDoors(lift);

  await wait(3000);
  closeLiftDorrs(lift);
  await wait(2500);

  if (!isUp) {
    getLiftToFloorZero(lift, floor_number);
  } else {
    getLiftToTopFloor(lift, floor_number);
  }
}

async function getLiftToTopFloor(lift, currentFloor) {
  lift.style.transform = `translateY(-${numberOfFloors * 152}px)`;
  lift.style.transition = ` ${
    (numberOfFloors - currentFloor) * 2
  }s transform linear`;

  await wait(2000 * (numberOfFloors - currentFloor));
  openLiftDoors(lift);

  await wait(3000);
  closeLiftDorrs(lift);
  await wait(2500);

  lift.setAttribute("isIdle", true);

  await wait(5000);
  lift.style.transform = `translateY(0)`;
  lift.style.transition = ` ${numberOfFloors * 2}s transform linear`;
}

async function getLiftToFloorZero(lift, currentFloor) {
  lift.style.transform = `translateY(0)`;

  await wait(2000 * currentFloor);
  openLiftDoors(lift);

  await wait(3000);
  closeLiftDorrs(lift);
  await wait(2500);

  lift.setAttribute("isIdle", true);
}

function openLiftDoors(lift) {
  const spans = lift.querySelectorAll("span");

  spans[0].style.transform = `translateX(-100%)`;
  spans[1].style.transform = `translateX(100%)`;
}

function closeLiftDorrs(lift) {
  const spans = lift.querySelectorAll("span");

  spans[0].style.transform = `translateX(0%)`;
  spans[1].style.transform = `translateX(1%)`;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
