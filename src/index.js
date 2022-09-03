import "./css/public.css";
import "./css/index.css";

import "jquery";
import "./js/public.js";
import "./js/nav.js";

// treeshakiung：
// 1. 通过解构方式获取方法，可以触发treeshaking
// 2. 调用的npm包必须使用ESM
// 3. 同一文件下的treeshaking有触发条件， mode需要production
// 4. 一定要使用解构来加载模块
