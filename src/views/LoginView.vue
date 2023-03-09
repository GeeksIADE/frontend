<template>
    <div class="login-frame container">
        <div class="row justify-content-md-center justify-content-center">
            <div class="col">
                PLACEHOLDER
                <img src="../assets/test.png" alt="" srcset="" class="img-fluid">
            </div>
            <div class="login-frame-right col full-height justify-content-center">
                <div class="col-12 text-center align-self-center py-5">
                    <div class="section pb-5 pt-5 pt-sm-2 text-center">
                        <h6 class="mb-0 pb-3"><span>{{ $t("nav.login") }}</span><span>{{ $t("nav.signup") }}</span></h6>
                        <input class="checkbox" type="checkbox" id="reg-log" name="reg-log" /> <label for="reg-log"></label>
                        <div class="card-3d-wrap mx-auto">
                            <div class="card-3d-wrapper">
                                <div class="card-front">
                                    <div class="center-wrap">
                                        <div class="section text-center">
                                            <h4 class="mb-4 pb-3">{{ $t("nav.login") }}</h4>
                                            <div class="form-group"> <input type="email" name="logemail" class="form-style"
                                                    :placeholder="$t('login.email')" id="logemail" autocomplete="none"> <i
                                                    class="input-icon fa fa-at"></i> </div>
                                            <div class="form-group mt-2"> <input type="password" name="logpass"
                                                    class="form-style" :placeholder="$t('login.password')" id="logpass"
                                                    autocomplete="none"> <i class="input-icon fa fa-lock"></i> </div> <a
                                                href="#" class="btn mt-4">{{ $t("login.login") }}</a>
                                            <p class="mb-0 mt-4 text-center"> <a href="#0" class="link">{{
                                                $t("login.forgot") }}</a> </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-back">
                                    <div class="center-wrap">
                                        <div class="section text-center">
                                            <h4 class="mb-4 pb-3">{{ $t("nav.signup") }}</h4>
                                            <div class="form-group"> <input type="text" name="logname" class="form-style"
                                                    :placeholder="$t('signup.fullname')" id="logname" autocomplete="none">
                                                <i class="input-icon fa fa-user"></i>
                                            </div>
                                            <div class="form-group mt-2"> <input type="email" name="logemail"
                                                    class="form-style" :placeholder="$t('signup.email')" id="
                                                                                        logemail" autocomplete="none"> <i
                                                    class="input-icon fa fa-at"></i>
                                            </div>
                                            <div class="form-group mt-2"> <input type="password" name="logpass"
                                                    class="form-style" :placeholder="$t('signup.password')" id="logpass"
                                                    autocomplete="none"> <i class="input-icon fa fa-lock"></i> </div> <a
                                                href="#" class="btn mt-4">{{ $t("signup.signup") }}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900');

/* @media (min-width: 1024px) {
    .login {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
} */

.login-frame {
    margin-top: 20%;
    margin-left: 5%;
}

.login-frame-right {
    margin-top: -13%;
}

body {
    font-family: 'OpenSans', sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 1.7;
    color: #fff;
    overflow-x: hidden
}

a {
    cursor: pointer;
    transition: all 200ms linear
}

a:hover {
    text-decoration: none
}

.link {
    color: #fff
}

.link:hover {
    color: #ffffff
}

p {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.7
}

h4 {
    font-weight: 600
}


h6 span {
    padding: 0 20px;
    text-transform: uppercase;
    font-weight: 700
}

.section {
    position: relative;
    width: 100%;
    display: block
}

.full-height {
    min-height: 50vh
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked) {
    position: absolute;
    left: -9999px
}

.checkbox:checked+label,
.checkbox:not(:checked)+label {
    position: relative;
    display: block;
    text-align: center;
    width: 60px;
    height: 16px;
    border-radius: 2px;
    padding: 0;
    margin: 10px auto;
    cursor: pointer;
    background-color: #ffffff
}

.checkbox:checked+label:before,
.checkbox:not(:checked)+label:before {
    position: absolute;
    display: block;
    width: 36px;
    height: 36px;
    border-radius: 10%;
    color: #660b9b;
    background-color: #2a2b38;
    content: '';
    z-index: 20;
    font-size: 12px;
    top: -10px;
    left: -10px;
    line-height: 36px;
    text-align: center;
    font-size: 24px;
    transition: all 0.5s ease
}

.checkbox:checked+label:before {
    transform: translateX(44px) rotate(-270deg)
}

.card-3d-wrap {
    position: relative;
    width: 440px;
    max-width: 100%;
    height: 400px;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    perspective: 800px;
    margin-top: 40px
}

.card-3d-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transition: all 600ms ease-out
}

.login-div {
    width: 150px
}

.card-front,
.card-back {
    width: 100%;
    height: 100%;
    background-color: #2a2b38;
    position: absolute;
    border-radius: 0px;
    left: 0;
    top: 0;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    backface-visibility: hidden
}

.card-back {
    transform: rotateY(180deg)
}

.checkbox:checked~.card-3d-wrap .card-3d-wrapper {
    transform: rotateY(180deg)
}

.center-wrap {
    position: absolute;
    width: 100%;
    padding: 0 35px;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 35px) perspective(100px);
    z-index: 20;
    display: block
}

.form-group {
    position: relative;
    display: block;
    margin: 0;
    padding: 0
}

.form-style {
    padding: 13px 20px;
    padding-left: 55px;
    height: 48px;
    width: 100%;
    font-weight: 500;
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.5px;
    outline: none;
    color: #ffffff;
    background-color: #14151b;
    border: none;
    transition: all 200ms linear;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2)
}

.form-style:focus,
.form-style:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21, 21, 21, .2)
}

.input-icon {
    position: absolute;
    top: 0;
    left: 18px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    text-align: left;
    color: #660b9b;
    transition: all 200ms linear
}

.form-group input:-ms-input-placeholder {
    color: #ffffff;
    opacity: 0.7;
    transition: all 200ms linear
}

.form-group input::-moz-placeholder {
    color: #ffffff;
    opacity: 0.7;
    transition: all 200ms linear
}

.form-group input:-moz-placeholder {
    color: #ffffff;
    opacity: 0.7;
    transition: all 200ms linear
}

.form-group input::-webkit-input-placeholder {
    color: #ffffff;
    opacity: 0.7;
    transition: all 200ms linear
}

.form-group input:focus:-ms-input-placeholder {
    opacity: 0;
    transition: all 200ms linear
}

.form-group input:focus::-moz-placeholder {
    opacity: 0;
    transition: all 200ms linear
}

.form-group input:focus:-moz-placeholder {
    opacity: 0;
    transition: all 200ms linear
}

.form-group input:focus::-webkit-input-placeholder {
    opacity: 0;
    transition: all 200ms linear
}

.btn {
    border-radius: 4px;
    height: 48px;
    width: 100%;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    transition: all 200ms linear;
    padding: 0 30px;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    -ms-flex-pack: center;
    text-align: center;
    border: none;
    background-color: #660b9b;
    color: #fff;
    box-shadow: 0 8px 24px 0 rgba(18, 248, 173, .2)
}

.btn:active,
.btn:focus {
    background-color: #fff;
    color: #EA2C62;
    box-shadow: 0 8px 24px 0 rgba(255, 255, 255, .2)
}

.btn:hover {
    background-color: #fff;
    color: #660b9b;
    box-shadow: 0 8px 24px 0 rgba(255, 255, 255, .2)
}
</style>
  