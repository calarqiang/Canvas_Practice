
let canvas=document.getElementById('canvas');
let lefts=50;  //每个数字距离左边的间距
let tops=300;   //每个数组距离上面的间距
let radius=5; //每个点阵的半径
const endTime=new Date(2020,2,9,12,30,00); //设置结束时间,注意，这里的月份，2就是三月
// let balls=[];
// let colors=['red','green','blue','yellow','pink','bluesky','#fff'];
function init(){
    canvas.width=1024;
    canvas.height=768;
    canvas.style.border='1px solid blue';
    canvas.style.display='block';
    canvas.style.margin='50px auto';
    return canvas.getContext('2d');
}
let ctx=init();  //获取上下文绘制环境

// 获取倒计时的秒数
function getTimes(endTime){
    let nowTime=new Date();
    let nowTimeS=nowTime.getTime();
    let endTimeS=endTime.getTime();
    let ret=(endTimeS-nowTimeS)/1000;
    return ret>0?ret:0;
}
// 根据时间变化绘制小球
// function update(){
//     // 将事件变化写到update函数里，不要写到render函数里，为后面的五彩小球做准备
//     let nowH=parseInt(getTimes(endTime)/3600);
//     let nowM=parseInt((getTimes(endTime)-hour*3600)/60);
//     let nowS=getTimes(endTime)%60;
// }
// 根据时间绘制点阵函数
function digitRender(x,y,number,ctx){
    ctx.fillStyle='rgb(0,102,153)';//设置填充为蓝色
    for(let i=0;i<digit[number].length;i++){
        for(let j=0;j<digit[number][i].length;j++){
            if(digit[number][i][j]==1){
                ctx.beginPath();
                ctx.arc(x+j*2*(radius+1)+(radius+1),y+i*2*(radius+1)+(radius+1),radius,0,2*Math.PI,false);
                ctx.closePath();
                ctx.fill();
            }
            
        }
    }
}

function render(ctx){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    // 每次执行这个函数时，都将画布清空，重新绘制
    let hour=parseInt(getTimes(endTime)/3600);
    let minute=parseInt((getTimes(endTime)-hour*3600)/60);
    let second=getTimes(endTime)%60;
    digitRender(lefts,tops,parseInt(hour/10),ctx);  //绘制函数，一个数字一个数字的绘制,小时第一位数
    digitRender(lefts+15*(radius+1),tops,parseInt(hour%10),ctx); //绘制小时的第二位数字
    digitRender(lefts+30*(radius+1),tops,10,ctx); //绘制两点
    digitRender(lefts+45*(radius+1),tops,parseInt(minute/10),ctx);  //分钟第一位数字
    digitRender(lefts+60*(radius+1),tops,parseInt(minute%10),ctx); //绘制分钟的第二位数字
    digitRender(lefts+75*(radius+1),tops,10,ctx);  //绘制两点
    digitRender(lefts+90*(radius+1),tops,parseInt(second/10),ctx);  //秒第一位数字
    digitRender(lefts+105*(radius+1),tops,parseInt(second%10),ctx); //绘制秒的第二位数字

   
}

let timer;
render(ctx);
timer=setInterval(function(){
    render(ctx);
    // update();
}
,1000);
