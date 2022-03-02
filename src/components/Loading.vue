<template>
    <div class="loader-cover">
        <div class="loader">
            <div class="part">
                <div class="part">
                    <div class="part">
                        <div class="part">
                            <div class="part"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.loader-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9999;
}
.loader{
    list-style: none;
    padding: 0;
    margin: 0;
    color: #c849db;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
    width: 50px;
    height: 50px;
    text-align: center;
    animation: scale 3.5s ease;

    &:after{
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      margin-top: -12px;
      margin-left: -12px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      border: 2px solid;
      animation: rotation-z 2s linear 0s infinite;
    }

    .part{
        border-radius: 50%;
        display: inline-block;
    }

    @mixin part( $size, $border, $time, $animation ) {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: $border solid transparent;
        border-left: $border solid;
        animation: stop 3s cubic-bezier(.28,1.9,1,.9), $animation $time linear 0s infinite forwards;
    }

    & > .part{
        @include part(50px, 5px, 2s, rotation-left);
    }

    & > .part > .part{
        @include part(40px, 5px, 1s, rotation-right);
    }

    & > .part > .part > .part{
        @include part(30px, 4px, 3s, rotation-left);
    }

    & > .part > .part > .part > .part{
        @include part(20px, 3px, 10s, rotation-right);
    }

    & > .part > .part > .part > .part > .part{
       @include part(10px, 3px, 1s, rotation-left); border-right: 3px solid;
    }

}

@keyframes scale {
    0%{
        transform: scale(1,1);
    }
    50%{
        transform: scale(1.5,1.5);
    }
    100%{
        transform: scale(1,1);
    }
}

@keyframes stop {
    from{
        transform: rotate(360deg);
    }
    to{
        transform: rotate(0deg);
    }
}

@keyframes rotation-z {
    from{
        transform: rotateY(0deg);
    }
    to{
        transform: rotateY(360deg);
    }
}

@keyframes rotation-right {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}

@keyframes rotation-left {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(-360deg);
    }
}
</style>
