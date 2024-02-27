import React, { useEffect, useState } from 'react'

import styles from './dashboard.module.scss'

import { PieChart, Pie, ResponsiveContainer, Legend, Cell, PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import { loadArticles } from '../../services/article-service';
import { ArticleModel } from '../../models/article';

const COLORS = ['#0660df', '#00C49F', '#FFBB28', '#FF8042']

const DashboardPage: React.FC = () => {
    const [articles, setArticles] = useState<ArticleModel[]>()

    useEffect((): void => {
        fetchData()
            .then((data) => setArticles(data))
            .catch((error) => console.log(error))
    }, [])

    const fetchData = async (): Promise<ArticleModel[]> => {
        const data = await loadArticles()
        return data.articles
    }

    const types = articles?.map((article) => article.type)
    const uniqueTypes = types?.filter((value, index, self) => self.indexOf(value) === index)
    const porcentageOfTypes = uniqueTypes?.map((type) => {
        const count = types?.filter((t) => t === type).length
        return count && types && { name: type, value: (count / types.length) * 100 }
    })

    const categories = articles?.map((article) => article.categories)
    const categoriesNames = categories?.flat().map((category) => category.name)
    const uniqueCategories = categoriesNames?.filter((value, index, self) => self.indexOf(value) === index)
    const radarOfCategories = uniqueCategories?.map((category) => {
        const count = categoriesNames?.filter((c) => c === category).length
        return { name: category, value: count, fullMark: categoriesNames?.length }
    })

    console.log(radarOfCategories)

    return (
        <div className={styles.dashboard}>
            <div className={styles.chart_container}>
                <label>Porcentage of types:</label>
                <div className={styles.pie_chart}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={porcentageOfTypes}
                                label
                                legendType="circle"
                            >
                                {porcentageOfTypes?.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend
                                layout="horizontal"
                                verticalAlign="bottom"
                                align="center"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={styles.chart_container}>
                <label>Radar of category:</label>
                <div className={styles.pie_chart}>
                    <ResponsiveContainer>
                        <RadarChart data={radarOfCategories}>
                            {/* set color white */}
                            <PolarGrid
                                fill="#0660df"
                            />
                            <PolarAngleAxis
                                dataKey="name"
                            />
                            <Radar
                                dataKey="value"
                                stroke="#0660df"
                                fill="#0660df"
                                dot
                                fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage