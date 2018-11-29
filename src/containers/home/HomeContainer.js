import React, { PropTypes } from 'react';
import styles from './homeContainer.scss';
import {Scrollbars} from 'react-custom-scrollbars';

import Config from '../../config/Config';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as HomeActions from './actions/HomeActions';
import ArticleContainer from './containers/articleContainer/ArticleContainer';
import CalibrateContainer from './containers/calibrateContainer/CalibrateContainer';
import HeaderContainer from './containers/headerContainer/HeaderContainer';

class HomeContainer extends React.Component {

  constructor(props){
    super(props);

    // Initial state
    this.state = {
        trackPosition : {
            x : 0,
            y : 0
        },
        selectedRegion : null,
        lastChecks : []
    }

    this.actions = bindActionCreators(HomeActions, this.props.dispatch);
  }

  componentDidMount(){
    let _this = this;

    webgazer
        .setRegression('ridge')
        .setTracker('clmtrackr')
        .setGazeListener(function(data, elapsedTime) {
        if (data == null) {
            return;
        }

        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport
        
        _this.detectTrackPoint(data.x, data.y);
    }).showPredictionPoints(true).begin();
  }

  finishCalibration(){
      this.actions.endCalibration();
  }

  detectTrackPoint(x, y){
    if(this.props.home.mode == "calibration"){
        return false;
    }
    
    let regionWidth = window.innerWidth * parseInt(Config.region.width) / 100;
    let regionHeight = window.innerHeight * parseInt(Config.region.height) / 100
    let selectedRegion = null;

    if(x <= regionWidth && y <= regionHeight){
        selectedRegion = "top-left";
    }

    if(x >= (window.innerWidth - regionWidth) && y <= regionHeight){
        selectedRegion = "top-right";
    }

    if(x <= regionWidth && y >= (window.innerHeight - regionHeight)){
        selectedRegion = "bottom-left";
    }

    if(x >= (window.innerWidth - regionWidth) && y >= (window.innerHeight - regionHeight)){
        selectedRegion = "bottom-right";
    }

    if(selectedRegion != null){
        this.doAction(selectedRegion);
    }

    this.setState({
        trackPosition : {
            x,
            y
        },
        selectedRegion
    })
  }

  doAction(selectedRegion){
      if(selectedRegion == "top-left" || selectedRegion == "top-right"){
        this.refs.content.scrollTo(0,this.refs.content.scrollTop - Config.scrollOffset);
      }

      if(selectedRegion == "bottom-left" || selectedRegion == "bottom-right"){
        this.refs.content.scrollTo(0,this.refs.content.scrollTop + Config.scrollOffset);
      }
  }

  recalibrate(){
      this.actions.initCalibration();
  }

  checkVideoCalibration(isCalibrationMode){
      let webgazerVideoFeed = window.document.getElementById("webgazerVideoFeed");
      let webgazerFaceOverlay = window.document.getElementById("webgazerFaceOverlay");
      let webgazerGazeDot = window.document.getElementById("webgazerGazeDot");
      

      if(webgazerVideoFeed == null || webgazerFaceOverlay == null){
          return;
      }

      if(!isCalibrationMode){
        webgazerVideoFeed.style.opacity = "0";
        webgazerFaceOverlay.style.opacity = "0";
        webgazerGazeDot.style.opacity = "0";
      }else{
        webgazerVideoFeed.style.opacity = "1";
        webgazerFaceOverlay.style.opacity = "1";
        webgazerGazeDot.style.opacity = "1";
      }
  }

  render () {
    let isCalibrationMode = this.props.home.mode == "calibration";
    let regionWidth = isCalibrationMode ? Config.region.calibrationWidth : Config.region.width;
    let regionHeight = isCalibrationMode ? Config.region.calibrationHeight : Config.region.height;

    this.checkVideoCalibration(isCalibrationMode);

    return (
        <div className={styles.container}>
            <HeaderContainer
                showButtons={!isCalibrationMode}
                recalibrate={this.recalibrate.bind(this)}
            />
            <div className={styles.containerIn}>
                {isCalibrationMode &&
                    <CalibrateContainer finishCalibration={this.finishCalibration.bind(this)}/>
                }
                {this.props.home.showMonitor &&
                    <div>
                        <div className={styles.containerInRegion + " " + styles.regionTopLeft + (this.state.selectedRegion == "top-left" ? (" " + styles.containerInRegionSelected) : "")} style={{
                            width : regionWidth,
                            height : regionHeight,
                            backgroundColor : isCalibrationMode ? "#333" : (this.state.selectedRegion == "top-left" ? Config.selectedRegionColor : "transparent")
                        }}></div>
                        <div className={styles.containerInRegion + " " + styles.regionTopRight + (this.state.selectedRegion == "top-right" ? (" " + styles.containerInRegionSelected) : "")} style={{
                            width : regionWidth,
                            height : regionHeight,
                            backgroundColor : isCalibrationMode ? "#333" : (this.state.selectedRegion == "top-right" ? Config.selectedRegionColor : "transparent")
                        }}></div>
                        <div className={styles.containerInRegion + " " + styles.regionBottomLeft + (this.state.selectedRegion == "bottom-left" ? (" " + styles.containerInRegionSelected) : "")} style={{
                            width : regionWidth,
                            height : regionHeight,
                            backgroundColor : isCalibrationMode ? "#333" : (this.state.selectedRegion == "bottom-left" ? Config.selectedRegionColor : "transparent")
                        }}></div>
                        <div className={styles.containerInRegion + " " + styles.regionBottomRight + (this.state.selectedRegion == "bottom-right" ? (" " + styles.containerInRegionSelected) : "")} style={{
                            width : regionWidth,
                            height : regionHeight,
                            backgroundColor : isCalibrationMode ? "#333" : (this.state.selectedRegion == "bottom-right" ? Config.selectedRegionColor : "transparent")
                        }}></div>
                    </div>
                }
                
                {this.props.home.mode != "calibration" &&
                    <div className={styles.content} ref="content">
                        {/* TODO renderizar lista de contenidos una vez se finaliza la calibracion */}
                    </div>
                }
            </div>
        </div>
    )
  }
}

export default connect(store => ({
    home: store.home
}))(HomeContainer);
