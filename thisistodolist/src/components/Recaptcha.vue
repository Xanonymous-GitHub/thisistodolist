<template>
  <VueRecaptcha
    :loadRecaptchaScript="true"
    :sitekey="this.sitekey"
    @verify="validate"
  />
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
//import Validation from "@/services/recaptchaValidate.js";
export default {
  name: "recaptcha",
  components: { VueRecaptcha },
  data() {
    return {
      theme: "dark",
      sitekey: "6LeVCsQUAAAAAF1v-pYnAZer6Nr0_SN6HBzEiY-D"
    };
  },
  methods: {
    validate(response) {
      this.$emit("validate", response);
      // Validation.validate({ Response: response })
      //   .then(result => {
      //     this.$emit("validate", result.objectResult.success);
      //   })
      //   .catch();
    }
  }
};
</script>
