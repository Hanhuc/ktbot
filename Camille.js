const scriptName="Camille.js";
function Challanger() {
  this.step=0;
  this.turn;
  this.room;
  this.name1;
  this.name2;
  this.lucfactor=0.3;// luc stat defendency of crit/counter
  this.atkfactor=0.7;// atk stat defendency of damage
  this.deffactor=0.7;// def stat defendency of damage
  this.admin="박찬후";
  this.compilecheck=0;
  this.offensive=0;
  this.offname;
  this.signup=0;
  this.newuser;
}
Chal1 = new Challanger();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  if(msg=="바람이여!"||msg=="/reload") {
    if(sender==Chal1.admin) {
      Api.reload("Camille.js");
      if(Chal1.compilecheck==0) {
        replier.reply("내 명에 따라라!");
        Chal1.compilecheck=1;
      }
      else {
        replier.reply("파리같은 놈들!");
      }
    }
    else {
      replier.reply("나는 나보다 약한 자의 명령은 듣지 않는다!");
    }
  }

  if(msg=="Hello"||msg=="hello") {
    if(room!="새 시대, 새 톡방") {
      replier.reply("Hi");
    }
  }
  if(Chal1.step==0&&room=="새 시대, 새 톡방") {
    var rand=Math.random();
    if(Chal1.offensive==1&&sender==Chal1.offname) {
      replier.reply("왜ㅋㅋ 꼽냐?ㅋ 새끼");
      Chal1.offensive=0;
      Chal1.offname="초기화";
    }
    if(rand<0.005) {
      replier.reply("뭘 봐, 짜샤!");
      Chal1.offensive=1;
      Chal1.offname=sender;
    }
    else if(rand<0.01) {
      replier.reply("섹스");
    }
    else if(sender=="최커제"&&rand<0.1) {
      replier.reply("ㄴ이세돌보다 바둑 못함");
    }
    else {
      if(msg=="Hello") {
        replier.reply("Sex");
      }

      if(msg=="이병 박찬후") {
        replier.reply("그래서 짬 맛있냐?");
      }
      if(msg.indexOf("쥬~")!=-1) {
        replier.reply("ㄹㅇㅋㅋ");
      }
    }
  }
  if(msg=="/help") {
    replier.reply("<일반 커맨드>\n/고약한 야유\n/야유\n/배터리\n/능력치 (이름)\n/계정 등록\n/전적 (ID)\n"
    +"/대전 시작\n(이름) 대 (이름)\n\n<대전 커맨드>\n/항복\n(기술명)\n야유\n함성");
  }
  if(msg=="/고약한 야유") {
    var print = heckler();
    replier.reply(print);
  }
  if(msg=="/야유") {
    var print = hecklebot();
    replier.reply(print);
  }
  if(msg=="/배터리") {
    replier.reply("배터리 잔량: "+Device.getBatteryLevel()+"%");
  }
  if(msg=="와!") {
    replier.reply("샌즈!");
  }
  if(msg=="ㅇㅈ?"||msg.indexOf("특)")!=-1) {
    var admit = Math.floor(Math.random()*2);
    switch (admit) {
      case 0:
        replier.reply("ㅇㅈ");
        break;
      case 1:
        replier.reply("ㄴㅇㅈ");
        break;
      default:
    }
  }
  if(sender=="무일농원 박인성"){
    var rand = Math.floor(Math.random()*5)
    var reply;
    if(msg.indexOf("bye")!=-1||msg.indexOf("잘 가")!=-1) {
      reply = "안녕히 가십시오!";
    }
    else if(msg.indexOf("놈")!=-1) {
      reply = "왜 이 놈 저 놈 하십니까!";
    }
    else if(msg.indexOf("안녕")!=-1) {
      reply = "오! 안녕하세요!";
    }
    else {
      switch (rand) {
        case 0:
          reply = "그래서 다스는 누구껍니까?";
          break;
        case 1:
          reply = "한총련도 2007년이 끝이구나";
          break;
        case 2:
          reply = "아, 그렇습니까?";
          break;
        case 3:
          reply =  "술 한 잔 마셨습니다..";
          break;
        default:
          reply = "백종원이 캬베진 광고를 하네";
      }
    }
    replier.reply(reply);
  }
  if(msg.indexOf(" 대 ")!=-1) {//start battle
    var index = msg.indexOf(" 대 ");
    var left = msg.substring(0,index);
    var right = msg.substring(index+3);
    battle(left,right);
  }

  if(msg.indexOf("/능력치")!=-1) {
    var index = msg.indexOf("/능력치");
    var name = msg.substring(index+5);
    var left = new Player(name);
    replier.reply(left.printstat());
  }
  if(msg.indexOf("/전적")!=-1) {
    var index = msg.indexOf("/전적");
    var ID = msg.substring(index+4);
    if(IDchecker(ID)) {
      replier.reply(getRecords(ID));
    }
    else {
      replier.reply("등록되지 않은 ID일세!");
    }
  }

  if(Chal1.signup==0&&msg=="/계정 등록") {
    replier.reply("ID를 입력해주게!");
    Chal1.newuser=sender;
    Chal1.signup=1;
  }
  if(Chal1.signup==1&&sender==Chal1.newuser&&msg!="/계정 등록") {
    newAccount(sender,msg);
  }
  if((Chal1.step!=0&&msg=="/대전 중지")) {
    if((sender==Chal1.admin)) {
      replier.reply("대전을 중지하겠다! 모두 퇴장!");
      Chal1.step = 0;
    }
    else {
      replier.reply("감히 신성한 대전을 멈추려 하다니! 무엄하다!");
    }
  }
  if(Chal1.step!=0&&msg=="/항복") {
    if(sender==Chal1.name1&&Chal1.step>4) {
      replier.reply(Chal1.name1+"의 항복으로 대전 중지! 승자는 "+Chal1.name2+"!");
      addGame(Player1.ID, Player2.ID);
      addWin(Player2.ID);
      Chal1.step=0
    }
    else if(sender==Chal1.name2&&Chal1.step>4) {
      replier.reply(Chal1.name2+"의 항복으로 대전 중지! 승자는 "+Chal1.name1+"!");
      addGame(Player1.ID, Player2.ID);
      addWin(Player1.ID);
      Chal1.step=0
    }
    else {
      replier.reply("싸워보지도 않고 항복하다니! 수치인 줄 알게!");
    }
  }

  // Battle starts
  if(Chal1.step!=0&&msg=="/대전 시작") {
    replier.reply("투기장이 이미 사용중일세!");
  }
  if(Chal1.step==0&&msg=="/대전 시작") {
    replier.reply("투기장에 온 것을 환영하네, 소환사여!\n첫 번째 도전자는 손을 들게!");
    Chal1.step=1;
    Chal1.room=room;
  }
  if(Chal1.step==1&&msg=="손"&&room==Chal1.room) {
    Chal1.name1=sender;
    replier.reply("첫 번째 도전자는 "+Chal1.name1+"!\n두 번째 도전자는 발을 들게!");
    Chal1.step=2;
  }
  if(Chal1.step==2&&msg=="발"&&room==Chal1.room) {
    if(sender==Chal1.name1) {
      replier.reply("최고의 적은 항상 자기 자신이지! 하지만 이곳에선 금지되어 있다네! 두 번째 도전자여! 발을 높이 들게!");
    }
    else {
      Chal1.name2=sender;
      replier.reply("두 번째 도전자는 "+Chal1.name2+"!\n"+Chal1.name1+"! 그대의 소환수의 이름은?");
      Chal1.step=3.1;
    }
  }
  if(Chal1.step==3.1&&room==Chal1.room&&sender==Chal1.name1) {
    Player1 = new Player(msg);
    replier.reply(Chal1.name2+"! 그대의 소환수의 이름은?");
    Chal1.step=3.2;
  }
  if(Chal1.step==3.2&&room==Chal1.room&&sender==Chal1.name2) {
    Player2 = new Player(msg);
    replier.reply(Chal1.name1+"! ID를 입력해 주게나! 만약 계정이 없다면 [/계정 등록]을 입력하게!");
    Chal1.step=3.3;
  }
  if(Chal1.step==3.3&&room==Chal1.room&&sender==Chal1.name1&&msg!="/계정 등록"&&Chal1.signup==0) {
    if(!IDchecker(msg)) {
      replier.reply("등록되지 않은 ID일세! ID를 다시 입력해주게!");
    }
    else if(ownername(msg)!=sender) {
      replier.reply("ID를 도용하려 들다니, 쓰레기 새끼! 자신의 ID를 입력하도록 하게!");
    }
    else {
      Player1.ID=msg;
      replier.reply(Chal1.name2+"! ID를 입력해 주게나! 만약 계정이 없다면 [/계정 등록]을 입력하게!");
      Chal1.step=4;
    }
  }
  if(Chal1.step==4&&room==Chal1.room&&sender==Chal1.name2&&msg!="/계정 등록"&&Chal1.signup==0) {
    if(!IDchecker(msg)) {
      replier.reply("등록되지 않은 ID일세! ID를 다시 입력해주게!");
    }
    else if(ownername(msg)!=sender) {
      replier.reply("ID를 도용하려 들다니, 쓰레기 새끼! 자신의 ID를 입력하도록 하게!");
    }
    else {
      Player2.ID=msg;
      replier.reply(Player1.printstat()+"\n+=+=+=+=+=+\n"+Player2.printstat());
      Chal1.hp1 = Player1.hp;
      Chal1.hp2 = Player2.hp;
      replier.reply("대전을 시작한다!");
      Chal1.turn=1;
      replier.reply(Player1.name+"의 공격은?");
      Chal1.step=5;
    }
  }
  if(Chal1.step==5&&sender==Chal1.name1&&room==Chal1.room) {
    Player1.skill = msg;
    Player1.skillatk = skilltoatk(Player1.skill);
    replier.reply(Player2.name+"의 공격은?");
    Chal1.step=6;
  }
  if(Chal1.step==6&&sender==Chal1.name2&&room==Chal1.room) {
    Player2.skill = msg;
    Player2.skillatk=skilltoatk(Player2.skill);
    Chal1.step=7;
  }
  if(Chal1.step==7) {// turn starts
    var reply = "+=+=+=+=+=+=+=+=+=+=+\n"+Chal1.turn+"번째 턴!\n";
    if(Chal1.turn==3||Chal1.turn==6||Chal1.turn==9) {
      reply = reply + "싸움이 길어지면서 소환수들이 지치고 있다!\n소환수들의 방어력이 감소했다!\n"
      Player1.def = Player1.def*0.7;
      Player2.def = Player2.def*0.7;
    }
    if(Player1.dex>Player2.dex) {// Player1 is faster
      reply = reply + battleseq(1);
      //end of Player1 attack

      if(Player1.hp!=0&&Player2.hp!=0) {// if survive
        reply = reply + battleseq(2);
        //end of Player2 attack
      }
    }

    else {// Player2 is faster
      reply = reply + battleseq(2);
      //end of Player2 attack

      if(Player1.hp!=0&&Player2.hp!=0) {// if survive
        reply = reply + battleseq(1);
        //end of Player1 attack
      }
    }

    Chal1.turn ++;
    if((Player1.hp<50 || Player2.hp<50) && (Player2.hp>0 && Player1.hp>0)) {
      var rand = Math.floor(Math.random()*5);
      var zawaexp;
      switch (rand) {// zawazawa expressions
        case 0:
          zawaexp = "관중석이 술렁인다!\n";
          break;
        case 1:
          zawaexp = "노름꾼들의 야유가 들린다!\n";
          break;
        case 2:
          zawaexp = "소환수의 몸에서 힘이 빠지고 있다!\n";
          break;
        case 3:
          zawaexp = "승리가 눈앞이다!\n";
          break;
        default:
          zawaexp = "관객들의 흥분이 고조된다!\n";
      }
      reply = reply + zawaexp;
    }
    reply = reply+"+=+=+=+=+=+=+=+=+=+=+";
    replier.reply(reply);// print battle log
    replier.reply(Player1.hpbar()+"\n"+Player2.hpbar());
    if(Player1.hp==0) {
      replier.reply("관중들이 환호하고 있군!");
      replier.reply(Chal1.name2+"의 승리일세! 축하하네!");
      addGame(Player1.ID, Player2.ID);
      addWin(Player2.ID);
      Chal1.step = 0;
    }
    else if(Player2.hp==0) {
      replier.reply("관중들이 환호하고 있군!");
      replier.reply(Chal1.name1+"의 승리일세! 축하하네!");
      addGame(Player1.ID, Player2.ID);
      addWin(Player1.ID);
      Chal1.step = 0;
    }
    else {
      replier.reply(Player1.name+"의 공격은?");
      Chal1.step=5;
    }
  }// turn ends
  // Battle ends

  // index of the subject will be the input
  function Hit(num) {// hit1 hits hit2
    if(num == 1) {
      hit1 = Player1;
      hit2 = Player2;
    }
    else {
      hit1 = Player2;
      hit2 = Player1;
    }
    var dam = cutter(hit1.rage*Chal1.atkfactor*(hit1.atk+hit1.skillatk)*0.5*(100-Chal1.deffactor*hit2.def*rank(hit2.defPlus)/rank(hit2.defMinus))/100);
    hit2.damage(dam);
    var print=hit2.name+"에게 "+dam+"의 피해!\n";
    return print;
  }
  function Critical(num) {//crit1 critical hits crit2
    if(num == 1) {
      crit1 = Player1;
      crit2 = Player2;
    }
    else {
      crit1 = Player2;
      crit2 = Player1;
    }
    var rand = Math.floor(Math.random()*6);
    var criexp;
    switch (rand) {// critical expressions
      case 0:
        criexp = "급소에 맞았다!\n";
        break;
      case 1:
        criexp = "치명적인 일격!\n";
        break;
      case 2:
        criexp = "회심의 일격!\n";
        break;
      case 3:
        criexp = "강력한 한 방!\n";
        break;
      case 4:
        criexp = "뼈에 맞았다!\n";
        break;
      default:
        criexp = "몬가.. 몬가 일어났다!\n";
    }
    var dam = cutter(crit1.rage*Chal1.atkfactor*(crit1.atk+crit1.skillatk)*0.5);
    crit2.damage(dam);
    print=criexp+crit2.name+"에게 "+dam+"의 피해!\n";
    return print;
  }
  function Counter(num) {//count1 counters count2
    if(num == 1) {
      count1 = Player1;
      count2 = Player2;
    }
    else {
      count1 = Player2;
      count2 = Player1;
    }

    var dam = cutter(0.3*Chal1.atkfactor*count2.rage*(count2.atk+count2.skillatk)*0.5*(100-Chal1.deffactor*count1.def*rank(count1.defPlus)/rank(count1.defMinus))/100);
    count2.damage(dam);
    var print=count1.name+", 공격을 피했다!\n"+count1.name+"의 반격!\n"+count2.name+"에게 "+dam+"의 피해!\n";
    return print;
  }
  function battlecry(num) {// crier cries
    if(num == 1) {
      crier = Player1;
    }
    else {
      crier = Player2;
    }
    var cry = Math.floor(Math.random()*4);
    var print = crier.name+"은 함성을 내질렀다! 신비한 기운이 "+crier.name+"의 몸을 감싼다! ";
    var factor = 2;
    switch (cry) {
      case 0:
        crier.defPlus ++;
        print = print+crier.name+"의 방어력이 강해졌다!\n";
        break;
      case 1:
        crier.accPlus ++;
        print = print+crier.name+"의 명중률이 올라갔다!\n";
        break;
      case 2:
        crier.lucPlus ++;
        print = print+crier.name+"의 운이 좋아졌다!\n";
        break;
      case 3:
        print = print+"...그러나 아무 일도 일어나지 않았다!\n";
        break;
      default:
        print = print+"몬가.. 몬가 일어나고 있다!\n";
    }
    return print;
  }
  function heckle(num) {// heck1 heckles heck2
    if(num == 1) {
      heck1 = Player1;
      heck2 = Player2;
    }
    else {
      heck1 = Player2;
      heck2 = Player1;
    }
    var heckle = Math.floor(Math.random()*4);
    var print = "\""+hecklebot()+"\"\n";
    switch (heckle) {
      case 0:
        heck2.defMinus --;
        print = print+"야유를 듣고 "+heck2.name+"의 방어력이 약해졌다!\n";
        break;
      case 1:
        heck2.accMinus --;
        print = print+"야유를 듣고 "+heck2.name+"의 명중률이 떨어졌다!\n";
        break;
      case 2:
        heck2.lucMinus --;
        print = print+"야유를 듣고 "+heck2.name+"의 운이 나빠졌다!\n";
        break;
      case 3:
        print = print+heck1.name+"의 야유는 "+heck2.name+"의 분노를 유발했다!\n"+heck2.name+"의 다음 턴 공격이 더 강해졌다!\n";
        heck2.rage = 1.5;
        break;
      default:
        print = print+"몬가.. 몬가 일어나고 있다!\n";
    }
    return print;
  }
  function battleseq(num) {// sequence for each attack
    var critrand = Math.random()*100;
    var countrand = Math.random()*100;
    var accrand = Math.random()*100;

    if(num==1) {
      seq1 = Player1;
      seq2 = Player2;
      var num2 = 2;
    }
    else if(num==2){
      seq1 = Player2;
      seq2 = Player1;
      var num2 = 1;
    }
    else {
      return "아아아악 다 망했어";
    }

    var print = seq1.name + "의 " + seq1.skill + "!\n";;

    if(seq1.skill=="야유") {
      print = print + heckle(num);
    }
    else if(seq1.skill=="함성") {
      print = print + battlecry(num);
    }
    else {
      if(accrand<(70+seq1.acc*0.3)) {// successful attack
        if(countrand>Chal1.lucfactor*seq2.luc*rank(seq2.lucPlus)/rank(seq2.lucMinus)) {// no counter
          if(critrand>Chal1.lucfactor*seq1.luc*rank(seq1.lucPlus)/rank(seq1.lucMinus)) {// no critical
            print = print + Hit(num);
          }
          else {// critical
            print = print + Critical(num);
          }
        }
        else {// counter
          print = print + Counter(num2);
        }
      }
      else {// miss
        print = print + "공격이 빗나갔다!\n";
      }
    }
    seq1.rage=1;
    seq2.rage=1;
    return print;
  }

  function Player(name) {// constructor
    this.md = MD5(name);
    var stat = this.md;
    this.name = name;
    this.atk = statconverter(stat,0,2);
    this.def = statconverter(stat,2,4);
    this.acc = statconverter(stat,4,6);
    this.luc = statconverter(stat,6,8);
    this.maxhp = cutter(140+0.6*statconverter(stat,8,10));
    this.hp = this.maxhp;
    this.dex = statconverter(stat,10,12);
    this.rage=1;
    this.lucPlus=1;
    this.lucMinus=1;
    this.defPlus=1;
    this.defMinus=1;
    this.accPlus=1;
    this.accMinus=1;
    this.skill;
    this.skillatk;
    this.ID;
    this.damage = function(dam) {
      this.hp = cutter(this.hp-dam);
      if(this.hp<=0) {
        this.hp=0;
      }
    };
    this.hpbar = function() {
      var ratio = Math.ceil(10*this.hp/this.maxhp);
      var print = this.name+"\n[";
      for(i = 0; i<ratio; i++) {
        print = print+"■";//█■▬
      }
      for(i = 0; i<10-ratio; i++) {
        print = print+"□";//▒□▭
      }
      print = print+"] "+this.hp+"/"+this.maxhp;
      return print;
    }
    this.printstat = function() {
      return this.name+"의 능력치\n체력: "+this.hp+"\n공격: "+this.atk+"\n"
      +"방어: "+this.def+"\n"+"명중: "+this.acc+"\n"+"운: "+this.luc+"\n"+"민첩: "
      +this.dex;
    }
  }
  function rank(num) {
    return 3-2/num;
  }
  function heckler() {
    var rand = Math.random();
    if(rand<0.5) {
      return "니 엄마는 멀록이야!";
    }
    else {
      return "오염된 노움만큼 냄새나는 녀석아!";
    }
  }
  function hecklebot() {
    var rand = Math.floor(Math.random()*10);
    var print;
    switch (rand) {
      case 0:
        print = "덤벼라, 이 풋풋한 풋내기야!";
        break;
      case 1:
        print = "덤벼라, 이 퇴색된 퇴물아!";
        break;
      case 2:
        print = "덤벼라, 이 악독한 악당아!";
        break;
      case 3:
        print = "덤벼라, 이 한심한 한량아!";
        break;
      case 4:
        print = "덤벼라, 이 떨떠름한 떨거지야!";
        break;
      case 5:
        print = "덤벼라, 이 굼뜬 굼벵아!";
        break;
      case 6:
        print = "덤벼라, 이 쓸모없는 쓰레기야!";
        break;
      case 7:
        print = "덤벼라, 이 심통난 심술쟁이야!";
        break;
      case 8:
        print = "덤벼라, 이 불성실한 불한당아!";
        break;
      case 9:
        print = "덤벼라, 이 얼타는 얼간아!";
        break;
      default:
        print = "오류! 오류!";
    }
    return print;
  }
  function cutter(num) {
    return Math.floor(num*10)/10;
  }
  function statconverter(stat,a,b) {// convert stat to 0~100 scale
    var sub = stat.substring(a,b);
    var dec = parseInt(sub, 16);
    return cutter(dec/2.55);
  }
  function skilltoatk(skill) {
    var stat = MD5(skill);
    return statconverter(stat,0,2);
  }
  function MD5(sMessage) {
   function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
   }
   function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if(lX4 & lY4)
     return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    if (lX4 | lY4) {
     if (lResult & 0x40000000)
      return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
     else
      return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
    }
    else
     return (lResult ^ lX8 ^ lY8);
    }

   function F(x,y,z) {
    return (x & y) | ((~x) & z);
   }
   function G(x,y,z) {
    return (x & z) | (y & (~z));
   }
   function H(x,y,z) {
    return (x ^ y ^ z);
   }
   function I(x,y,z) {
    return (y ^ (x | (~z)));
   }
   function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
   }
   function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
   }
   function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
   }
   function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
   }
   function ConvertToWordArray(sMessage) {
    var lWordCount;
    var lMessageLength = sMessage.length;
    var lNumberOfWords_temp1=lMessageLength + 8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    var lWordArray = Array(lNumberOfWords-1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
     lWordCount = (lByteCount-(lByteCount % 4))/4;
     lBytePosition = (lByteCount % 4)*8;
     lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount)<<lBytePosition));
     lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
   }
   function WordToHex(lValue) {
    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount=0; lCount<=3; lCount++) {
     lByte = (lValue>>>(lCount*8)) & 255;
     WordToHexValue_temp = "0" + lByte.toString(16);
     WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
   }
   var x = Array();
   var k,AA,BB,CC,DD,a,b,c,d;
   var S11=7, S12=12, S13=17, S14=22;
   var S21=5, S22=9 , S23=14, S24=20;
   var S31=4, S32=11, S33=16, S34=23;
   var S41=6, S42=10, S43=15, S44=21;
   // Steps 1 and 2.  Append padding bits and length and convert to words
   x = ConvertToWordArray(sMessage);
   // Step 3.  Initialise
   a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
   // Step 4.  Process the message in 16-word blocks
   for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a = FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d = FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c = FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b = FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a = FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d = FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c = FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b = FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a = FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d = FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c = FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b = FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a = FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d = FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c = FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b = FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a = GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d = GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c = GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b = GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a = GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d = GG(d,a,b,c,x[k+10],S22,0x2441453);
    c = GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b = GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a = GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d = GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c = GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b = GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a = GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d = GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c = GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b = GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a = HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d = HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c = HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b = HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a = HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d = HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c = HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b = HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a = HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d = HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c = HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b = HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a = HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d = HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c = HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b = HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a = II(a,b,c,d,x[k+0], S41,0xF4292244);
    d = II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c = II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b = II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a = II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d = II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c = II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b = II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a = II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d = II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c = II(c,d,a,b,x[k+6], S43,0xA3014314);
    b = II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a = II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d = II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c = II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b = II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a = AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
   }
   // Step 5.  Output the 128 bit digest
   var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
   return temp.toLowerCase();
  }

  function IDchecker(ID) {// true if there's an ID
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    if(jtot[ID]!=undefined) {
      return true
    }
    else {
      return false
    }
  }
  function ownername(ID) {// return owner's name of the ID
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    return jtot[ID].name
  }
  function newAccount(name,ID){
    var json = new Object();
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    if(jtot[ID]==undefined) {
      json[ID]= {
        "name": name,
        "games": 0,
        "wins": 0
      }
      jtot = Object.assign(json,jtot);
      var sjson = JSON.stringify(jtot);
      FileStream.write("/sdcard/katalkbot/Results.json",sjson);
      replier.reply("계정 등록이 완료되었네!");
      Chal1.signup=0;
    }
    else {
      replier.reply("이미 등록된 ID일세. 다른 이름을 입력해 주게나!");
    }
  }
  function addGame(ID1,ID2) {
    var json = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    json[ID1].games=json[ID1].games + 1;
    json[ID2].games=json[ID2].games + 1;
    var sjson = JSON.stringify(json);
    FileStream.write("/sdcard/katalkbot/Results.json",sjson);
}
  function addWin(ID) {
    var json = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    json[ID].wins=json[ID].wins + 1;
    var sjson = JSON.stringify(json);
    FileStream.write("/sdcard/katalkbot/Results.json",sjson);
  }
  function getRecords(ID) {
    var json = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    return json[ID].name+"의 전적일세!\n전체 대전 수: "+json[ID].games+"\n전체 승리 수: "+json[ID].wins+"\n승리율: "+cutter(100*json[ID].wins/json[ID].games)+"%"
  }

  function battle(pl1, pl2) {
    var left = new Player(pl1);
    var right = new Player(pl2);
    var rand = Math.floor(Math.random()*5);
    switch (rand) {
      case 0:
        replier.reply(pl1+" and "+pl2+" joins the battle!");
        break;
      case 1:
        replier.reply(pl1+" and "+pl2+" starts fighting!");
        break;
      case 2:
        replier.reply("Eyes of "+pl1+" and "+pl2+" meet!");
        break;
      case 3:
        replier.reply(pl1+" and "+pl2+" start the duel of honor, Mak'gora!");
        break;
      case 4:
        replier.reply("Fatal fight of "+pl1+" and "+pl2+" begins!");
        break;
      default:
        replier.reply(pl1+" and "+pl2+" do not want to fight!");
    }// battle start script

    replier.reply("Stats of "+pl1+"\n"+"HP: "+left.hp+"\n"+"ATK: "+left.atk+"\n"
    +"DEF: "+left.def+"\n"+"ACC: "+left.acc+"\n"+"LUC: "+left.luc+"\n"+"DEX: "
    +left.dex+"\n\n"+
    "Stats of "+pl2+"\n"+"HP: "+right.hp+"\n"+"ATK: "+right.atk+"\n"+"DEF: "
    +right.def+"\n"+"ACC: "+right.acc+"\n"+"LUC: "+right.luc+"\n"+"DEX: "+right.dex);// print stats

    var hpL = left.hp;
    var hpR = right.hp;
    var turn = 1;
    var reply = "Battle begins!\n";

    while(hpL>0 && hpR>0) {
      var critL = Math.random()*100;
      var counterL = Math.random()*100;
      var critR = Math.random()*100;
      var counterR = Math.random()*100;
      var accL = Math.random()*100;
      var accR = Math.random()*100;
      var print = new Array();
      if(turn>50) {
        replier.reply("Both of them exhausted! They stopped fighting.");
        break;
      }
      /*
      var randatk = Math.floor(Math.random()*5);
      var atkwhere;
      switch (randatk) {
        case 0:
          atkwhere = " attacks opponent's leg!\n";
          break;
        case 1:
          atkwhere = " attacks opponent's head!\n";
          break;
        case 2:
          atkwhere = " attacks opponent's knee!\n";
          break;
        case 3:
          atkwhere = " attacks opponent's body!\n";
          break;
        case 4:
          atkwhere = " attacks opponent's shoulder!\n";
        default:
          atkwhere = " attacks opponent's cheek!\n"

      }
      */ // atkwhere

      reply = reply+"+=+=+=+=+=+=+=+=+=+=+\nTurn "+turn+"\n";

      if(left.dex>right.dex) {// left is faster
        reply = reply+pl1+" attacks!\n";
        if(accL<(50+left.acc*0.5)) {// successful attack
          if(counterR>right.luc*Chal1.lucfactor) {// no counter
            if(critL>left.luc*Chal1.lucfactor) {// no critical
              print = hit(pl1,pl2,hpR);
              hpR = print[0];
              reply = reply+print[1]+"\n";
            }
            else {// critical
              print = crit(pl1,pl2,hpR);
              hpR = print[0];
              reply = reply+print[1]+"\n";
            }
          }
          else {// counter
            print = counter(pl2,pl1,hpL);
            hpL = print[0];
            reply = reply+print[1]+"\n";
          }
        }
        else {// miss
          reply = reply+"Missed!\n";
          //replier.reply("Missed!");
        }
        if(hpL==0||hpR==0) {
          break;
        }
        //end of left attack

        reply = reply+pl2+" attacks!\n";
        if(accR<(50+right.acc*0.5)) {// successful attack
          if(counterL>left.luc*Chal1.lucfactor) {// no counter
            if(critR>right.luc*Chal1.lucfactor) {// no critical
              print = hit(pl2,pl1,hpL);
              hpL = print[0];
              reply = reply+print[1]+"\n";
            }
            else {// critical
              print = crit(pl2,pl1,hpL);
              hpL = print[0];
              reply = reply+print[1]+"\n";
            }
          }
          else {// counter
            print = counter(pl1,pl2,hpR);
            hpR = print[0];
            reply = reply+print[1]+"\n";
          }
        }
        else {// miss
          reply = reply+"Missed!\n";
          //replier.reply("Missed!");
        }
        if(hpL==0||hpR==0) {
          break;
        }
        //end of right attack
      }
      else {// right is faster
        reply = reply+pl2+" attacks!\n";
        if(accR<(50+right.acc*0.5)) {// successful attack
          if(counterL>left.luc*Chal1.lucfactor) {// no counter
            if(critR>right.luc*Chal1.lucfactor) {// no critical
              print = hit(pl2,pl1,hpL);
              hpL = print[0];
              reply = reply+print[1]+"\n";
            }
            else {// critical
              print = crit(pl2,pl1,hpL);
              hpL = print[0];
              reply = reply+print[1]+"\n";
            }
          }
          else {// counter
            print = counter(pl1,pl2,hpR);
            hpR = print[0];
            reply = reply+print[1]+"\n";
          }
        }
        else {// miss
          reply = reply+"Missed!\n";
          //replier.reply("Missed!");
        }
        if(hpL==0||hpR==0) {
          break;
        }
        //end of right attack

        reply = reply+pl1+" attacks!\n";
        if(accL<(50+left.acc*0.5)) {// successful attack
          if(counterR>right.luc*Chal1.lucfactor) {// no counter
            if(critL>left.luc*Chal1.lucfactor) {// no critical
              print = hit(pl1,pl2,hpR);
              hpR = print[0];
              reply = reply+print[1]+"\n";
            }
            else {// critical
              print = crit(pl1,pl2,hpR);
              hpR = print[0];
              reply = reply+print[1]+"\n";
            }
          }
          else {// counter
            print = counter(pl2,pl1,hpL);
            hpL = print[0];
            reply = reply+print[1]+"\n";
          }
        }
        else {// miss
          reply = reply+"Missed!\n";
          //replier.reply("Missed!");
        }
        if(hpL==0||hpR==0) {
          break;
        }
        //end of left attack
      }// end of the turn
      turn ++;
    }// end of the battle
    replier.reply(reply);
    if(hpL>hpR) {// left wins
      replier.reply(pl1+" wins the battle! Congratulations!");
    }
    else {// right wins
      replier.reply(pl2+" wins the battle! Congratulations!");
    }
  }
  function hit(pl1,pl2,hp) {//pl1 hits pl2
    var print = new Array();
    var hitL = new Player(pl1);
    var hitR = new Player(pl2);
    var dam = cutter(0.5*hitL.atk*(100-0.5*hitR.def)/100);
    hp = cutter(hp - dam);
    if(hp<0) {hp=0;}
    print[0]=hp;
    print[1]=pl2+" takes "+dam+" damage! HP: "+hp;
    return print;
  }
  function crit(pl1,pl2,hp) {//pl1 critical hits pl2
    var rand = Math.floor(Math.random()*5);
    var skill;
    switch (rand) {
      case 0:
        skill = "[HECTOPASCAL KICK]!\n";
        break;
      case 1:
        skill = "[SORYUKEN]!\n";
        break;
      case 2:
        skill = "[SHINING WIZARD]!\n";
        break;
      default:
        skill = "[GENOCIDE CUTTER]!\n";
    }
    var print = new Array();
    var critL = new Player(pl1);
    var critR = new Player(pl2);
    var dam = cutter(0.5*critL.atk);// *1.3*(100-0.5*right.def)/100
    hp = cutter(hp - dam);
    if(hp<0) {hp=0;}
    print[0]=hp;
    print[1]=pl1+" uses "+skill+"Critical hit!\n"+pl2+" takes "+dam+" damage! HP: "+hp;
    return print;
  }
  function counter(pl1,pl2,hp) {//pl1 counters pl2
    var print = new Array();
    var counterL = new Player(pl1);
    var counterR = new Player(pl2);
    var dam = cutter(0.3*0.5*counterR.atk*(100-0.5*counterL.def)/100);
    if(hp<0) {hp=0;}
    print[0]=hp;
    print[1]=pl1+" avoided the attack!\n"+pl1+"'s counter attack!\n"+pl2+" takes "+dam+" damage! HP: "+hp;
    return print;
  }
}

/*
function onStartCompile() {
    //컴파일 또는 Api.reload호출시, 컴파일 되기 이전에 호출되는 함수입니다.
     /제안하는 용도: 리로드시 자동 백업
}

//아래 4개의 메소드는 액티비티 화면을 수정할때 사용됩니다.

function onCreate(savedInstanceState,activity) {
    var layout=new android.widget.LinearLayout(activity);
    layout.setOrientation(android.widget.LinearLayout.HORIZONTAL);
    var txt=new android.widget.TextView(activity);
    txt.setText("액티비티 사용 예시입니다.");
    layout.addView(txt);
    activity.setContentView(layout);
}

function onResume(activity) {}
function onPause(activity) {}
function onStop(activity) {}
*/
