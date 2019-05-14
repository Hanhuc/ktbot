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
    replier.reply("던전 월드의 세계에 오신것을 환영합니다!\n우선 이름과 직업을 입력해주세요.\n선택
     가능한 직업은 다음과 같습니다: 도적 드루이드 마법사 사냥꾼 사제 성기사 음유시인 전사\n단,");
  }






  if(Cons.PCmake==0&&msg=="/캐릭터 생성") {
    replier.reply("던전 월드의 세계에 오신것을 환영헙나디!\n이름과 능력치를 입력해주세요.\n[16, 15, 13, 12, 9, 8]의 여섯 수치를 원하는 능력치에 배정합니다.\n각 능력치는 특정 판정에 능력수정치에 해당하는 변화를 줍니다.");
    replier.reply("\n1~3: -3\n4~5: -2\n6~8: -1\n9~12: 0\n13~15: +1\n16~17: +2\n18: +3");
    replier.reply("[캐릭터 이름/직업/힘/민첩/체력/지성/지혜/매력] 형식으로 입력하세요.");
    Cons.newUser=sender;
    Cons.PCmake=1;
  }
  if(Cons.PCmake==1&&sender==Cons.newUser&&msg!="/캐릭터 생성") {
    var arr = msg.split("/");
    var json = new Object();
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    if(jtot[sender]!=undefined) {
      replier.reply("이미 캐릭터를 생성하셨습니다!\n캐릭터 생성을 중지합니다.");
      Cons.PCmake=0;
    }
    else {
      if(arr[7]==undefined) {
        replier.reply("입력된 메시지 형식이 틀렸거나 모든 능력치를 입력되지 않았습니다!");
        replier.reply("캐릭터 이름/직업/근력/민첩/체력/지성/지혜/매력] 형식으로 입력하세요.");
      }
      else {
        var check=0;
        var stats = [16, 15, 13, 12, 9, 8];
        for(var i = 2; i<8; i++) {
          for(var j = 0; j<6; j++) {
            if(arr[i]==stats[j]) {
              check ++;
            }
          }
        }
        if(check==6) {
            json[sender]={
              "name": arr[0],
              "str": arr[2],
              "dex": arr[3],
              "con": arr[4],
              "int": arr[5],
              "wis": arr[6],
              "cha": arr[7],
              "lvl": 1,
              "exp": 0,
              "job": arr[1]
            }
            jtot = Object.assign(json,jtot);
            var sjson = JSON.stringify(jtot);
            FileStream.write("/sdcard/katalkbot/PCs.json",sjson);
            replier.reply("캐릭터 생성이 완료되었습니다!");
            Cons.PCmake=0;
          }
        else {
          replier.reply("능력치 배분이 올바르지 않습니다! [16, 15, 13, 12, 9, 8]의 여섯 수치를 지켜주세요.\n[캐릭터 이름/직업/근력/민첩/체력/지성/지혜/매력] 형식으로 입력하세요.");

        }
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
    switch (arr[3]) {
      case "근력":
        stat = data[sender].str;
        break;
      case "민첩":
        stat = data[sender].dex;
        break;
      case "체력":
        stat = data[sender].con;
        break;
      case "지능":
        stat = data[sender].int;
        break;
      case "지혜":
        stat = data[sender].wis;
        break;
      case "매력":
        stat = data[sender].cha;
        break;
      default:
    }
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
/* 능력 수정치
1~3	 -3
4~5	 -2
6~8 	 -1
9~12	 0
13~15	  +1
16~17	  +2
18	 +3
*/
