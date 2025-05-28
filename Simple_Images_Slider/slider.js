let arrayImages = [
  "img/cat_1.jpg", "img/cat_2.jpg", "img/cat_3.jpeg",
  "img/cat_4.jpeg", "img/cat_5.jpg", "img/cat_6.jpg",
  "img/cat_7.jpg", "img/cat_8.jpg"
];

function GetSliderButtonsAmount(){
  return $(".buttons").children().length;
}

function GetButtonsSelectors(ButtonsAmount){
  ButtonsSelectors = [];
  ButtonsAmount = GetSliderButtonsAmount();
  for (let i = 0; i < ButtonsAmount; i++){
    let buttonSelector = $(".buttons").children()[i];
    ButtonsSelectors.push(buttonSelector);
  }
  return ButtonsSelectors;
}
let SliderButtonsAmount = GetSliderButtonsAmount();
let btnsForClick = GetButtonsSelectors(SliderButtonsAmount);

let CurrentImageIndex = 0;
let ImagesAmount = arrayImages.length;
let ProgressBarPercentagePerImage = 100 / ImagesAmount;
let ProgressBarPercentagesAmount = 0;
let ImagesCounter = 0;
let ProgressBarSelector = document.querySelector(".ProgressBar");

function UpdateProgressBar(percentages){
  ProgressBarSelector.style.width = ProgressBarPercentagesAmount + '%';
  ProgressBarSelector.style["background-color"] = "rgb(180, 190, 90)";
}

function SetStartSliderImageBackground(){
  $(".show > div").css("background-image", "none");
}

function SetStartSlideShowParameters(){
  CurrentImageIndex = 0;
  ImagesCounter = 0;
  ProgressBarPercentagesAmount = 0;
}

function UpdateParametersToNextImage(){
  ImagesCounter++;
  CurrentImageIndex++;
  ProgressBarPercentagesAmount = ImagesCounter * ProgressBarPercentagePerImage;
}

function UpdateParametersToPreviousImage(){
  CurrentImageIndex--;
  ImagesCounter--;
  ProgressBarPercentagesAmount = ImagesCounter * ProgressBarPercentagePerImage;
}

//2)backward-button
$(".buttons").find(btnsForClick[1]).click(function(e){
  if (CurrentImageIndex > 0){
    UpdateParametersToPreviousImage();
  }
  if (CurrentImageIndex == 0 && $(".show > div").css("background-image") != "none"){
    ProgressBarPercentagesAmount = ProgressBarPercentagePerImage;
    ImagesCounter = 1;
    CurrentImageIndex = 0;
  }
  if ($(".show > div").css("background-image") != "none"){
    $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
    UpdateProgressBar(ProgressBarPercentagesAmount);
  }
});

//forward button;
$(".buttons").find(btnsForClick[3]).click(function(e){
  if (CurrentImageIndex < arrayImages.length){
    UpdateParametersToNextImage();
  }
  if (CurrentImageIndex == ImagesAmount) {
    ProgressBarPercentagesAmount = 100;
    ImagesCounter = ImagesAmount;
    CurrentImageIndex = ImagesAmount - 1;
  }
  if ($(".show > div").css("background-image") == "none"){
    $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex - 1] + ")");
  }
  else {
    $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
  }
  UpdateProgressBar(ProgressBarPercentagesAmount);
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

  if (PlayButtonPressed){
    beginShow = setInterval(function(){
      if (CurrentImageIndex < ImagesAmount){
        $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
        $(".show > div").css("transition-duration", "0.5s");
        if (ProgressBarPercentagesAmount != 100){
          UpdateParametersToNextImage();
        }
      }
      else {
        clearInterval(beginShow);
        $(".show > div").css("background-image", "url(" + arrayImages[0] + ")");
        $(".buttons").find(btnsForClick[2]).css("background-image", "url(img/play.png)");
        PlayButtonPressed = false;
        SetStartSliderImageBackground();
        SetStartSlideShowParameters();
      }
      UpdateProgressBar();
    }, 1500); //set interval - 1.5s;
  }
  else {
    clearInterval(beginShow);
    SetStartSliderImageBackground();
    SetStartSlideShowParameters();
    UpdateProgressBar();
  }
});

//end-button;
$(".buttons").find(btnsForClick[4]).click(function(e){
  ProgressBarPercentagesAmount = 100;
  ImagesCounter = ImagesAmount;
  CurrentImageIndex = ImagesAmount - 1;
  $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
  UpdateProgressBar(ProgressBarPercentagesAmount);
});

//first-image-button;
$(".buttons").find(btnsForClick[0]).click(function(e){
  ProgressBarPercentagesAmount = ProgressBarPercentagePerImage;
  ImagesCounter = 1;
  CurrentImageIndex = 0;
  $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
  UpdateProgressBar(ProgressBarPercentagesAmount);
});