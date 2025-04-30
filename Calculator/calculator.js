let selectorOperations = document.querySelector(".area_Operations");
let objResults = document.querySelector(".area_Results");

let math_operators = ['+', '-', '/', '*']
let arithm_expression_elems = [];
let input_operators = [];
let arithm_operands_group_by_operators = {};
let numberN = 0; //start number;
let tmpNum = []; //array for digits in number;

let digit_regex = /\d/;
let special_options = {};

selectorOperations.addEventListener('click', function(e){
  let elem = e.target.textContent; //get digit or operators(spec buttons);

  function calculating(input_elems, operators_order){
    // TODO: change entire func
    GroupOperandsByOperators()
   
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

  function GetOperatorsOrderOfCalculation(){
    let input_operators_copy = input_operators;
    operators_calculation_order = [];
    for (let i = 0; i < input_operators_copy.length; i++){
      if (input_operators[i] == "*" || input_operators[i] == "/"){
        operators_calculation_order.push(
          input_operators[i]
        );
        input_operators.splice(i, input_operators[i]);
      }
    }
    console.log('Remain input operators:' + input_operators)
    operators_calculation_order.concat(input_operators);
    console.log('Operators order:' + operators_calculation_order)
    return operators_calculation_order;
  }

  function GroupOperandsByOperators(){
    for (let i = 0; i < input_operators.length - 1; i++){
      operator_index_in_expres_elems = arithm_expression_elems.indexOf(
        input_operators[i]
      )
      left_operand = arithm_expression_elems[operator_index_in_expres_elems - 1]
      right_operand = arithm_expression_elems[operator_index_in_expres_elems + 1]
      arithm_expression_elems.splice(operator_index_in_expres_elems - 1, left_operand)
      arithm_expression_elems.splice(operator_index_in_expres_elems + 1, right_operand)
      
      arithm_operands_group_by_operators[input_operators[i]] = [
        left_operand, right_operand
      ]
    }
    console.log('Group By Operators:')
    console.log(arithm_operands_group_by_operators)
  }

  function ShowResultInWindow(){
    operators_calc_order = GetOperatorsOrderOfCalculation()
    objResults.innerHTML = objResults.innerHTML + elem;
    numberN = createNumber(tmpNum);
    arithm_expression_elems.push(numberN);
    objResults.innerHTML = calculating(arithm_expression_elems, operators_calc_order);
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
    // console.log('Only digit:' + elem)
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
