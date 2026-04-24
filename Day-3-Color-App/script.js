const body = document.body;
const buttons = document.querySelectorAll(".buttons button");
const randomBtn = document.querySelector(".random");
const colorText = document.getElementById("colorName");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const color = button.classList[0];
    body.style.background = color;
    colorText.innerText = "Current Color: " + color;
  });
});

// Random color generator
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

randomBtn.addEventListener("click", () => {
  const randomColor = getRandomColor();
  body.style.background = randomColor;
  colorText.innerText = "Current Color: " + randomColor;
});