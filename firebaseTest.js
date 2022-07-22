const firebase = require("./firebase");

(async () => {
  const lmao = await firebase.getData("lmao", "lmao");
  console.log(lmao);
  firebase.addData("lmao", "lmao2", { lmao: lmao.lmao + 1 });
})();
