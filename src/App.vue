<template>
  <v-app>
    <v-content>
      <MultiStepForm />
    </v-content>
  </v-app>
</template>

<script>
  import MultiStepForm from "./components/MultiStepForm";

  export default {
    name: 'App',

    components: {
      MultiStepForm,
    },

    data: () => ({
      //
    }),
  };
</script>
