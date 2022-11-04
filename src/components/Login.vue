<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12 class="text-center">
        <v-img
          class="mx-auto"
          style="align-items: center; margin: 20px 0"
          src="/assets/doris.svg"
          height="300"
        />
      </v-flex>
      <v-flex xs12 text-xs-center mt-5 mb-3 class="text-center">
        <v-img src="/assets/doris_pb.svg" contain height="200px"></v-img>
      </v-flex>
      <v-flex xs12 text-xs-center mb-2>Plataforma</v-flex>
      <!--<Description :description="$t('login.DESCRIPTION')" />-->
      <v-flex xs12 sm6 offset-sm3>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(submit)">
            <v-layout column>
              <v-flex>
                <ValidationProvider rules="required|email" v-slot="{ errors }">
                  <v-text-field
                    id="email"
                    name="email"
                    type="email"
                    :label="$t('login.EMAIL')"
                    v-model="email"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex>
                <ValidationProvider rules="required|min:5" v-slot="{ errors }">
                  <v-text-field
                    id="password"
                    name="password"
                    type="password"
                    :label="$t('login.PASSWORD')"
                    v-model="password"
                    :error="errors.length > 0"
                    :error-messages="errors[0]"
                    autocomplete="off"
                  ></v-text-field>
                </ValidationProvider>
              </v-flex>
              <v-flex text-xs-center mt-5 mb-3>
                <SubmitButton :buttonText="$t('login.LOGIN')" />
                <v-btn color="error">
                  <v-icon left> mdi-google </v-icon>
                  Google
                </v-btn>
              </v-flex>
              <v-flex text-xs-center>
                <v-btn
                  :to="{ name: 'forgotPassword' }"
                  small
                  text
                  class="btnForgotPassword"
                  >{{ $t('login.FORGOT_PASSWORD') }}</v-btn
                >
              </v-flex>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
    </v-layout>
  </v-container>
</template>

<script>
import router from '@/router'
import { mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('login.TITLE')} - %s`
    }
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    async submit() {
      await this.userLogin({
        email: this.email,
        password: this.password
      })
    }
  },
  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  }
}
</script>
