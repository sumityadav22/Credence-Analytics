<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Credence Aanlytics | Sample 2</title>
    </head>
    <body>
        <div id="dataSection">
            {{name}}, {{sys.country}} {{weather.0.description}}
            <br>
            {{main.temp}} &#8451; temperature from {{main.temp_min}} to {{main.temp_max}} &#8451;, wind {{wind.speed}} m/s. clouds {{clouds.all}} %, {{main.pressure}} hpa
            <br>
            Geo chords [{{coord.lat}},{{coord.lon}}]
        </div>
    </body>
</html>
