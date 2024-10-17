<script setup>
import { onBeforeMount, ref, watch } from 'vue';

const districts = ref(null);
async function fetchDistricts() {
    let response = await fetch('https://bdapis.com/api/v1.2/districts');
    districts.value = (await response.json()).data;
}
onBeforeMount(() => {
    fetchDistricts();
})

const isDisabled = ref(true);
const selectedDistrict = ref(localStorage.getItem('location') || '');
const buttonText = ref('Save Changes');

watch(selectedDistrict, (district) => {
    isDisabled.value = !(district !== '');
    buttonText.value = "Save Changes";
});

function updateLocation() {
    localStorage.setItem('location', selectedDistrict.value);
    buttonText.value = "Updated";
}

</script>
<template>
    <div class="relative bg-white rounded-3xl shadow-2xl p-8 w-80 max-w-sm mx-auto border border-gray-200">

        <!-- Back Button -->
        <router-link :to="{ name: 'Home' }">
            <button class="absolute top-2 right-5  text-indigo-700 hover:text-gray-600">
                &#8592; Back
            </button>
        </router-link>

        <!-- District Selection -->
        <div class="mb-4 text-left">
            <label for="district" class="block text-gray-700 font-semibold mb-2">Select District:</label>
            <select id="district" name="district" class="w-full p-2 border border-gray-300 rounded-lg"
                v-model="selectedDistrict">
                <option value="">Choose District</option>
                <option v-if="districts" v-for="district in districts" :key="district.district"
                    :value="district.district">{{
                        district.district
                    }}
                </option>
            </select>
        </div>

        <!-- Update Location Button -->
        <button class="w-full mt-2 py-2  text-white font-bold rounded-full shadow-md "
            :class="isDisabled ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'" :disabled="isDisabled"
            @click="updateLocation"> {{ buttonText }}
        </button>

    </div>
</template>