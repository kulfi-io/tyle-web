<template>
  <footer class="footer">
    <!-- Links -->
    <div class="footer-seperator">
      <b-container class="footer-note-spacing">
        <b-row>
          
          <b-col>

            <b-row>
              <b-col >
                <ul class="list-unstyled footer-list">
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Home</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">About</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Products</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Pricing</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Clients</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Careers</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Contact</a>
                  </li>
                  <li class="footer-list-item">
                    <a class="footer-list-link" href="#">Terms</a>
                  </li>
                </ul>
              <!-- End List -->
              </b-col>
              <b-col >
                <ul class="list-unstyled footer-list">
                    <li class="footer-list-item">
                        <a class="footer-list-link" href="#">Twitter</a>
                    </li>
                    <li class="footer-list-item">
                        <a class="footer-list-link" href="#">Facebook</a>
                    </li>
                    <li class="footer-list-item">
                        <a class="footer-list-link" href="#">Instagram</a>
                    </li>
                    <li class="footer-list-item">
                        <a class="footer-list-link" href="#">YouTube</a>
                    </li>
                </ul>
              </b-col>

            </b-row>
            
          </b-col>

          <b-col>
            <h2 class="color-white">Send Us A Note</h2>
            <input
              type="text"
              class="form-control footer-input margin-b-20"
              placeholder="Name"
              required
            >
            <input
              type="email"
              class="form-control footer-input margin-b-20"
              placeholder="Email"
              required
            >
            <input
              type="text"
              class="form-control footer-input margin-b-20"
              placeholder="Phone"
              required
            >
            <textarea
              class="form-control footer-input margin-b-30"
              rows="6"
              placeholder="Message"
              required
            ></textarea>
            <button type="submit" class="btn-theme btn-theme-sm btn-base-bg text-uppercase">Submit</button>
          </b-col>

        </b-row>
        <!--// end row -->
      </b-container>
    </div>
    <!-- End Links -->
    <!-- Copyright -->
    <b-container class="footer-bottom-spacing">
      <b-row>
        <b-col cols="6">
          <a class="" href="/">
            <img class="footer-logo" src="../assets/img/favicon.png" alt="logo_icon">
          </a>
        </b-col>
        <b-col cols="6" class="text-right">
          <p class="margin-b-0 footer-powered">
            <a class="color-base footer-powered-label" href="/">Tyler-CMT</a> Powered by:
            <a class="color-base footer-powered-label" href="/">Kulfi.io</a>
          </p>
        </b-col>
      </b-row>
      <!-- end row -->
    </b-container>
    <!-- End Copyright -->
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: 'api-footer'
})
</script>

