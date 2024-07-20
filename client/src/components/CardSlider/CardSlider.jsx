import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Card from '../Card/Card';
import './CardSlider.scss'; 



const CardSlider = ({ items }) => {
    const CustomArrow = ({ className, style, onClick, direction }) => {
        return (
            <div
                className={`${className} custom-arrow ${direction}`}
                style={{ ...style }}
                onClick={onClick}
            >
                {direction === 'left' ? '←' : '→'}
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <div className="cardSlider">
            <Slider {...settings}>
                {items.map(item => (
                    <div key={item._id}>
                        <Card item={item} />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default CardSlider;