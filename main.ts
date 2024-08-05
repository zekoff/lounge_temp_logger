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
    basic.showNumber(lastTemp)
    basic.clearScreen()
})
input.onButtonPressed(Button.AB, function () {
    logging = !(logging)
    if (logging) {
        basic.showIcon(IconNames.Yes)
        basic.clearScreen()
    } else {
        basic.showIcon(IconNames.No)
    }
})
input.onButtonPressed(Button.B, function () {
    cooling = !(cooling)
    basic.clearScreen()
    if (cooling) {
        basic.showString("AC ON")
    } else {
        basic.showString("AC OFF")
    }
    basic.clearScreen()
})
let cooling = false
let lastTemp = 0
let logging = false
led.setBrightness(127)
// 50%
let interval = 600000
// 10 minutes
logging = false
basic.showIcon(IconNames.No)
datalogger.setColumnTitles(
"temperature",
"cooling"
)
// Main loop
loops.everyInterval(interval, function () {
    if (logging) {
        basic.showIcon(IconNames.SmallDiamond)
        lastTemp = input.temperature() * (9 / 5) + 32
        datalogger.log(
        datalogger.createCV("temperature", lastTemp),
        datalogger.createCV("cooling", cooling)
        )
        basic.clearScreen()
    }
})
