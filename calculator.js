class Calculator {
    constructor(topDisplayText, bottomDisplayText) {
        this.topDisplayText = topDisplayText
        this.bottomDisplayText = bottomDisplayText
        this.clear()
    }

    clear() {
        this.bottomDisplay = ''
        this.topDisplay = ''
        this.operation = undefined
    }

    delete() {
        this.bottomDisplay = this.bottomDisplay.toString().slice(0, -1)
    }

    addNumToScreen(number) {
        if (number === '.' && this.bottomDisplay.includes('.')) return
        this.bottomDisplay = this.bottomDisplay.toString() + number.toString()
    }

    selectOperation(operation) {
        if (this.bottomDisplay === '') return
        if (this.topDisplay !== '') {
            this.solve()
        }

        this.operation = operation
        this.topDisplay = this.bottomDisplay
        this.bottomDisplay = ''
    }

    solve() {
        let computation
        let top = parseFloat(this.topDisplay)
        let bottom = parseFloat(this.bottomDisplay)
        if (isNaN(bottom) || isNaN(top)) return
        switch (this.operation) {
            case '+':
                computation = top + bottom
                break
            case '-':
                computation = top - bottom
                break
            case '*':
                computation = top * bottom
                break
            case '/':
                computation = top / bottom
                break
            default:
                return

        }
        this.bottomDisplay = computation
        this.operation = undefined
        this.topDisplay = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else { return integerDisplay }
    }

    updateDisplay() {
        this.bottomDisplayText.innerText = this.getDisplayNumber(this.bottomDisplay)
        if (this.operation != null) {
            this.topDisplayText.innerText =
                `${this.getDisplayNumber(this.topDisplay)} ${this.operation}`
        } else {
            this.topDisplayText.innerText = ''
        }



    }
}



const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const topDisplayText = document.querySelector('[data-top-display]')
const bottomDisplayText = document.querySelector('[data-bottom-display]')

const calculator = new Calculator(topDisplayText, bottomDisplayText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumToScreen(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.solve()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})