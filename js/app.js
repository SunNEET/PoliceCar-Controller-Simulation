/*jslint browser: true*/
/*global $, jQuery*/


var mainControl = 0;
var vs = new Set();
var preState = "";
var allowHS = false;

function playVideo() {
    if (vs.size === 0) {
        $("#video").attr("src", "");
        $(".videobox video")[0].load();
        $("#state").html("");
        return;
    }
    // s1 only
    if (vs.has("s1")) {
        // s1+s2
        if (vs.has("s2")) {
            // s1+s2+s3
            if (vs.has("s3")) {
                // s1+s2+s3+flashLight
                if (vs.has("sy")) {
                    $("#video").attr("src", "video/s1s2s3flc.mp4");
                    $(".videobox video")[0].load();
                    $("#state").html("高速同時爆閃+強制閃光");
                    preState = "高速同時爆閃+強制閃光";
                    return;
                }
                $("#video").attr("src", "video/s1s2s3c.mp4");
                $(".videobox video")[0].load();
                $("#state").html("高速同時爆閃");
                preState = "高速同時爆閃";
                return;
            }
            $("#video").attr("src", "video/s1s2c.mp4");
            $(".videobox video")[0].load();
            $("#state").html("高亮同爆閃");
            preState = "高亮同爆閃";
            return;
        }
        $("#video").attr("src", "video/s1c.mp4");
        $(".videobox video")[0].load();
        $("#state").html("同時慢閃<h2>(平時最常使用)</h2>");
        preState = "同時慢閃";
        return;
    }
    if (vs.has("s2")) {
        if (vs.has("s3")) {
            $("#video").attr("src", "video/s2s3c.mp4");
            $(".videobox video")[0].load();
            $("#state").html("高速輪爆閃");
            preState = "高速輪爆閃";
            return;
        }
        $("#video").attr("src", "video/s2c.mp4");
        $(".videobox video")[0].load();
        $("#state").html("輪替爆閃");
        preState = "輪替爆閃";
        return;
    }
    if (vs.has("s3")) {
        $("#video").attr("src", "video/s3c.mp4");
        $(".videobox video")[0].load();
        $("#state").html("高速輪閃");
        preState = "高速輪閃";
        return;
    }
    if (vs.has("sy")) {
        $("#video").attr("src", "video/s4c.mp4");
        $(".videobox video")[0].load();
        $("#state").html("最亮輪閃");
        preState = "最亮輪閃"
        return;
    }
    
    
    return;
}

function traceEvent(e) {
    console.log(e.type);
    var val = e.value;
    console.log(val);
    allowHS = false;
    if (val === 0) { //RAD
        $("#video").attr("src", "");
        $(".videobox video")[0].load();
        $("#state").html("警報音不動作");
    } else if (val === 1) { //MAN
        $("#state").html("可使用汽笛音或單響警報音");
        allowHS = true;
    } else if (val === 2) { //WAL
        $("#video").attr("src", "video/wal.mp4");
        $(".videobox video")[0].load();
        $("#state").html("警報長音");
    } else if (val === 3) { //YEL
        $("#video").attr("src", "video/yel.mp4");
        $(".videobox video")[0].load();
        $("#state").html("警報短音");
    } else if (val === 4) { //HIL
        $("#video").attr("src", "video/hl.mp4");
        $(".videobox video")[0].load();
        $("#state").html("救護警報");
    } else { //KOJ
        $("#video").attr("src", "video/koj.mp4");
        $(".videobox video")[0].load();
        $("#state").html("警報器");    
    }
    
    return ;
}

$(document).ready(function () {
    // all custom jQuery will go here
    
    
    // 直接改這裡
    $("#switch").roundSlider({
        min: "0",
        max: "5",
        step: "1",
        width: "25",
        showTooltip: false,
        sliderType: "default",
        value: 0,
        change: "traceEvent",
        startAngle: 20,
        endAngle: "+140"
    });
    
    
    $(".s1").click(function () {
        if (mainControl != 0) return;
        if (vs.has("s1")) {
            vs.delete("s1");
            $(".light1").toggle();
        }
        else {
            vs.add("s1");
            $(".light1").toggle();
        }
        playVideo();
    });
    $(".s2").click(function () {
        if (mainControl != 0) return;
        if (vs.has("s2")) {
            vs.delete("s2");
            $(".light2").toggle();
        }
        else {
            vs.add("s2");
            $(".light2").toggle();
        }
        playVideo();
    });
    $(".s3").click(function () {
        if (mainControl != 0) return;
        if (vs.has("s3")) {
            vs.delete("s3");
            $(".light3").toggle();
        } 
        else {
            vs.add("s3");
            $(".light3").toggle();
        }
        playVideo();
    });
    $(".sy").click(function () {
        if (mainControl != 0) return;
        if (vs.has("sy")) {
            vs.delete("sy");
            $(".light4").toggle();
        } 
        else {
            vs.add("sy");
            $(".light4").toggle();
        }
        playVideo();
    });
    $(".horn").click(function () {
        if (allowHS != true) return;
        $("#video").attr("src","video/horn.mp4");
        $(".videobox video")[0].load();
        $("#state").html("汽笛音");
        
    });
    $(".siren").click(function () {
        if (allowHS != true) return;
        $("#video").attr("src","video/siren.mp4");
        $(".videobox video")[0].load();
        $("#state").html("單響警報音");
    });
    
    $("#slide_bar").on("change", function(){
        console.log(this.value);
        mainControl = this.value;
        if (mainControl == 1){
            $("#video").attr("src","video/s1s2c.mp4");
            $(".videobox video")[0].load();
            $("#state").html("高亮同爆閃");
        }
        else if (mainControl == 2){
            $("#video").attr("src","video/s1s2s3flc.mp4");
            $(".videobox video")[0].load();
            $("#state").html("高速同時爆閃+強制閃光");
        }
        else if (mainControl == 3){
            $("#video").attr("src","video/s1s2s3flyelc.mp4");
            $(".videobox video")[0].load();
            $("#state").html("高速同時爆閃+強制閃光+警報音");
        }
        else {
            $("#video").attr("src","");
            $(".videobox video")[0].load();
            $("#state").html(preState);
            playVideo();
        }
    });
});

