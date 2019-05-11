const scriptName="Batlle.js";
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
}
Chal1 = new Challanger();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId) {
  function newResults(name,ID){
    var json = new Object();
    var jtot = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    json.name = name;
    jtot.ID = json;
    var sjson = JSON.stringify(jtot);
    FileStream.write("/sdcard/katalkbot/Results.json",sjson);
  }
  if(msg=="test") {
    var json1 = new Object();
    var json2 = new Object();
    var jtot = new Object();
    json1.name = "머저리";
    json1.winrate = "30%";
    jtot.pl1 = json1;
    json2.name = "멍청이";
    json2.winrate = "20%";
    jtot.pl2 = json2;
    var sjson = JSON.stringify(jtot);
    FileStream.write("/sdcard/katalkbot/Results.json",sjson);
    replier.reply("됐냐??");
  }
  if(msg=="test2") {
    var json = JSON.parse(FileStream.read("/sdcard/katalkbot/Results.json"));
    var pl1 = json.pl1.name;
    var pl2 = json.pl2.name;
    replier.reply(pl1 +" "+pl2);
  }
}
