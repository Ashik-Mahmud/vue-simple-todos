<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
    const taskText = ref('');
    const isEdit = ref(false)
    const editIndex= ref<null | number>(null)
    const state  = reactive<{isLoading: boolean, tasks: string[]}>({
        isLoading: true,
        tasks: []
    })

    const addTask = () =>{
        if(isEdit.value){
            
            if (editIndex.value !== -1) {
                state.tasks[editIndex?.value as number] = taskText.value;
                isEdit.value = false;
                editIndex.value = -1;
                taskText.value = ''
            }
           
        }else{
            if(taskText?.value){
            state.tasks.unshift(taskText?.value as string);
            taskText.value = ''
        }
        }
       
    }

    const deleteTask = (index:number) =>{
        state.tasks.splice(index, 1)
    }

    const openEditMode =(task: string,index: number) =>{
        taskText.value = task;
        editIndex.value = index;
        isEdit.value=true;
    }

    onMounted(async()=>{
        
       try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        state.tasks = data?.slice(0,20)?.map((data: any) =>data?.title)
        state.isLoading = false;
       } catch (error) {
        state.isLoading = false;
       }
    })

</script>
<template >
    <div class=" w-[400px] ">
        <h3 class="text-xl font-semibold">
            Task manager
        </h3>
        <form @submit.prevent="addTask" class="input-field flex items-center mt-3">
            <input type="text" class="p-2 rounded border w-full outline-none" placeholder="Enter the task" v-model="taskText">
            <button type="submit" class="px-3 py-2 rounded bg-green-600 text-white" >{{isEdit ? 'Edit': 'Add'}}</button>
            <button type="button" v-if="isEdit" @click="isEdit=false; taskText=''" class="px-3 py-2 rounded ml-2 bg-red-600 text-white" >Cancel</button>
            
        </form>

        <div class="list mt-7 h-96 overflow-auto px-3 ">
            <div v-if="!state.isLoading">
                <ul class="flex flex-col gap-3 " v-if="state.tasks?.length">
                    <li class="flex items-center gap-2 w-full justify-between p-3 bg-slate-50 hover:bg-slate-100" 
                        v-for="(task,index) in state.tasks" :key="index"
                        @dblclick="openEditMode(task, index)"
                    >
                        <span>{{task}}</span> 
                        <span @click.prevent="deleteTask(index)" class="cursor-pointer select-none bg-red-500 rounded-full inline-block px-2 text-white">
                            x
                        </span>
                    </li>
                 </ul>
                <div v-else >
                    No task available
                </div>
            </div>

            <div class="flex items-center justify-center" v-else>
                <div class="w-10 h-10 rounded-full border border-t-green-500 animate-spin"></div>
            </div>
           
        </div>
    </div>
    
</template>

<style  scoped>
    
</style>