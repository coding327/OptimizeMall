import styled from "styled-components"

export const UserStyle = styled.div`
    height: 170px;
    background-color: #1ba784;
    padding: 40px 15px;
    display: flex;
    box-sizing: border-box;
    span {
        font-size: 20px;
        color: #fff;
        padding-top: 28px;
        margin-left: 10px;
    }
`

export const BalanceStyle = styled.div`
    padding: 15px 10px;
    .adm-jumbo-tabs-header {
        width: 100%;
        height: 50px;
        background-color: #fff;
        padding-bottom: 10px;
        .adm-jumbo-tabs-tab-description {
            color: #000;
            background-color: transparent;
        }
    }
`

export const OrderStyle = styled.div`
    margin: 0 10px 15px;
    height: 113px;
    background-color: #fff;
    box-sizing: border-box;
    .orderHead {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #f7f4f4;
    }
    .adm-tab-bar-item-active, .adm-tab-bar-item {
            color: #000!important;
    }
`

export const ComStyle = styled.div`
    margin: 5px 10px 15px;
    height: 170px;
    background-color: #fff;
    box-sizing: border-box;
    .orderHead {
        display: flex;
        justify-content: space-between;
        height: 48px;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid #f7f4f4;
    }
    .adm-tab-bar-item-active, .adm-tab-bar-item {
            color: #000!important;
    }
    .adm-tab-bar:last-of-type>.adm-tab-bar-wrap:last-of-type {
        padding-top: 10px;
        width: 86px;
    }
`

export const BoxStyle = styled.div`
    height: 80px;
    background-color: #f4f1f1;
`