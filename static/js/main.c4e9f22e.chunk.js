(this["webpackJsonpreact-3d"]=this["webpackJsonpreact-3d"]||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(23),c=n.n(r),o=n(19),s=n(16),l=n(42),d=n(2),u={editorType:"TRIDIMENSIONAL_EDITOR",editorWidth:0,editorHeight:0},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_EDITOR_TYPE":return Object(d.a)(Object(d.a)({},e),{},{editorType:a});case"SET_EDITOR_WIDTH":return Object(d.a)(Object(d.a)({},e),{},{editorWidth:a});case"SET_EDITOR_HEIGHT":return Object(d.a)(Object(d.a)({},e),{},{editorHeight:a});default:return e}},h=function(e){return function(t,n){t({type:"SET_EDITOR_TYPE",payload:e})}},E=function(e){return function(t,n){t({type:"SET_EDITOR_WIDTH",payload:e})}},b=function(e){return function(t,n){t({type:"SET_EDITOR_HEIGHT",payload:e})}},O=n(13),f=n(14),g=function e(){Object(f.a)(this,e)};g.makeRequest=function(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,i=arguments.length,r=new Array(i>4?i-4:0),c=4;c<i;c++)r[c-4]=arguments[c];fetch(e,t).then((function(e){throw 200===e.status&&e.json().then((function(e){n&&"function"===typeof n&&n.apply(void 0,[e].concat(r))})),new Error("".concat(e.status,"|").concat(e.statusText))})).catch((function(e){var t=e.message.split("|"),n=Object(O.a)(t,2),i=n[0],c=n[1];a&&"function"===typeof a&&a.apply(void 0,[i,c].concat(r))}))};var p,j,T={name:"",scene:{},version:"",objects:[],description:""},v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"SET_PROJECT_NAME":return Object(d.a)(Object(d.a)({},e),{},{name:a});case"SET_PROJECT_SCENE":return Object(d.a)(Object(d.a)({},e),{},{scene:a});case"SET_PROJECT_VERSION":return Object(d.a)(Object(d.a)({},e),{},{version:a});case"SET_PROJECT_OBJECTS":return Object(d.a)(Object(d.a)({},e),{},{objects:a});case"SET_PROJECT_DESCRIPTION":return Object(d.a)(Object(d.a)({},e),{},{description:a});default:return e}},y=function(e){console.log(e)},N=function(e,t){console.log("[".concat(e,"]: ").concat(t))},C=function(e){return function(t,n){t({type:"SET_PROJECT_NAME",payload:e})}},_=function(e,t){return function(n,a){var i=Object(d.a)({},a().project).scene,r=i["3d"],c=Object(d.a)(Object(d.a)({},r),{},{sceneWidth:e,sceneHeight:t});n({type:"SET_PROJECT_SCENE",payload:Object(d.a)(Object(d.a)({},i),{},{"3d":c})})}},D=function(e,t){return function(n,a){var i=Object(d.a)({},a().project).scene,r=i["2d"],c=Object(d.a)(Object(d.a)({},r),{},{sceneWidth:e,sceneHeight:t});n({type:"SET_PROJECT_SCENE",payload:Object(d.a)(Object(d.a)({},i),{},{"2d":c})})}},R=function(e){return function(t,n){t({type:"SET_PROJECT_VERSION",payload:e})}},I=function(e){return function(t,n){t({type:"SET_PROJECT_OBJECTS",payload:e})}},A=function(e){return function(t,n){t({type:"SET_PROJECT_DESCRIPTION",payload:e})}},S=function(e){return function(t,n){var a=Object(d.a)({},n().project).objects.concat(e);I(a)(t,n)}},x=function(e){return function(t,n){var a=Object(d.a)({},n().project).objects.map((function(t){return t.id===e.id?e:t}));I(a)(t,n)}},k=function(e){return function(t,n){var a=Object(d.a)({},n().project).objects.filter((function(t){return t.id!=e.id}));I(a)(t,n)}},w=function(){return function(e,t){var n=Object(d.a)({},t()).project;g.makeRequest("/save_project_progress",{method:"POST",body:n},y,N)}},P={objects:[],fetching:!1},W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:P,t=arguments.length>1?arguments[1]:void 0,n=t.type,a=t.payload;switch(n){case"GET_OBJECTS":return Object(d.a)(Object(d.a)({},e),{},{fetching:!0});case"GET_OBJECTS_ERROR":return Object(d.a)(Object(d.a)({},e),{},{error:a,fetching:!1});case"GET_OBJECTS_SUCCESS":return Object(d.a)(Object(d.a)({},e),{},{objects:a,fetching:!1});default:return e}},U=Object(s.c)({editor:m,project:v,objects:W}),L=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||s.d,F=function(){return Object(s.e)(U,L(Object(s.a)(l.a)))},H=n(24),M=n.n(H),G=n(11),V=(n(54),function(e){var t=e.height,n=e.children,a=e.className,r=Object(G.a)(e,["height","children","className"]);return i.a.createElement("div",Object.assign({className:"h-".concat(t," ").concat(a||"")},r),n)}),B=n(18),q=n(20),X=n.n(q),J=n(3),z="TABLE",K=(p={},Object(J.a)(p,"KIOSK",{uri:"assets/models/3D/kiosk/kiosk.glb",thumbnail:"assets/models/3D/kiosk/thumbnail.png"}),Object(J.a)(p,z,{uri:"assets/models/3D/table/table.glb",thumbnail:"assets/models/3D/table/thumbnail.png"}),Object(J.a)(p,"BOARD",{uri:"assets/models/3D/board/board.glb",thumbnail:"assets/models/3D/board/thumbnail.png"}),Object(J.a)(p,"FURNITURE",{uri:"assets/models/3D/furniture/furniture.glb",thumbnail:"assets/models/3D/furniture/thumbnail.png"}),p),Y=Object(J.a)({},"FURNITURE",(j={},Object(J.a)(j,"TOP",{uri:"assets/models/2D/furniture/furniture_top.svg",thumbnail:"assets/models/3D/furniture/thumbnail.png"}),Object(J.a)(j,"FRONT",{uri:"assets/models/2D/furniture/furniture_front.svg",thumbnail:"assets/models/3D/furniture/thumbnail.png"}),Object(J.a)(j,"FRONT_LEFT",{uri:"assets/models/2D/furniture/furniture_front.svg",thumbnail:"assets/models/3D/furniture/thumbnail.png"}),Object(J.a)(j,"FRONT_RIGHT",{uri:"assets/models/2D/furniture/furniture_front.svg",thumbnail:"assets/models/3D/furniture/thumbnail.png"}),j)),Z=function(e){switch(e){case"KIOSK":return K.KIOSK.thumbnail;case z:return K[z].thumbnail;case"BOARD":return K.BOARD.thumbnail;case"FURNITURE":return K.FURNITURE.thumbnail;default:return K[z].thumbnail}},Q=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:100,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,a=arguments.length>2&&void 0!==arguments[2]&&arguments[2];Object(f.a)(this,e),this.objects=[],this.sceneWidth=t,this.sceneHeight=n,this.enablePlaneControls=a,this.domContainer=document.getElementById(e.DOM_CONTAINER_ID),this.containerWidth=this.domContainer.clientWidth,this.containerHeight=this.domContainer.clientHeight,this.containerAspectRatio=this.containerWidth/this.containerHeight,this.render=this.render.bind(this)}return Object(B.a)(e,[{key:"init",value:function(){this.setInitialStage(),this.setInitialLayer(),this.setPlane(),this.addZoomEventToStage(),this.render()}},{key:"setInitialStage",value:function(){this.stage=new X.a.Stage({container:e.DOM_CONTAINER_ID,width:this.containerWidth,height:this.containerHeight,draggable:this.enablePlaneControls?"true":null})}},{key:"setInitialLayer",value:function(){this.layer=new X.a.Layer,this.addLayerToStage(this.layer),this.layer.draw()}},{key:"addLayerToStage",value:function(e){this.stage.add(e)}},{key:"addZoomEventToStage",value:function(){var e=this;this.enablePlaneControls&&this.stage.on("wheel",(function(t){t.evt.preventDefault();var n=e.stage.scaleX(),a=e.stage.getPointerPosition(),i=(a.x-e.stage.x())/n,r=(a.y-e.stage.y())/n,c=t.evt.deltaY>0?1.1*n:n/1.1;e.stage.scale({x:c,y:c});var o={x:a.x-i*c,y:a.y-r*c};e.stage.position(o),e.stage.batchDraw()}))}},{key:"setPlaneCenter",value:function(){this.planeCenterCoordinates={x:this.containerWidth/2,y:this.containerHeight/2}}},{key:"setPlane",value:function(){this.plane=new X.a.Rect({x:0,y:0,width:this.containerWidth,height:this.containerHeight,fill:"lightgray",stroke:"black",opacity:.25,strokeWidth:1}),this.setPlaneCenter(),this.layer.add(this.plane),this.drawGrid()}},{key:"drawGrid",value:function(){var e=this,t=this.containerHeight/50,n=this.containerWidth/50,a=function(t,n,a,i){Array.from(new Array(Math.round(t))).forEach((function(t,r){e.layer.add(new X.a.Rect({x:"ROW"===n?0:r*i,y:"ROW"===n?r*i:0,width:"ROW"===n?a:0,height:"ROW"===n?0:a,stroke:"black",opacity:.25,strokeWidth:1}))}))};a(t,"ROW",this.containerWidth,50),a(n,"COLUMN",this.containerHeight,50)}},{key:"render",value:function(){requestAnimationFrame(this.render),this.stage.batchDraw()}},{key:"loadSVGModel",value:function(e,t,n,a){var i=this,r=t.x,c=t.y,o=function(e,t){switch(e){case"FURNITURE":default:return Y.FURNITURE[t].uri}}(e,"TOP"),s=function(e){switch(e){case z:return{width:50,depth:50,height:75};case"FURNITURE":return{width:100,depth:50,height:200};default:return{width:100,depth:100,height:100}}}(e),l=s.width,d=s.depth,u=this;X.a.Image.fromURL(o,(function(t){t.setAttrs({x:r||u.containerWidth/2,y:c||u.containerHeight/2,type:e,width:l,height:d,offsetX:l/2,offsetY:d/2,draggable:"true",dragBoundFunc:function(e){return m(u,{width:l,height:d},e)}}),t.on("dragend",a),i.layer.add(t),n&&"function"===typeof n&&n(t),i.layer.batchDraw()}));var m=function(e,t,n){var a=t.width/2,i=t.height/2;return{x:n.x-a<=0?0+a:n.x+a>=e.containerWidth?e.containerWidth-a:n.x,y:n.y-i<=0?0+i:n.y+i>=e.containerHeight?e.containerHeight-i:n.y}}}}]),e}();Q.DOM_CONTAINER_ID="bidimensional_renderer";var $=function(){return i.a.createElement(V,{id:Q.DOM_CONTAINER_ID,height:100})},ee=function(e){return Object(o.b)((function(e,t){return Object(d.a)({project:e.project},t)}),{saveProjectAction:w,setProjectNameAction:C,setProjectObjectsAction:I,setProjectVersionAction:R,addObjectToProjectAction:S,updateProjectObjectAction:x,set3DSceneDimensionsAction:_,set2DSceneDimensionsAction:D,setProjectDescriptionAction:A,removeObjectFromProjectAction:k})((function(t){var n=t.project,a=(t.saveProjectAction,t.setProjectNameAction),r=(t.setProjectObjectsAction,t.setProjectVersionAction),c=t.addObjectToProjectAction,o=t.updateProjectObjectAction,s=t.set3DSceneDimensionsAction,l=t.set2DSceneDimensionsAction,d=t.setProjectDescriptionAction,u=t.removeObjectFromProjectAction,m=Object(G.a)(t,["project","saveProjectAction","setProjectNameAction","setProjectObjectsAction","setProjectVersionAction","addObjectToProjectAction","updateProjectObjectAction","set3DSceneDimensionsAction","set2DSceneDimensionsAction","setProjectDescriptionAction","removeObjectFromProjectAction"]);return i.a.createElement(e,Object.assign({project:n,addObject:c,updateObject:o,removeObject:u,setProjectName:a,setProjectObjects:a,setProjectVersion:r,set2DSceneDimensions:l,set3DSceneDimensions:s,setProjectDescription:d},m))}))},te=function(e){return ee((function(t){var n=t.project,r=t.addObject,c=t.updateObject,o=(t.removeObject,t.set2DSceneDimensions),s=Object(G.a)(t,["project","addObject","updateObject","removeObject","set2DSceneDimensions"]),l=n.objects,u=Object(a.useState)({}),m=Object(O.a)(u,2),h=m[0],E=m[1],b=Object(a.useState)(),f=Object(O.a)(b,2),g=f[0],p=f[1],j=Object(a.useState)(),T=Object(O.a)(j,2),v=T[0],y=T[1];Object(a.useEffect)((function(){var e=new Q;e.init(),p(e);var t=e.containerWidth,n=e.containerHeight;o(t,n);!function(){var t=Object(d.a)({},h);l.forEach((function(n){var a=n.type,i=n["2d"].coordinates;t[a]?t[a].quantity++:t[a]={quantity:1},e.loadSVGModel(a,i,(function(e){var t=e._id,a=e.attrs,i=a.x,r=a.y,o=Object(d.a)(Object(d.a)({},n),{},{"2d":{uuid:t,coordinates:{x:i,y:r}}});c(o)}),_)})),E(t)}()}),[]),Object(a.useEffect)((function(){if(v){var e=v._id,t=v.x,n=v.y,a=C(e);if(a){var i=Object(d.a)({},a["3d"]),r=Object(d.a)(Object(d.a)({},a),{},{"2d":{uuid:e,coordinates:{x:t,y:n}},"3d":Object(d.a)(Object(d.a)({},i),{},{coordinates:R(t,n)})});c(r)}}}),[v]);var N=function(e){var t=e._id,n=e.attrs,a=n.x,i=n.y,c=n.type,o={id:l.length,type:c,"2d":{uuid:t,coordinates:{x:a,y:i}},"3d":{uuid:"",coordinates:{x:0,y:0,z:0}}};r(o)},C=function(e){return l.find((function(t){return t["2d"].uuid===e}))},_=function(e){if(e.target){var t=e.target,n=t._id,a=t.attrs,i=a.x,r=a.y;y({x:i,y:r,_id:n})}},D=function(e){var t=Object(d.a)({},h);t[e]?t[e].quantity++:t[e]={quantity:1},E(t)},R=function(e,t){var n=function(e,t){var n=g.planeCenterCoordinates;return{x:n.x-e,y:n.y-t}}(e,t),a=n.x,i=n.y;return{x:-1*a*(5/g.containerWidth),y:0,z:-1*i*(5/g.containerHeight)}};return i.a.createElement(e,Object.assign({models:h,addModel:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};D(e),g.loadSVGModel(e,t,N,_)}},s))}))},ne=function(e){var t=e.children,n=e.className,a=Object(G.a)(e,["children","className"]);return i.a.createElement("div",Object.assign({className:"d-flex ".concat(n||"")},a),t)},ae=function(e){var t=e.children,n=e.className;return i.a.createElement(ne,{className:"flex-row ".concat(n||"")},t)},ie=(n(92),function(e){var t=e.width,n=e.children,a=e.className,r=Object(G.a)(e,["width","children","className"]);return i.a.createElement("div",Object.assign({className:"w-".concat(t," ").concat(a||"")},r),n)}),re=(n(93),function(e){var t=e.title,n=e.model,a=e.onClick,r=e.className,c=e.modelQuantity,o=e.imageClassName;return i.a.createElement("div",{title:t,onClick:a,className:"model-thumbnail-container cursor-click ".concat(r||""),"data-toggle":"tooltip","data-placement":"right"},i.a.createElement("img",{src:Z(n),alt:n,className:o||"model-thumbnail"}),c>0&&i.a.createElement("div",{className:"quantity-tile"},i.a.createElement("span",{className:"rounded-circle bg-primary circle-tile text-light"},c)))}),ce=function(e){var t=e.models,n=e.addModel,a=e.className;return i.a.createElement(ae,{className:"justify-content-start pt-2 ".concat(a||"")},i.a.createElement(re,{model:"TABLE",title:"Mesa",onClick:function(e){return n("TABLE")},className:"mr-3",modelQuantity:t.TABLE?t.TABLE.quantity:0}),i.a.createElement(re,{model:"FURNITURE",title:"Entrepa\xf1os",onClick:function(e){return n("FURNITURE")},className:"mr-3",modelQuantity:t.FURNITURE?t.FURNITURE.quantity:0}))},oe=function(e){var t=e.models,n=e.addModel;return i.a.createElement(ae,null,i.a.createElement(ie,{width:75,className:"overflow-auto h-100"},i.a.createElement(ce,{models:t,addModel:n})))},se=te((function(e){var t=e.models,n=e.addModel;return i.a.createElement(V,{height:100},i.a.createElement(V,{height:90},i.a.createElement($,null)),i.a.createElement(V,{height:10,className:"bg-none"},i.a.createElement(oe,{models:t,addModel:n})))})),le=function(e){var t=e.children,n=e.className,a=Object(G.a)(e,["children","className"]);return i.a.createElement(ne,Object.assign({className:"flex-column ".concat(n||"")},a),t)},de=n(15),ue=function(e){var t=e.id,n=e.icon,a=e.onClick,r=e.className,c=e.labelText,o=Object(G.a)(e,["id","icon","onClick","className","labelText"]);return i.a.createElement("label",Object.assign({id:t,onClick:a,className:r},o),i.a.createElement(ae,{className:"align-items-center"},i.a.createElement(de.a,{icon:n,className:"mr-2"}),c))},me=function(e){return Object(o.b)((function(e,t){return Object(d.a)({editor:e.editor},t)}),{setEditorTypeAction:h,setEditorWidthAction:E,setEditorHeightAction:b})((function(t){var n=t.editor,a=t.setEditorTypeAction,r=t.setEditorWidthAction,c=t.setEditorHeightAction,o=Object(G.a)(t,["editor","setEditorTypeAction","setEditorWidthAction","setEditorHeightAction"]);return i.a.createElement(e,Object.assign({editorState:n,setEditorType:a,setEditorWidth:r,setEditorHeight:c},o))}))},he=n(8),Ee=function(e){var t=e.icon,n=e.type,a=e.onClick,r=e.className,c=e.buttonText,o=Object(G.a)(e,["icon","type","onClick","className","buttonText"]);return i.a.createElement("button",Object.assign({onClick:a,className:"btn btn-".concat(n," ").concat(r||"")},o),i.a.createElement(ae,{className:"align-items-center"},i.a.createElement(de.a,{icon:t,className:"mr-2"}),c))},be=ee((function(e){var t=e.project,n=e.setProjectName,r=e.setProjectDescription,c=t.name,o=t.description,s=Object(a.useState)(!0),l=Object(O.a)(s,2),d=l[0],u=l[1],m=Object(a.useState)(c),h=Object(O.a)(m,2),E=h[0],b=h[1],f=Object(a.useState)(o),g=Object(O.a)(f,2),p=g[0],j=g[1];return i.a.createElement("div",{className:"container mt-3 py-3"},i.a.createElement(ue,{icon:he.h,labelText:"Ajustes del proyecto",className:"h4 text-muted"}),i.a.createElement("hr",null),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",null,"Nombre del proyecto: "),i.a.createElement("input",{type:"text",value:E,onChange:function(e){u(!1),b(e.target.value)},className:"form-control rounded-lg",placeholder:"Nombre del proyecto"})),i.a.createElement("div",{className:"form-group"},i.a.createElement("label",null,"Descripci\xf3n del proyecto: "),i.a.createElement("textarea",{rows:"5",value:p,onChange:function(e){u(!1),j(e.target.value)},className:"form-control"})),i.a.createElement(ae,{className:"justify-content-center"},i.a.createElement(Ee,{icon:d?he.f:null,onClick:!d&&function(e){e.preventDefault(),u(!0),n(E),r(p)},className:"btn btn-success",buttonText:d?"Cambios guardados":"Guardar cambios",disabled:d})))})),Oe=function e(){Object(f.a)(this,e)};Oe.WOOD_TEXTURE="WOOD_TEXTURE",Oe.FLOOR_TEXTURE="FLOOR_TEXTURE",Oe.getTextureUri=function(e){switch(e){case Oe.WOOD_TEXTURE:return"/assets/textures/wood.png";case Oe.FLOOR_TEXTURE:default:return"/assets/textures/floor.png"}};var fe=function(e){var t=e.editorWidth,n=e.editorHeight,a=e.setEditorHeight,r=e.setEditorWidth,c=e.handleTextureChange;return i.a.createElement("div",{className:"dropup",title:"Ajustes de escena 3D","data-toggle":"tooltip","data-placement":"top"},i.a.createElement("div",{className:"dropdown"},i.a.createElement(Ee,{id:"3d_scene_settings",icon:he.g,type:"outline-secondary",className:"rounded-pill pr-1 py-2 mr-2","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}),i.a.createElement("div",{className:"dropdown-menu mb-5 px-3 oveflow-auto","aria-labelledby":"3d_scene_settings"},i.a.createElement("h5",null,"Plane"),i.a.createElement("div",{className:"form-group"},i.a.createElement("h6",null,"Dimensiones: "),i.a.createElement("label",null,"Alto: "),i.a.createElement("input",{type:"text",value:n,onChange:function(e){return a(e.target.value)},className:"form-control"}),i.a.createElement("label",null,"Ancho: "),i.a.createElement("input",{type:"text",value:t,onChange:function(e){return r(e.target.value)},className:"form-control"})),i.a.createElement("div",{className:"form-group"},i.a.createElement("h6",null,"Textura:"),i.a.createElement("div",null,i.a.createElement("label",null,i.a.createElement("input",{type:"checkbox",value:Oe.FLOOR_TEXTURE,onChange:c,className:"mr-2"}),i.a.createElement("img",{src:Oe.getTextureUri(Oe.FLOOR_TEXTURE),width:"30px",height:"30px",className:"mr-2"}),"Piso")),i.a.createElement("div",{className:"mt-2"},i.a.createElement("label",null,i.a.createElement("input",{type:"checkbox",value:Oe.WOOD_TEXTURE,onChange:c,className:"mr-2"}),i.a.createElement("img",{src:Oe.getTextureUri(Oe.WOOD_TEXTURE),width:"30px",height:"30px",className:"mr-2"}),"Duela"))))))},ge=n(1),pe=n(43),je=n(32),Te=n(44),ve=function(){function e(){Object(f.a)(this,e)}return Object(B.a)(e,null,[{key:"create",value:function(t){var n,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.DEFAULT_SIZE,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e.DEFAULT_SIZE;switch(t){case e.GRID:n=new ge.o(a,e.DEFAULT_GRID);break;case e.MESH_PLANE:new ge.rb;(n=new ge.K(new ge.Y(a,i,e.DEFAULT_GRID,e.DEFAULT_GRID),new ge.L({color:13882323}))).rotateX(-Math.PI/2),n.material.side=ge.k;break;default:n=new ge.o(e.DEFAULT_SIZE,e.DEFAULT_GRID)}return n}}]),e}();ve.GRID="GRID",ve.MESH_PLANE="MESH_PLANE",ve.DEFAULT_SIZE=5,ve.DEFAULT_GRID=100;var ye=function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ve.DEFAULT_SIZE,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ve.DEFAULT_SIZE;Object(f.a)(this,e),this.addTextureToObject=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(t.isMesh){var a=(new ge.rb).load(n||e.DEFAULT_TEXTURE_URI);a.encoding=ge.F,a.flipY=!1,t.material=new ge.M({map:a}),t.material.side=ge.k}},this.getOptimalCameraDistance=function(){return 1.15*Math.max(t.sceneHeight,t.sceneWidth)},this.objects=[],this.sceneWidth=n,this.sceneHeight=a,this.domContainer=document.getElementById(e.DOM_CONTAINER_ID),this.containerWidth=this.domContainer.clientWidth,this.containerHeight=this.domContainer.clientHeight,this.containerAspectRatio=this.containerWidth/this.containerHeight,this.plane=null,this.orbitControls=null,this.dragControls=null,this.enableOrbitControls=!0,this.render=this.render.bind(this)}return Object(B.a)(e,[{key:"init",value:function(){this.setInitialScene(),this.setInitialCameraState(),this.setInitialRenderer(),this.addControls(),this.addPlane(),this.addResizeListener(),this.render()}},{key:"setInitialScene",value:function(){this.scene=new ge.jb,this.addLight()}},{key:"setInitialCameraState",value:function(){var e=this.getOptimalCameraDistance();this.camera=new ge.W(50,this.containerAspectRatio,.01,3e3),this.camera.position.set(0,e,0),this.camera.lookAt(0,e,0)}},{key:"setInitialRenderer",value:function(){this.renderer=new ge.xb({antialias:!0}),this.renderer.setClearColor("#e5e5e5"),this.renderer.setSize(this.containerWidth,this.containerHeight),this.domContainer.appendChild(this.renderer.domElement)}},{key:"addControls",value:function(){this.orbitControls=new pe.a(this.camera,this.renderer.domElement),this.dragControls=new je.a(this.objects,this.camera,this.renderer.domElement)}},{key:"addPlane",value:function(){var e=ve.create(ve.GRID,50);this.addToScene(e),this.plane=ve.create(ve.MESH_PLANE,this.sceneWidth,this.sceneHeight),this.addToScene(this.plane)}},{key:"addResizeListener",value:function(){var e=this;window.addEventListener("resize",(function(){e.setContainerDimensions(),e.renderer&&e.renderer.setSize(e.containerWidth,e.containerHeight),e.camera&&(e.camera.aspect=e.containerAspectRatio,e.camera.updateProjectionMatrix())}))}},{key:"render",value:function(){requestAnimationFrame(this.render),this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera),this.orbitControls&&this.orbitControls.update()}},{key:"setDragEndCallback",value:function(e){e&&"function"===typeof e&&(this.onDragEnd=e),this.onDragEnd=this.onDragEnd.bind(this)}},{key:"addToScene",value:function(e){this.scene.add(e)}},{key:"addLight",value:function(){var t=new ge.a(e.DEFAULT_LIGHT_COLOR,e.DEFAULT_LIGHT_INTENSITY);t.position.set(0,0,0),this.addToScene(t)}},{key:"setContainerDimensions",value:function(){this.containerWidth=this.domContainer.clientWidth,this.containerHeight=this.domContainer.clientHeight,this.containerAspectRatio=this.containerWidth/this.containerHeight}},{key:"addObject",value:function(e){this.objects.push(e),this.updateDragControls()}},{key:"setObjects",value:function(e){Array.isArray(e)&&(this.objects=e),this.updateDragControls()}},{key:"load3DModel",value:function(t,n,a){var i=this,r=n.x,c=void 0===r?0:r,o=n.y,s=void 0===o?0:o,l=n.z,d=void 0===l?0:l,u=function(e){switch(e){case"WALL":return"assets/models/3D/wall.glb";case"KIOSK":return K.KIOSK.uri;case z:return K[z].uri;case"BOARD":return K.BOARD.uri;case"FURNITURE":return K.FURNITURE.uri;default:return K.KIOSK.uri}}(t);(new Te.a).load(u,(function(t){t.scene.scale.set(1,1,1),t.scene.position.set(c,s,d),i.addToScene(t.scene),t.scene.traverse((function(t){t.isMesh&&(t.material.map||i.addTextureToObject(t,e.DEFAULT_TEXTURE_URI),a&&"function"===typeof a&&a(t),i.addObject(t))}))}))}},{key:"setOrbitControlsEnabled",value:function(e){this.enableOrbitControls=e,this.orbitControls.enabled=e}},{key:"updateDragControls",value:function(){var e=this;this.dragControls=new je.a(this.objects,this.camera,this.renderer.domElement);var t=this.orbitControls,n=this.onDragEnd,a=0;this.dragControls.addEventListener("dragstart",(function(e){a=e.object.position.y,t&&(t.enabled=!1)})),this.dragControls.addEventListener("drag",(function(e){e.object.position.y=a})),this.dragControls.addEventListener("dragend",(function(a){a.object.material.opacity=1,n&&"function"===typeof n&&n(a),t&&(t.enabled=e.enableOrbitControls)}))}}]),e}();ye.DOM_CONTAINER_ID="tridimensional_renderer",ye.DEFAULT_LIGHT_COLOR=16777215,ye.DEFAULT_LIGHT_INTENSITY=1,ye.DEFAULT_TEXTURE_URI="/assets/textures/wood.png";var Ne=function e(){Object(f.a)(this,e)};Ne.TOP_VIEW="TOP_VIEW",Ne.BACK_VIEW="BACK_VIEW",Ne.FRONT_VIEW="FRONT_VIEW",Ne.FRONT_LEFT="FRONT_LEFT",Ne.FRONT_RIGHT="FRONT_RIGHT",Ne.ISOMETRIC_VIEW="ISOMETRIC_VIEW",Ne.createCameraRotationVector=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=t||ye.DEFAULT_CAMERA_DISTANCE,a=new ge.vb(0,0,0),i=Ne.TOP_VIEW,r=Ne.BACK_VIEW,c=Ne.FRONT_VIEW,o=Ne.FRONT_LEFT,s=Ne.FRONT_RIGHT,l=Ne.ISOMETRIC_VIEW;switch(e){case i:a.setY(n);break;case r:a.setZ(-n);break;case c:a.setZ(n);break;case o:a.setX(-n);break;case s:a.setX(n);break;case l:n-=2,a.setX(n),a.setY(n/2),a.setZ(n);break;default:a.setY(n)}return a};var Ce,_e=function(e){var t=e.rotateCamera,n=Ne.TOP_VIEW,a=Ne.BACK_VIEW,r=Ne.FRONT_VIEW,c=Ne.FRONT_LEFT,o=Ne.FRONT_RIGHT,s=Ne.ISOMETRIC_VIEW;return i.a.createElement("div",{title:"Vistas",className:"dropup","data-toggle":"tooltip","data-placement":"top"},i.a.createElement(ue,{icon:he.i,title:"Vistas",className:"cursor-click mb-0 btn btn-outline-secondary rounded-pill pr-1 mr-2 py-2","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"}),i.a.createElement("div",{className:"dropdown-menu mb-3 px-2 py-2"},i.a.createElement(le,null,i.a.createElement(ue,{icon:he.e,labelText:"Superior",onClick:function(e){return t(n)},className:"cursor-click dropdown-item"}),i.a.createElement(ue,{icon:he.s,labelText:"Frente",onClick:function(e){return t(r)},className:"cursor-click dropdown-item"}),i.a.createElement(ue,{icon:he.t,labelText:"Atras",onClick:function(e){return t(a)},className:"cursor-click dropdown-item"}),i.a.createElement(ue,{icon:he.d,labelText:"Derecha",onClick:function(e){return t(o)},className:"cursor-click dropdown-item"}),i.a.createElement(ue,{icon:he.c,labelText:"Izquierda",onClick:function(e){return t(c)},className:"cursor-click dropdown-item"}),i.a.createElement(ue,{icon:he.j,labelText:"Isom\xe9trico",onClick:function(e){return t(s)},className:"cursor-click dropdown-item"}))))},De=me(ee((function(e){var t=e.editorState,n=e.setEditorWidth,a=e.setEditorHeight,r=e.rotateCamera,c=e.addTextureToPlane,o=e.toggleOrbitControls,s=e.orbitControlsEnabled,l=t.editorHeight,d=t.editorWidth;return i.a.createElement(ae,{className:"justify-content-start align-items-center"},i.a.createElement(_e,{rotateCamera:r}),i.a.createElement(fe,{editorWidth:d,editorHeight:l,setEditorWidth:n,setEditorHeight:a,handleTextureChange:function(e){var t=e.target,n=t.checked,a=t.value;n&&c(a)}}),i.a.createElement(Ee,{icon:s?he.m:he.n,title:"Bloquear/desbloquear plano",type:s?"outline-secondary":"secondary",onClick:o,className:"btn-sm rounded-pill px-3 py-2 mr-2",buttonText:i.a.createElement(de.a,{icon:he.a}),"data-toggle":"tooltip","data-placement":"top"}))}))),Re=function(e){var t=e.models,n=e.addModel,a=e.rotateCamera,r=e.addTextureToPlane,c=e.toggleOrbitControls,o=e.orbitControlsEnabled;return i.a.createElement(ae,{className:"justify-content-around align-items-center"},i.a.createElement(ie,{width:75,className:"overflow-auto h-100"},i.a.createElement(ce,{models:t,addModel:n})),i.a.createElement(ie,{width:25},i.a.createElement(De,{rotateCamera:a,addTextureToPlane:r,toggleOrbitControls:c,orbitControlsEnabled:o})))},Ie=function(){return i.a.createElement(V,{id:"tridimensional_renderer",height:100})},Ae=function(e){return ee((function(t){var n=t.project,r=t.addObject,c=t.updateObject,o=(t.removeObject,t.set2DSceneDimensions),s=t.set3DSceneDimensions,l=Object(G.a)(t,["project","addObject","updateObject","removeObject","set2DSceneDimensions","set3DSceneDimensions"]),u=n.objects,m=Object(a.useState)({}),h=Object(O.a)(m,2),E=h[0],b=h[1],f=Object(a.useState)(),g=Object(O.a)(f,2),p=g[0],j=g[1],T=Object(a.useState)(),v=Object(O.a)(T,2),y=v[0],N=v[1],C=Object(a.useState)(!0),_=Object(O.a)(C,2),D=_[0],R=_[1];Object(a.useEffect)((function(){var e=new ye;e.init(),e.setDragEndCallback(I),j(e);var t=e.sceneWidth,a=e.sceneHeight;if(s(t,a),!n.scene||!n.scene["2d"]){var i=document.getElementById(ye.DOM_CONTAINER_ID);o(i.clientWidth,i.clientHeight)}!function(){var t=Object(d.a)({},E);u.forEach((function(n){var a=n.type,i=n["3d"].coordinates;t[a]?t[a].quantity++:t[a]={quantity:1},e.load3DModel(a,i,(function(e){var t=e.uuid,a=Object(d.a)(Object(d.a)({},n),{},{"3d":{uuid:t,coordinates:i}});c(a)}),I)})),b(t)}()}),[]),Object(a.useEffect)((function(){if(y){var e=y.uuid,t=y.x,n=(y.y,y.z),a=A(e);if(a){var i=Object(d.a)({},a["2d"]),r=Object(d.a)(Object(d.a)({},a),{},{"2d":Object(d.a)(Object(d.a)({},i),{},{coordinates:S(t,n)}),"3d":{uuid:e,coordinates:{x:t,y:0,z:n}}});c(r)}else console.log("Objeto no encontrado")}}),[y]),Object(a.useEffect)((function(){p&&p.setOrbitControlsEnabled(D)}),[D]);var I=function(e){var t=e.object,n=t.position,a=n.x,i=n.y,r=n.z,c=t.uuid;N({x:a,y:i,z:r,uuid:c})},A=function(e){return u.find((function(t){return t["3d"].uuid===e}))},S=function(e,t){var a=n.scene,i=Object(d.a)({},a["2d"]),r=i.sceneWidth,c=i.sceneHeight,o=Object(d.a)({},a["3d"]);return function(e,t){var a=Object(d.a)({},n.scene["2d"]);return{x:a.sceneWidth/2-e,y:a.sceneHeight/2-t}}(-1*e*(r/o.sceneWidth),-1*t*(c/o.sceneHeight))},x=function(e){var t=Object(d.a)({},E);t[e]?t[e].quantity++:t[e]={quantity:1},b(t)};return i.a.createElement(e,Object.assign({models:E,addModel:function(e){x(e),p.load3DModel(e,{x:0,y:0,z:0},(function(t){return function(e,t){var n=e.uuid,a=e.position,i=a.x,c=(a.y,a.z),o={id:u.length,type:t,"2d":{uuid:"",coordinates:S(i,c)},"3d":{uuid:n,coordinates:{x:i,y:0,z:c}}};r(o)}(t,e)}))},rotateCamera:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ne.TOP_VIEW,t=p.getOptimalCameraDistance(),n=Ne.createCameraRotationVector(e,t);p.camera.position.copy(n)},addTextureToPlane:function(e){var t=Oe.getTextureUri(e);p.addTextureToObject(p.plane,t)},addTextureToObject:function(e,t){return p.addTextureToObject(e,t)},toggleOrbitControls:function(){R(!D)},orbitControlsEnabled:D},l))}))}((function(e){var t=e.models,n=e.addModel,a=e.rotateCamera,r=e.addTextureToPlane,c=e.toggleOrbitControls,o=e.orbitControlsEnabled;return i.a.createElement(V,{height:100},i.a.createElement(V,{height:90},i.a.createElement(Ie,null)),i.a.createElement(V,{height:10},i.a.createElement(Re,{models:t,addModel:n,rotateCamera:a,addTextureToPlane:r,toggleOrbitControls:c,orbitControlsEnabled:o})))})),Se=[{model_id:"FURNITURE",name:"Entrepa\xf1os",description:"Conjunto de entrepa\xf1os de distintos tama\xf1os y con m\xfaltiples cajones."},{model_id:z,name:"Mesa",description:"Mesa de madera de 1m x 1m."}],xe=(n(97),ee((function(e){var t=e.project,n=e.addObject,r=t.objects,c=Object(a.useState)({}),o=Object(O.a)(c,2),s=o[0],l=o[1];Object(a.useEffect)((function(){var e=Object(d.a)({},s);r.forEach((function(t){var n=t.type;e[n]?e[n].quantity++:e[n]={quantity:1}})),l(e)}),[]);return i.a.createElement(ne,{className:"justify-content-around align-items-between flex-wrap"},Se.map((function(e){return i.a.createElement("div",{className:"card rounded-lg border-muted catalog-tile mt-3"},i.a.createElement("div",{className:"card-body px-2 py-2"},i.a.createElement("table",{className:"table table-sm table-borderless"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{colSpan:"2"},i.a.createElement(re,{model:e.model_id,title:e.name,className:"mr-3 mt-3",modelQuantity:s[e.model_id]?s[e.model_id].quantity:0,imageClassName:"catalog-thumbnail"})))),i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("th",null,"Nombre"),i.a.createElement("td",null,e.name)),i.a.createElement("tr",null,i.a.createElement("th",null,"Descripci\xf3n"),i.a.createElement("td",null,e.description)),i.a.createElement("tr",null,i.a.createElement("th",{colSpan:"2"},i.a.createElement(Ee,{id:e.model_id,icon:he.p,onClick:function(t){return function(e){var t={id:r.length,type:e,"2d":{uuid:"",coordinates:{x:0,y:0}},"3d":{uuid:"",coordinates:{x:0,y:0,z:0}}};n(t);var a=Object(d.a)({},s);a[e]?a[e].quantity++:a[e]={quantity:1},l(a)}(e.model_id)},className:"btn btn-primary rounded-lg shadow",buttonText:"Agregar"})))))))})))}))),ke=function(){return i.a.createElement("div",{className:"container mt-3 text-center"},i.a.createElement(ue,{icon:he.b,className:"text-muted h4",labelText:"Cat\xe1logo de productos"}),i.a.createElement(xe,{models:{}}))},we=(Ce={},Object(J.a)(Ce,"CATALOG",i.a.createElement(ke,null)),Object(J.a)(Ce,"PROJECT_SETTINGS",i.a.createElement(be,null)),Object(J.a)(Ce,"BIDIMENSIONAL EDITOR",i.a.createElement(se,null)),Object(J.a)(Ce,"TRIDIMENSIONAL_EDITOR",i.a.createElement(Ae,null)),Ce),Pe=me((function(e){var t=e.setEditorType;return i.a.createElement(le,{className:"align-items-center justify-content-around"},i.a.createElement(ue,{icon:he.r,title:"Cat\xe1logo",onClick:function(e){return t("CATALOG")},className:"text-sidebar-icon cursor-click mb-3","data-toggle":"tooltip","data-placement":"right"}),i.a.createElement(ue,{icon:he.j,title:"3D",onClick:function(e){return t("TRIDIMENSIONAL_EDITOR")},className:"text-sidebar-icon cursor-click mb-3","data-toggle":"tooltip","data-placement":"right"}),i.a.createElement(ue,{icon:he.o,title:"2D",onClick:function(e){return t("BIDIMENSIONAL EDITOR")},className:"text-sidebar-icon cursor-click mb-3","data-toggle":"tooltip","data-placement":"right"}),i.a.createElement(ue,{icon:he.g,title:"Ajustes del proyecto",onClick:function(e){return t("PROJECT_SETTINGS")},className:"text-sidebar-icon cursor-click","data-toggle":"tooltip","data-placement":"right"}))})),We=function(e){var t=e.className;return i.a.createElement(le,{className:"align-items-center justify-content-around ".concat(t||"")},i.a.createElement(ue,{icon:he.q,title:"Guardar",className:"text-sidebar-icon cursor-click mb-3","data-toggle":"tooltip","data-placement":"right"}),i.a.createElement(ue,{icon:he.l,title:"Abrir",className:"text-sidebar-icon cursor-click mb-3","data-toggle":"tooltip","data-placement":"right"}),i.a.createElement(ue,{icon:he.k,title:"Descargar",className:"text-sidebar-icon cursor-click mb-3","data-toggle":"tooltip","data-placement":"right"}))},Ue=(n(98),function(){return i.a.createElement(ie,{width:5,className:"position-relative"},i.a.createElement(V,{height:100,className:"sidebar-width position-fixed bg-dark pt-4"},i.a.createElement(le,{className:"align-items-center justify-content-start"},i.a.createElement(We,{className:"my-4"}),i.a.createElement(Pe,null))))}),Le=me((function(e){var t=e.editorState.editorType;return Object(a.useEffect)((function(){M()((function(){return M()('[data-toggle="tooltip"]').tooltip()}))}),[]),i.a.createElement(a.Fragment,null,i.a.createElement(ae,{className:"w-100 h-100"},i.a.createElement(Ue,null),i.a.createElement(ie,{width:95},we[t])))}));n(99),n(100),n(101),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Fe=F(),He=i.a.createElement(o.a,{store:Fe},i.a.createElement(Le,null));c.a.render(He,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},45:function(e,t,n){e.exports=n(102)},54:function(e,t,n){},92:function(e,t,n){},93:function(e,t,n){},97:function(e,t,n){},98:function(e,t,n){},99:function(e,t,n){}},[[45,1,2]]]);
//# sourceMappingURL=main.c4e9f22e.chunk.js.map