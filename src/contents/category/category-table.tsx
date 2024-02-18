import React, { useEffect, useState } from 'react';

import styles from './category-table.module.scss'

import { CategoriesTreeModel, loadCategoriesTree } from '../../services/category-service';

const CategoriesTable: React.FC = () => {
    const [categories, setCategories] = useState<string[]>([])
    const [categoriesTree, setCategoriesTree] = useState<CategoriesTreeModel[]>([])

    useEffect(() => {
        featchLoadCategoriesTree()
            .then((tree) => setCategoriesTree(tree))
            .catch((error) => console.log(error))
    }, [])

    const featchLoadCategoriesTree = async (): Promise<CategoriesTreeModel[]> => {
        const tree = await loadCategoriesTree()
        return tree
    }
    return (
        <div className={styles.filter_category}>
            <Nodes children={categoriesTree} categories={categories} setCategories={setCategories} />
        </div>
    );
}

export default CategoriesTable;

type NodesProps = {
    categories: string[]
    setCategories: (categories: string[]) => void
    children: CategoriesTreeModel[]
}

const Nodes: React.FC<NodesProps> = (props: NodesProps) => {
    const [selectecCategoryIndex, setSelectedCategoryIndex] = useState<number | undefined>()

    const isCategoryActivated = (categoryId: string) => {
        return props.categories.includes(categoryId)
    }

    const handleNodeClick = (categoryId: string, index: number) => {
        if (isCategoryActivated(categoryId)) {
            props.setCategories(props.categories.filter(c => c !== categoryId));
            setSelectedCategoryIndex(undefined)
        } else if (selectecCategoryIndex !== undefined) {
            const newCategories = props.categories.filter(c => c !== props.children[selectecCategoryIndex].id)
            props.setCategories([...newCategories, categoryId]);
            setSelectedCategoryIndex(index)
        } else {
            props.setCategories([...props.categories, categoryId]);
            setSelectedCategoryIndex(index)
        }

    }

    return (
        <div className={styles.column}>
            <div className={styles.row}>
                {
                    props.children.length > 0 &&
                    props.children.map((category, index) => (
                        <div key={category.id} className={styles.column}>
                            <div
                                className={`${styles.node} ${isCategoryActivated(category.id) ? styles.active : ''}`}
                                onClick={() => handleNodeClick(category.id, index)}>
                                {props.children[index].name}
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                selectecCategoryIndex !== undefined &&
                <>
                    {props.children[selectecCategoryIndex].children.length > 0 && <div className={styles.arrow_down} />}
                    <Nodes
                        children={(props.children[selectecCategoryIndex].children)}
                        categories={props.categories}
                        setCategories={props.setCategories} />
                </>
            }
        </div>
    )
}
