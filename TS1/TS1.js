const colorButton = document.querySelector('.change-color');
const colors = ['red', 'green', 'blue', 'white'];
let currentIndex = 0;

colorButton.addEventListener('click', () => {
    document.body.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
});