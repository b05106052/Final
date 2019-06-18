var type1;
var type2;
var type3;
var diceResult = ['1.png','2.png','3.png','4.png','5.png','6.png']
var initialMoney = 2000;

function getRandom(x){
    return Math.floor(Math.random()*x)+1;
};

$('#restart').click(function(){
    type1='';
    type2='';
    type3='';
    $('#money').val('');
    $('.type1').css('background-color','rgb(228, 228, 228)');
    $('.type2').css('background-color','rgb(228, 228, 228)');
    $('.type3').css('background-color','rgb(228, 228, 228)');
    console.log(getRandom(6))
})

$('.type1').click(function(){
    var oddEven = $(this).val();
    $('.type1').css('background-color','rgb(228, 228, 228)');
    $(this).css('background-color','rgb(80, 80, 80)')
    type1 = oddEven;
    console.log(oddEven)
})

$('.type2').click(function(){
    var bigSmall = $(this).val();
    $('.type2').css('background-color','rgb(228, 228, 228)');
    $(this).css('background-color','rgb(80, 80, 80)')
    type2 = bigSmall;
    console.log(type2)
})

$('.type3').click(function(){
    var sum = $(this).val();
    $('.type3').css('background-color','rgb(228, 228, 228)');
    $(this).css('background-color','rgb(80, 80, 80)')
    type3 = sum;
    console.log(sum)
})

$('#confirmBet').on('click',function(){
    if(initialMoney <= 0 ){
        alert('你已經破產了傻瓜')
    }
    else{
        var link = 0;
        $('#oddEven').text('單雙：')
        $('#bigSmall').text('大小：')
        $('#sum').text('正確點數和：')
        $('#initialBet').text('投注金額：')
        $('#betAmount').text('此次結果：')
        var betAmount = $('#money').val();
        if(betAmount > initialMoney){
            alert('下注金額高於本金不行喔傻瓜')
        }
        else{
            if(type1){
                link = link + 1;
            }
            if(type2){
                link = link + 1;
            }
            if(type3){
                link = link + 1;
            }
            console.log(`link : ${link}`)
            var initialBetAmount = betAmount;
            if(!betAmount ||(!type1 && !type2 && !type3)){
                alert('你還沒有下注完成')
            }
            else{
                $('#dice1').attr('src','./assets/img/dice.gif')
                $('#dice2').attr('src','./assets/img/dice.gif')
                var firstDice = getRandom(6)
                var secondDice = getRandom(6)
                setTimeout(function(){
                    $('#dice1').attr('src',`./assets/img/${firstDice}.png`)
                    $('#dice2').attr('src',`./assets/img/${secondDice}.png`)
                    if((firstDice + secondDice)%2 != 0 ){
                        $('#oddEven').text('單雙： 單')
                        if(type1){
                            if(type1[0] == '單'){
                            link = link - 1 ;
                            var returnType1 = type1.substring(
                                type1.lastIndexOf("(") + 1, 
                                type1.lastIndexOf(")")
                            );
                            returnType1 = parseFloat(returnType1)
                            betAmount = betAmount * returnType1;
                            console.log(betAmount)
                            }
                        }
                        
                    }
                    else if((firstDice + secondDice)%2 == 0 ){
                        $('#oddEven').text('單雙： 雙')
                        if(type1){
                            if(type1[0] == '雙'){
                                link = link -1 ;
                                var returnType1 = type1.substring(
                                    type1.lastIndexOf("(") + 1, 
                                    type1.lastIndexOf(")")
                                );
                                returnType1 = parseFloat(returnType1)
                                betAmount = betAmount * returnType1;
                                console.log(betAmount)
                            }
                        }
                    }
                    if((firstDice + secondDice) > 7 ){
                        $('#bigSmall').text('大小： 大')
                        if(type3){
                            if(type3[0] == '大'){
                            link = link - 1 ;
                            var returnType3 = type3.substring(
                                type3.lastIndexOf("(") + 1, 
                                type3.lastIndexOf(")")
                            );
                            returnType3 = parseFloat(returnType3)
                            betAmount = betAmount * returnType3;
                            console.log(betAmount)
                            }
                        }
                        
                    }
                    else if((firstDice + secondDice) == 7 ){
                        $('#bigSmall').text('大小： 中')
                        if(type3){
                            if(type3[0] == '等'){
                            link = link - 1 ;
                            var returnType3 = type3.substring(
                                type3.lastIndexOf("(") + 1, 
                                type3.lastIndexOf(")")
                            );
                            returnType3 = parseFloat(returnType3)
                            betAmount = betAmount * returnType3;
                            console.log(betAmount)
                            }
                        }
                        
                    }
                    else if((firstDice + secondDice) < 7 ){
                        $('#bigSmall').text('大小： 小')
                        if(type3){
                            if(type3[0] == '小'){
                            link = link - 1 ;
                            var returnType3 = type3.substring(
                                type3.lastIndexOf("(") + 1, 
                                type3.lastIndexOf(")")
                            );
                            returnType3 = parseFloat(returnType3)
                            betAmount = betAmount * returnType3;
                            console.log(betAmount)
                            }
                        }
                    }
                    $('#sum').text(`正確點數和：${firstDice + secondDice}`)
                    if(type2){
                        var type2guess = type2.substring(
                            0, 
                            type2.lastIndexOf("("));
                        console.log(type2guess)
                        if(type2guess == (firstDice+secondDice)){
                            link = link - 1;
                            var returnType2 = type2.substring(
                                type2.lastIndexOf("(") + 1, 
                                type2.lastIndexOf(")")
                            );
                            returnType2 = parseFloat(returnType2)
                            betAmount = betAmount * returnType2;
                        }
                    }
                    if(link == 0){
                        initialMoney = initialMoney - initialBetAmount;
                        initialMoney = initialMoney + betAmount;
                        $('#betAmount').text(`此次結果：${betAmount}`)
                    }
                    else{
                        betAmount = 0;
                        initialMoney = initialMoney - initialBetAmount;
                        $('#betAmount').text(`此次結果：-${initialBetAmount}`)
                    }
                    $('#initialBet').text(`投注金額：${initialBetAmount}`)
                    $('#leftMoney').text(`剩餘金額：${initialMoney}`)
                    if(initialMoney <= 0 ){
                        alert('你沒錢咯！！！')
                    }
                }, 2000);
            }
        }
    }
})