var canvas = document.getElementById("graphCanvas"),
ctx = canvas.getContext("2d");

//Number of line segments.
anyNumber = 100;
//Used to define the mathematical range.
var xMin = -10,
    xMax = 10,
    yMin = -10,
    yMax = 10;


//MathJs to convert text to mathematical expressions
var math = mathjs(),
    expression = "sin(x + an) * x",
    scope = {
        x: 0,
        an:0
    },
    tree = math.parse(expression, scope);

//Increment value to animate the wave.
var waveAnimation = 0,
    waveAnimationIncrementValue = 0.2;


drawSineWave();
expressionToText()
sineWaveAnimation();

function drawSineWave()
{
    //Coordinates of the segments in pixel coordinates.
    let xPixelCord, yPixelCord,
    percentX, percentY,
    //Coordinates of the segmentes in math coordinates.
    mathX, mathY;

    //Clear the canvas every call.
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.beginPath();
    for(let i = 0; i < anyNumber; i++)
    {
        //Value going from 0 to 1.
        percentX = i / (anyNumber - 1);
        //Project that between -10 and 10 in X.
        mathX = percentX * (xMax - xMin) + xMin;
        //Compute the wave.
        mathY = sineFunction(mathX);
        //Get the value back from 0 to 10
        percentY = (mathY - yMin) / (yMax - yMin); 

        percentY = 1 - percentY;

        //Draws that in the canvas.
        xPixelCord = percentX * canvas.width;
        yPixelCord = percentY * canvas.height;
        ctx.lineTo(xPixelCord, yPixelCord);
        ctx.strokeStyle = "blue"   
    }
    ctx.stroke();
}


function sineFunction(mathX)
{
    scope.x = mathX;
    //Getting the waveAnimation already inremented into the math
    //expression.
    scope.an = waveAnimation;
    return mathY  = tree.eval();
}

function expressionToText()
{
    let input = $('#inputMathFunc');

    //Putting the value of the showed expression into the field.
    input.val(expression);

    input.keyup(function(event)
    {
        expression = input.val();
        tree = math.parse(expression, scope);
        //Draw curve updates the wave according to the
        //current text.
        drawSineWave();
    });
}

function sineWaveAnimation()
{
    (function animLoop(){
        requestAnimationFrame(animLoop);
        render();
    }());
}

function render()
{
    //Increment value of waveAnimation.
    waveAnimation += waveAnimationIncrementValue;
    //Redraw wave after incrementation.
    drawSineWave();
}
