datalogger.onLogFull(function () {
    logging = false
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
})
input.onButtonPressed(Button.A, function () {
    logging = true
    basic.showIcon(IconNames.Yes)
})
input.onButtonPressed(Button.AB, function () {
    logging = false
    basic.showIcon(IconNames.No)
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(lastTemp)
})
let lastTemp = 0
let logging = false
logging = false
basic.showIcon(IconNames.No)
datalogger.setColumnTitles("temperature")
loops.everyInterval(10000, function () {
    if (logging) {
        basic.showIcon(IconNames.Heart)
        lastTemp = input.temperature() * (9 / 5) + 32
        datalogger.log(datalogger.createCV("temperature", lastTemp))
        basic.clearScreen()
    }
})
