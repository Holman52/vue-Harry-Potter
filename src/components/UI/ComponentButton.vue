<template>
  <button class="btn"><slot></slot></button>
</template>

<style>
 .btn{
   width: 100%;
   border-radius: 15px;
   color: #f2f2f2;
   font-size: 18px;
   font-weight: 400;
   padding: 10px 15px;
   cursor: pointer;
   transition: ease-in-out 0.3s;
 }
 .btn:hover{
   background-color: #717171;
 }
</style>