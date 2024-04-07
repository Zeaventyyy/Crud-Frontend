<template>
  <div class="flex flex-col h-full">
    <div class="flex h-16 justify-between items-center p-3 px-24 mx-24 mt-6">
      <h1 class="text-lg font-extrabold">{{ menuTitle }}</h1>
      <router-link
        to="/posts/add"
        class="flex items-center p-2 bg-gray-500 hover:bg-gray-100 hover:text-gray-500 rounded-lg text-white font-extrabold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <div>
          {{ buttonTitle }}
        </div>
      </router-link>
    </div>

    <div class="flex flex-1 justify-center items-center pt-5 mx-24 my-4">
      <ul class="grid grid-cols-3 gap-4">
        <div
          class="shadow-2xl bg-white rounded-xl w-96 p-4 mb-4"
          v-for="(post, n) in posts"
          :key="post.id"
        >
          <div
            class="flex justify-between items-center min-h-16 max-h-20 p-2 mb-2"
          >
            <span class="font-medium truncate mr-2 text-black">{{
              post.title.toUpperCase()
            }}</span>
            <div class="flex">
              <router-link
                :to="{
                  path: `/posts/${post.id}/edit`,
                }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="black"
                  fill-opacity="0.5"
                >
                  <path
                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </router-link>
              <a class="cursor-pointer" @click="removePosts(n)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="black"
                  fill-opacity="0.5"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div class="rounded-xl min-h-48 p-2 font-thin">
            <span class="text-black">{{ post.body }}</span>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";

const POSTS = import.meta.env.VITE_POSTS_API_URL;

const menuTitle = "Blog Posts";
const buttonTitle = "Add New Post";
var posts = ref([]);

const removePosts = (x) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      posts.value.splice(x, 1);
      saveNewPost();
      Swal.fire({
        title: "Success!",
        text: "Blog Deleted",
        icon: "success",
      });

      try {
        const response = await axios.delete(`${POSTS}/${x}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      console.log(posts);
    }
  });
};

const saveNewPost = () => {
  const parsed = JSON.stringify(posts.value);
  localStorage.setItem("posts", parsed);
};

const getPosts = async () => {
  try {
    if (localStorage.getItem("posts") === null) {
      const response = await axios.get(POSTS);
      if (response.status == "200") {
        Swal.fire({
          title: "Success!",
          text: "Data Found",
          icon: "success",
        });
        localStorage.setItem("posts", JSON.stringify(response.data.results));
        console.log(localStorage.getItem("posts"));
        posts.value = JSON.parse(localStorage.getItem("posts"));
        console.log(posts.value);
      } else {
        Swal.fire({
          title: "Error!",
          text: "No Data Found",
          icon: "error",
        });
      }
    } else if (localStorage.getItem("posts")) {
      posts.value = JSON.parse(localStorage.getItem("posts"));
      console.log();
    }
  } catch (error) {}
};

onMounted(() => {
  getPosts();
});
</script>

<style>
body {
  color: black;
}
</style>
