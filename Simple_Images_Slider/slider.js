let arrayImages = [
  "img/cat_1.jpg", "img/cat_2.jpg", "img/cat_3.jpeg",
  "img/cat_4.jpeg", "img/cat_5.jpg", "img/cat_6.jpg",
  "img/cat_7.jpg", "img/cat_8.jpg"
];
const img_file_re = new RegExp("img\/[a-zA-Z0-9]*");

function GetPressedButtonImageFile(){
  $(".buttons > img").click(
    function(){
      img_file_match_result = img_file_re.exec($(this)[0].src);
      if (img_file_match_result){
        return img_file_match_result;
      }
    }
  )
}

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

function BackwardButtonPressed(){
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

function ForwardButtonPressed(){
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

let PlayButtonPressed = false;
let beginShow = 0;

function PlaySlideShowButtonPressed(buttonSelector){
  console.log("Play button:" + buttonSelector[0].src);
  if (PlayButtonPressed){
    buttonSelector[0].src = "img/play.png";
    PlayButtonPressed = false;
  }
  else {
    buttonSelector[0].src = "img/stop.png";
    PlayButtonPressed = true;
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
        buttonSelector[0].src = "img/play.png";
        PlayButtonPressed = false;
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
  buttonSelector[0].src = "img/play.png";
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

function ChangeButtonImageWhenClicked(pressedButtonSelector){
  pressedButtonSelector.css("width", "40px");
  pressedButtonSelector.css("height", "40px");
  pressedButtonSelector.css("margin-left", "10px");
  pressedButtonSelector.css("margin-right", "5px");
  pressedButtonSelector.css("margin-bottom", "5px");
}

function ReturnToDefaultButtonImageAfterClick(pressedButtonSelector){
  pressedButtonSelector.css("width", "50px");
  pressedButtonSelector.css("height", "50px");
  pressedButtonSelector.css("margin-left", "5px");
  pressedButtonSelector.css("margin-right", "0px");
  pressedButtonSelector.css("margin-bottom", "0px");
}

function GetButtonsImagesFunctionsDict(buttonsImages, buttonsFunctions){
  result_dict = {};
  for (let i = 0; i < buttonsImages.length; i++){
    result_dict[buttonsImages[i]] = buttonsFunctions[i];
  }
  return result_dict;
}

let ButtonsImages = ['img/start', "img/backward", "img/play", "img/stop", "img/next", "img/end"];
let ButtonsFunctions = [
  FirstImageButtonPressed, BackwardButtonPressed, PlaySlideShowButtonPressed,
  StopSlideShowButton, ForwardButtonPressed, LastImageButtonPressed
];

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function PressedButtonEvent(){
  img_file_match_result = img_file_re.exec($(this)[0].src);
  if (img_file_match_result){
    ChangeButtonImageWhenClicked($(this));
    await sleep(100);
    ReturnToDefaultButtonImageAfterClick($(this));

    if (img_file_match_result == 'img/play'){
      ButtonsImagesFunctionsDict[img_file_match_result]($(this));
    }
    else if (img_file_match_result == 'img/stop'){
      ButtonsImagesFunctionsDict[img_file_match_result](beginShow, $(this));
    }
    else {
      ButtonsImagesFunctionsDict[img_file_match_result]();
    }
  }
}

function main(){
  ButtonsImagesFunctionsDict = GetButtonsImagesFunctionsDict(ButtonsImages, ButtonsFunctions);
  $(".buttons > img").click(
    PressedButtonEvent
  );
}

main();