<template>
	<div>
		<el-table :data="filterTableData">
			<el-table-column label="Date" prop="date" />
			<el-table-column label="Name" prop="name" />
			<el-table-column align="right">
				<template #header>
					<el-input v-model="search" placeholder="Type to search" />
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			v-model:currentPage="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[10, 20, 50, 100, 200]"
			layout="total, sizes, prev, pager, next, jumper"
			:total="1000"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>
<script setup lang="ts" name="ProfileIndex">
import { computed, ref } from 'vue'

interface User {
	date: string
	name: string
	address: string
}

const search = ref('')
const filterTableData = computed(() => tableData.filter(data => !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())))

const tableData: User[] = [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-02',
		name: 'John',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-04',
		name: 'Morgan',
		address: 'No. 189, Grove St, Los Angeles'
	},
	{
		date: '2016-05-01',
		name: 'Jessy',
		address: 'No. 189, Grove St, Los Angeles'
	}
]

const currentPage = ref(4)
const pageSize = ref(10)

const handleSizeChange = (val: number) => {
	console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
	console.log(`current page: ${val}`)
}
</script>

<style lang="scss" scoped></style>
