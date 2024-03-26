const BTN_KEYS = {
    saveTask: 'st',
    cancelTask: 'ct',
    saveBoard: 3,
    cancelBoard: 4
}

const PRESET_COLORS = {
    "--opt1": "#5f9ea0", // cadet blue
    "--opt2": "#6495ed", // cornflowerblue
    "--opt3": "#556b2f", // darkolivegreen
    "--opt4": "#ed143d", // crimson
    "--opt5": "#fff8dc" // cornsilk
}

Object.freeze(BTN_KEYS);
Object.freeze(PRESET_COLORS);

export {
    BTN_KEYS,
    PRESET_COLORS
}
