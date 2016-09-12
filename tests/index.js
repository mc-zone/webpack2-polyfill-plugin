import { foo } from "./lib.js";

alert(foo);

require.ensure([],function(require){
  const asyncLib = require("./asyncLib.js");
  alert(asyncLib.bar);
})
