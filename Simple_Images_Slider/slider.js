let arrayImages = [
  "img/cat_1.jpg", "img/cat_2.jpg", "img/cat_3.jpeg",
  "img/cat_4.jpeg", "img/cat_5.jpg", "img/cat_6.jpg",
  "img/cat_7.jpg", "img/cat_8.jpg"
];

$(".show > div").css("background-image", "url(" + arrayImages[0] + ")");
$(".show > div").css("background-size", "100%");
$(".pointN:first").css("background-color", "aqua");

//event - tuggling points on slider;
$(".pointN").click(function(e){
  $(".pointN").css("background-color", "white");
  $(this).css("background-color", "aqua");

  let pointIndex = $(".pointN").index(this);
  $(".show > div").css("background-image", "url(" + arrayImages[pointIndex] + ")");

});

let btnsForClick = []; //array of children elem for method find().
for(let j = 0; j < arrayImages.length; j++)
{
  let buttonIndex = $(".buttons").children()[j];
  btnsForClick.push(buttonIndex);
}
//event - buttons in menu;
//1)start-button

$(".buttons").find(btnsForClick[0]).click(function(e){
  $(".pointN").css("background-color", "white");
  $(".pointN:first").css("background-color", "aqua");
  $(".show > div").css("background-image", "url(" + arrayImages[0] + ")");
});

//2)forward-button
$(".buttons").find(btnsForClick[1]).click(function(e){
  let foundChild = 0;
  let aquaPointIndex = 0;
  for(let i = 0; i < arrayImages.length; i++)
  {
    foundChild = $(".points").children()[i];
    if($(".points").find(foundChild).css('background-color') == "rgb(0, 255, 255)")
    {
      if(i == 0)
      {
        aquaPointIndex = 1;
        break;
      }
      else
      {
        aquaPointIndex = i;
        break;
      }
    }
  }
  $(".pointN").css("background-color", "white");
  foundChild = $(".points").children()[aquaPointIndex - 1];
  $(".points").find(foundChild).css("background-color", "aqua");
  $(".show > div").css("background-image", "url(" + arrayImages[aquaPointIndex - 1] + ")");
});

//event - play. begin slide show;
let flag = false;
let beginShow = 0;

$(".buttons").find(btnsForClick[2]).click(function(e){
  if(flag)
  {
    $(this).css("background-image", "url(img/play.png)");
    flag = false;
  }
  else
  {
    flag = true;
    $(this).css("background-image", "url(img/stop.png)");
  }

  let indexAqua = 0;
  let tmpCounter = 0;
  if(flag)
  {
    beginShow = setInterval(function(){
      if(tmpCounter > arrayImages.length - 1)
      {
        tmpCounter = 0; //endless show!
        $(".pointN").css("background-color", "white");
        indexAqua = $(".points").children()[tmpCounter];
        $(".points").find(indexAqua).css("background-color", "aqua");
        $(".show > div").css("background-image", "url(" + arrayImages[tmpCounter] + ")");
        $(".show > div").css("transition-duration", "1s");
        tmpCounter++;
      }
      else
      {
        $(".pointN").css("background-color", "white");
        indexAqua = $(".points").children()[tmpCounter];
        $(".points").find(indexAqua).css("background-color", "aqua");
        $(".show > div").css("background-image", "url(" + arrayImages[tmpCounter] + ")");
        $(".show > div").css("transition-duration", "1s");
        tmpCounter++;
      }
    }, 1500); //set interval - 1.5s;
  }
  else
  {
    clearInterval(beginShow);
    $(".pointN").css("background-color", "white");
    $(".pointN:first").css("background-color", "aqua");
    $(".show > div").css("background-image", "url(" + arrayImages[0] + ")");
    cnt = 2;
  }
});

//event - next-button;
$(".buttons").find(btnsForClick[3]).click(function(e){
  let foundChild = 0;
  let aquaPointIndex = 0;
  for(let i = 0; i < arrayImages.length; i++)
  {
    foundChild = $(".points").children()[i];
    if($(".points").find(foundChild).css('background-color') == "rgb(0, 255, 255)")
    {
      if(i == arrayImages.length - 1)
      {
        aquaPointIndex = i - 1;
        break;
      }
      else
      {
        aquaPointIndex = i;
        break;
      }
    }
  }
  $(".pointN").css("background-color", "white");
  foundChild = $(".points").children()[aquaPointIndex + 1];
  $(".points").find(foundChild).css("background-color", "aqua");
  $(".show > div").css("background-image", "url(" + arrayImages[aquaPointIndex + 1] + ")");
});

//event - end-button;
$(".buttons").find(btnsForClick[4]).click(function(e){
  $(".pointN").css("background-color", "white");
  $(".pointN:last").css("background-color", "aqua");
  $(".show > div").css("background-image", "url(" + arrayImages[arrayImages.length - 1] + ")");
});