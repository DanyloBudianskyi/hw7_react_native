import { useEffect, useState } from "react"
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const Timer = () => {
    const [seconds, setSeconds] = useState('0')
    const [minutes, setMinutes] = useState('0')
    const [hours, setHours] = useState('0')
    const [totalSeconds, setTotalSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [finished, setFinished] = useState(false)

    useEffect(() => {
        let interval
        if(isRunning && totalSeconds > 0){
            interval = setInterval(() => setTotalSeconds(s => s - 1), 1000)
        }
        else if(totalSeconds === 0 && isRunning){
            setIsRunning(false)
            setFinished(true)
        }
        return () => clearInterval(interval)
    }, [isRunning, totalSeconds])

    const startTimer = () => {
        const total = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)
        if(total <= 0){
            return
        }
        setTotalSeconds(total)
        setIsRunning(true)
        setFinished(false)
    }

    const formatTime = (time) => {
        const sec = time % 60
        const min = Math.floor((time % 3600) / 60)
        const hours = Math.floor(time / 3600)
        return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
    }

    if(finished){
        return(
            <TouchableOpacity style={styles.redContainer} onPress={() => {
                setFinished(false)
            }}></TouchableOpacity>
        )
    }

    return(
        <View style={[styles.container]}>
            {!isRunning && (
                <View style={styles.inputContainer}>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.input} keyboardType="number-pad" value={hours} onChangeText={setHours}/>
                        <Text style={styles.time}>H</Text>  
                    </View>
                    
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.input} keyboardType="number-pad" value={minutes} onChangeText={setMinutes}/>
                        <Text style={styles.time}>M</Text>
                    </View>
                    <View style={styles.inputGroup}>
                        <TextInput style={styles.input} keyboardType="number-pad" value={seconds} onChangeText={setSeconds}/>
                        <Text style={styles.time}>S</Text>
                    </View>
                </View>
            )}
            <Text style={styles.time}>{formatTime(totalSeconds)}</Text>
            <View style={styles.buttonContainer}>
                <Button title={isRunning ? "Stop" : "Start"} onPress={() => isRunning ? setIsRunning(false) : startTimer()}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Clear" onPress={() => {
                    setIsRunning(false)
                    setTotalSeconds(0)
                    setFinished(false)
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
    },
    inputContainer: {
        flexDirection: "row",
        marginBottom: 20,
        justifyContent: 'space-around',
    },
    inputGroup: {
        alignItems: "center",
        flexDirection: 'row'
    },
    input: {
        borderWidth: 1, 
        padding: 10, 
        width: 80, 
        marginHorizontal: 5, 
        textAlign: 'center'
    },
    redContainer: {
        backgroundColor: "red",
        flex: 1
    }
})

export default Timer