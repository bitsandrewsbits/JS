let selectorOperations = document.querySelector(".area_Operations");
let objResults = document.querySelector(".area_Results");

let arithm_expression_elems = [];
let arrOperators = [];
let arithm_operands_group_by_operators = {};
let numberN = 0; //start number;
let tmpNum = []; //array for digits in number;

let digit_regex = /\d/;
let special_options = {}
special_options["Del All"] = DeleteAllWindowSymbols
special_options["Del One"] = DeleteOneWindowSymbol

selectorOperations.addEventListener('click', function(e){
  let elem = e.target.textContent; //get digit or operators(spec buttons);

  function calculating(arrNum, arrOpers){
    // TODO: change entire func

    let lenArrOpers = arrOpers.length;
    let result = arrNum[0];
    let tmpRes = 0;
    let i = 0;

    for (let i = 0; i < lenArrOpers; i++){
      switch(arrOpers[i]){
        case '+': result += arrNum[i + 1];
          break;
        case '-': result -= arrNum[i + 1];
          break;
        case '*': result *= arrNum[i + 1];
          break;
        case '/': result /= arrNum[i + 1];
          break;
        default: 'Unknown operation!';
      }
    }

    return result;
  }

  function createNumber(arrDigits){
    let lenArr = arrDigits.length;
    let number_digit_multiplier = 1;
    let result = 0;

    for(let i = lenArr - 1; i >= 0; i--){
      result += arrDigits[i] * number_digit_multiplier;
      number_digit_multiplier *= 10;
    }

    return result;
  }

  function DeleteAllWindowSymbols(){
    objResults.innerHTML = "";
  }

  function DeleteOneWindowSymbol(){
    console.log(objResults.innerHTML);
    if (objResults.innerHTML.length > 0){
      objResults.innerHTML = objResults.innerHTML.slice(0, -2);
    }
  }

  function AddInputNumberToArithmElementsArr(){
    objResults.innerHTML = objResults.innerHTML + ' ' + elem + ' ';
    numberN = createNumber(tmpNum);
    // console.log(numberN);
    arithm_expression_elems.push(numberN);
    console.log(arrNumbers);
    console.log(arrOperators);
    tmpNum = [];
  }

  function AddOperatorToElemOperatorArrs(){
    arithm_expression_elems.push(elem);
    arrOperators.push(elem);
  }

  function DefineOrderOfCalculation(){
    let arrOperators_copy = arrOperators.copy();
    operators_calculation_order = [];
    for (let i = 0; i < arrOperators_copy.length; i++){
      if (arrOperators[i] == "*" || arrOperators[i] == "/"){
        operators_calculation_order.push(
          arrOperators.pop(i)
        );
      }
    }
    arrOperators = operators_calculation_order;
  }

  function GroupOperandsByOperators(){
    for (let i = 0; i < arrOperators.length; i++){

    }
  }

  function ShowResultInWindow(){
    objResults.innerHTML = objResults.innerHTML + elem;
    numberN = createNumber(tmpNum);
    arrNumbers.push(numberN);
    console.log(calculating(arrNumbers, arrOperators));
    objResults.innerHTML = calculating(arrNumbers, arrOperators);
  }

  function CheckPreviousSymbolNotOperator(){
    if ()
  }

  if (elem == "Del All" || elem == "Del One"){
    special_options[elem]();
  }
  if (digit_regex.test(elem)){
    tmpNum.push(parseInt(elem));
    objResults.innerHTML = objResults.innerHTML + elem;
  }
  if (elem == '='){
    ShowResultInWindow();
  }
  else {
    if CheckPreviousSymbolNotOperator(elem){
      AddInputNumberToArithmElementsArr();
    }
  }
});
