<template>
  <div>
    <h1 class="text-3xl font-bold text-indigo-500">Welcome User!</h1>
    <h2 class="text-xl text-indigo-300">This is the home page</h2>
    <router-link :to="{ name: 'About' }" class="text-blue-500 underline">Go to about page</router-link>
    <span class="text-xs text-gray-400 absolute left-10 bottom-10">Develop branch</span>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
