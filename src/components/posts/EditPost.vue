<template>
  <form class="shadow-2xl p-8" @submit.prevent="submitForm">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h1 class="text-3xl font-bold leading-7 text-gray-900">
          Edit your Blog
        </h1>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          This information will be displayed publicly so be careful what you
          share.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-6">
            <label
              for="title"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Title</label
            >
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-600 sm:max-w-md"
              >
                <input
                  v-model="blogForm.title"
                  type="text"
                  name="blogtitle"
                  id="blogtitle"
                  autocomplete="blogtitle"
                  required
                  class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 truncate"
                  placeholder="Title of Blog"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="blog"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Blog</label
            >
            <div class="mt-2">
              <textarea
                v-model="blogForm.body"
                id="blogPost"
                name="blogPost"
                rows="3"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              Make sure you edit the right thing in your existing blog.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        @click="backToDashboard"
        type="button"
        class="text-sm font-semibold leading-6 text-white min-w-32"
      >
        Cancel
      </button>
      <button
        @click="saveEdittedPost"
        type="submit"
        class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 min-w-32"
      >
        Save
      </button>
    </div>
  </form>
</template>

<script setup>
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const POSTS = import.meta.env.VITE_POSTS_API_URL;

const postId = route.params.id;
console.log(postId);

var blogForm = ref({
  userId: "",
  id: postId,
  title: "",
  body: "",
});
var posts = [];

const backToDashboard = () => {
  router.push("/dashboard");
};

const getPosts = () => {
  if (localStorage.getItem("posts")) {
    try {
      console.log(localStorage.getItem("posts"));
      posts = JSON.parse(localStorage.getItem("posts"));
      blogData();
    } catch (e) {
      return;
    }
  }
};

const savePost = () => {
  localStorage.setItem("posts", JSON.stringify(posts));
};

const saveEdittedPost = () => {
  if (
    blogForm.value.body == postIdData().body &&
    blogForm.value.title.toUpperCase() == postIdData().title.toUpperCase() &&
    blogForm.value.userId == postIdData().userId
  ) {
    Swal.fire({
      title: "Confirmation?",
      text: `You did not edit the blog, go back to Dashboard?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/dashboard");
      }
    });
  } else {
    Swal.fire({
      title: "Confirmation?",
      text: `Are you sure you want to edit this Blog?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (blogForm != null) {
          try {
            const response = await axios.put(
              `${POSTS}/${postId}`,
              blogForm.value
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
          posts.splice(indexToDelete(), 1, blogForm.value);
          savePost();
          console.log(posts);
          Swal.fire(
            {
              title: "Success!",
              text: "Blog Updated",
              icon: "success",
            },
            router.push("/dashboard")
          );
        }
      }
    });
  }
};

const blogData = () => {
  if (postIdData() != null) {
    blogForm.value.body = postIdData().body;
    blogForm.value.title = postIdData().title.toUpperCase();
    blogForm.value.userId = postIdData().userId;
  }
};

const postIdData = () => {
  return posts.find((i) => i.id == blogForm.value.id);
};

const indexToDelete = () => {
  return posts.findIndex((o) => o.id == blogForm.value.id);
};

const removeIdPost = (x) => {
  posts.splice(x, 1);
};

onMounted(() => {
  getPosts();
  postIdData();
});
</script>
