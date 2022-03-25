<template>
    <div class="err404">
        <h4>您访问的页面不见了！</h4>
        <h5>
            <router-link to="pages" class="go-home">去首页</router-link>
        </h5>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style>
    .err404 {
        width: 280px;
        margin: 150px auto;
        height: 255px;
        padding: 180px 0 0 420px;
    }

    .err404 h4 {
        font-size: 24px;
        color: #191919;
        padding-bottom: 16px
    }

    .err404 .go-home {
        width: 130px;
        height: 38px;
        background: #c9141d;
        line-height: 38px;
        font-size: 16px;
        color: #fff;
        text-align: center;
        display: inline-block;
        border-radius: 2px
    }
</style>
