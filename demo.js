//点击开始游戏-->startpage消失-->游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右-->改变方向运动
//判断是否吃到食物-->食物消失，蛇+1
//判断游戏结束，弹出分数框

var scoreBox = document.getElementById('score');
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeMove;
var speed = 200;

init();

function init() {
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height); //parseInt取整
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0; //坐标
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [
            [3, 1, 'head'],
            [2, 1, 'body'],
            [1, 1, 'body']
        ] //第一值表示x值，第二值表示Y值
        //游戏属性
    this.direct = 'right'; //游戏初始默认向右
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score = 0;


    startGame();
}

function startGame() {

    food();
    snake();
    snakeMove = setInterval(function() {
        move();
    }, speed);
    bindEvent();
}

function food() {
    var food = document.createElement('div'); //创建一个标签名为div的元素节点
    food.style.width = this.foodW + 'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute'; //定位为绝对定位
    this.foodX = Math.floor(Math.random() * (this.mapW / 20)) //Math.floor向下取整
    this.foodY = Math.floor(Math.random() * (this.mapH / 20))
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class', 'food'); //让食物成为地图的子节点，setAttribute设置属性名和属性值
    switch (this.direct) {
        case 'right':
            break;
        case 'up':
            snake.style.transform = 'rotate(270deg)';
            break;
        case 'left':
            snake.style.transform = 'rotate(180deg)';
            break;
        case 'down':
            snake.style.transform = 'rotate(90deg)';
            break;
        default:
            break;
    }
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px'; //[i]取出来snakebody循环中的每一位，[0]代表第i位里的第0个元素，这里则是3，x的位置
        snake.style.top = this.snakeBody[i][1] * 20 + 'px'; //找y的坐标
        snake.classList.add(this.snakeBody[i][2]); //取出当前的蛇身对应的class类名
        this.mapDiv.appendChild(snake).classList.add('snake');
    }
}

function move() {
    for (var i = this.snakeBody.length - 1; i > 0; i--) { //不考虑方向的改变，只考虑水平的运动
        this.snakeBody[i][0] = this.snakeBody[i - 1][0]; //后一个身体的等于前一个身体的x坐标
        this.snakeBody[i][1] = this.snakeBody[i - 1][1]; //后一个身体的Y等于前一个身体的y
    }
    switch (this.direct) { //获取当前的方向
        case 'right': //当是right蛇头的方向是
            this.snakeBody[0][0] += 1;
            break;
        case 'up':
            this.snakeBody[0][1] -= 1;
            break;
        case 'left':
            this.snakeBody[0][0] -= 1;
            break;
        case 'down':
            this.snakeBody[0][1] += 1;
            break;
        default: //都不是的情况下
            break;
    }
    removeClass('snake'); //原来的蛇删掉
    snake(); //重新渲染一条蛇
    if (this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY) {
        this.score += 1;
        scoreBox.innerHTML = this.score;
        removeClass('food'); //计算分数后食物消失，再重新生成食物
        food()

    }
}

function removeClass(className) { //删掉具有className的元素
    var ele = document.getElementsByClassName(className);
    while (ele.length > 0) {
        ele[0].parentNode.removeChild(ele[0]);
    }
}

function setDerict(code) {
    switch (code) {
        case 37:
            if (this.left) {
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;

        case 38:
            if (this.up) {
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 39:
            if (this.right) {
                this.direct = 'right';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        case 40:
            if (this.down) {
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            break;
        default:
            break;


    }
}

function bindEvent() {
    document.onkeydown = function(e) {
        var code = e.keyCode
        setDerict(code);
    }
}