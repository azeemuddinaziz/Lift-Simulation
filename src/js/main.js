const params = new URLSearchParams(window.location.search);
const numberOfFloors = params.get("number_of_floors");
const numberOfLifts = params.get("number_of_lifts");

const floorContainer = document.querySelector(".container");
const liftContainer = document.querySelector(".lift-container");

if (numberOfFloors < 2 || numberOfLifts === null) {
  window.location.href = "index.html";
}

for (let i = numberOfFloors; i > 0; i--) {
  floorContainer.innerHTML += `<div class="floor ${i}" id="floor_${i}">
          <span>Floor ${i}</span>
          <div class="button-grp">
            <button type="button" name="up" class="up" onClick=getLiftToFloor(${i})>
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
  liftContainer.innerHTML += `<div class="lift" lift_floor=0>
        <span></span>
        <span></span>
      </div>`;
}

async function getLiftToFloor(floor_number) {
  const lift = document.querySelector(`.lift[lift_floor="0"]`);

  lift.style.transform = `translateY(-${floor_number * 152}px)`;
  lift.style.transition = ` ${floor_number * 2}s transform linear`;
  lift.setAttribute("lift_floor", floor_number);

  await wait(2000 * floor_number);
  openLiftDoors(lift);
  await wait(2000);

  await wait(1000);
  closeLiftDorrs(lift);

  await wait(3000);
  getLiftToFloorZero(lift);
}

function getLiftToFloorZero(lift) {
  lift.style.transform = `translateY(0)`;
  lift.setAttribute("lift_floor", 0);
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
