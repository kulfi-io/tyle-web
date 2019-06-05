<template>
  <div class="bg-color-heavy-rain">
    <b-container class="content-lg">
      <b-row class="account">
        <b-col cols="12" class="account-header">
          <h2 class="title">Registration</h2>
          <p>
            <a href="/login">Login</a>
            <span>to account</span>
          </p>
        </b-col>
        <kulfi-info :info="info"></kulfi-info>
        <b-col cols="12" class="account-body">
          <b-form id="register-form" ref="register-form" @submit="register">
            <b-row class="form-group">
              <b-col>
                <label for="user-type" class="control-label">
                  User Type
                  <span class="required-field"></span>
                </label>
                <kulfi-toggle id="user-type" :toggle="toggleData"/>
              </b-col>
            </b-row>
            <!-- Username and Email -->
            <b-row class="form-group">
              <kulfi-username :passed="passed" :muted="muted" :readyToSubmit="readyToSubmit"/>
              <kulfi-email :passed="passed" :muted="muted" :readyToSubmit="readyToSubmit"/>
            </b-row>
            <!-- First and last name -->
            <b-row class="form-group">
              <kulfi-name
                :passed="passed"
                :muted="muted"
                :readyToSubmit="readyToSubmit"
                :tag="'firstName'"
                :placeholder="'First Name'"
                :title="'First name is required'"
              />

              <kulfi-name
                :passed="passed"
                :muted="muted"
                :readyToSubmit="readyToSubmit"
                :tag="'lastName'"
                :placeholder="'Last Name'"
                :title="'Last name is required'"
              />
            </b-row>
            <!-- Password and verify password  -->
            <kulfi-password-set
              :passed="passed"
              :muted="muted"
              :readyToSubmit="readyToSubmit"
              :tag="'password'"
              :placeholder="'Pass'"
              :title="'Password is required'"
              :label="'Password'"
            />

            <!-- Submit -->
            <b-row class="form-group">
              <b-col>
                <b-button id="submit" type="submit" class="form-control" ref="submit">Register</b-button>
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
import userService from "../micro-services/userService";
import mailService from "../micro-services/mailService";
import User from "../models/user";
import Option from "../models/options";
import Toggle from "../models/toggle";
import KulfiToggle from "../components/kulfi/kulfi-toggle.vue";
import KulfiUsername from "../components/kulfi/kulfi-username.vue";
import KulfiEmail from "../components/kulfi/kulfi-email.vue";
import KulfiInfo from "../components/kulfi/kulfi-info.vue";
import KulfiName from "../components/kulfi/kulfi-name.vue";
import KulfiPasswordSet from "../components/kulfi/kulfi-password-set.vue";

const _toggle = new Toggle();
_toggle.on = "Admin";
_toggle.off = "Basic";

let _info: string[] = [];

export default Vue.extend({
  name: "api-register",
  components: {
    KulfiToggle,
    KulfiUsername,
    KulfiEmail,
    KulfiInfo,
    KulfiName,
    KulfiPasswordSet,
  },
  data: function() {
    return {
      info: _info,
      model: new User(),
      logged: false,
      matched: false,
      validated: false,
      toggleData: _toggle,
      top:''
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
    register: function(e: Event) {
      e.preventDefault();
      if (this.validated) {

        userService.create(this.model)
          .then(resp => {
            var _first = <HTMLInputElement>this.$el.querySelector("#firstName");
            var _email = <HTMLInputElement>this.$el.querySelector("#email");

            this.info = [];
            this.info.push(
              `Thank you for creating an account ${_first.value}!` 
            );

            mailService.register(JSON.stringify(resp.data.message))
            .then(resp => {
              this.info.push(
                `An account verification email has been sent to ${_email.value}. 
                Please follow the instructions in the email to verify your registration.`
              );
            })
            .catch(mErr => {
              this.info = [];
              this.info.push(`Unable to send email to ${_email.value}. Please use another. Re-enter all values`);
              userService.delete(resp.data.message.userId);
              this.clearForm();
              this.readyToSubmit();

            });
            
          })
          .catch(err => {
            this.info = [];
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
    clearForm: function() {
      var _pwd = <HTMLInputElement>this.$el.querySelector("#password");
      var _verify = <HTMLInputElement>(
        this.$el.querySelector("#verify-password")
      );
      var _username = <HTMLInputElement>this.$el.querySelector("#username");
      var _email = <HTMLInputElement>this.$el.querySelector("#email");
      var _first = <HTMLInputElement>this.$el.querySelector("#firstName");
      var _last = <HTMLInputElement>this.$el.querySelector("#lastName");
      var _userType = <HTMLInputElement>this.$el.querySelector("#switch-id");


      _pwd.value='';
      _verify.value='';
      _username.value='';
      _email.value='';
      _first.value='';
      _last.value='';

      this.resetIcons();
    },
    resetIcons: function() {
      var _elements:HTMLElement[] = [];
      var _userFa = <HTMLElement>document.getElementById("fa-user");
      var _emailFa = <HTMLElement>document.getElementById("fa-email");
      var _firstFa = <HTMLElement>document.querySelector(`#fa-firstName`);
      var _lastFa = <HTMLElement>document.querySelector(`#fa-lastName`);
      var _emailFa = <HTMLElement>document.getElementById("fa-email");
      var _verFa = <HTMLElement>document.getElementById("fa-ver");
      var _pwdFa = <HTMLElement>document.querySelector(`#fa-pwd`);
      var _length = <HTMLElement>document.getElementById("pwd-length");
      var _upper = <HTMLElement>document.getElementById("pwd-upper");
      var _lower = <HTMLElement>document.getElementById("pwd-lower");
      var _number = <HTMLElement>document.getElementById("pwd-number");
      var _special = <HTMLElement>document.getElementById("pwd-special");
      var _match = <HTMLElement>document.getElementById("pwd-match");

      _elements.push(_userFa);
      _elements.push(_emailFa);
      _elements.push(_firstFa);
      _elements.push(_lastFa)
      _elements.push(_verFa);
      _elements.push(_pwdFa);
      _elements.push(_length);
      _elements.push(_upper);
      _elements.push(_lower);
      _elements.push(_number);
      _elements.push(_special);
      _elements.push(_match);

      _elements.forEach((item)  => {
        this.muted(item);
      });
    },
    readyToSubmit: function() {
      var _submit = <HTMLButtonElement>this.$el.querySelector("#submit");
      var _pwd = <HTMLInputElement>this.$el.querySelector("#password");
      var _verify = <HTMLInputElement>this.$el.querySelector("#verify-password");
      var _username = <HTMLInputElement>this.$el.querySelector("#username");
      var _email = <HTMLInputElement>this.$el.querySelector("#email");
      var _first = <HTMLInputElement>this.$el.querySelector("#firstName");
      var _last = <HTMLInputElement>this.$el.querySelector("#lastName");
      var _userType = <HTMLInputElement>this.$el.querySelector("#switch-id");

      if (
        /[a-zA-Z0-9-_]{5,15}\w+/.test(_username.value) &&
        /[\S-]+@([\S-]+\.)+[\S-]+/.test(_email.value) &&
        /[A-Za-z]{3,25}/.test(_first.value) &&
        /[A-Za-z]{3,25}/.test(_last.value) &&
        /[a-zA-Z0-9!@#$%]{8,15}/.test(_pwd.value) &&
        /[a-zA-Z0-9!@#$%]{8,15}/.test(_verify.value) &&
        _pwd.value === _verify.value &&
        _userType.getAttribute("data-value") != ""
      ) {
        this.model.username = _username.value;
        this.model.email = _email.value;
        this.model.firstName = _first.value;
        this.model.lastName = _last.value;
        this.model.password = _pwd.value;
        this.model.type = <string>_userType.getAttribute("data-value");

        this.submitPassed(_submit);
        this.$data.validated = true;
      } else {
        this.model = new User();

        this.submitMuted(_submit);
        this.$data.validated = false;
      }
    }
  }
});
</script>
