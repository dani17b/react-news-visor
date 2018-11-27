import React, { PropTypes } from 'react';
import styles from './calibrateContainer.scss';

class CalibrateContainer extends React.Component {

  constructor(props){
    super(props);
  }

  finishCalibration(){
      this.props.finishCalibration();
  }

  render () {
    return (
        <div className={styles.container}>
            <span className={styles.containerInCalibrationTitle}>Calibra tu visor de noticias</span>
            <span className={styles.containerInCalibrationDescription}>Para calibrar la pantalla, debes de hacer click sobre los cuadrados de las esquinas haciendo click en cada uno de ellos hasta que el circulo rojo se mantenga estable</span>
            <div className={styles.containerInCalibrationButton} onClick={this.finishCalibration.bind(this)}>
                <span className={styles.containerInCalibrationButtonText}>Finalizar calibracion</span>
            </div>
        </div>
    )
  }
}

export default CalibrateContainer;
