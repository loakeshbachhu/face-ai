import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './App.css';
import 'tachyons';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
 apiKey: 'fafd6cdeb6e549b691f6193441bc648b'
});

const particlesOptions = {
    particles: {
      number: {
        value: 120,
        density: {
          enable: true,
          value_area: 800
        }
      },
      interactivity:{
          events : {
            onhover:{
                enable: true,
                mode: 'grab'
            }
        }
      }
    }
  }


class App extends Component {

  constructor() {
    super();
    this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedin: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imageInput'); 
    const width = Number(image.width );
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayBoundingBox = (box) => {
      this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict('a403429f2ddf4b49b307e318f00e528b', this.state.input)
    .then( response => this.displayBoundingBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedin: false})
    }else if(route === 'home'){
      this.setState({isSignedin: true})
    }
    this.setState({route: route});
  }

    render() {
     const {isSignedin, route, box, input} = this.state;
        return(
            <div className='App'>
                    <Particles className='particles' params={particlesOptions}/>
                    <Navigation onRouteChange={this.onRouteChange} isSignedin={isSignedin}/>
                     {
                        route === 'home' ?
                        <div>
                        <Logo/>
                        <Rank/>
                        <ImageLinkForm  onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={box} imageUrl={input}/>
                      </div>
                      : (
                        route === 'signin' ?
                        <Signin onRouteChange={this.onRouteChange}/>
                        :  <Register onRouteChange={this.onRouteChange}/>
                      )
                      
                     
                       
                    }
                   
            </div>
        )
    }
}

export default App;