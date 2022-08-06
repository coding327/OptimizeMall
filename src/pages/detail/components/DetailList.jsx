import React, { useState, useEffect } from 'react'
import { Popup } from 'antd-mobile'

const DetailList = (props) => {
    const [visible1, setVisible1] = useState(false)
    useEffect(() => {
        console.log(props.good) // 成功拿到父传递过来数据
        // eslint-disable-next-line
    }, [])
    const free = () => {
        if (props.good.basicInfo.logisticsId) {
            // note: 三目表达式优先级最低加上括号[可以用模板字符串]
            // return '运费' + (props.good.logistics.isFree ? '不包邮' : '包邮')
            return `运费${props.good.logistics.isFree ? '不包邮' : '包邮'}`
        } else {
            return '无需配送'
        }
    }
    // 显示底部弹出层
    const clickJ = () => {
        setVisible1(true)
    }
    return (
        <>
            <div style={{ padding: '10px 15px 5px', boxSizing: 'border-box', background: '#fff' }}>
                <h2 style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>￥{props.good.basicInfo.minPriceOriginal}</h2>
                <span style={{ textDecoration: 'line-through', fontSize: '12px' }}>价格：￥{(+props.good.basicInfo.originalPrice).toFixed(2)}</span>
                <h2 style={{ margin: '15px 0', fontSize: '16px' }}>{props.good.basicInfo.name}</h2>
                <p style={{ fontSize: '12px', color: '#999', marginBottom: '10px', lineHeight: '20px' }}>{props.good.basicInfo.characteristic}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 10px', color: '#666', borderTop: '1px solid #ddd' }}>
                    <span>{free()}</span>
                    <span>剩余{props.good.basicInfo.stores}</span>
                </div>
            </div>
            <div onClick={clickJ} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '40px', fontSize: '16px', borderTop: '8px solid #eee', borderBottom: '8px solid #eee', background: '#fff', padding: '0px 15px' }}>
                <span>领劵</span>
                <span> &gt; </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', height: '40px', fontSize: '16px', borderTop: '8px solid #eee', borderBottom: '8px solid #eee', background: '#fff', padding: '0px 15px 50px' }}>
                <span>服务 收货后结算·支持退款</span>
            </div>
            <Popup
                visible={visible1}
                showCloseButton
                onClose={() => {setVisible1(false)}}
                onMaskClick={() => {
                    setVisible1(false)
                }}
                bodyStyle={{
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    height: '44vh' }}
            >
                <center style={{padding: '20px 0'}}>优惠劵</center>
                <div style={{margin: '0 15px 10px', height: '76px', background: '#ffeeee', borderRadius: '8px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <div className='leftBox'>
                        <p style={{marginBottom: '5px', color: '#ff4b52'}}>￥<span style={{fontSize: '20px'}}>1</span></p>
                        <p style={{ color: '#ff4b52' }}>满99元可用</p>
                    </div>
                    <div className='leftBox'>
                        <p style={{ marginBottom: '5px', color: '#ff4b52'}}>1元券</p>
                        <p style={{ color: '#d7a0a5'}}>领取后7天到期</p>
                    </div>
                    <div className='rightBox'>
                        <button style={{ color: '#fff', background: '#ff4b52', width: '70px', height: '20px', borderRadius: '20px', fontSize: '12px'}}>立即领取</button>
                    </div>
                </div>
                <div style={{margin: '0 15px', height: '76px', background: '#ffeeee', borderRadius: '8px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <div className='leftBox'>
                        <p style={{marginBottom: '5px', color: '#ff4b52'}}>￥<span style={{fontSize: '20px'}}>1</span></p>
                        <p style={{ color: '#ff4b52' }}>满99元可用</p>
                    </div>
                    <div className='leftBox'>
                        <p style={{ marginBottom: '5px', color: '#ff4b52'}}>1元券</p>
                        <p style={{ color: '#d7a0a5'}}>领取后7天到期</p>
                    </div>
                    <div className='rightBox'>
                        <button style={{ color: '#fff', background: '#ff4b52', width: '70px', height: '20px', borderRadius: '20px', fontSize: '12px'}}>立即领取</button>
                    </div>
                </div>
                <button style={{width: '92%' ,height: '44px', background: '#07c160', margin: '20px 15px 0', borderRadius: '22px', color: '#fff'}}>完成</button>
            </Popup>
        </>
    )
}

export default DetailList
