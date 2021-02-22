var data = [
    {
        "e": "RU",
        "i": "CN",
        "v": 3000000,
        "inColor": "#EE0E00",
        "outColor": "#FFFF00"
    },
    {
            "e": "ES",
            "i": "CU",
            "v": 1000000,
            "inColor": "#0000FF",
            "outColor": "#00FF00"
    },
    {
        "e": "ES",
        "i": "RU",
        "v": 1000000,
        "inColor": "#0000FF",
        "outColor": "#00FF00"
    },
    {
        "e": "IT",
        "i": "ES",
        "v": 1000000,
        "inColor": "#F000FF",
        "outColor": "#00FF00"
    },
    {
        "e": "UA",
        "i": "ES",
        "v": 100000,
        "inColor": "#FR00FF",
        "outColor": "#0FAFF0"
    },
    {
        "e": "DE",
        "i": "ES",
        "v": 100000,
        "inColor": "#00F0FF",
        "outColor": "#00FF00"
    },
    {
        "e": "ES",
        "i": "RU",
        "v": 1000000,
        "inColor": "#0000FF",
        "outColor": "#00FF00"
    },
    {
        "e": "AU",
        "i": "RU",
        "v": 100000,
        "inColor": "#FF00FF",
        "outColor": "#FFFF00"
    },
]

// get the container to hold the IO globe
var container = document.getElementById( "globalArea" );

// create controller for the IO globe, input the container as the parameter
var controller = new GIO.Controller( container );

// Styling
//controller.setStyle("gorgeousDream")
controller.setSurfaceColor("#00F7FF") //#00C5FF") //00EBFF");

controller.setTransparentBackground( true );
/*controller.configure({
    color: {
        background: 0x2E8DDC
    }
})*/
controller.adjustRelatedBrightness(0.8);
controller.adjustOceanBrightness(0.9);
controller.setHaloColor("#1FF1FF");
controller.setInitCountry("ES")
controller.disableUnmentioned(true)
controller.setAutoRotation( true, 1 ) // Auto rotation

// ask a file for the JSON data, using AJAX to load the data
controller.addData( data );

// call the init() API to show the IO globe in the browser
controller.init();