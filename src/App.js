import {useState, useEffect, useCallback} from 'react';
import {Container} from 'react-bootstrap';
import './App.css';


const Slider = (props) => {

    const [slide, setSlide] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    const getSomeImages = useCallback(() => {
        console.log('fetching');
        return [
            "https://media.istockphoto.com/photos/hot-air-balloons-flying-over-the-botan-canyon-in-turkey-picture-id1297349747?b=1&k=20&m=1297349747&s=170667a&w=0&h=oH31fJty_4xWl_JQ4OIQWZKP8C6ji9Mz7L4XmEnbqRU=",
            "https://media.istockphoto.com/photos/clock-tower-izmir-picture-id485947800?k=20&m=485947800&s=612x612&w=0&h=i0cWg-xvFePq7oU1bz5Ujw7fKtUdWp9ajGPmjkZ9hsg="
        ]
    }, []);//таким образом мы достигаем меморизированную функцию, которая вызывается только один раз в начале

    function logging() {
        console.log('log!');
    }
    useEffect(() => {
        console.log('effect');
        document.title = `SLide ${slide}`;
        window.addEventListener('click',logging);

        return () => {
            window.removeEventListener('click',logging);//это аналог удаления обработчиков событии в componentWillUnmount
        }

    }, [slide]); //второй аргумент принимает, зависимые параметры, это занчит что только когда будет менятся slide, запускается useEffect
// если этот массив будет пустой , это будет = componentDidMount(), только в начале рендеринге
    
    useEffect(() => {
        console.log('autoplay');
    }, [autoplay])

    function changeSlide(i) {
        setSlide(slide => slide+i);
    }

    function toggleAutoplay(){
        setAutoplay(autoplay => !autoplay);
    }

    return (
        <Container>
            <div className="slider w-50 m-auto">
                <Slide getSomeImages={getSomeImages}/>
                <div className="text-center mt-5">Active slide {slide} <br/>
                {autoplay? 'auto':null}</div>
                <div className="buttons mt-3">
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(-1)}>-1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={() => changeSlide(1)}>+1</button>
                    <button 
                        className="btn btn-primary me-2"
                        onClick={toggleAutoplay}>toggle autoplay</button>
                </div>
            </div>
        </Container>
    )
}

const Slide = ({getSomeImages}) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        setImages(getSomeImages())
    }, [getSomeImages])

    return (
        <>
            {images.map((url, i) => <img key={i} className='d-block w-100' src={url} alt="slide"/>)}
        </>
    )
}

function App() {
    const [slider, setSlider] = useState(true);
  return (
      <>
        <button onClick={() => setSlider(false)}>Click</button>
        {slider ? <Slider/> : null}
      </>   
  );
}

export default App;
