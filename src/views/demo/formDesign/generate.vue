<template>
	<el-card>
		<generate-form ref="generateFormRef" :data="widgetForm"> </generate-form>
		<el-button type="primary" @click="handleSubmit">提交</el-button>
	</el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const generateFormRef = ref()
const widgetForm = {
	list: [
		{
			type: 'grid',
			label: '格栅布局',
			columns: [
				{
					span: 12,
					list: [
						{
							type: 'input',
							label: '姓名',
							options: {
								defaultValue: '',
								width: '',
								maxlength: null,
								placeholder: null,
								labelHide: false,
								disabled: false,
								readonly: false,
								clearable: false,
								showPassword: false,
								showWordLimit: false,
								rules: [{ required: true, message: '必填项不能为空' }]
							},
							key: 'dwpmn6uc',
							name: 'username'
						},
						{
							type: 'input',
							label: '手机号',
							options: {
								defaultValue: '',
								width: '',
								maxlength: null,
								placeholder: null,
								labelHide: false,
								disabled: false,
								readonly: false,
								clearable: false,
								showPassword: false,
								showWordLimit: false,
								rules: [{ required: true, message: '必填项不能为空' }]
							},
							key: 'hyhsx55r',
							name: 'mobile'
						}
					]
				},
				{
					span: 12,
					list: [
						{
							type: 'input',
							label: '邮箱',
							options: {
								defaultValue: 'sunlightcs@gmail.com',
								width: '',
								maxlength: null,
								placeholder: null,
								labelHide: false,
								disabled: false,
								readonly: false,
								clearable: false,
								showPassword: false,
								showWordLimit: false,
								rules: [
									{ required: true, message: '必填项不能为空' },
									{ type: 'email', message: '格式不正确' }
								]
							},
							key: '597yfp6d',
							name: 'email'
						},
						{
							type: 'input',
							label: '密码',
							options: {
								defaultValue: '123456',
								width: '',
								maxlength: null,
								placeholder: null,
								labelHide: false,
								disabled: false,
								readonly: false,
								clearable: false,
								showPassword: true,
								showWordLimit: false,
								rules: [{ required: true, message: '必填项不能为空' }]
							},
							key: 'x5uf9z34',
							name: 'password'
						}
					]
				}
			],
			options: { gutter: 0, justify: 'start', align: 'top' },
			key: 'wa2vftrh',
			name: 'grid_glw4z1'
		},
		{
			type: 'radio',
			label: '性别',
			options: {
				defaultValue: '0',
				width: '',
				button: false,
				labelHide: false,
				disabled: false,
				options: [
					{ label: '男', value: '0' },
					{ label: '女', value: '1' },
					{ label: '保密', value: '2' }
				],
				optionsType: 'option',
				requestUrl: '',
				dictName: '',
				props: { value: 'value', label: 'label' },
				rules: []
			},
			key: 'm6ysynuj',
			name: 'gender'
		},
		{
			type: 'textarea',
			label: '介绍',
			options: {
				defaultValue: '',
				width: '',
				maxlength: null,
				placeholder: null,
				rows: 4,
				labelHide: false,
				disabled: false,
				readonly: false,
				clearable: false,
				showWordLimit: false,
				rules: []
			},
			key: 'kl7hbi8k',
			name: 'intro'
		}
	],
	config: { size: 'default', labelWidth: 100, labelPosition: 'right', style: '' }
}

const handleSubmit = () => {
	generateFormRef.value
		.getData()
		.then((data: any) => {
			console.log(data)
			// data 表单数据
		})
		.catch((error: any) => {
			// data failed
		})
}
</script>
