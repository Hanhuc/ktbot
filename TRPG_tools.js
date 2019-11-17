const scriptName="TRPG_tools.js";
function Constants() {
  this.admin="박찬후";
  this.compilecheck=0;
  this.newUser;
  this.PCmake=0;
  this.lvlUser;
  this.lvlup=0;
}
Cons = new Constants();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  var PCs = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
  var jobs = JSON.parse(FileStream.read("/sdcard/katalkbot/jobs.json"));
  if(msg=="감사합니다!"||msg=="/re") {
    if(sender==Cons.admin||sender=="마스터") {
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
  if(msg=="/도움") {
    replier.reply("/캐릭터 생성  /캐릭터 삭제\n/캐릭터 정보  /능력수정치\n/레벨업  /하중수정/(무게)\n/비고 /비고수정/(구분)/(들어갈 내용)\n/장비  /장비수정/(새 장비 목록)\n     : !!!장비 목록이 새로 작성되므로 필요시 기존 장비를 같이 입력해 주어야 함!!!\n/주사위/개수d면수/능력치\n      : [/주사위] 이외는 선택사항");//\n/피해/이름/피해량  /치유/이름/치유량
  }
  if(Cons.PCmake!=0&&(msg=="/캐릭터 생성"||msg=="/캐릭터생성")) {
    replier.reply("다른 사람이 캐릭터를 생성하고 있습니다!");
  }
  if(Cons.PCmake==0&&(msg=="/캐릭터 생성"||msg=="/캐릭터생성")) {
    //var PCs = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    if(PCs[sender]!=undefined) {
      replier.reply("당신은 이미 캐릭터를 생성했습니다! 꼭 만들어야겠다면 [/캐릭터 삭제]를 입력해주세요.\n캐릭터 생성을 중지합니다.");
    }
    else {
      replier.reply("던전 월드의 세계에 오신것을 환영합니다!\n우선 [이름/직업]을 입력해주세요. 직업의 종류는 다음과 같습니다:");
      replier.reply("도적 드루이드 마법사 사냥꾼 사제 성기사 음유시인 전사");
      Cons.newUser=sender;
      Cons.PCmake=1;
    }
  }
  if(Cons.PCmake==1&&sender==Cons.newUser&&msg!="/캐릭터 생성"&&msg!="/캐릭터생성") {
    var arr = msg.split("/");
    var json = new Object();
    //var PCs = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    //var jobs = JSON.parse(FileStream.read("/sdcard/katalkbot/jobs.json"));
    if(arr[1]==undefined) {
      replier.reply("[이름/직업] 형식에 맞춰서 다시 입력해주세요.")
    }
    else if(jobs[arr[1]]==undefined) {
      replier.reply("잘못된 직업명입니다! 직업의 종류는 다음과 같습니다:");
      replier.reply("도적 드루이드 마법사 사냥꾼 사제 성기사 음유시인 전사");
    }
    else {
      var misc = new Object();
      json[sender]={
        "이름": arr[0],
        "직업": arr[1],
        "MAXHP": 0,
        "HP": 0,
        "한계하중": 0,
        "하중": 0,
        "레벨": 1,
        "경험치": 0,
        "근력": 0,
        "민첩": 0,
        "체력": 0,
        "지능": 0,
        "지혜": 0,
        "매력": 0,
        "비고": misc
      }
      PCs = Object.assign(json,PCs);
      FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
      replier.reply("이제 능력치를 배분하도록 합시다!\n[16, 15, 13, 12, 9, 8]의 수치에 배정하고 싶은 능력치를 순서대로 입력해주세요.");
      replier.reply("앞에 쓸수록 더 높은 능력치가 배정되니, 중요하게 생각하는 순서로 입력하면 됩니다.\n[근력/민첩/체력/지능/지혜/매력]과 같은 형식으로 입력하세요.");
      Cons.PCmake=2;
    }
  }
  if(Cons.PCmake==2&&sender==Cons.newUser) {
    var arr = msg.split("/");
    //var PCs = JSON.parse(FileStream.read("/sdcard/katalkbot/PCs.json"));
    //var jobs = JSON.parse(FileStream.read("/sdcard/katalkbot/jobs.json"));
    if(arr[2]!=undefined) {
      var check=0;
      for(var i=0; i<6; i++) {
        if(PCs[sender][arr[i]]!=undefined) {
          check++;
        }
      }
      if(check!=6) {
        replier.reply("[근력/민첩/체력/지능/지혜/매력]과 같은 형식으로 입력하세요.\n앞에 쓸수록 더 높은 능력치가 배정되니, 중요하게 생각하는 순서로 입력하면 됩니다.")
      }
      else {
        PCs[sender][arr[0]]=16;
        PCs[sender][arr[1]]=15;
        PCs[sender][arr[2]]=13;
        PCs[sender][arr[3]]=12;
        PCs[sender][arr[4]]=9;
        PCs[sender][arr[5]]=8;
        PCs[sender].MAXHP=jobs[PCs[sender].직업].HP+PCs[sender].체력;
        PCs[sender].HP=PCs[sender].MAXHP;
        PCs[sender].한계하중=jobs[PCs[sender].직업].하중+PCs[sender].근력;
        FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
        replier.reply("캐릭터 생성이 완료되었습니다!");
        Cons.PCmake=0;
      }
    }
  }
  if(msg.indexOf("/피해")!=-1&&(sender=="마스터"||sender==Cons.admin)) {
    var arr = msg.split("/");
    var name
    /*
    if(arr[3]==undefined) {
      name=sender;
    }
    else {
      name=arr[3];
    }
    */
    name = arr[2];
    PCs[name].HP = PCs[name].HP - Math.abs(arr[3]);
    if(PCs[name].HP<0) {
      PCs[name].HP = 0;
    }
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply(PCs[name].이름+"에게 "+Math.abs(arr[3])+"의 피해! HP: "+PCs[name].HP+"/"+PCs[name].MAXHP);
  }
  if(msg.indexOf("/치유")!=-1&&(sender=="마스터"||sender==Cons.admin)) {
    var arr = msg.split("/");
    var name;
    /*
    if(arr[3]==undefined) {
      name=sender;
    }
    else {
      name=arr[3];
    }
    */
    name = arr[2];
    PCs[name].HP = 1*PCs[name].HP + Math.abs(arr[3]);
    if(PCs[name].HP>PCs[name].MAXHP) {
      PCs[name].HP=PCs[name].MAXHP;
    }
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply(PCs[name].이름+"에게 "+Math.abs(arr[3])+"의 치유! HP: "+PCs[name].HP+"/"+PCs[name].MAXHP);
  }
  if(Cons.lvlup==0&&msg=="/레벨업") {
    var name = sender;
    Cons.lvlUser = name;

    if(PCs[name].경험치<PCs[name].레벨*1 + 7) {
      var exp = PCs[name].레벨*1 + 7 - PCs[name].경험치*1;
      replier.reply("경험치가 부족합니다! 레벨업을 하려면 현재 레벨+7 만큼의 경험치가 필요합니다.\n필요 경험치: "+exp);
    }
    else {
      PCs[name].경험치 = PCs[name].경험치*1 - PCs[name].레벨*1 - 7;
      PCs[name].레벨 = PCs[name].레벨*1 + 1;
      FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
      replier.reply("축하합니다! 당신의 레벨이 1 올라 "+PCs[name].레벨+" 레벨이 되었습니다!\n강화하고싶은 능력치를 한 개 골라주세요.");
      replier.reply(printstat(name));
      Cons.lvlup = 1;
    }
  }
  if(Cons.lvlup==1&&Cons.lvlUser==sender&&msg!="/레벨업") {
    var name = sender;
    if(PCs[name][msg]==undefined) {
      replier.reply("올바른 능력치를 입력해주세요.");
    }
    else if(PCs[name][msg]==18) {
      replier.reply("그 능력치는 이미 최고 수준에 달했습니다! 다른 능력치를 골라주세요.");
    }
    else {
      PCs[name][msg] = PCs[name][msg]*1 +1;
      PCs[name].MAXHP =jobs[PCs[name].직업].HP*1+PCs[name].체력*1;
      PCs[name].한계하중 =jobs[PCs[name].직업].하중*1+PCs[name].근력*1;

      FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
      replier.reply("해당 능력치가 1 올랐습니다!");
      replier.reply(printstat(name));
      Cons.lvlup=0;
    }
  }
  if(msg.indexOf("/경험치")!=-1&&(sender=="마스터"||sender==Cons.admin)) {
    var arr = msg.split("/");
    if(arr[2]!=undefined) {
      var name = arr[2];
      /*
      if(arr[3]==undefined) {
        name=sender;
      }
      else {
        name=arr[3];
      }
      */
      PCs[name].경험치 = PCs[name].경험치*1 +1;
      FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
      replier.reply(PCs[name].이름+", 당신은 충분한 경험을 쌓아 경험치를 1 받았습니다!");
      replier.reply(printstat(name));
    }
  }
  if((msg.indexOf("/하중 수정")!=-1||msg.indexOf("/하중수정")!=-1)&&sender!="마스터") {
    var arr = msg.split("/");
    PCs[sender].하중 = PCs[sender].하중*1 + arr[2]*1;
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply(printstat(sender));
  }
  else if((msg.indexOf("/하중 수정")!=-1||msg.indexOf("/하중수정")!=-1)&&sender=="마스터") {
    var arr = msg.split("/");
    PCs[arr[2]].하중 = PCs[arr[2]].하중*1 + arr[3]*1;
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply(printstat(arr[2]));
  }
  if((msg.indexOf("/비고 수정")!=-1||msg.indexOf("/비고수정")!=-1)&&sender!="마스터") {
    var arr = msg.split("/");
    PCs[sender].비고[arr[2]] = arr[3];
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply("수정 완료!");
  }
  else if((msg.indexOf("/비고 수정")!=-1||msg.indexOf("/비고수정")!=-1)&&sender=="마스터") {
    var arr = msg.split("/");
    PCs[arr[2]].비고[arr[3]] = arr[4];
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply("수정 완료!");
  }
  else if(msg=="/비고") {
    replier.reply(printmisc(sender));
  }
  else if(msg.indexOf("/비고")!=-1) {
    var arr = msg.split("/");
    replier.reply(printmisc(arr[2]));
  }

  if((msg.indexOf("/장비 수정")!=-1||msg.indexOf("/장비수정")!=-1)&&sender!="마스터") {
    var arr = msg.split("/");
    PCs[sender].장비 = arr[2];
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply("수정 완료!");
  }
  else if((msg.indexOf("/장비 수정")!=-1||msg.indexOf("/장비수정")!=-1)&&sender=="마스터") {
    var arr = msg.split("/");
    PCs[arr[2]].장비 = arr[3];
    FileStream.write("/sdcard/katalkbot/PCs.json",JSON.stringify(PCs));
    replier.reply("수정 완료!");
  }
  else if(msg=="/장비") {
    replier.reply(JSON.stringify(PCs[sender].장비));
  }
  else if(msg.indexOf("/장비")!=-1) {
    var arr = msg.split("/");
    replier.reply(JSON.stringify(PCs[arr[2]].장비));
  }

  if(msg.indexOf("/캐릭터 삭제")!=-1) {
    var arr = msg.split("/");
    var json = new Object();
    replier.reply("아직 미구현된 기능입니다! 꼬와? 꼽냐고\n관리자에게 문의해라")
  }
  if(msg=="/캐릭터 정보"||msg=="/캐릭터정보") {
    if(PCs[sender]==undefined) {
      replier.reply("아직 캐릭터를 생성하지 않았습니다! [/캐릭터 생성]을 입력하여 새 캐릭터를 만드세요!");
    }
    else {
      replier.reply(printstat(sender));
    }
  }
  
  if(msg==("/능력수정치")||msg==("/능력 수정치")) {
    replier.reply("능력수정치는 주사위 판정에 더해지는 값으로, 능력치에 따라서 정해집니다. 매 판정마다 그에 맞는 능력수정치가 사용되며, +근, +체, +민, +지, +혜, +매의 약자로 표시됩니다.")
    replier.reply("\n1~3:      -3\n4~5:     -2\n6~8:     -1\n9~12:     0\n13~15: +1\n16~17: +2\n18:       +3");
  }
  if(msg.indexOf("/주사위")!=-1) {// /주사위/num1dnum2/stat
    var arr = msg.split("/");
    var stat;
    if(arr[2]==undefined) {
      replier.reply(dice1(2,6));
    }
    else {
      stat = PCs[sender];
      if(arr[2]=="공격") {
        var num = jobs[PCs[sender].직업].dmg;
        replier.reply(PCs[sender].이름+"의 기본 피해는 d"+num+"!");
        replier.reply(dice1(1,num));
      }
      else if(stat==undefined) {
        var num = arr[2].split("d");
        replier.reply(dice1(num[0],num[1]));
      }
      else {
        var num = arr[2].split("d");
        replier.reply(dice2(num[0],num[1],stat[arr[3]]));
      }
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
  function printstat(name) {
    return "이름: "+PCs[name].이름+"\n직업: "+PCs[name].직업+"\n+=+=+=+=+=+\n레벨: "+PCs[name].레벨+"  경험치: "+PCs[name].경험치+"\nHP: "+PCs[name].HP+"/"+PCs[name].MAXHP+"  하중: "+PCs[name].하중+"/"+PCs[name].한계하중+"\n+=+=+=+=+=+\n근력: "+PCs[name].근력+"  체력: "+PCs[name].체력+"\n민첩: "+PCs[name].민첩+"  지능: "+PCs[name].지능+"\n지혜: "+PCs[name].지혜+"  매력: "+PCs[name].매력;
  }
  function printmisc(name) {
    var misc = JSON.stringify(PCs[name].비고);/*
    var arr = misc.split(",");
    var len = arr.length();
    var print = "비고 사항\n";
    for(var i = 0; i < len; i++) {
      print = print+arr[i]+"\n";
    }*/
    return misc;
  }
}
