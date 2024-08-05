cooling = False
lastTemp = 0
logging = False
led.set_brightness(127) # 50%
interval = 600000 # 10 minutes
logging = False
basic.show_icon(IconNames.NO)
datalogger.set_column_titles("temperature", "cooling")

def on_button_pressed_a():
    basic.show_number(lastTemp)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global cooling
    cooling = not (cooling)
    basic.clear_screen()
    if cooling:
        basic.show_string("AC ON")
    else:
        basic.show_string("AC OFF")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    global logging
    logging = not (logging)
    if logging:
        basic.show_icon(IconNames.YES)
        basic.clear_screen()
    else:
        basic.show_icon(IconNames.NO)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_log_full():
    global logging
    logging = False
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
datalogger.on_log_full(on_log_full)

# Main loop
def on_every_interval():
    global lastTemp
    if logging:
        basic.show_icon(IconNames.SMALL_DIAMOND)
        lastTemp = input.temperature() * (9 / 5) + 32
        datalogger.log(datalogger.create_cv("temperature", lastTemp),
            datalogger.create_cv("cooling", cooling))
        basic.clear_screen()
loops.every_interval(interval, on_every_interval)
