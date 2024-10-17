<script setup>
import { onBeforeMount, ref, watch } from 'vue';

const prayerData = ref(null);
async function fetchData() {
  try {
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://muslimsalat.com/dhaka/daily.json', {
      headers: {
        'Origin': 'http://localhost:5173',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });

    prayerData.value = (await response.json()).items[0];

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
onBeforeMount(() => {
  fetchData();
});

let nextPrayer;
function convertAndCompare(timeStr1, timeStr2, index) {
  let [hour1, minute1, period1] = timeStr1.split(/:| /);
  let [hour2, minute2, period2] = timeStr2.split(/:| /);

  let hourA = parseInt(hour1);
  let hourB = parseInt(hour2);

  if (period1 === "pm" && hourA !== 12) {
    hourA += 12;
  } else if (period1 === "am" && hourA === 12) {
    hourA = 0;
  }


  if (period2 === "pm" && hourB !== 12) {
    hourB += 12;
  } else if (period2 === "am" && hourB === 12) {
    hourB = 0;

  }

  let currentTime = new Date();
  let parsedTime1 = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hourA, parseInt(minute1));
  let parsedTime2 = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hourB, parseInt(minute2));

  if (index == 5) {
    parsedTime1 = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() - 1, hourA, parseInt(minute1));
  }

  // console.log(currentTime)
  // console.log(parsedTime1)
  // console.log(parsedTime2)
  // console.log('-----')
  if (currentTime > parsedTime1 && currentTime < parsedTime2) {
    nextPrayer = parsedTime2;
    return true;
  } else {
    return false;
  }
}

const result = ref(null);
watch(prayerData, (data) => {
  const itemsList = [
    { currentPrayer: "fajr", nextPrayer: "shurooq" },
    { currentPrayer: "shurooq", nextPrayer: "dhuhr" },
    { currentPrayer: "dhuhr", nextPrayer: "asr" },
    { currentPrayer: "asr", nextPrayer: "maghrib" },
    { currentPrayer: "maghrib", nextPrayer: "isha" },
    { currentPrayer: "isha", nextPrayer: "fajr" },
  ];

  for (let i = 0; i < 6; i++) {
    result.value = convertAndCompare(data[itemsList[i].currentPrayer], data[itemsList[i].nextPrayer], i);
    if (result.value === true) {
      result.value = itemsList[i];
      break;
    }
    else continue;
  }

  if (result.value != null) {
    setInterval(checkRemainingTime, 1000);
  }
})

const remainingTime = ref(null);
function checkRemainingTime() {
  const timeDiff = Math.max(0, nextPrayer - Date.now());
  const seconds = Math.floor(timeDiff / 1000);
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const remainingSeconds = String(seconds % 60).padStart(2, '0');
  remainingTime.value = `${hours}:${minutes}:${remainingSeconds}`;
}

</script>



<template>

  <div class="flex items-center justify-center  bg-white">
    <div class="relative bg-white rounded-3xl shadow-2xl p-8 text-center w-80 max-w-sm mx-auto border border-gray-200">
      <!-- Prayer Name -->
      <h1 class="text-4xl font-extrabold text-indigo-700 mb-6" v-if="result != null">{{
        result.currentPrayer.toUpperCase() }}
      </h1>

      <!-- Time Started and Time Ends -->
      <div class="text-lg text-gray-700 mb-4">
        <p>Time started at: <span class="font-semibold text-gray-900" v-if="result != null">{{
          prayerData[result.currentPrayer] }}</span></p>
        <p>Time ends at: <span class="font-semibold text-gray-900" v-if="result != null">{{
          prayerData[result.nextPrayer] }}</span></p>
      </div>

      <!-- Remaining Time -->
      <div class="text-lg mt-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-md"
        v-if="remainingTime != null">
        Remaining Time: <span id="remaining-time">{{ remainingTime }}</span>
      </div>

      <!-- Icon (Settings) -->
      <button class="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <img src="/public/icon.png" style="height:50px; width:50px">
      </button>
    </div>
  </div>

</template>