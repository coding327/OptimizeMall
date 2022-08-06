import styled from "styled-components"

export const TabStyled = styled.div`
    position: fixed;
    bottom: 0;
    height: 50px;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .adm-tab-bar {
        width: 150px;
        .adm-tab-bar-item-active {
            color: inherit;
        }
        .adm-badge {
            position: absolute;
            top: -3px;
            right: -13px;
        }
    }
    button {
        width: 100px;
        height: 40px;
        background-color: #1ba784;
        border-radius: 20px;
        color: #fff;
    }
    .leftbtn {
        background-color: #d9f6ef;
        color: green;
    }
`