<template>
    <div class="loading">
        <div class="box">
        	<img src="../../assets/img/loading1.gif">
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
   	width: 140px;
   	height: 140px;
   	line-height: 140px;
   	background: #fff;
   	border-radius: 15px;
   	box-shadow: 0px 0px 15px rgba(0,0,0,.15);
   	position: absolute;
   	top: 50%;
   	left: 50%;
   	margin: -70px 0 0 -70px;
   }
   .box img{
   	width: 100%
   }
</style>