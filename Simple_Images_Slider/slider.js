let arrayImages = [
  'slide-show_images/forest_1.jpeg', 'slide-show_images/forest_2.jpg', 'slide-show_images/forest_3.jpg',
  'slide-show_images/forest_4.jpg', 'slide-show_images/forest_5.jpg', 'slide-show_images/forest_6.jpeg'
];
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
  $(".show > div").css("width", "100%");
  $(".show > div").css("height", "100%");
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

function PreviousButtonPressed(){
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
};

function NextButtonPressed(){
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
};

function SetDefaultPlayButtonStyles(selector){
  selector.css("background-color", "rgb(120, 190, 18)");
  selector.css("color", "rgb(0, 0, 0)");
  selector.css("border", "1px solid black");
}

let PlayButtonPressed = false;
let beginShow = 0;

function PlaySlideShowButtonPressed(buttonSelector){
  // console.log("Play button:" + buttonSelector[0].innerHTML);
  $(".show > div").css("width", "100%");
  $(".show > div").css("height", "100%");
  if (PlayButtonPressed){
    buttonSelector[0].innerHTML = "Play";
    PlayButtonPressed = false;
  }
  else {
    buttonSelector[0].innerHTML = "Stop";
    PlayButtonPressed = true;
  }

  if (PlayButtonPressed){
    buttonSelector.css("background-color", "rgb(0, 0, 0)");
    buttonSelector.css("color", "rgb(230, 240, 90)");
    buttonSelector.css("border", "1px solid rgb(120, 190, 18)");
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
        buttonSelector[0].innerHTML = "Play";
        PlayButtonPressed = false;
        SetDefaultPlayButtonStyles(buttonSelector);
        SetStartSliderImageBackground();
        SetStartSlideShowParameters();
      }
      UpdateProgressBar();
    }, 1500); //set interval - 1.5s;
  }
};

function StopSlideShowButton(intervalFunction, buttonSelector){
  clearInterval(intervalFunction);
  SetStartSliderImageBackground();
  SetStartSlideShowParameters();
  UpdateProgressBar();
  SetDefaultPlayButtonStyles(buttonSelector);
  buttonSelector[0].innerHTML = "Play";
  PlayButtonPressed = false;
}

function LastImageButtonPressed(){
  ProgressBarPercentagesAmount = 100;
  ImagesCounter = ImagesAmount;
  CurrentImageIndex = ImagesAmount - 1;
  $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
  UpdateProgressBar(ProgressBarPercentagesAmount);
};

function FirstImageButtonPressed(){
  ProgressBarPercentagesAmount = ProgressBarPercentagePerImage;
  ImagesCounter = 1;
  CurrentImageIndex = 0;
  $(".show > div").css("background-image", "url(" + arrayImages[CurrentImageIndex] + ")");
  UpdateProgressBar(ProgressBarPercentagesAmount);
};

function GetButtonsNamesFunctionsDict(buttonsNames, buttonsFunctions){
  result_dict = {};
  for (let i = 0; i < buttonsNames.length; i++){
    result_dict[buttonsNames[i]] = buttonsFunctions[i];
  }
  return result_dict;
}

let ButtonsNames = ['First', "Previous", "Play", "Stop", "Next", "Last"];
let ButtonsFunctions = [
  FirstImageButtonPressed, PreviousButtonPressed, PlaySlideShowButtonPressed,
  StopSlideShowButton, NextButtonPressed, LastImageButtonPressed
];

function PressedButtonEvent(){
  PressedButtonName = $(this)[0].innerHTML;
  // console.log('Pressed Button: ' + PressedButtonName);
  if (PressedButtonName){
    if (PressedButtonName == 'Play'){
      ButtonsNamesFunctionsDict[PressedButtonName]($(this));
    }
    else if (PressedButtonName == 'Stop'){
      ButtonsNamesFunctionsDict[PressedButtonName](beginShow, $(this));
    }
    else {
      ButtonsNamesFunctionsDict[PressedButtonName]();
    }
  }
}

function main(){
  ButtonsNamesFunctionsDict = GetButtonsNamesFunctionsDict(ButtonsNames, ButtonsFunctions);
  $(".buttons > .btnsSlider").click(
    PressedButtonEvent
  );
}

main();