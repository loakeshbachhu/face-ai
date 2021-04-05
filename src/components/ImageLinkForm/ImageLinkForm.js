import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
                <p className='f4 center white'>
                    {'This face-ai will detect the faces. Upload & Try It!'}
                </p>
                <div className='center'>
                    <div  className='form pa4 br3 shadow-5 center'>
                        <input className='f4 pa2 w-75 center' type='text' placeholder='Enter or paste URL...' onChange={onInputChange}/>
                        <button className='w-25 grow f4 link ph3 br3 pv2 dib navy bg-light-red' onClick={onButtonSubmit}>Analyze</button>
                    </div>
                </div>
        </div>
    )
}

export default ImageLinkForm;