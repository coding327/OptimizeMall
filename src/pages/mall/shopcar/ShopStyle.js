import styled from 'styled-components'

export const BeforeStyled = styled.div`
    .adm-empty-description {
        color: inherit;
    }
    .box {
        display: flex;
        justify-content: center;
        .adm-button.adm-button-mini {
            border-radius: 15px!important;
        }
    }
`

export const AfterStyle = styled.div`
    padding: 10px 4px 50px;
    height: calc(100vh - 100px);
    .boxxc {
        margin: 0 10px;
        background-color: #fff;
        border-radius: 8px;
        /* height: 300px; */
        .adm-nav-bar {
            background-color: #fff;
            border-radius: 8px 8px 0px 0px;
            padding: 0 12px 0 0;
            .adm-nav-bar-back {
                margin-right: 0;
                .adm-nav-bar-back-arrow {
                    margin-right: 0;
                }
            }
        }
        .boxxd {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 10px;
            box-sizing: border-box;
            border-bottom: 1px solid #ddd;
            img {
                width: 80px;
                height: 80px;
            }
            .boxxe {
                width: 200px;
                height: 100px;
                /* background-color: skyblue; */
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .boxxg {
                    display: flex;
                    justify-content: space-between;
                    button {
                        width: 25px;
                        height: 25px;
                        line-height: 25px;
                        background-color: #ebedf0;
                        border-radius: 4px;
                    }
                }
            }
        }
    }
`

export const FooterStyle = styled.footer`
    position: fixed;
    left: 0;
    bottom: 50px;
    height: 50px;
    background: #fff;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 10px;
    button {
        width: 100px;
        height: 30px;
        background-color: #07c160;
        color: #fff;
        font-size: 14px;
        border-radius: 15px;
    }
`