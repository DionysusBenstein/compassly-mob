// @flow
import React from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  View,
  Platform,
} from "react-native";

import SwipeButtonsContainer from "./SwipeButtonContainer";

export default class SwipeItem extends React.Component {
  _swipeItem = this;
  _panResponder;
  _panDistanceOffset = { x: 0, y: 0 };
  _isRightButtonShowing = false;
  _isLeftButtonShowing = false;

  state = {
    panDistance: new Animated.ValueXY(),
    rightButtonTriggerPosition: 0,
    leftButtonTriggerPosition: 0,
  };

  constructor(props) {
    super(props);
    this._panResponder = this._createPanResponderInstance();
    this.state.panDistance.addListener((value) => {
      this._panDistanceOffset = value;
    });
  }

  componentWillUnmount() {
    this.state.panDistance.removeAllListeners();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.closeItem !== this.props.closeItem &&
      this.props.closeItem === true
    ) {
      this.close();
    }
  }

  /**
   * create panResponder
   */
  _createPanResponderInstance() {
    let instance = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) < 5) {
          return false;
        }
        if (this.props.disableSwipeIfNoButton) {
          if (
            (!this.props.leftButtons &&
              gestureState.dx > 0 &&
              !this._isRightButtonShowing) ||
            (!this.props.rightButtons &&
              gestureState.dx < 0 &&
              !this._isLeftButtonShowing)
          ) {
            return false;
          }
        }
        const { x: offsetX } = this._panDistanceOffset;

        if (Math.round(offsetX) === 0) {
          this.props.onSwipeInitial &&
            this.props.onSwipeInitial(this._swipeItem);
        }
        return true;
      },
      onPanResponderGrant: (evt, gestureState) => {
        //setting pan distance offset, make sure next touch will not jump to touch position immediately
        this.state.panDistance.setOffset(this._panDistanceOffset);
        //initial panDistance
        this.state.panDistance.setValue({ x: 0, y: 0 });
      },
      onMoveShouldSetPanResponder: (evt) => {
        console.log("start", evt.target);
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: this.state.panDistance.x,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        this._moveToDestination(
          this._getSwipePositionDestinationValueX(gestureState.dx) * 4
        );

        console.log(gestureState.dx);
      },

      onPanResponderTerminationRequest: (evt, gestureState) => {
        // On Android, the component will stick at the last swipe position when pan responder terminate
        // return true, at onPanResponderTerminate function will move the swipe component to origin position
        if (Platform.OS === "android") {
          this._moveToDestination(0);
          return true;
        }
        return false;
      },
    });
    return instance;
  }

  /**
   * move the swipe component to destination
   * @param {number} toX the x-axis of move destination
   */
  _moveToDestination(toX) {
    if (Math.round(toX) === 0) {
      this._isLeftButtonShowing = false;
      this._isRightButtonShowing = false;
      this.props.onMovedToOrigin && this.props.onMovedToOrigin(this._swipeItem);
    }
    //Merges the offset value into the base value and resets the offset to zero.
    this.state.panDistance.flattenOffset();
    Animated.spring(this.state.panDistance, {
      useNativeDriver: false,
      toValue: {
        x: toX,
        y: 0,
      },
      friction: 10,
    }).start();
  }

  close() {
    this._moveToDestination(0);
  }

  /**
   * get the Swipe component's position after user release gesture
   * @param {number} panDistanceX the distance of x-axis for gesture
   */
  _getSwipePositionDestinationValueX(panDistanceX) {
    const { leftButtonTriggerPosition, rightButtonTriggerPosition } =
      this.state;

    let toValueX = 0;
    let panSide = panDistanceX > 0 ? "right" : "left";
    let containerOffset = this._panDistanceOffset.x * 4;

    if (panSide === "right" && containerOffset > leftButtonTriggerPosition) {
      toValueX = leftButtonTriggerPosition;
      this._isLeftButtonShowing = true;
      this.props.onLeftButtonsShowed &&
        this.props.onLeftButtonsShowed(this._swipeItem);
    }

    if (panSide === "left" && containerOffset < rightButtonTriggerPosition) {
      toValueX = rightButtonTriggerPosition;
      this._isRightButtonShowing = true;
      this.props.onRightButtonsShowed &&
        this.props.onRightButtonsShowed(this._swipeItem);
    }

    return toValueX;
  }

  _renderleftButtonsIfNotNull() {
    const { leftButtons = null } = this.props;

    const { leftButtonTriggerPosition } = this.state;

    if (leftButtons == null) {
      return null;
    }
    const { style, children } = leftButtons.props;

    let scale = this.state.panDistance.x.interpolate({
      inputRange: [-Infinity, -0.01, 0, leftButtonTriggerPosition, Infinity],
      outputRange: [0.01, 0.01, 0.7, 1, 1],
    });

    let widthStyle = {
      transform: [{ scale }],
    };

    return (
      <SwipeButtonsContainer
        style={[
          style,
          buttonViewStyles.container,
          buttonViewStyles.left,
          widthStyle,
        ]}
        onLayout={({ nativeEvent }) => {
          this.setState({
            leftButtonTriggerPosition: nativeEvent.layout.width / 4,
          });
        }}
      >
        {children}
      </SwipeButtonsContainer>
    );
  }

  _renderrightButtonsIfNotNull() {
    const { rightButtons = null } = this.props;

    const { rightButtonTriggerPosition } = this.state;

    if (rightButtons == null) {
      return null;
    }

    const { style, children } = rightButtons.props;

    let scale = this.state.panDistance.x.interpolate({
      inputRange: [-Infinity, rightButtonTriggerPosition, 0, 0.1, Infinity],
      outputRange: [1, 1, 0.7, 0.01, 0.01],
    });

    let widthStyle = {
      transform: [{ scale }],
    };

    return (
      <SwipeButtonsContainer
        style={[
          style,
          buttonViewStyles.container,
          buttonViewStyles.right,
          widthStyle,
        ]}
        onLayout={({ nativeEvent }) => {
          this.setState({
            rightButtonTriggerPosition: -1 * nativeEvent.layout.width,
          });
        }}
      >
        {children}
      </SwipeButtonsContainer>
    );
  }

  render() {
    const panStyle = {
      transform: this.state.panDistance.getTranslateTransform(),
    };

    const {
      style,
      swipeContainerStyle,
      containerView: ContainerView = View,
    } = this.props;

    return (
      <View>
        <ContainerView style={[style, containerStyles.rootContainer]}>
          <View style={[containerStyles.buttonsContainer]}>
            {this._renderleftButtonsIfNotNull()}
            {this._renderrightButtonsIfNotNull()}
          </View>
          <Animated.View
            style={[containerStyles.swipeContainer, panStyle]}
            {...this._panResponder.panHandlers}
          >
            <View style={[swipeContainerStyle, containerStyles.swipeContainer]}>
              {this.props.children}
            </View>
          </Animated.View>
        </ContainerView>
      </View>
    );
  }
}

const containerStyles = StyleSheet.create({
  rootContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonsContainer: {
    height: "100%",
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    top: 0,
    left: 0,
  },
  swipeContainer: {
    height: "100%",
    width: "100%",
  },
});

const buttonViewStyles = StyleSheet.create({
  container: {
    position: "absolute",
  },
  left: {
    left: 0,
  },
  right: {
    right: 0,
  },
});
