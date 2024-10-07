<script setup lang="ts">
import { onMounted, ref } from 'vue';

    const tasks = ref<string[]>([]);

    const taskText = ref('');

    const addTask = () =>{
        if(taskText?.value){
            tasks.value.push(taskText?.value);
            taskText.value = ''
        }
    }

    const deleteTask = (index:number) =>{
        tasks.value.splice(index, 1)
    }

    onMounted(async()=>{
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        tasks.value = data?.slice(0,20)?.map((data: any) =>data?.title)
    })

</script>
<template >
    <div class=" max-w-[400px] w-full">
        <h3 class="text-xl font-semibold">
            Task manager
        </h3>
        <form @submit.prevent="addTask" class="input-field flex items-center mt-3">
            <input type="text" class="p-2 rounded border w-full outline-none" placeholder="Enter the task" v-model="taskText">
            <button type="submit" class="px-3 py-2 rounded bg-green-600 text-white" >Add</button>
        </form>

        <div class="list mt-7 h-96 overflow-auto px-3 ">
            <ul class="flex flex-col gap-3 " v-if="tasks?.length">
                <li class="flex items-center gap-2 w-full justify-between p-3 bg-slate-50 hover:bg-slate-100" 
                    v-for="(task,index) in tasks" :key="index"
                >
                    <span>{{task}}</span> 
                    <span @click="deleteTask(index)" class="cursor-pointer bg-red-500 rounded-full inline-block px-2 text-white">
                        x
                    </span>
                </li>
            </ul>
            <div v-else >
                No task available
            </div>
        </div>
    </div>
    
</template>

<style  scoped>
    
</style>