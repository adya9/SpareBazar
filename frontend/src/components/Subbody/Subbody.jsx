import './Subbody.css';
import Typewriter from 'typewriter-effect';

function Subbody() {
    return (
        <div className="whole">
            <div className="text_heading">
                <label>SPARE<label className="bazar">BAZAR</label></label>
                <div className="text">
                    <Typewriter
                        options={{
                            autoStart: true,
                            loop: true,
                            delay: 40,
                            strings: [
                                "Kharido Becho Asani se",
                                "खरीदो बेचो आसानी से",
                                "வாங்கு விற்று எளியாக"
                            ],
                        }}
                    />
                </div>
            </div>
            {/* <div>
                <img src={subbodyImage} className="added-image" />
            </div> */}
        </div>
    )
}

export default Subbody;