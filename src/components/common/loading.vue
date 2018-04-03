<template>
    <div class="loading">
        <div class="box">
          <div class="Load">
            <img src="../../assets/img/loading1.gif">
            <span>加载中</span>
          </div>
        	
        </div>
    </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .loading{
   	position: absolute;
   	top: 0;
   	left: 0;
   	text-align: center;
   	width: 100%;
   	height: 100%;
   }
   .box{
   	width: 100%;
   	height: 100%;
   	background: #fff;
    position: absolute;
    top: 0;left: 0
   
   	
   }
   .box .Load{
    width: 140px;
    height: 140px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -90px 0 0 -70px;
    /*box-shadow: 0px 0px 15px rgba(0,0,0,.15);*/
    border-radius: 10px;
    font-size: 24px;
    color: #b2b2b2;
    text-align: center;
   }
   .Load img{
    width: 100%;
    margin-bottom: 5px
   }
</style>