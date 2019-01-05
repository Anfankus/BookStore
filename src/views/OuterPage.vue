<template>
  <div>
    <iframe :src="list[name]" 
    onload="this.style.height=this.contentDocument.body.scrollHeight+5+'px'" ></iframe>
  </div>
</template>
<script>
export default {
  props:['name'],
  data(){
    return{
      list:{
        'contact':'/contactus.html',
        'FAQ':'/FAQ.html',
        'about':'/systemrules.html'
        }
    }
  }
}
</script>
<style lang="less" scoped>
iframe{
  border:0;
  width: 100%;
}
</style>
