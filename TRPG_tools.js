const scriptName="TRPG_tools.js";
function Constants() {
  this.admin="박찬후";
  this.compilecheck=0;
  this.newUser;
  this.PCmake=0;
}
Cons = new Constants();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if(msg=="감사합니다!"||msg=="/re") {
    if(sender==Cons.admin) {
      Api.reload("TRPG_tools.js");
      if(Cons.compilecheck==0) {
        replier.reply("정말 잘하셨어요!");
        Cons.compilecheck=1;
      }
      else {
        replier.reply("안 돼! 내가 컴파일이 안돼도 바뀌는 것은 없다!");
      }
    }
    else {
      replier.reply("빛이 당신을 태울 것입니다!");
    }
  }

  if(Cons.PCmake==0&&msg=="/캐릭터 생성") {
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    if(jtot[sender]!=undefined) {
      replier.reply("당신은 이미 캐릭터를 생성했습니다! 꼭 만들어야겠다면 [/캐릭터 삭제]를 입력해주세요.\n캐릭터 생성을 중지합니다.");
    }
    else {
      replier.reply("던전 월드의 세계에 오신것을 환영합니다!\n우선 [이름/직업]을 입력해주세요. 직업의 종류는 다음과 같습니다:");
      replier.reply("도적 드루이드 마법사 사냥꾼 사제 성기사 음유시인 전사");
      Cons.newUser=sender;
      Cons.PCmake=1;
    }
  }
  if(Cons.PCmake==1&&sender==Cons.newUser&&msg!="/캐릭터 생성") {
    var arr = msg.split("/");
    var json = new Object();
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    var jobs = JSON.parse(FileStream.read("/sdcard/katalkbot/jobs.json"));
    if(arr[1]==undefined) {
      replier.reply("[이름/직업] 형식에 맞춰서 다시 입력해주세요.")
    }
    else if(jobs[arr[1]]==undefined) {
      replier.reply("잘못된 직업명입니다! 직업의 종류는 다음과 같습니다:");
      replier.reply("도적 드루이드 마법사 사냥꾼 사제 성기사 음유시인 전사");
    }
    else {
      json[sender]={
        "name": arr[0],
        "jobs": arr[1],
        "lvl": 1,
        "exp": 0,
        "근력": 0,
        "민첩": 0,
        "체력": 0,
        "지성": 0,
        "지혜": 0,
        "매력": 0
      }
      jtot = Object.assign(json,jtot);
      FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(jtot));
      replier.reply("이제 능력치를 배분하도록 합시다!\n[16, 15, 13, 12, 9, 8]의 수치에 배정하고 싶은 능력치를 순서대로 입력해주세요.");
      replier.reply("앞에 쓸수록 더 높은 능력치가 배정되니, 중요하게 생각하는 순서로 입력하면 됩니다.\n[근력/민첩/체력/지성/지혜/매력]과 같은 형식으로 입력하세요.");
      Cons.PCmake=2;
    }
  }
  if(Cons.PCmake==2&&sender==Cons.newUser) {
    var arr = msg.split("/");
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    if(arr[2]!=undefined) {
      var check=0;
      for(var i=0; i<6; i++) {
        if(jtot[sender][arr[i]]!=undefined) {
          check++;
        }
      }
      if(check!=6) {
        replier.reply("[근력/민첩/체력/지성/지혜/매력]과 같은 형식으로 입력하세요.\n앞에 쓸수록 더 높은 능력치가 배정되니, 중요하게 생각하는 순서로 입력하면 됩니다.")
      }
      else {
        jtot[sender][arr[0]]=16;
        jtot[sender][arr[1]]=15;
        jtot[sender][arr[2]]=13;
        jtot[sender][arr[3]]=12;
        jtot[sender][arr[4]]=9;
        jtot[sender][arr[5]]=8;
        FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(jtot));
        replier.reply("캐릭터 생성이 완료되었습니다!");
        Cons.PCmake=0;
      }
    }
  }

  if(msg.indexOf("/캐릭터 삭제")!=-1) {
    var arr = msg.split("/");
    var json = new Object();
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    replier.reply("아직 미구현된 기능입니다! 꼬와? 꼽냐고\n관리자에게 문의해라")
  }
  if(msg==("/능력수정치")) {
    replier.reply("\n1~3: -3\n4~5: -2\n6~8: -1\n9~12: 0\n13~15: +1\n16~17: +2\n18: +3");
  }
  if(msg.indexOf("/주사위")!=-1) {// /주사위/num1dnum2/stat
    var arr = msg.split("/");
    var num = arr[2].split("d");
    replier.reply(num[0]+" "+num[1]);
    var stat;
    var data = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    stat = data[sender][arr[3]];
    if(stat==undefined) {
      replier.reply(dice1(num[0],num[1]));
    }
    else {
      replier.reply(dice2(num[0],num[1],stat));
    }
  }

  function dice1(num1,num2) {
    var print = "주사위는 던져졌다..!\n";
    var sum = 0;
    for(var i = 0; i < num1; i++) {
      var noon = Math.ceil(Math.random()*num2);
      sum = sum + noon;
      print = print + noon +" ";
    }
    print = print +"\n주사위 눈의 합: "+sum;
    return print;
  }
  function dice2(num1,num2,stat) {
    var revise = 0;
    if(stat<=3) {
      revise = -3;
    }
    else if(stat<=5) {
      revise = -2;
    }
    else if(stat<=8) {
      revise = -1;
    }
    else if(stat<=12) {
      revise = 0;
    }
    else if(stat<=15) {
      revise = 1;
    }
    else if(stat<=17) {
      revise = 2;
    }
    else {
      revise = 3;
    }
    var print = "주사위는 던져졌다..!\n";
    var sum = 0;
    for(var i = 0; i < num1; i++) {
      var noon = Math.ceil(Math.random()*num2);
      sum = sum + noon;
      print = print + noon +" ";
    }
    var final = sum + revise;
    print = print +"\n주사위 눈의 합: "+sum+" / 능력수정치: "+revise+"\n최종 판정 :"+final;
    return print;
  }
}
