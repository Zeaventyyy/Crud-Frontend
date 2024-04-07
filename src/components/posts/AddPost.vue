<template>
  <form class="shadow-2xl p-8" @submit.prevent="submitForm">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h1 class="text-3xl font-bold leading-7 text-gray-900">Add Blog</h1>
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
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md"
              >
                <input
                  v-model="blogForm.title"
                  type="text"
                  name="blogtitle"
                  id="blogtitle"
                  autocomplete="blogtitle"
                  required
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
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
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
            <p class="mt-3 text-sm leading-6 text-gray-600">
              Write a few sentences about the blog you want to post.
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
        @click="savePost"
        type="submit"
        class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 min-w-32"
      >
        Save
      </button>
    </div>
  </form>
</template>
<script setup>
import Swal from "sweetalert2";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";

const blogForm = {
  userId: uuidv4(),
  id: uuidv4(),
  title: "",
  body: "",
};
var posts = [];

const router = useRouter();

const savePost = () => {
  console.log(blogForm);
  if (!(blogForm.title && blogForm.body)) {
    return;
  } else {
    posts.push(blogForm);
    localStorage.setItem("posts", JSON.stringify(posts));
    console.log(posts);

    Swal.fire({
      title: "Success!",
      text: "New Blog Created",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/dashboard");
      }
    });
  }
};

const backToDashboard = () => {
  router.push("/dashboard");
};

const getPosts = () => {
  if (localStorage.getItem("posts")) {
    try {
      console.log(localStorage.getItem("posts"));
      posts = JSON.parse(localStorage.getItem("posts"));
      console.log(posts);
    } catch (e) {
      return;
    }
  }
};

onMounted(() => {
  getPosts();
});
</script>
