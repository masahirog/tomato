$(function(){
  var order_unit = $(".input_order_unit").val();
  var recipe_unit = $(".input_recipe_unit").val();
  if (order_unit){
    check_order_unit(order_unit)
  };
  if (recipe_unit){
    check_recipe_unit(recipe_unit)
  };



  $(".input_order_unit").on("change",function(){
    var order_unit = $(".input_order_unit").val();
    check_order_unit(order_unit)
  });
  $(".input_recipe_unit").on("change",function(){
    var recipe_unit = $(".input_recipe_unit").val();
    check_recipe_unit(recipe_unit)
  });


  $("#item_regular_amount").on('blur', function(){
    cost_price_calculate();
  });
  $("#item_regular_price").on('blur', function(){
    cost_price_calculate();
  });

  function cost_price_calculate(){
    var amount = $("#item_regular_amount").val();
    var price = $("#item_regular_price").val();
    var cost_price = (price / amount).toFixed(2);
    if (isNaN(cost_price) || cost_price ==Infinity){
      $("#item_cost_price").val(0);
    } else {
    $("#item_cost_price").val(cost_price)};
  };

  function check_order_unit(order_unit){
    $("#item_regular_price").prop('readonly', false);
    $(".regular_price_label").text("１"+order_unit+"あたりの仕入価格").css('background-color','#F6CECE');
    $(".regular_amount_label").text("１"+order_unit+"あたりの分量").css('background-color','#F6CECE');
  };
  function check_recipe_unit(recipe_unit){
    $("#item_regular_amount").prop('readonly', false);
    $(".regular_amount_unit").text(recipe_unit);
    $(".cost_unit_label").text("単位単価(１"+recipe_unit+"あたりの価格)");
  };


});
