"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/rooms/[token]",{

/***/ "./src/components/messageBox.tsx":
/*!***************************************!*\
  !*** ./src/components/messageBox.tsx ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MessageBox\": function() { return /* binding */ MessageBox; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @chakra-ui/react */ \"./node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\nvar _this = undefined;\nvar MessageBox = function(param) {\n    var author = param.author, children = param.children, _variant = param.variant, variant = _variant === void 0 ? \"they\" : _variant;\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Flex, {\n        flexDir: 'column',\n        minWidth: '10%',\n        width: \"max-content\",\n        maxWidth: \"50%\",\n        padding: 2,\n        m: 4,\n        ml: variant === \"me\" ? \"auto\" : \"4\",\n        border: \"2px solid transparent\",\n        borderRadius: 10,\n        backgroundColor: variant === \"me\" ? \"orange.400\" : \"blue.900\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                ml: 'auto',\n                fontSize: 12,\n                children: [\n                    \"~\",\n                    author\n                ]\n            }, void 0, true, {\n                fileName: \"D:\\\\Programming\\\\Programming\\\\github QRoom\\\\qRoom\\\\web\\\\src\\\\components\\\\messageBox.tsx\",\n                lineNumber: 27,\n                columnNumber: 9\n            }, _this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_2__.Box, {\n                children: children\n            }, void 0, false, {\n                fileName: \"D:\\\\Programming\\\\Programming\\\\github QRoom\\\\qRoom\\\\web\\\\src\\\\components\\\\messageBox.tsx\",\n                lineNumber: 28,\n                columnNumber: 7\n            }, _this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\Programming\\\\Programming\\\\github QRoom\\\\qRoom\\\\web\\\\src\\\\components\\\\messageBox.tsx\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, _this));\n};\n_c = MessageBox;\nvar _c;\n$RefreshReg$(_c, \"MessageBox\");\n\n\n;\r\n    var _a, _b;\r\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\r\n    // to extract CSS. For backwards compatibility, we need to check we're in a\r\n    // browser context before continuing.\r\n    if (typeof self !== 'undefined' &&\r\n        // AMP / No-JS mode does not inject these helpers:\r\n        '$RefreshHelpers$' in self) {\r\n        var currentExports = module.__proto__.exports;\r\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\r\n        // This cannot happen in MainTemplate because the exports mismatch between\r\n        // templating and execution.\r\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\r\n        // A module can be accepted automatically based on its exports, e.g. when\r\n        // it is a Refresh Boundary.\r\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\r\n            // Save the previous exports on update so we can compare the boundary\r\n            // signatures.\r\n            module.hot.dispose(function (data) {\r\n                data.prevExports = currentExports;\r\n            });\r\n            // Unconditionally accept an update to this module, we'll check if it's\r\n            // still a Refresh Boundary later.\r\n            module.hot.accept();\r\n            // This field is set when the previous version of this module was a\r\n            // Refresh Boundary, letting us know we need to check for invalidation or\r\n            // enqueue an update.\r\n            if (prevExports !== null) {\r\n                // A boundary can become ineligible if its exports are incompatible\r\n                // with the previous exports.\r\n                //\r\n                // For example, if you add/remove/change exports, we'll want to\r\n                // re-execute the importing modules, and force those components to\r\n                // re-render. Similarly, if you convert a class component to a\r\n                // function, we want to invalidate the boundary.\r\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\r\n                    module.hot.invalidate();\r\n                }\r\n                else {\r\n                    self.$RefreshHelpers$.scheduleUpdate();\r\n                }\r\n            }\r\n        }\r\n        else {\r\n            // Since we just executed the code for the module, it's possible that the\r\n            // new exports made it ineligible for being a boundary.\r\n            // We only care about the case when we were _previously_ a boundary,\r\n            // because we already accepted this update (accidental side effect).\r\n            var isNoLongerABoundary = prevExports !== null;\r\n            if (isNoLongerABoundary) {\r\n                module.hot.invalidate();\r\n            }\r\n        }\r\n    }\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9tZXNzYWdlQm94LnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUE0QztBQUNuQjs7QUFPbEIsR0FBSyxDQUFDRyxVQUFVLEdBQThCLFFBQ2pELFFBR0UsQ0FBQztRQUhMQyxNQUFNLFNBQU5BLE1BQU0sRUFDTkMsUUFBUSxTQUFSQSxRQUFRLG1CQUNSQyxPQUFPLEVBQVBBLE9BQU8seUJBQUcsQ0FBTTtJQUVoQixNQUFNLDZFQUNITCxrREFBSTtRQUNMTSxPQUFPLEVBQUUsQ0FBUTtRQUNqQkMsUUFBUSxFQUFFLENBQUs7UUFDYkMsS0FBSyxFQUFFLENBQWE7UUFDcEJDLFFBQVEsRUFBRSxDQUFLO1FBQ2ZDLE9BQU8sRUFBRSxDQUFDO1FBQ1ZDLENBQUMsRUFBRSxDQUFDO1FBQ0pDLEVBQUUsRUFBRVAsT0FBTyxLQUFLLENBQUksTUFBRyxDQUFNLFFBQUcsQ0FBRztRQUNuQ1EsTUFBTSxFQUFFLENBQXVCO1FBQy9CQyxZQUFZLEVBQUUsRUFBRTtRQUNoQkMsZUFBZSxFQUFFVixPQUFPLEtBQUssQ0FBSSxNQUFHLENBQVksY0FBRyxDQUFVOzt3RkFFMUROLGlEQUFHO2dCQUFDYSxFQUFFLEVBQUUsQ0FBTTtnQkFBRUksUUFBUSxFQUFFLEVBQUU7O29CQUFFLENBQUM7b0JBQUNiLE1BQU07Ozs7Ozs7d0ZBQ3hDSixpREFBRzswQkFBRUssUUFBUTs7Ozs7Ozs7Ozs7O0FBR3BCLENBQUM7S0F0QllGLFVBQVUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2NvbXBvbmVudHMvbWVzc2FnZUJveC50c3g/NDQzNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCb3gsIEZsZXggfSBmcm9tIFwiQGNoYWtyYS11aS9yZWFjdFwiO1xyXG5pbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcblxyXG5pbnRlcmZhY2UgbWVzc2FnZUJveFByb3BzIHtcclxuICB2YXJpYW50PzogXCJtZVwiIHwgXCJ0aGV5XCI7XHJcbiAgYXV0aG9yPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTWVzc2FnZUJveDogUmVhY3QuRkM8bWVzc2FnZUJveFByb3BzPiA9ICh7XHJcbiAgYXV0aG9yLFxyXG4gIGNoaWxkcmVuLFxyXG4gIHZhcmlhbnQgPSBcInRoZXlcIixcclxufSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RmxleFxyXG4gICAgZmxleERpcj17J2NvbHVtbid9XHJcbiAgICBtaW5XaWR0aD17JzEwJSd9XHJcbiAgICAgIHdpZHRoPXtcIm1heC1jb250ZW50XCJ9XHJcbiAgICAgIG1heFdpZHRoPXtcIjUwJVwifVxyXG4gICAgICBwYWRkaW5nPXsyfVxyXG4gICAgICBtPXs0fVxyXG4gICAgICBtbD17dmFyaWFudCA9PT0gXCJtZVwiID8gXCJhdXRvXCIgOiBcIjRcIn1cclxuICAgICAgYm9yZGVyPXtcIjJweCBzb2xpZCB0cmFuc3BhcmVudFwifVxyXG4gICAgICBib3JkZXJSYWRpdXM9ezEwfVxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I9e3ZhcmlhbnQgPT09IFwibWVcIiA/IFwib3JhbmdlLjQwMFwiIDogXCJibHVlLjkwMFwifVxyXG4gICAgPlxyXG4gICAgICAgIDxCb3ggbWw9eydhdXRvJ30gZm9udFNpemU9ezEyfT5+e2F1dGhvcn08L0JveD5cclxuICAgICAgPEJveD57Y2hpbGRyZW59PC9Cb3g+XHJcbiAgICA8L0ZsZXg+XHJcbiAgKTtcclxufTtcclxuIl0sIm5hbWVzIjpbIkJveCIsIkZsZXgiLCJSZWFjdCIsIk1lc3NhZ2VCb3giLCJhdXRob3IiLCJjaGlsZHJlbiIsInZhcmlhbnQiLCJmbGV4RGlyIiwibWluV2lkdGgiLCJ3aWR0aCIsIm1heFdpZHRoIiwicGFkZGluZyIsIm0iLCJtbCIsImJvcmRlciIsImJvcmRlclJhZGl1cyIsImJhY2tncm91bmRDb2xvciIsImZvbnRTaXplIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/messageBox.tsx\n");

/***/ })

});