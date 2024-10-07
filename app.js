let btn_st = document.querySelector(".btn_st");
let start = document.querySelector(".start");
let music_st = new Audio("game-countdown-62-199828.mp3");

btn_st.addEventListener("click",()=>
{
    music_st.play();
    setTimeout(()=>
    {
        start.classList.add("hide");
    },3500);
});

let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let imageBox = document.querySelector(".imageBox");
let quit = document.querySelector(".quit");
let line = document.querySelector(".line");
let gameOver = new Audio("game-over-160612.mp3");
let click = new Audio("news-ting-6832.mp3");
let isT = false;
let turnX = 'X';
let winner =[
    [0,1,2,55,55,0],
    [3,4,5,175,55,0],
    [6,7,8,295,55,0],
    [1,4,7,175,55,90],
    [0,3,6,175,-82,90],
    [2,5,8,175,187,90],
    [0,4,8,170.5,46.4,45],
    [2,4,6,178.8,51.8,135],
];

function turn()
{
    return turnX === 'X'? 'O' : 'X';
}

boxes.forEach((el)=>{
    el.addEventListener("click",()=>
    {
        let box_text = el.querySelector(".box_text");
        let p = document.querySelector(".inner");
        if(box_text.innerText == "")
        {
            box_text.innerText = turnX;        
            turnX = turn();
            p.innerText = `Turn for ${turnX}`;
            click.play();
            checkWinner();
        }
        if(checkDraw() && !isT)
        {
            p.innerText = "Game drawed";
        }
    });
});

const checkWinner = ()=>
{
    for(let i = 0; i < 8; i++)
    {
        let val1 = boxes[winner[i][0]].querySelector(".box_text").innerText;
        let val2 = boxes[winner[i][1]].querySelector(".box_text").innerText;
        let val3 = boxes[winner[i][2]].querySelector(".box_text").innerText;
        let m_t = winner[i][3];
        let m_l = winner[i][4];
        let deg = winner[i][5];

        if(val1 != "" && val1 === val2 && val2 === val3)
        {
            gameOver.play();

            imageBox.style.width = "113px";
            line.style.height = "2.4px";
            line.style.marginTop = `${m_t}px`;
            line.style.marginLeft = `${m_l}px`;
            line.style.transform = `rotate(${deg}deg)`;
            isT = true;
            win();
        }
    }
}

const win = ()=>
{
    let p = document.querySelector(".inner");
    let turn2 = turnX === 'X'? 'O' : 'X';
    p.innerText = `${turn2} wins`;
    reset.innerText = "New Game"; 
}

reset.addEventListener("click",()=>{
    reset_();
});

const reset_ = ()=>{
    let p = document.querySelector(".inner");
    boxes.forEach((el)=>
    {
        el.querySelector(".box_text").innerText = "";
    });
    reset.innerText = "Reset";
    imageBox.style.width = "0px";
    p.innerText = `turn for X`;
    turnX = 'X';
    isT = false;
    line.style.height = "0px";
}

quit.addEventListener("click", ()=>{
    start.classList.remove("hide");
    reset_();
});

const checkDraw = ()=>{
    for(let i = 0; i < 9; i++)
    {
        if(boxes[i].querySelector(".box_text").innerText == "")
            return false;
    }
    return true;
}