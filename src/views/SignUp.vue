<template>
    <div class="container">
        <div class="top-banner"></div> 
        <b-col col class="title-line"><span>注册</span></b-col>
        <b-form-row>
            <b-col lg=6 md=10 sm=12 tag="form" class="border center rounded shadow p-3" @submit="onSubmit">
                <b-form-group label="用户名:" class="mt-2" label-for="usn">
                    <b-form-input id='usn' required v-model="form.username" type="text" placeholder="输入用户名"/>
                </b-form-group>
                <b-form-group label="邮箱:" label-for="email">
                  <b-form-input id="email" required v-model="form.email" type="email" placeholder="请输入邮箱"/>
                </b-form-group>
                <b-form-group label="密码:" label-for="pwd">
                    <b-form-input id='pwd' required v-model="form.password" type="password" placeholder="请输入密码"/>
                </b-form-group>
                <b-form-group label="再次输入密码:" label-for="rpwd">
                    <b-form-input id='rpwd' 
                    required
                    v-model="form.passwordr" 
                    type="password" 
                    :state="pwdrState"
                    aria-describedby="invalid"
                    placeholder="再次输入密码">
                    </b-form-input>
                    <b-form-invalid-feedback id="invalid">
                        输入密码不相符
                    </b-form-invalid-feedback>
                </b-form-group>
                <div v-if="result">
                  <b-alert style="height:2rem" :variant="result.ret?'success':'danger'" show>
                    <p style="position:relative;top:-0.3rem;font-size:0.8rem">
                      注册{{result.ret?'成功':'失败'}}:
                      <b>{{result.msg}}</b>
                    </p>
                  </b-alert>
                </div>
                <b-form-row class="mt-4 pt-2 border-top">
                    <b-col>
                    <b-button class="mt-3" block type="submit" variant="outline-primary">注册</b-button>
                    </b-col><b-col>
                    <b-button class="mt-3" block @click="$router.push('/')" variant="outline-danger">取消</b-button>
                    </b-col>
                </b-form-row>
            </b-col>
        </b-form-row>
    </div>

</template>
<script>
export default {
    data(){
        return{
            form:{
                username:'',
                email:'',
                password:'',
                passwordr:''
            },
            result:null
        }
    },
    computed:{
      pwdrState(){
        if(this.form.password){
          return this.form.password==this.form.passwordr?null:false;
        }
        return null;
      }
    },
    methods:{
        checkFormat(){
          let rule1=/^[a-zA-Z]+\w*$/,rule2=/^\w+$/;
          let res=rule1.test(this.form.username)&&rule2.test(this.form.password);
            if(res){
                return true;
            }else{
                return false;
            }
        },
        async onSubmit(evt){
            this.result=null;
            evt.preventDefault();
            if(!this.checkFormat()){
              this.result={
                ret:false,
                msg:'用户名或密码格式有误'
              }
              return;
            }
            location.replace('/')
        }
    }
}
</script>
<style lang="less" scoped>
.top-banner{
    height: 3rem;
}
.title-line{
    &>span{
        font-size: 38px;
    }
}
.center{
    text-align: left;
    margin: 1rem auto 1rem auto;
}

</style>

