import { View, TextInput, Button, StyleSheet, Modal } from 'react-native';
import { useState } from 'react'

function GoalInput(props) {
    const [goalText, setGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setGoalText(enteredText);
      }
    function addGoalHandler() {
        props.onAddGoal(goalText);
        setGoalText('');
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <TextInput style={styles.textInput} 
                placeholder='New Goal'
                placeholderTextColor={'gray'}
                onChangeText={goalInputHandler}
                value={goalText} 
                selectionColor={'#d4af37'}
                />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add Goal' onPress={addGoalHandler} color={'#d4af37'}/>
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.cancel} color={'gray'}/>
                    </View>
                </View>
            </View>
      </Modal>
      );
};

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#0e1111',
      },
      textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        marginRight: 8,
        padding: 8,
        color: 'white',
        borderRadius: 6,
      },
      buttonContainer: {
        flexDirection: 'row',
        marginTop: 16,
      },
      button: {
        width: '40%',
        marginHorizontal: 8,
      },
})