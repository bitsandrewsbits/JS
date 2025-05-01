let selectorOperations = document.querySelector(".area_Operations");
let objResults = document.querySelector(".area_Results");

let math_operators = ['-', '+', '*', '/'];
let first_priority_math_operators = ['/', '*'];
let secound_priority_math_operators = ['+', '-'];
let arithm_expression_elems = [];
let input_operators = [];
let numberN = 0; //start number;
let tmpNum = []; //array for digits in number;

let digit_regex = /\d/;
let special_options = {};

selectorOperations.addEventListener('click', function(e){
  let elem = e.target.textContent; //get digit or operators(spec buttons);

  function calculating(expression_elems){
    console.log('Start Calculating...');
    let result = 0;
    let temp_result = 0;
    let i = 0;
    let max_iterations = 20
    let iter_cnt = 0
    while (expression_elems.length != 1){
      // if (iter_cnt > max_iterations){
      //   break;
      // }
      // iter_cnt++;
      console.log(expression_elems)
      operator_index_in_input_elems = GetExpresElemsOperatorIndex(input_operators[i])
      if (first_priority_math_operators.includes(input_operators[i])){
        if (input_operators[i] == '*'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] * expression_elems[operator_index_in_input_elems + 1] 
        }
        if (input_operators[i] == '/'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] / expression_elems[operator_index_in_input_elems + 1] 
        }
        ReplaceCalculatedElemsToTempResult(expression_elems, temp_result, i)
        RemoveCalculatedOperator(input_operators[i])
      }
      if (FirstPriorityOperatorExists()){
        i++;
        continue;
      }
      if (secound_priority_math_operators.includes(input_operators[i])){
        if (input_operators[i] == '-'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] - expression_elems[operator_index_in_input_elems + 1] 
        }
        if (input_operators[i] == '+'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] + expression_elems[operator_index_in_input_elems + 1] 
        }
        ReplaceCalculatedElemsToTempResult(expression_elems, temp_result, i)
        RemoveCalculatedOperator(input_operators[i])
      }
      if (i < input_operators.length){
        i++;
      }
      else {
        i = 0;
      }
    }
    console.log('Final result = ' + temp_result);
    result = temp_result;
    return result;
  }

  function FirstPriorityOperatorExists(){
    if (input_operators.includes('*') || input_operators.includes('/')){
      return true;
    }
    return false;
  }

  function GetExpresElemsOperatorIndex(operator){
    operator_index_in_expres_elems = arithm_expression_elems.indexOf(
      operator
    )
    return operator_index_in_expres_elems
  }

  function ReplaceCalculatedElemsToTempResult(expression_elems, temp_result, operator_index){
    operator_index_in_expres_elems = GetExpresElemsOperatorIndex(input_operators[operator_index])
    expression_elems.splice(operator_index_in_expres_elems - 1, 3, temp_result)
  }

  function RemoveCalculatedOperator(operator){
    calculated_operator_index = input_operators.indexOf(operator)
    input_operators.splice(calculated_operator_index, 1)
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
    let arithm_expression_elems = [];
    let input_operators = [];
    let numberN = 0;
    let tmpNum = [];
  }

  function DeleteOneWindowSymbol(){
    if (objResults.innerHTML.length > 0){
      objResults.innerHTML = objResults.innerHTML.slice(0, -1);
    }
  }

  special_options["Del All"] = DeleteAllWindowSymbols;
  special_options["Del One"] = DeleteOneWindowSymbol;

  function AddInputNumberToArithmElementsArr(){
    objResults.innerHTML = objResults.innerHTML + ' ' + elem + ' ';
    numberN = createNumber(tmpNum);
    // console.log(numberN);
    arithm_expression_elems.push(numberN);
    tmpNum = [];
  }

  function AddOperatorToElemOperatorArrs(){
    arithm_expression_elems.push(elem);
    input_operators.push(elem);
  }

  function ShowResultInWindow(){
    objResults.innerHTML = objResults.innerHTML + elem;
    numberN = createNumber(tmpNum);
    arithm_expression_elems.push(numberN);
    objResults.innerHTML = calculating(arithm_expression_elems);
  }

  function CheckSymbolIsOperator(symbol){
    if (math_operators.includes(symbol)){
      return true;
    }
    return false;
  }

  function CheckPreviousSymbolIsNotOperator(){
    if (arithm_expression_elems.length == 0){
      return true;
    }
    else {
      console.log(arithm_expression_elems)
      console.log('Last input element: ' + arithm_expression_elems.slice(-1))
      if (CheckSymbolIsOperator(arithm_expression_elems.slice(-1))){
        return false;
      }
      return true;
    }
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
  if (CheckSymbolIsOperator(elem)){
    AddInputNumberToArithmElementsArr();
    if (CheckPreviousSymbolIsNotOperator()){
      AddOperatorToElemOperatorArrs();
    }
  }
});
