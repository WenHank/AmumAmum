"use strict";function _typeof3(obj){if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof3=function _typeof3(obj){return typeof obj;};}else{_typeof3=function _typeof3(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj;};}return _typeof3(obj);}/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2018 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */(function webpackUniversalModuleDefinition(root,factory){if((typeof exports==="undefined"?"undefined":_typeof3(exports))==='object'&&(typeof module==="undefined"?"undefined":_typeof3(module))==='object')module.exports=factory();else if(typeof define==='function'&&define.amd)define("pdfjs-dist/build/pdf.worker",[],factory);else if((typeof exports==="undefined"?"undefined":_typeof3(exports))==='object')exports["pdfjs-dist/build/pdf.worker"]=factory();else root["pdfjs-dist/build/pdf.worker"]=root.pdfjsWorker=factory();})(void 0,function(){return(/******/function(modules){// webpackBootstrap
/******/ // The module cache
/******/var installedModules={};/******/ /******/ // The require function
/******/function __w_pdfjs_require__(moduleId){/******/ /******/ // Check if module is in cache
/******/if(installedModules[moduleId]){/******/return installedModules[moduleId].exports;/******/}/******/ // Create a new module (and put it into the cache)
/******/var module=installedModules[moduleId]={/******/i:moduleId,/******/l:false,/******/exports:{}/******/};/******/ /******/ // Execute the module function
/******/modules[moduleId].call(module.exports,module,module.exports,__w_pdfjs_require__);/******/ /******/ // Flag the module as loaded
/******/module.l=true;/******/ /******/ // Return the exports of the module
/******/return module.exports;/******/}/******/ /******/ /******/ // expose the modules object (__webpack_modules__)
/******/__w_pdfjs_require__.m=modules;/******/ /******/ // expose the module cache
/******/__w_pdfjs_require__.c=installedModules;/******/ /******/ // define getter function for harmony exports
/******/__w_pdfjs_require__.d=function(exports,name,getter){/******/if(!__w_pdfjs_require__.o(exports,name)){/******/Object.defineProperty(exports,name,{enumerable:true,get:getter});/******/}/******/};/******/ /******/ // define __esModule on exports
/******/__w_pdfjs_require__.r=function(exports){/******/if(typeof Symbol!=='undefined'&&Symbol.toStringTag){/******/Object.defineProperty(exports,Symbol.toStringTag,{value:'Module'});/******/}/******/Object.defineProperty(exports,'__esModule',{value:true});/******/};/******/ /******/ // create a fake namespace object
/******/ // mode & 1: value is a module id, require it
/******/ // mode & 2: merge all properties of value into the ns
/******/ // mode & 4: return value when already ns object
/******/ // mode & 8|1: behave like require
/******/__w_pdfjs_require__.t=function(value,mode){/******/if(mode&1)value=__w_pdfjs_require__(value);/******/if(mode&8)return value;/******/if(mode&4&&_typeof3(value)==='object'&&value&&value.__esModule)return value;/******/var ns=Object.create(null);/******/__w_pdfjs_require__.r(ns);/******/Object.defineProperty(ns,'default',{enumerable:true,value:value});/******/if(mode&2&&typeof value!='string')for(var key in value){__w_pdfjs_require__.d(ns,key,function(key){return value[key];}.bind(null,key));}/******/return ns;/******/};/******/ /******/ // getDefaultExport function for compatibility with non-harmony modules
/******/__w_pdfjs_require__.n=function(module){/******/var getter=module&&module.__esModule?/******/function getDefault(){return module['default'];}:/******/function getModuleExports(){return module;};/******/__w_pdfjs_require__.d(getter,'a',getter);/******/return getter;/******/};/******/ /******/ // Object.prototype.hasOwnProperty.call
/******/__w_pdfjs_require__.o=function(object,property){return Object.prototype.hasOwnProperty.call(object,property);};/******/ /******/ // __webpack_public_path__
/******/__w_pdfjs_require__.p="";/******/ /******/ /******/ // Load entry module and return exports