import React, { PropTypes } from 'react';
import styles from './headerContainer.scss';

class HeaderContainer extends React.Component {

  constructor(props){
    super(props);
  }

  render () {
    return (
        <div className={styles.header}>
            <span className={styles.headerIco}></span>
            <span className={styles.headerText}>Visor de noticias</span>
            {this.props.showButtons &&
                <div className={styles.headerButtons}>
                    {/* <div className={styles.headerButton}>
                        <span className={styles.headerButtonIco + " " + styles.headerButtonIcoMonitor}></span>
                        <span className={styles.headerButtonText}>Mostrar monitor</span>
                    </div> */}
                    <div className={styles.headerButton} onClick={this.props.recalibrate}>
                        <span className={styles.headerButtonIco + " " + styles.headerButtonIcoRecalibrate}></span>
                        <span className={styles.headerButtonText}>Recalibrar</span>
                    </div>
                </div>
            }
        </div>
    )
  }
}

export default HeaderContainer;
