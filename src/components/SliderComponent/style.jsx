import Slider from "react-slick";
import styled from "styled-components";

export const WrapperSliderStyle = styled(Slider)`
    & .slick-arrow.slick-prev {
        left: 12px;
        top: 40%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-arrow.slick-next {
        right: 28px;
        top: 40%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-dots {
        z-index: 10;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: rgb(255, 255, 0.5);
                }
            }
        }
        li.active {
            button {
                &::before {
                    color: #fff;
                }
            }
        }
    }
`;

export const HeaderSlider = styled.h3`
    max-height: 54px;
    font-size: 20px;
    line-height: 1.4;
    margin-bottom: 9px;
`;

export const TimeSlider = styled.span`
    display: inline-block;
    font-size: 14px;
    color: #7b7b7d;
`;
