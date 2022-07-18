import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat } from 'react-native-reanimated';

const SIZE = 100;

const handleRotation = (progress = Animated.SharedValue) => {
    'worklet';
    return `${progress.value * 2 * Math.PI}rad`
}

const One = () => {

    const progress = useSharedValue(1);
    const scale = useSharedValue(2);

    const reanimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: progress.value,
            borderRadius: progress.value * SIZE / 2,
            transform: [
                { scale: scale.value },
                { rotate: handleRotation(progress) }
            ]
        }
    })

    useEffect(() => {
        progress.value = withRepeat(withSpring(0.5), 3, true);
        scale.value = withRepeat(withSpring(1), 3, true);
    }, [])

    return (
        <View style={styles.container}>
            {/* <TapGestureHandler onHandlerStateChange={runAnimaton}> */}
            <Animated.View style={[styles.box, reanimatedStyle]} />
            {/* </TapGestureHandler> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        backgroundColor: 'royalblue',
        width: SIZE,
        height: SIZE,
    }
});

export default One;