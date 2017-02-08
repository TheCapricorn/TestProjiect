
/*let path=require("path");*/
require("../style/comm.css");
require("../style/index.css");


let homeNav = document.querySelector(".home-link");
let homeContainer = document.querySelector(".home-container");

class Move {
    constructor(attrs) {
        this.def = {
            prefix: this.getPrefix(),
            rotate: {
                left: "-45deg",
                right: "45deg"
            }
        };

        if (attrs) {
            this.def = this.extend(this.def, attrs)
        }
        this.ContainerEle = this.def.Element.overEle.parent;
        this.ContainerW = this.ContainerEle.offsetWidth;
        this.ContainerH = this.ContainerEle.offsetHeight;
        this.state=true;
/*        this.firstState=false;*/

        //元素中点
        let getPagePos = this.ContainerEle.getBoundingClientRect(),
            centX = getPagePos.left + this.ContainerW / 2,
            centY = getPagePos.top + this.ContainerH / 2,
            diameter = Math.sqrt(Math.pow(centX, 2) + Math.pow(centY, 2)),
            radius = diameter / 2
        this.ContainerPos = {
            cenX: centX,
            centY: centY,
            left: getPagePos.left,
            right: centX + radius,
            top: getPagePos.top,
            bottom: centY + radius
        };
        let overEleC = this.def.Element.overEle.child;
        //是否移入
        //绑定鼠标移入事件
        document.onmousemove = (e)=> {
            this.event = e;

            if (this.IsOut(e)) {
                this.Mouse(this.ContainerEle, this.ContainerEle,"out" ,true);
            }else {
               // if(this.state){this.state=false};
                this.Mouse(this.ContainerEle,this.ContainerEle,"over", true);
            }

        };
        this.Mouse(overEleC,this.ContainerEle,"over",false);
        this.Mouse(overEleC,this.ContainerEle,"out",false);

    }

    getFlag(e, flag) {
        if (e.clientX < this.ContainerPos.cenX) {
            return flag.left;
        } else if (e.clientX > this.ContainerPos.cenX) {
            return flag.right;
        } else {
            return 0;
        }
    }

    IsOut(e) {
        if (e.clientX < this.ContainerPos.left || e.clientY < this.ContainerPos.top || e.clientX > this.ContainerPos.right || e.clientY > this.ContainerPos.bottom) {
            return true
        } else {
            return false;
        }
    }

    extend(ato, att) {
        for (let i in att) {
            ato[i] = att[i];
        }
        return ato;
    }

    Mouse(overEleP,Ele,type,Booleans) {

        let getPrefix = this.def.prefix;
        let Transform = getPrefix + "Transform";
        let _self = this;
        let deg =type=="out"? "0" :(Booleans ? parseFloat(_self.getFlag(_self.event, _self.def.rotate)) :"0");
        if(Booleans){
            if(this.state){
                overEleP.style[Transform] = "rotateZ(" + deg + "deg)";
            }
        }else{
            overEleP.addEventListener(type=="out" ? "mouseout" : "mouseover",()=>{
                _self.state=type=="out" ? true : false;
                Ele.style[Transform] = "rotateZ(0deg)";

            });
        }

    }

 /*   Mouseout(overEleP,Ele,Booleans) {
        let getPrefix = this.def.prefix;
        let _self = this;
        let deg = "0"
        let Transform = getPrefix + "Transform";
        if(Booleans){
            if(this.state){
                overEleP.style[Transform] = "rotateZ(" + deg + "deg)";
            }
        }else{
            overEleP.addEventListener('mouseout',()=>{
                _self.state=true;
            });
        }
    }*/

    getPrefix() {
        let styles = document.documentElement.currentStyle ? document.documentElement.currentStyle : window.getComputedStyle(document.documentElement, "");
        let core = (
            Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["", "o"])
        )[1];
        core = core ? core : "";
        return core;
    }
}


//nav
new Move({
    rotate: {
        left: "-45deg",
        right: "45deg"
    },
    Element: {
        overEle: {parent: homeContainer, child: homeNav}
    }

});


//TabBackground




class TabBackground{
    constructor(){
        let _self=this;
        this.Ele=document.getElementById("home-body");
        this.btn=document.getElementById("home-btn");
        this.btn.addEventListener("click",(event)=>{
            this.Animate();
            event.preventDefault()
        });
    }
    Animate(){
        let num=Math.round(Math.random()*10);
            num=num<=9 ? "0"+num : num;
            this.Ele.style.backgroundImage="url(./image/public_"+num+".jpg)";
    }
}


new TabBackground();


