import pca from './pca.json'

interface DataItem {
	value: string
	label: string
	children?: DataItem[]
}

const pcaData: DataItem[] = Object.entries(pca).map(([province, cities]) => ({
	label: province,
	value: province,
	children: Object.entries(cities).map(([city, areas]) => ({
		label: city,
		value: city,
		children: areas.map((area: string) => ({
			label: area,
			value: area
		}))
	}))
}))

export { pcaData }
