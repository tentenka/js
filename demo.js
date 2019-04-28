//点击开始游戏-->startpage消失-->游戏开始
//随机出现食物，出现三节蛇开始运动
//上下左右-->改变方向运动
//判断是否吃到食物-->食物消失，蛇+1
//判断游戏结束，弹出分数框

var content = document.getElementById('content');
var startPage = document.getElementById('startPage');

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
    startGame();
}

function startGame() {

    food();
    snake();
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
}

function snake() {
    for (var i = 0; i < this.snakeBody.length; i++) {
        var snake = document.createElement('div');
        snake.style.width = this.snakeW + 'px';
        snake.style.height = this.snakeH + 'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 20 + 'px';
        snake.style.top = this.snakeBody[i][1] * 20 + 'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
    }
}