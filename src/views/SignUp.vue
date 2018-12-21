<template>
    <div class="container">
        <div class="top-banner"></div> 
        <b-col col class="title-line"><span>注册</span></b-col>
        <b-form-row>
            <b-col lg=6 md=10 sm=12 tag="form" class="border center rounded shadow p-3" @submit="onSubmit">
                <b-form-group label="用户名:" class="mt-2" label-for="usn">
                    <b-form-input id='usn' required v-model="form.username" type="text" placeholder="输入用户名"/>
                </b-form-group>
                <b-form-group label="密码:" label-for="pwd">
                    <b-form-input id='pwd' required v-model="form.password" type="password" placeholder="请输入密码"/>
                </b-form-group>
                <b-form-group label="再次输入密码:" label-for="rpwd">
                    <b-form-input id='rpwd' required v-model="form.passwordr" type="password" placeholder="再次输入密码"/>
                </b-form-group>
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
                password:'',
                passwordr:''
            }
        }
    },
    methods:{
        checkFormat(){
            let rule=/[0-9a-zA-Z]+/;
            let res=rule.test(this.username)&&rule.test(this.password);
            if(res){
                return true;
            }else{
                return false;
            }
        },
        async onSubmit(evt){
            evt.preventDefault();
            if(!this.checkFormat()){
                throw 'error';
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

