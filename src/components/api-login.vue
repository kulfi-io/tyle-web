<template>
  <div class="bg-color-heavy-rain">
    <b-container class="content-lg">
      <b-row class="account">
        <b-col cols="12" class="account-header">
          <h2 class="title">Login</h2>
          <p>
            <a href="/register">Register</a>
            <span>account</span>
          </p>
        </b-col>
        <kulfi-info :info="info" />
        <b-col cols="12" class="account-body">
          <b-form id="account-form" @submit="login">
            <b-row class="form-group">
              <kulfi-token/>
            </b-row>
            <b-row class="form-group">
              <kulfi-username :passed="passed" :muted="muted" :readyToSubmit="readyToSubmit"/>

              <kulfi-password
                :passed="passed"
                :muted="muted"
                :readyToSubmit="readyToSubmit"
                :tag="'password'"
                :placeholder="'Pass'"
                :title="'Password is required'"
                :label="'Password'"
              />
            </b-row>
            <b-row class="form-group">
              <b-col>
                <b-checkbox id="remember" ref="remember" v-model="remember">Remember me</b-checkbox>
              </b-col>
               <b-col>
                <b-link href="forgot">Forgot Password</b-link>
               </b-col>
            </b-row>
            <b-row class="form-group">
              <b-col>
                <b-button id="submit" type="submit"  class="form-control" ref="submit">Login</b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-col>
        <b-col cols="12" class="account-footer">
          <span class="required-field">*</span>
          - required field
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Service from "../micro-services/loginService";
import KulfiToken from "../components/kulfi/kulfi-token.vue"
import KulfiUsername from "../components/kulfi/kulfi-username.vue";
import KulfiPassword from "../components/kulfi/kulfi-password.vue";
import KulfiInfo from "../components/kulfi/kulfi-info.vue";
import Login from "../models/login";

let _info: string[] = [];

export default Vue.extend({
  name: "api-login",
  components: {
    KulfiToken,
    KulfiUsername,
    KulfiPassword,
    KulfiInfo
  },
  data: function() {
    return {
      info: _info,
      validated: false,
      remember: false,
      model: new Login()
    };
  },
  methods: {
    displayNotification: function() {
      var _options = <HTMLUListElement>document.querySelector('.info-list');

      var _classes = _options.className.match(/\S+/g) || [];
      var _display = _classes.indexOf("info-list-display");
      var _hidden = _classes.indexOf("info-list-hidden");


      if (_display < 0) {

          if(_hidden >= 0) {
          _classes.splice(_hidden, 1);
          }
          _classes.push("info-list-display");
          _options.className = _classes.join(" ");
          
      }

    },
    login: function(event: Event) {
      event.preventDefault();
      if(this.validated) {

        Service.login(this.model)
        .then((resp) => {
          this.info =[];
          this.info.push(resp.data.message);
        })
        .catch((err) => {
          this.info =[];
          this.info.push(err.response.data.message);
        });

        this.displayNotification();
      }

    },
    passed: function(elm: HTMLElement | null): void {
      if (elm) {
        var _classes = elm.className.match(/\S+/g) || [];
        var _passed = _classes.indexOf("passed");
        var _mutedIcon = _classes.indexOf("fa-base");
        if (_passed < 0) {
          _classes.push("passed");

          if (_mutedIcon >= 0) {
            _classes.splice(_mutedIcon, 1);
          }

          elm.className = _classes.join(" ");
        }
      }
    },
    submitPassed: function(elm: HTMLElement | null): void {
      if (elm) {
        var _classes = elm.className.match(/\S+/g) || [];
        var _passed = _classes.indexOf("btn-secondary-passed");
        if (_passed < 0) {
          _classes.push("btn-secondary-passed");

          elm.className = _classes.join(" ");
        }
      }
    },
    submitMuted: function(elm: HTMLElement | null): void {
      if (elm) {
        var _classes = elm.className.match(/\S+/g) || [];
        var _passed = _classes.indexOf("btn-secondary-passed");
        if (_passed >= 0) {
          _classes.splice(_passed, 1);

          elm.className = _classes.join(" ");
        }
      }
    },
    muted: function(elm: HTMLElement | null): void {
      if (elm) {
        var _classes = elm.className.match(/\S+/g) || [];
        var _muted = _classes.indexOf("text-muted");
        var _mutedIcon = _classes.indexOf("fa-base");
        var _passed = _classes.indexOf("passed");
        if (_passed >= 0) {
          _classes.splice(_passed, 1);

          if (_muted < 0 && !_mutedIcon) {
            _classes.push("text-muted");
          }

          if (_mutedIcon < 0) {
            _classes.push("fa-base");
          }

          elm.className = _classes.join(" ");
        }
      }
    },
    validateToken: function(token: HTMLInputElement): boolean {

      if(token) {
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
         .test(token.value))
        {
          return true;
        }
      }

      return false;
      
    },
    validateUserPass: function(pwd: HTMLInputElement, user: HTMLInputElement): boolean {

      if( /[a-zA-Z0-9-_]{5,15}\w+/.test(user.value) &&
          /[a-zA-Z0-9!@#$%]{8,15}/.test(pwd.value))
      {
        return true;
      } 
    
      return false;
      
    },
    readyToSubmit: function() {
      var _submit = <HTMLButtonElement>this.$el.querySelector("#submit");
      var _pwd = <HTMLInputElement>this.$el.querySelector("#password");
      var _username = <HTMLInputElement>this.$el.querySelector("#username");
      var _token = <HTMLInputElement>this.$el.querySelector("#token");

      if(this.$route.params) {
        if (
          this.validateUserPass(_pwd, _username) &&
          _token

        ) {

          this.model.username = _username.value;
          this.model.password = _pwd.value;
          this.model.token = _token.value;

          this.submitPassed(_submit);
          this.validated = true;

        } else {

          this.model = new Login();

          this.submitMuted(_submit);
          this.validated = false;
        }

      } else {

        if(this.validateUserPass(_pwd, _username))
        {

          this.model.username = _username.value;
          this.model.password = _pwd.value;

          this.submitPassed(_submit);
          this.validated = true;

        } else {

          this.model = new Login();

          this.submitMuted(_submit);
          this.validated = false;
        }
      }
      
    }
  }
});
</script>

