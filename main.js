curt1buttons = document.querySelectorAll('.curt1buttons');
curt2buttons = document.querySelectorAll('.curt2buttons');
firstinput = document.querySelector('.firstinput');
secondinput = document.querySelector('.secondinput');
display1 = document.querySelector('.display1');
display2 = document.querySelector('.display2');
errornotification = document.querySelector('.errornotification');
deletebutton = document.querySelector('.deletebutton');
errortext = document.querySelector('.errortext');
cur1val = 'RUB';
cur2val = 'USD';
checker = 0;

function errorsend(text) {
    errornotification.style.display = 'block';
    setInterval(() => {
        if (errornotification.style.borderColor == 'red') {
            errornotification.style.borderColor = 'white';
        } else {
            errornotification.style.borderColor = 'red';
        }

    }, 100)
    deletebutton.addEventListener('click', () => {
        errornotification.style.display = 'none';
    });
    errortext.innerHTML = text;
}

function convert(cur1val, cur2val, checker) {
    let a = cur1val;
    let b = cur2val;
    let c = checker;

    if (c == 0 || c == 1) {
        fetch(`https://api.exchangerate.host/latest?base=${a}&symbols=${b}`)
            .then(res => res.json())
            .then(data => {
                if (firstinput.value.includes(',') == true) {
                    firstinput.value = firstinput.value.split(',').join('.');
                }
                if (isNaN(firstinput.value)) {
                    errorsend('Please include a number');
                }
                secondinput.value = firstinput.value * data.rates[b];
            })
            .catch(error => {
                errorsend('Something went wrong');
                console.log(error);
            })

    } else if (c == 2) {
        fetch(`https://api.exchangerate.host/latest?base=${b}&symbols=${a}`)
            .then(res => res.json())
            .then(data => {
                if (secondinput.value.includes(',') == true) {
                    secondinput.value = secondinput.value.split(',').join('.');
                }
                if (isNaN(secondinput.value)) {
                    errorsend('Please include a number');
                }
                firstinput.value = secondinput.value * data.rates[a];
            })
            .catch(error => {
                errorsend('Something went wrong');
                console.log(error);
            })
    }
}
convert(cur1val, cur2val, checker);

function displaycur(cur1val, cur2val) {

    let a = cur1val;
    let b = cur2val;

    fetch(`https://api.exchangerate.host/latest?base=${b}&symbols=${a}`)
        .then(res => res.json())
        .then(data => {
            display2.innerHTML = `1 ${b} = ${data.rates[a]} ${a}`;
        })
        .catch(error => {
            errorsend('Something went wrong');
            console.log(error);
        })

    fetch(`https://api.exchangerate.host/latest?base=${a}&symbols=${b}`)
        .then(res => res.json())
        .then(data => {
            display1.innerHTML = `1 ${a} = ${data.rates[b]} ${b}`;
        })
        .catch(error => {
            errorsend('Something went wrong');
            console.log(error);
        })
}
displaycur(cur1val, cur2val)

firstinput.addEventListener('keyup', () => {
    checker = 1;
    convert(cur1val, cur2val, checker);

})
secondinput.addEventListener('keyup', () => {
    checker = 2;
    convert(cur1val, cur2val, checker)
})

curt1buttons.forEach(but1 => {
    but1.addEventListener('click', () => {
        if (but1.innerText == cur2val) {
            errorsend('Currencies are equal')
        } else if (but1.innerText != cur2val) {
            cur1val = but1.innerText;

            //active class addition for color change
            curt1buttons.forEach(btn1 => {
                btn1.classList.remove('active1')
            })
            but1.classList.add('active1');
        }
        convert(cur1val, cur2val, checker);
        displaycur(cur1val, cur2val);
    })
});

curt2buttons.forEach(but2 => {
    but2.addEventListener('click', () => {
        if (but2.innerText == cur1val) {
            errorsend('Currencies are equal')
        } else if (but2.innerText != cur1val) {
            cur2val = but2.innerText;

            //active class addition for color change
            curt2buttons.forEach(btn2 => {
                btn2.classList.remove('active2')
            })
            but2.classList.add('active2');
        }
        convert(cur1val, cur2val, checker);
        displaycur(cur1val, cur2val);
    })
});