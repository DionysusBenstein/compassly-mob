import React, { Component } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import closeKeyboard from "../utils/closeKeyboard";

function withKeyboard(WrappedComponent) {
  return class extends Component {
    render() {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            closeKeyboard();
          }}
        >
          <View style={{ flex: 1 }}>
            <WrappedComponent {...this.props} />
          </View>
        </TouchableWithoutFeedback>
      );
    }
  };
}

export default withKeyboard;
