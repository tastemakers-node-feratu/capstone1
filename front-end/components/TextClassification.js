import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';
import * as use from '@tensorflow-models/universal-sentence-encoder';

class TextClassification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTfReady: false,
    };
  }

  async componentDidMount() {
    // Wait for tf to be ready.
    await tf.ready();
    // Signal to the app that tensorflow.js can now be used.
    this.setState({
      isTfReady: true,
    });
  }


  render() {
    //
  }
}
export default TextClassification;
