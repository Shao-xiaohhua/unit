<template>
  <header class="header">
    <a href="//12348.justice.gov.cn/sites/12348/team.jsp?active=0f4806060c7e4b669ea3f997525cacd7" target="_blank" class="logo pull-left" style="background-image:url('static/images/logo-red.png');" title="上海法治地图"></a>
    <ul class="nav pull-left">
      <li><a href="#" class="active">法律机构</a></li>
    </ul>
    <ul class="subnav pull-right">
      <li><a href="//www.justice.gov.cn" target="_blank">上海司法行政网</a></li>
      <li><span class="li-spacing"></span></li>
      <li><a href="//12348.justice.gov.cn" target="_blank">12348上海法网</a></li>
    </ul>
  </header>
</template>
<style lang="scss" rel="stylesheet/scss">
@import '../assets/scss/variables';
@import '../assets/scss/mixins';
.header{
  position: relative;
  z-index: 10000;
  padding: 0 $module-padding;
  height: 60px;
  border-bottom: 1px solid rgba(0,0,0,.08);
  box-shadow: 0 1px 3px rgba(0,0,0,.03);
  background-color: $white;
  @include clearfix();
  .logo{
    margin-top: 10px;
    height: 40px;
    width: 120px;
    background-position: left center;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }
}
.nav{
  margin: 0 0 0 50px;
  padding: 0;
  list-style: none;
  @include clearfix();
  li{
    float: left;
    padding: 10px 5px 0 5px;
  }
  a{
    display: block;
    padding: 0 10px;
    height: 50px;
    line-height: 40px;
    font-size: $font-size-large;
    color: $gray-base;
    border-bottom: 4px solid transparent;
    &:hover{
      color: $brand;
    }
    &.active{
      color: $brand;
      border-color: $brand;
    }
  }
}
.subnav{
  margin: 0;
  padding-top: 15px;
  list-style: none;
  @include clearfix();
  li{
    padding: 10px 0;
    float: left;
  }
  a{
    display: block;
    color: $gray-light;
    &:hover{
      color: $brand;
    }
  }
}
</style>
