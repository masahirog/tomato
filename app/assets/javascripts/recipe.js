$(function(){
  $('.all_select_recipe').select2({
  width:"270px",
  placeholder: "レシピを選択してください"
  });
  $('.input_select_item').select2({
    placeholder: "材料・調味料を選択してください"
  });


    var u = 0
    $(".add_li_item").each(function() {
        var id = $(this).children(".select_item").children(".input_select_item").val();
        if (id) {
          $.ajax({
              url: "/recipes/get_item_info/" + id,
              data: { id : id },
              dataType: "json",
              async: false
          })
          .done(function(data) {
            display_item_info(data,u)
        });
        } else{};
      u = u+1;
    });
    calculate_recipe_price();

  //addアクション、itemの追加
  $(".add_item").on('click', function addInput(){
    var u = $(".add_li_item").length
    $(".input_select_item").select2('destroy');
    $(".add_li_item").first().clone().appendTo(".item_ul");
    var last_li =$(".add_li_item").last()
    last_li.children(".select_item").children().attr('name', "recipe[recipe_items_attributes]["+u+"][item_id]" );
    last_li.children(".select_item").children().attr('id', "recipe_recipe_items_attributes_"+u+"_item_id" );
    last_li.children(".quantity").children().attr('name', "recipe[recipe_items_attributes]["+u+"][quantity]" );
    last_li.children(".quantity").children().attr('id', "recipe_recipe_items_attributes_"+u+"_quantity" );
    last_li.children(".remove_item").children(".destroy_items").attr('id', "recipe_recipe_items_attributes_"+u+"__destroy");
    last_li.children(".remove_item").children("").attr('name', "recipe[recipe_items_attributes]["+u+"][_destroy]");
    last_li.children(".select_item").children().val("");
    $(".input_select_item").select2({width:"270px",placeholder: "材料・調味料を選択してください"});
    last_li.children(".cost_price").children(".cost_price_value").empty();
    last_li.children(".vendor").empty();
    last_li.children(".quantity").children().val("");
    last_li.children(".price_used").children(".price_used_value").empty();
    last_li.children().children(".calculated_unit").empty();
    last_li.children(".remove_item").children(".destroy_items").prop('checked',false);
    last_li.show();
  });

  //removeのチェックと、trをhide
  $(".item_ul").on('click','.remove_btn', function(){
    $(this).parent().children(".destroy_items").prop('checked', true);
    $(this).parent().parent(".add_li_item").hide();
    calculate_recipe_price()
  });


// input内のチェックと各カラムへの代入、itemデータベースに無ければ空欄にする
  $(".item_ul").on('change','.input_select_item', function(){
    var u = $(".add_li_item").index($(this).parent().parent(".add_li_item"))
    var id = $(this).val();
    if (id) {
      $.ajax({
        url: "/recipes/get_item_info/" + id,
        data: { id : id },
        dataType: "json",
        async: false
      })
      .done(function(data){
        display_item_info(data,u);
        calculate_recipe_price();
      });
    } else{};
});

  //quantity変更でprice_used取得
  $(".item_ul").on('change','.quantity', function(){
    var u = $(".add_li_item").index($(this).parent(".add_li_item"))
    var cost_price = $(this).parent(".add_li_item").children(".cost_price").children(".cost_price_value").html()
    var quantity = $(this).parent(".add_li_item").children(".quantity").children(".input_quantity").val();
    if (isNaN(quantity) == true){
      var calculate_price = 0;
    }else {
      var calculate_price = (cost_price * quantity).toFixed(2)};
      $(this).parent(".add_li_item").children(".price_used").children(".price_used_value").text(calculate_price);
    calculate_recipe_price();
  });

  // $(".all_box").on("change",function(){
  //   var prop = $('.all_box').prop('checked');
  //   if (prop) {
  //    $('.product_check').children().prop('checked', true);
  //   } else {
  //    $('.product_check').children().prop('checked', false);
  //  };
  // });
  //
  // $(".all_select_recipe").on("change",function(){
  //   var id = $(this).val();
  //   var name = $(".all_select_recipe option:selected").text();
  //   $(".product_include_recipe").each(function(){
  //     var prop = $(this).children(".product_check").children().prop('checked');
  //     if (prop) {
  //       var j = $(this).children(".select_recipe").children().val();
  //       $(this).children(".select_recipe").children().val(id);
  //       $(this).children(".select_recipe").find(".select2-selection__rendered").text(name);
  //     }else{
  //     };
  //   });
  // });
//メニュー価格の変更
  function calculate_recipe_price(){
    var row_len =  $(".add_li_item").length
    var  recipe_price = 0;
    $(".add_li_item").each(function(){
      if ($(this).children(".remove_item").children(".destroy_items").is(':checked')){
      }else{
        var price_used = Number($(this).children(".price_used").children(".price_used_value").html())
        if (isNaN(price_used) == true ){}else{
        recipe_price += price_used}
      }});
    $(".recipe_price").val(recipe_price.toFixed(1))
  };

  function display_item_info(data,u){
    quantity = $(".add_li_item").eq(u).children(".quantity").children().val();
    var cost = data.item.cost_price;
    var unit = data.item.recipe_unit;
    var vendor = data.item.vendor_company_name;
    $(".add_li_item").eq(u).children(".vendor").text(vendor);
    $(".add_li_item").eq(u).children(".cost_price").children(".cost_price_value").text(cost);
    $(".add_li_item").eq(u).children().children(".recipe_unit").text(unit);
    if (isNaN(quantity) == true){
      var calculate_price = 0;
    }else {
      var calculate_price = (cost * quantity).toFixed(2)}
    $(".add_li_item").eq(u).children(".price_used").children(".price_used_value").text(calculate_price);
  };
});
