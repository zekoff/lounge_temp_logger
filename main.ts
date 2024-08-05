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
function recordTemp () {
    if (logging) {
        basic.showIcon(IconNames.SmallDiamond)
        lastTemp = input.temperature() * (9 / 5) + 32
        datalogger.log(
        datalogger.createCV("temperature", lastTemp),
        datalogger.createCV("cooling", cooling),
        datalogger.createCV("time", timeanddate.time(timeanddate.TimeFormat.HMMSSAMPM))
        )
        basic.clearScreen()
    }
}
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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    recordTemp()
})
let cooling = false
let lastTemp = 0
let logging = false
timeanddate.setTime(8, 5, 0, timeanddate.MornNight.PM)
led.setBrightness(127)
// 50%
let interval = 600000
// 10 minutes
logging = false
basic.showIcon(IconNames.No)
datalogger.setColumnTitles(
"temperature",
"cooling",
"time"
)
// Main loop
loops.everyInterval(interval, function () {
    recordTemp()
})
