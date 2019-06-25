const nextTab = document.querySelectorAll('.next');
const prevTab = document.querySelectorAll('.prev');
const tabs = document.querySelectorAll('fieldset');
const steps = document.querySelectorAll('.span-indication')
const form = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
let stepValue = 0;

window.onload = () => {
    for (let i = 0; i < nextTab.length; i++) {
        nextTab[i].classList.add('valid');
        prevTab[i].classList.add('valid');
    }
    for (let i = 0; i < steps.length; i++) {
        steps[i].classList.add('valid');
    }

    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.add('valid');
        if (i != 0) {
            tabs[i].classList.remove('current-tab');
        }
    }
    form.classList.add('valid');
    submitBtn.classList.add('valid');
}

for (let i = 0; i < nextTab.length; i++) {
    let thisButton = nextTab[i];
    thisButton.addEventListener("click", () => {
        let currentTab = thisButton.closest('.tab');
        currentTab.classList.toggle('slideNext');
        stepValue++;
        stepCount();
        console.log(stepValue)
        console.log(currentTab);
        setTimeout(() => {
            currentTab.nextElementSibling.classList.toggle('slideInNext');
            currentTab.nextElementSibling.classList.toggle('current-tab');
            currentTab.classList.remove('slideNext', 'current-tab');
        }, 300)
        setTimeout(() => {
            currentTab.nextElementSibling.classList.toggle('slideInNext');
        }, 50)
    });
}

for (let i = 0; i < prevTab.length; i++) {
    let thisButton = prevTab[i];
    thisButton.addEventListener("click", () => {
        let currentTab = thisButton.closest('.tab');
        currentTab.classList.toggle('slideNext');
        stepValue--;
        stepCount();
        console.log(stepValue)
        console.log(currentTab);
        setTimeout(() => {
            currentTab.previousElementSibling.classList.toggle('slideInNext');
            currentTab.previousElementSibling.classList.toggle('current-tab');
            currentTab.classList.remove('slideNext', 'current-tab');
        }, 300)
        setTimeout(() => {
            currentTab.nextElementSibling.classList.toggle('slideInNext');
        }, 50)
    });
}

function stepCount() {
    for (let i = 0; i < steps.length; i++) {
        if (stepValue === 0) {
            steps[0].classList.remove('finished');
            steps[1].classList.remove('finished', 'active');
            steps[0].classList.add('active');
        } else if (stepValue === 1) {
            steps[2].classList.remove('active');
            steps[1].classList.remove('finished');
            steps[0].classList.add('finished');
            steps[1].classList.add('active');
        } else {
            steps[1].classList.add('finished');
            steps[2].classList.add('active');
        }
    }
}