import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProgressCircle = ({ percentage = 60 }) => {
  const progress = Math.min(Math.max(percentage, 0), 100);
  const rotation = (progress / 100) * 360;

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        {/* Background circle - should be at the bottom */}
        <View style={styles.backgroundCircle} />

        {/* Right half - shows first 180 degrees */}
        <View
          style={[
            styles.rightHalf,
            {
              transform: [
                { rotate: progress > 50 ? "180deg" : `${rotation}deg` },
              ],
            },
          ]}
        />

        {/* Left half - shows after 50% */}
        <View
          style={[
            styles.leftHalf,
            {
              transform: [
                { rotate: progress > 50 ? `${rotation - 180}deg` : "0deg" },
              ],
            },
          ]}
        />

        {/* Center content */}
        <View style={styles.textContainer}>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
          <Text style={styles.progressLabel}>Completed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: 120,
    height: 120,
  },
  circleContainer: {
    width: 120,
    height: 120,
    position: "relative",
  },
  leftHalf: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderLeftColor: "#4CAF50",
    borderBottomColor: "#4CAF50",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    zIndex: 2, // Above background
  },
  rightHalf: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "#4CAF50",
    borderTopColor: "#4CAF50",
    zIndex: 2, // Above background
  },
  backgroundCircle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 8,
    borderColor: "#e6e6e6",
    zIndex: 1, // Below progress halves
  },
  textContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3, // Above everything
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  progressLabel: {
    fontSize: 14,
    color: "#000",
    marginTop: 4,
  },
});

export default ProgressCircle;
