document.querySelector('button').addEventListener('click', e => {
    let firstNumber = document.querySelector('#fn').value
    const firstSystem = document.querySelector('#fn-system').value

    let secondNumber = document.querySelector('#sn').value
    const secondSystem = document.querySelector('#sn-system').value
    const resultSystem = document.querySelector('#result-system').value
    const operation = document.querySelector('#operation').value
    Array.from(firstNumber).forEach(e => {
        if(convertLetters(e) >= firstSystem) {
            alert("You write not correct first number")
            return
        }
    })
    Array.from(secondNumber).forEach(e => {
        if(convertLetters(e) >= firstSystem) {
            alert("You write not correct second number")
            return
        }
    })
    let result = []

    let str = ''
    let fn = convertToTen(Array.from(firstNumber).reverse(), firstSystem)
    let sn = convertToTen(Array.from(secondNumber).reverse(), secondSystem)
    switch (operation) {
        case '+':
            result = fn + sn
            convertToSystem(result, resultSystem).reverse().forEach(e => str+=e)
            break;
        case '-':
            result = fn - sn
            if (result < 0) {
                result = -result
                str += '-'
                convertToSystem(result, resultSystem).reverse().forEach(e => str+=e)
            } 
            else convertToSystem(result, resultSystem).reverse().forEach(e => str+=e)
            break;
        case '*':
            result = fn * sn
            convertToSystem(result, resultSystem).reverse().forEach(e => str+=e)
            break
        case '/':
            result = Math.floor(fn/sn)
            convertToSystem(result, resultSystem).reverse().forEach(e => str+=e)
            str += ' + '
            convertToSystem(fn % sn, resultSystem).reverse().forEach(e => str+=e)
            str += '/'
            convertToSystem(fn, resultSystem).reverse().forEach(e => str+=e)
            break
    }
    
    document.querySelector('span').textContent = str
})

function convertToTen(number, system) {
    let result = 0
    number.forEach((e, i) => {
        console.log('element is: ' + convertLetters(e))
        result += convertLetters(e)*Math.pow(system, i)
    });
    return result
}

function convertToSystem(number, system) {
    console.log(number)
    let result = []
    let iterator = convertLetters(number)

    for(;;) {
        if(isNaN(iterator)) {
            console.log('Iterator is NaN')
            break
        }
        result.push(convertToLetters(iterator%system))
        iterator = Math.floor(convertToLetters(iterator/system))
        if(Math.floor(iterator/system) < system) {
            result.push(convertToLetters(iterator%system))
            result.push(convertToLetters(Math.floor(iterator/system)))
            break
        }
    }
    return result
}

function convertLetters(params) {
    console.log('is ' + params)
    switch (params) {
        case 'a':
            return 10
        case 'b':
            return 11
        case 'c':
            return 12
        case 'd':
            return 13
        case 'e':
            return 14
        case 'f':
            return 15
        default:
            return parseInt(params)
    }
}

function convertToLetters(params) {
    switch (params) {
        case 10:
            return 'a'
        case 11:
            return 'b'
        case 12:
            return 'c'
        case 13:
            return 'd'
        case 14:
            return 'e'
        case 15:
            return 'f'
        default:
            return params
    }
}