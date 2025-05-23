let arrayImages = [
  "img/cat_1.jpg", "img/cat_2.jpg", "img/cat_3.jpeg",
  "img/cat_4.jpeg", "img/cat_5.jpg", "img/cat_6.jpg",
  "img/cat_7.jpg", "img/cat_8.jpg"
];

function SetStartSliderImageBackground(){
  $(".show > div").css("background-image", "none");
}

let btnsForClick = []; //array of children elem for method find().
for (let j = 0; j < arrayImages.length; j++){
  let buttonIndex = $(".buttons").children()[j];
  btnsForClick.push(buttonIndex);
}
let CurrentImageIndex = 0;
let ImagesAmount = arrayImages.length;
let ProgressBarPercentagePerImage = 100 / ImagesAmount;
let ProgressBarPercentagesAmount = 0;
let ImagesCounter = 0;
let ProgressBarSelector = document.querySelector(".ProgressBar");

//2)backward-button
$(".buttons").find(btnsForClick[1]).click(function(e){
  if (CurrentImageIndex > 0){
    CurrentImageIndex--;
    ImagesCounter--;
    ProgressBarPercentagesAmount = ImagesCounter * ProgressBarPercentagePerImage;
  }
  else {
    ProgressBarPercentagesAmount = 0;
    ImagesCounter = 0;
    CurrentImageIndex = 1;
  }
  $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
  ProgressBarSelector.style.width = ProgressBarPercentagesAmount + '%';
  ProgressBarSelector.style["background-color"] = "#b4be5a";
});

//forward button;
$(".buttons").find(btnsForClick[3]).click(function(e){
  if (CurrentImageIndex < arrayImages.length){
    ImagesCounter++;
    CurrentImageIndex++;
    ProgressBarPercentagesAmount = ImagesCounter * ProgressBarPercentagePerImage;
  }
  else {
    ProgressBarPercentagesAmount = 100;
    ImagesCounter = ImagesAmount;
    CurrentImageIndex = ImagesAmount - 1;
  }
  $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex - 1] + ")");
  ProgressBarSelector.style.width = ProgressBarPercentagesAmount + '%';
  ProgressBarSelector.style["background-color"] = "#b4be5a";
});

//play button - begin slide show;
let PlayButtonPressed = false;
let beginShow = 0;

$(".buttons").find(btnsForClick[2]).click(function(e){
  if (PlayButtonPressed){
    $(this).css("background-image", "url(img/play.png)");
    PlayButtonPressed = false;
  }
  else {
    PlayButtonPressed = true;
    $(this).css("background-image", "url(img/stop.png)");
  }

  let indexAqua = 0;
  let tmpCounter = 0;
  if (PlayButtonPressed){
    beginShow = setInterval(function(){
      if (tmpCounter < arrayImages.length){
        $(".pointN").css("background-color", "white");
        indexAqua = $(".points").children()[tmpCounter];
        $(".points").find(indexAqua).css("background-color", "aqua");
        $(".show > div").css("background-image", "url(" + arrayImages[tmpCounter] + ")");
        $(".show > div").css("transition-duration", "1s");
        tmpCounter++;
      }
      else {
        clearInterval(beginShow);
        $(".pointN").css("background-color", "white");
        $(".pointN:first").css("background-color", "aqua");
        $(".show > div").css("background-image", "url(" + arrayImages[0] + ")");
        $(".buttons").find(btnsForClick[2]).css("background-image", "url(img/play.png)");
        PlayButtonPressed = false;
      }
    }, 1500); //set interval - 1.5s;
  }
  else {
    clearInterval(beginShow);
    SetStartSliderImageBackground();
  }
});

//event - end-button;
$(".buttons").find(btnsForClick[4]).click(function(e){
  $(".show > div").css("background-image", "url(" + arrayImages[arrayImages.length - 1] + ")");
});