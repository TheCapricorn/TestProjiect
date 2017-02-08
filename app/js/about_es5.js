/**
 * Created by hp on 2017/1/31.
 */
/*require("../style/comm.css");
require("../style/jquery.fullPage.css");
require("../style/Introduction.css");
require("../style/iconfont.css");*/

/*require("./jquery.fullPage.min");*/
/*fullPage*/
/*$('#Introduction-container').fullpage({
    "navigation":true,
    "verticalCentered":false
   /!* "afterLoad":function(anchorLink ,index){
       // $("#Introduction-head").animate("")
    }*!/
});*/
/*
$("#Introduction-head").css("top","20%");
$("#Introduction-mes-text").css("opacity",1)*/
/*轮播图*/
let BannerCon = document.querySelector(".section-banner-con");
let BannerWrap = document.querySelector(".section-banner-wrap");
let next = document.querySelector(".section-banner-next");
let prev = document.querySelector(".section-banner-prev");
let progressCon = document.querySelector(".section-banner-progress");
class Banner {
    constructor(attrs) {
        this.attrs = {};
        this.extend(this.attrs, attrs)
        /*获取轮播宽度，与个数*/
        this.childs = this.attrs.container.querySelectorAll(".section-banner-page");
        this.attrs.num = this.childs.length;
        this.attrs.bannerW = parseFloat(this.getStyle(this.attrs.wrapper, "width"));
        this.attrs.container.style.width = this.attrs.bannerW * this.attrs.num + "px";
        this.attrs.Prefix = this.getPrefix();
        this.attrs.index = 0;
/*        this.childs.forEach((i)=> {
            i.style.width = this.attrs.bannerW + "px";
        });*/

        /*生成proess*/
        let child = [];
        for (let i = 0; i < this.attrs.num; i++) {
            let ele = document.createElement("li");
            if (i == 0) {
                ele.className = "banner-progress-" + i + " active";
            } else {
                ele.className = "banner-progress-" + i;
            }
            child[i] = ele;
            this.attrs.progressCon.appendChild(ele);
        }
        ;
        this.attrs.progressChild = child;
        this.attrs.progressCon.addEventListener("click", (event)=> {
            let e = event || window.event;
            let target = e.target || e.srcElement;
            let self = this;
            /*                child= this.attrs.progressCon.children;*/
            /*    for(let i in child){
             if(i!=="length") {
             child[i].className = "banner-progress-" + i
             };
             }*/
            if (target.nodeName.toLowerCase() == "li") {
                let num = parseFloat(target.className.match(/\d/)[0]);
                self.animate(num, 0);
                self.attrs.prevIndex = self.attrs.index = num;
                this.clearProgress();
                target.className = "banner-progress-" + num + " active";

            }
        });

        /*绑定事件*/
        this.attrs.next.addEventListener('click', ()=> {
            this.event("next");
        });
        this.attrs.prev.addEventListener('click', ()=> {
            this.event("prev");
        })

    }

    event(type) {

        this.attrs.index = type == "next" ? this.attrs.index + 1 : this.attrs.index - 1;
        if(this.attrs.index>=this.attrs.num-1){
            this.attrs.index=this.attrs.num-1
        }else if(this.attrs.index<=0){
            this.attrs.index=0;
        }

        this.animate(this.attrs.index, 0);
        /*            this.attrs.prevIndex = this.attrs.index;*/
        this.clearProgress();
        this.attrs.progressChild[this.attrs.index].className = "banner-progress-" + this.attrs.index + " active";
    }

    /*    prev(){
     /!*        if() this.attrs.index=this.attrs.index-1;*!/
     if(this.attrs.index-this.attrs.prevIndex<0){
     this.animate(this.attrs.index,0);
     this.attrs.prevIndex=this.attrs.index;
     this.clearProgress();
     this.attrs.progressChild[this.attrs.index].className="banner-progress-"+this.attrs.index+" active";
     }
     }*/
    animate(num, type) {
        let con = this.attrs.container;
        let distance = this.attrs.bannerW;
        num = type == 0 ? -num : num;
        con.style[this.attrs.Prefix + "Transform"] = "translateX(" + num * distance + "px)";
    }

    clearProgress() {
        this.attrs.progressChild.forEach((i, index)=> {
            i.className = "banner-progress-" + index;
        })

    }

    extend(ato, att) {
        for (let i in att) {
            ato[i] = att[i];
        }
        return ato;
    }

    getStyle(obj, attr) {
        let style = obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];
        return style;
    }

    getPrefix() {
        let styles = document.documentElement.currentStyle ? document.documentElement.currentStyle : window.getComputedStyle(document.documentElement, "");
        let core = (
            Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["", "o"])
        )[1];
        switch (core){
            case  "moz":
                core="Moz"
                break;
            case  "webkit":
                core="Webkit"
                break;
            case "ms":
                core="ms"
                break;
            default :
                core=""
                break;
        }
       /* core = core ? core : "";*/
        return core;
    }
}
;
new Banner({
    container: BannerCon,
    wrapper: BannerWrap,
    next: next,
    prev: prev,
    progressCon: progressCon
});



