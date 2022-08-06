import React, { useState, useEffect } from 'react'
import CategoryContent from './components/CategoryContent'
import { getCategoryData } from '@a/CategoryApi'
import { Space, SpinLoading } from 'antd-mobile'

const Category = () => {
    const [categoryArr, setCategoryArr] = useState([])
    useEffect(() => {
        getCategoryData().then(res => {
            setCategoryArr(res.data)
        })
    }, [])
    return (
        <>
            {/* 侧边栏 */}
            {categoryArr.length ? <CategoryContent categoryArr={categoryArr} /> : <Space direction='horizontal' wrap block style={{ '--gap': '50px', height: '100vh', paddingTop: '240px', paddingLeft: '165px' }}>
                <SpinLoading color='primary' />
            </Space>}
        </>
    )
}

export default Category
