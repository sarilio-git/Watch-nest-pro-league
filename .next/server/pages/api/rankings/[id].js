"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/rankings/[id]";
exports.ids = ["pages/api/rankings/[id]"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/rankings/[id].js":
/*!************************************!*\
  !*** ./pages/api/rankings/[id].js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// Next.js API route support: https://nextjs.org/docs/api-routes/introduction\n\nasync function handler(req, res) {\n    const { id , leaderboard_id  } = req.query;\n    try {\n        const response = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(`https://api.faceit.com/leaderboard/v1/ranking/hub/${id}?leaderboardType=event&leaderboardId=${leaderboard_id}`);\n        res.status(200).json(response.data);\n    } catch (error) {\n        res.status(400).json({\n            error: error.message\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcmFua2luZ3MvW2lkXS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLDZFQUE2RTtBQUNuRDtBQUNYLGVBQWVDLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzlDLE1BQU0sRUFBRUMsR0FBRSxFQUFFQyxlQUFjLEVBQUUsR0FBR0gsSUFBSUksS0FBSztJQUN4QyxJQUFJO1FBQ0YsTUFBTUMsV0FBVyxNQUFNUCxpREFBUyxDQUM5QixDQUFDLGtEQUFrRCxFQUFFSSxHQUFHLHFDQUFxQyxFQUFFQyxlQUFlLENBQUM7UUFFakhGLElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNILFNBQVNJLElBQUk7SUFDcEMsRUFBRSxPQUFPQyxPQUFPO1FBQ2RULElBQUlNLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUUsT0FBT0EsTUFBTUMsT0FBTztRQUFDO0lBQzlDO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dhdGNoLWZwbC8uL3BhZ2VzL2FwaS9yYW5raW5ncy9baWRdLmpzPzk2MjQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gTmV4dC5qcyBBUEkgcm91dGUgc3VwcG9ydDogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvYXBpLXJvdXRlcy9pbnRyb2R1Y3Rpb25cbmltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgY29uc3QgeyBpZCwgbGVhZGVyYm9hcmRfaWQgfSA9IHJlcS5xdWVyeTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcbiAgICAgIGBodHRwczovL2FwaS5mYWNlaXQuY29tL2xlYWRlcmJvYXJkL3YxL3JhbmtpbmcvaHViLyR7aWR9P2xlYWRlcmJvYXJkVHlwZT1ldmVudCZsZWFkZXJib2FyZElkPSR7bGVhZGVyYm9hcmRfaWR9YFxuICAgICk7XG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcG9uc2UuZGF0YSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbImF4aW9zIiwiaGFuZGxlciIsInJlcSIsInJlcyIsImlkIiwibGVhZGVyYm9hcmRfaWQiLCJxdWVyeSIsInJlc3BvbnNlIiwiZ2V0Iiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJlcnJvciIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/rankings/[id].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/rankings/[id].js"));
module.exports = __webpack_exports__;

})();