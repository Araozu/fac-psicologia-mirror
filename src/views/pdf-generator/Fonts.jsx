import fontCalibri from "./fonts/calibri.ttf";
import fontCalibriBold from "./fonts/calibrib.ttf";
import fontCalibriItalic from "./fonts/calibrii.ttf";
import fontCalibriBoldItalic from "./fonts/calibriz.ttf";
import fontCalibriLight from "./fonts/calibril.ttf";
import fontCalibriLightItalic from "./fonts/calibrili.ttf";

export const Font_Calibri = {
    family: "Calibri",
    fonts: [
        {
            src: fontCalibri,
            fontWeight: "normal",
            fontStyle: "normal",
        },

        {
            src: fontCalibriBold,
            fontWeight: "bold",
            fontStyle: "normal",
        },
        {
            src: fontCalibriItalic,
            fontWeight: "normal",
            fontStyle: "italic",
        },
        {
            src: fontCalibriBoldItalic,
            fontWeight: "bold",
            fontStyle: "italic",
        },
        {
            src: fontCalibriLight,
            fontWeight: "light",
            fontStyle: "normal",
        },
        {
            src: fontCalibriLightItalic,
            fontWeight: "light",
            fontStyle: "italic",
        },
    ],
};
