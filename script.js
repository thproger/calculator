document.querySelector('button').addEventListener('click', e => {
    let firstNumber = document.querySelector('#fn').value
    const firstSystem = document.querySelector('#fn-system').value

    let secondNumber = document.querySelector('#sn').value
    const secondSystem = document.querySelector('#sn-system').value
    const resultSystem = document.querySelector('#result-system').value
    const operation = document.querySelector('#operation').value
    let result = []
    
    if(resultSystem !== firstSystem) {
        if(firstSystem !== '10') {
            firstNumber = convertToSystem(convertToTen(firstNumber), resultSystem)
        } else {
            firstNumber = convertToSystem(firstNumber, resultSystem)
        }
    }
    if(resultSystem !== secondSystem) {
        if(secondSystem !== '10') {
            secondNumber = convertToSystem(convertToTen(secondNumber), resultSystem)
        } else {
            secondNumber = convertToSystem(secondNumber, resultSystem)
        }
    }
    
    let str = ''
    switch (operation) {
        case '+':
            result = plus(firstNumber, secondNumber, resultSystem)
            break;
        case '-':
            if(firstNumber.length < secondNumber.length || (firstNumber.length === secondNumber.length) && firstNumber[firstNumber.length-1] < secondNumber[secondNumber.length-1]) {
                console.log('minus')
                result =  minus(secondNumber, firstNumber, resultSystem)
                str = '-'
            } else {
                console.log('else block')
                result = minus(firstNumber, secondNumber, resultSystem)
            } 
            break;
    }
    result.reverse(); result.forEach(e => str+=e)
    document.querySelector('span').textContent = str
})

function convertToTen(number, system) {
    let result
    for(let i = 0; i < number.length; i++) {
        result += number[i]*Math.pow(system, i)
    }
    return result
}

function convertToSystem(number, system) {
    console.log(number)
    let result = []
    let iterator = number

    for(;;) {
        if(isNaN(iterator)) {
            console.log('Iterator is NaN')
            break
        }
        result.push(iterator%system)
        iterator = Math.floor(iterator/system)
        if(Math.floor(iterator/system) < system) {
            result.push(iterator%system)
            result.push(Math.floor(iterator/system))
            break
        }
    }
    return result
}

function minus(firstNumber, secondNumber, system) {
    console.log(firstNumber)
    console.log(secondNumber)
    let result = []
    for(let i = 0; i < firstNumber.length; i++) {
        if(secondNumber[i]) {
            if(firstNumber[i] < secondNumber[i] && firstNumber[i+1] != 0 && i+1 < firstNumber.length) {
                firstNumber[i+1]--
                console.log('First number is')
                console.log('Result first number is : ' + secondNumber[i])
                result.push(parseInt(system)+firstNumber[i]-secondNumber[i])
            } else {
                result.push(firstNumber[i] - secondNumber[i])
            }
        } else if (firstNumber[i]) {
            result.push(firstNumber[i])
        }
    }
    console.log(result)
    return result
}

function plus(firstNumber, secondNumber, system) {
    let result = []
    if(firstNumber.length >= secondNumber.length) {
        console.log('ok')
    }
    else {
        return plus(secondNumber, firstNumber, system)
    }
    for(let i = 0; i < firstNumber.length; i++) {
        let n
        if(secondNumber[i]) {
            n = firstNumber[i] + secondNumber[i]
        } else {
            n = firstNumber[i]
            console.log('First number is: ' + firstNumber[i])
        }
        if(n >= system || firstNumber[i] >= system) {
            console.log('First number in if is: ' + firstNumber[i])
            if(firstNumber[i+1] !== undefined && !isNaN(firstNumber[i+1])) {
                firstNumber[i+1] += Math.floor(n/system)
                console.log(n-system)
                result.push(n-system)
            }
            else {
                console.log(firstNumber[i])
                if(firstNumber[i] >= system) {
                    result.push(firstNumber[i]%system)
                    result.push(Math.floor(firstNumber[i]/system))
                }
                else {
                    result.push(Math.floor(n/system))
                }
            }
        } else {
            console.log(n)
            result.push(n)
        }
        if(firstNumber[-1] >= system) result.push(1)
    }
    console.log(firstNumber)
    return result
}