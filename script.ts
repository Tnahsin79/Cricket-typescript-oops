class Team{
    players:number[]=[];
    teamtotal:number;
    constructor(){
        this.teamtotal=0;
    }
    score(run:number){
        this.teamtotal+=run;
    }
    pushrun(run:number){
        this.players.push(run);
    }
}
class Player{
    balls:number[]=[];
    playertotal:number;
    constructor(){
        this.playertotal=0;
    }
    hitrun(run:number){
        this.balls.push(run);
        this.playertotal+=run;
    }
}

var i,num;
var start=()=>{
    num=60;
    i=setInterval(function(){ 
        (<HTMLSelectElement>document.getElementById("time")).innerText = `${num}`;
        num--;
    },1000);
    (<HTMLSelectElement>document.getElementById("a")).disabled = false;
    (<HTMLSelectElement>document.getElementById("b")).disabled = true;
    (<HTMLSelectElement>document.getElementById("generate")).disabled = true;
    (<HTMLSelectElement>document.getElementById("start")).disabled = true;
    setTimeout(function(){
        num=60;
        clearInterval( i );
        i=setInterval(function(){ 
            (<HTMLSelectElement>document.getElementById("time")).innerText = `${num}`;
            num--;
        },1000);
        (<HTMLSelectElement>document.getElementById("a")).disabled = true;
        (<HTMLSelectElement>document.getElementById("b")).disabled = false;
        team=2;
        player=1;
        ball=1;
        TeamA.pushrun(p1.playertotal);
        setTimeout(function(){
            clearInterval( i );
            (<HTMLSelectElement>document.getElementById("b")).disabled = true;
            (<HTMLSelectElement>document.getElementById("generate")).disabled = false;
            TeamB.pushrun(p2.playertotal);
        },60000);
    },60000);
}
//console.log("hello");
var TeamA=new Team();
var TeamB=new Team();
var team=1,player=1,ball=1,prun=0,truns=0;
var p1=new Player();
var p2=new Player();

var hita=()=>{
        let run;
        run=Math.floor(Math.random() * 7);
        if(ball<7)
        { 
            if(player>10)
            {
                (<HTMLSelectElement>document.getElementById("a")).disabled = true;
                (<HTMLSelectElement>document.getElementById("b")).disabled = false;
                team=2;
                player=1;
                ball=1;
                clearInterval( i );
                num=60;
                i=setInterval(function(){ 
                    (<HTMLSelectElement>document.getElementById("time")).innerText = `${num}`;
                    num--;
                },1000);
            }
            else
            {
                p1.hitrun(run);
                TeamA.score(run);
                let ascore=(<HTMLSelectElement>document.getElementById("team-a-score"));
                ascore.innerText=`${TeamA.teamtotal}`;
                ascore=(<HTMLSelectElement>document.getElementById(`1${player}7`));
                ascore.innerText=`${p1.playertotal}`;
                ascore=(<HTMLSelectElement>document.getElementById(`1${player}${ball}`));
                ascore.innerText=`${run}`;
                ball++;
            }
            if(run===0)
            { TeamA.pushrun(p1.playertotal); p1=new Player(); player++; ball=1; }
        }
        else
        { TeamA.pushrun(p1.playertotal); p1=new Player(); player++; ball=1; }
}
var hitb=()=>{
    let run;
    run=Math.floor(Math.random() * 7);
    if(ball<7)
    { 
        if(player>10)
        {
            clearInterval( i );
            (<HTMLSelectElement>document.getElementById("time")).innerText = `${0}`;
            (<HTMLSelectElement>document.getElementById("b")).disabled = true;
            (<HTMLSelectElement>document.getElementById("generate")).disabled = false;
        }
        else
        {
            p2.hitrun(run);
            TeamB.score(run);
            let ascore=(<HTMLSelectElement>document.getElementById("team-b-score"));
            ascore.innerText=`${TeamB.teamtotal}`;
            ascore=(<HTMLSelectElement>document.getElementById(`2${player}7`));
            ascore.innerText=`${p2.playertotal}`;
            ascore=(<HTMLSelectElement>document.getElementById(`2${player}${ball}`));
            ascore.innerText=`${run}`;
            ball++;
        }
        if(run===0)
        { TeamB.pushrun(p2.playertotal); p2=new Player(); player++; ball=1; }
    }
    else
    { TeamB.pushrun(p2.playertotal); p2=new Player(); player++; ball=1; }
}

var win,mom=0,maxscore;
var genresult=()=>{
    let array;
    console.log(TeamA.players);
    console.log(TeamB.players);
    if(TeamA.teamtotal>TeamB.teamtotal)
    { win="TEAM 1"; array=TeamA.players;}
    else
    { win="TEAM 2"; array=TeamB.players; }
    (<HTMLSelectElement>document.getElementById("winner")).innerText = win;
    maxscore=array[0];
    for(let i=1;i<array.length;i++)
    {
        if(array[i]>array[mom])
        {
            mom=i;
            maxscore=array[i];
        }
    }
    mom++;
    (<HTMLSelectElement>document.getElementById("manofmatch")).innerText = `PLAYER ${mom}\n ${win}\n SCORE: ${maxscore}`;
}


var maindiv=document.createElement("div");
maindiv.setAttribute("class","maindiv");

var title=document.createElement("div");
title.setAttribute("class","row");
var titlecol=document.createElement("div");
titlecol.setAttribute("class","col col-12");
var titlename=document.createElement("h3");
titlename.innerText="CRICKET 10";
titlecol.appendChild(titlename);
title.appendChild(titlecol);
var hr1=document.createElement("hr");

//score row
var board=document.createElement("div");
board.setAttribute("class","row");
var teamacol=document.createElement("div");
teamacol.setAttribute("class","col col-12 col-md-5");
var teama=document.createElement("div");
teama.innerText="TEAM A";
var teamascore=document.createElement("div");
teamascore.setAttribute("id","team-a-score");
teamascore.innerText="0";
var hit1=document.createElement("button");
hit1.innerText="HIT 1";
hit1.setAttribute("onclick","hita()");
hit1.setAttribute("id","a");
hit1.setAttribute("class","btn btn-primary");
teamacol.append(teama,teamascore,hit1);

var timercol=document.createElement("div");
timercol.setAttribute("class","col col-12 col-md-2");
var timer=document.createElement("div");
timer.innerText="TIMER";
var time=document.createElement("div");
time.setAttribute("id","time");
time.innerText="--";
var startbtn=document.createElement("button");
startbtn.innerText="START GAME";
startbtn.setAttribute("id","start");
startbtn.setAttribute("onclick","start()");
startbtn.setAttribute("class","btn btn-primary");
timercol.append(timer,time,startbtn);

var teambcol=document.createElement("div");
teambcol.setAttribute("class","col col-12 col-md-5");
var teamb=document.createElement("div");
teamb.innerText="TEAM B";
var teambscore=document.createElement("div");
teambscore.setAttribute("id","team-b-score");
teambscore.innerText="0";
var hit2=document.createElement("button");
hit2.innerText="HIT 2";
hit2.setAttribute("id","b");
hit2.setAttribute("onclick","hitb()");
hit2.setAttribute("class","btn btn-primary");
teambcol.append(teamb,teambscore,hit2);

board.appendChild(teamacol);
board.appendChild(timercol);
board.appendChild(teambcol);
var hr2=document.createElement("hr");

var t=1;
//table row
var table=document.createElement("div");
table.setAttribute("class","row");

var teamatab=document.createElement("div");
teamatab.setAttribute("class","col col-12 col-md-5"); 

    let table1=document.createElement("table");
    let theader=document.createElement("tr");
    let tname=document.createElement("th");
    tname.innerText=`TEAM ${t}`;
    theader.appendChild(tname);
    for(let i=0;i<6;i++)
    {
        let ball=document.createElement("th");
        ball.innerText=`B${i+1}`;
        theader.appendChild(ball);
    }
    let total=document.createElement("th");
    total.innerText="total";
    theader.appendChild(total);
    table1.appendChild(theader);
    for(let i=0;i<10;i++)
    {
        let tbody=document.createElement("tr");
        let pname=document.createElement("td");
        pname.innerText=`PLAYER ${i+1}`;
        tbody.appendChild(pname);
        for(let j=0;j<7;j++)
        {
            let ball=document.createElement("td");
            ball.setAttribute("id",`${t}${i+1}${j+1}`);
            tbody.appendChild(ball);
        }
        table1.appendChild(tbody);
    }
    teamatab.appendChild(table1);


var matchscore=document.createElement("div");
matchscore.setAttribute("class","col col-12 col-md-2");
var generate=document.createElement("button");
generate.innerText="Generate result";
generate.setAttribute("id","generate");
generate.setAttribute("onclick","genresult()");
generate.setAttribute("class","btn btn-primary");
var teamwon=document.createElement("div");
teamwon.innerText="MATCH WON BY";
var winner=document.createElement("div");
winner.setAttribute("id","winner");

var hr4=document.createElement("hr");

var motm=document.createElement("div");
motm.innerText="MAN OF THE MATCH";
var manofmatch=document.createElement("div");
manofmatch.setAttribute("id","manofmatch");

matchscore.append(generate,teamwon,winner,hr4,motm,manofmatch);

t++;
var teambtab=document.createElement("div");
teambtab.setAttribute("class","col col-12 col-md-5");
    
    let table2=document.createElement("table");
    let theader2=document.createElement("tr");
    let tname2=document.createElement("th");
    tname2.innerText=`TEAM ${t}`;
    theader2.appendChild(tname2);
    for(let i=0;i<6;i++)
    {
        let ball=document.createElement("th");
        ball.innerText=`B${i+1}`;
        theader2.appendChild(ball);
    }
    let total2=document.createElement("th");
    total2.innerText="total";
    theader2.appendChild(total2);
    table2.appendChild(theader2);
    for(let i=0;i<10;i++)
    {
        let tbody=document.createElement("tr");
        let pname=document.createElement("td");
        pname.innerText=`PLAYER ${i+1}`;
        tbody.appendChild(pname);
        for(let j=0;j<7;j++)
        {
            let ball=document.createElement("td");
            ball.setAttribute("id",`${t}${i+1}${j+1}`);
            tbody.appendChild(ball);
        }
        table2.appendChild(tbody);
    }
    teambtab.appendChild(table2);
//createtable();

table.appendChild(teamatab);
table.appendChild(matchscore);
table.appendChild(teambtab);
var hr3=document.createElement("hr");
//table row


maindiv.appendChild(title);
maindiv.appendChild(hr1);
maindiv.appendChild(board);
maindiv.appendChild(hr2);
maindiv.appendChild(table);
maindiv.appendChild(hr3);
document.body.appendChild(maindiv);
(<HTMLSelectElement>document.getElementById("a")).disabled = true;
(<HTMLSelectElement>document.getElementById("b")).disabled = true;
(<HTMLSelectElement>document.getElementById("generate")).disabled = true;

