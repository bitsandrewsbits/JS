let selectorOperations = document.querySelector(".area_Operations");
let objResults = document.querySelector(".area_Results");

let math_operators = ['-', '+', '*', '/'];
let first_priority_math_operators = ['/', '*'];
let secound_priority_math_operators = ['+', '-'];
let input_symbols = [];
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
    console.log('Input elements: ' + expression_elems);
    let result = 0;
    let temp_result = 0;
    let i = 0;
    while (expression_elems.length != 1){
      console.log(expression_elems);
      if (first_priority_math_operators.includes(input_operators[i])){
        operator_index_in_input_elems = GetExpresElemsOperatorIndex(input_operators[i]);
        if (input_operators[i] == '*'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] * expression_elems[operator_index_in_input_elems + 1];
        }
        if (input_operators[i] == '/'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] / expression_elems[operator_index_in_input_elems + 1];
        }
        if (expression_elems[operator_index_in_input_elems - 2] == '-'){
          temp_result = temp_result * (-1);
          expression_elems.splice(operator_index_in_input_elems - 2, 1, '+');
          input_operators.splice(i - 1, 1, '+');
        }
        ReplaceCalculatedElemsToTempResult(expression_elems, temp_result, i);
        RemoveCalculatedOperator(i);
        i--;
      }
      if (FirstPriorityOperatorExists()){
        i++;
        continue;
      }
      else {
        i = 0;
      }
      if (secound_priority_math_operators.includes(input_operators[i])){
        operator_index_in_input_elems = GetExpresElemsOperatorIndex(input_operators[i]);
        if (input_operators[i] == '-'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] - expression_elems[operator_index_in_input_elems + 1];
        }
        if (input_operators[i] == '+'){
          temp_result = expression_elems[operator_index_in_input_elems - 1] + expression_elems[operator_index_in_input_elems + 1];
        }
        ReplaceCalculatedElemsToTempResult(expression_elems, temp_result, i);
        RemoveCalculatedOperator(i);
        i++;
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
    return operator_index_in_expres_elems;
  }

  function ReplaceCalculatedElemsToTempResult(expression_elems, temp_result, operator_index){
    operator_index_in_expres_elems = GetExpresElemsOperatorIndex(input_operators[operator_index]);
    expression_elems.splice(operator_index_in_expres_elems - 1, 3, temp_result);
  }

  function RemoveCalculatedOperator(operator_index){
    // calculated_operator_index = input_operators.indexOf(operator);
    input_operators.splice(operator_index, 1);
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
    arithm_expression_elems = [];
    input_operators = [];
    numberN = 0;
    tmpNum = [];
    input_symbols = [];
  }

  function DeleteOneWindowElement(){
    if (objResults.innerHTML.length > 0){
      if (CheckSymbolIsOperator(input_symbols.slice(-1)[0])){
        input_operators.splice(-1, 1);
      }
      input_symbols.splice(-1, 1);
      objResults.innerHTML = GetUpdatedInnerHTML();
    }
  }

  function GetUpdatedInnerHTML(){
    updated_innerHTML = "";
    for (let i = 0; i < input_symbols.length; i++){
      updated_innerHTML += input_symbols.slice(i)[0];
    }
    return updated_innerHTML;
  }

  special_options["Del All"] = DeleteAllWindowSymbols;
  special_options["Del One"] = DeleteOneWindowElement;

  function GetArithmExpresElementsFromInputSymbols(){
    input_symbols.push(1);  // as for checking last input symbol.
    for (let i = 0; i < input_symbols.length - 1; i++){
      if (digit_regex.test(input_symbols[i]) && digit_regex.test(input_symbols[i + 1])){
        tmpNum.push(parseInt(input_symbols[i]));
      }
      else if (digit_regex.test(input_symbols[i])) {
        tmpNum.push(parseInt(input_symbols[i]));
        AddInputNumberToArithmElementsArr();
      }
      else if (math_operators.includes(input_symbols[i])){
        arithm_expression_elems.push(input_symbols[i]);
      }
    }
    AddInputNumberToArithmElementsArr(); 
  }

  function AddInputNumberToArithmElementsArr(){
    if (tmpNum.length != 0){
      numberN = createNumber(tmpNum);
      arithm_expression_elems.push(numberN);
      tmpNum = [];
    } 
  }

  function AddOperatorToElemOperatorArrs(){
    input_operators.push(elem);
  }

  function ShowResultInWindow(){
    objResults.innerHTML = objResults.innerHTML + elem;
    objResults.innerHTML = calculating(arithm_expression_elems);
  }

  function CheckSymbolIsOperator(symbol){
    if (math_operators.includes(symbol)){
      return true;
    }
    return false;
  }

  function CheckPreviousSymbolIsNotOperator(){
    if (input_symbols.length == 0){
      return false;
    }
    else {
      if (CheckSymbolIsOperator(input_symbols.slice(-1)[0])){
        return false;
      }
      return true;
    }
  }

  if (elem == "Del All" || elem == "Del One"){
    special_options[elem]();
  }
  else if (digit_regex.test(elem)){
    input_symbols.push(elem);
    objResults.innerHTML = objResults.innerHTML + elem;
  }
  else if (elem == '='){
    console.log('Input arithm expression elements: ' + arithm_expression_elems);
    if (CheckPreviousSymbolIsNotOperator()){
      GetArithmExpresElementsFromInputSymbols();
      ShowResultInWindow();
    }
  }
  else if (CheckSymbolIsOperator(elem)){
    if (CheckPreviousSymbolIsNotOperator()){
      objResults.innerHTML = objResults.innerHTML + ' ' + elem + ' ';
      input_symbols.push(elem);
      AddOperatorToElemOperatorArrs();
    }
  }
});
