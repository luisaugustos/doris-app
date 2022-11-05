<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="login-box" xs12 sm6 offset-sm3>
        <v-flex xs12 text-xs-center mt-5 mb-3 class="text-center">
          <v-img src="/assets/doris_pb.svg" contain height="200px"></v-img>
        </v-flex>
        <v-flex xs12 text-xs-center mb-2
          >DORIS: Plataforma para la detección la mejora y optimización del
          proceso de monitorización de defectos e imperfecciones en las
          carreteras publicas mediante el uso drones.</v-flex
        >
        <!--<Description :description="$t('login.DESCRIPTION')" />-->
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
              <v-row text-xs-center mt-10 mb-3 fill-height>
                <v-col cols="8">
                  <v-img
                    src="/assets/sas_logo.png"
                    style="margin-top: 15px"
                  ></v-img>
                </v-col>
                <v-col cols="4">
                  <v-img src="/assets/campus_logo.png"></v-img>
                </v-col>
              </v-row>
            </v-layout>
          </form>
        </ValidationObserver>
      </v-flex>
      <ErrorMessage />
    </v-layout>
  </v-container>
</template>

<style scoped>
.login-box {
  margin-top: 20px;
  background-color: #8080801c;
  border-radius: 5px;
  padding: 0 70px;
  padding-bottom: 30px;
}
</style>

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
