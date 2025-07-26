import { useEffect, useState } from "react"
import { Button, StyleSheet, Text, View } from "react-native"

const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let interval;
        if(isRunning) interval = setInterval(() => setSeconds(s => s + 1), 1000)
        return () => clearInterval(interval)
    }, [isRunning])

    const formatTime = (time) => {
        const sec = time % 60
        const min = Math.floor((time % 3600) / 60)
        const hours = Math.floor(time / 3600)
        return `${sec.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}`
    }

    return(
        <View style={styles.container}>
            <Text style={styles.time}>{formatTime(seconds)}</Text>
            <View style={styles.buttonContainer}>
                <Button  title={isRunning ? "Stop" : "Start"} onPress={() => setIsRunning(!isRunning)}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Clear" onPress={() => {
                    setIsRunning(false)
                    setSeconds(0)
                }}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        padding: 10
    },
    buttonContainer: {
        marginBottom: 10,
    },
    time: {
        fontSize: 26,
        marginBottom: 15,
        textAlign: "center"
    }
})

export default Stopwatch